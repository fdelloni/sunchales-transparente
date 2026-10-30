// Arma el video completo.
//
//   node herramientas/construir.mjs            → con voz si hay un audio en voz/,
//                                                si no, vista previa sin voz
//   node herramientas/construir.mjs --cuadros  → solo fotos fijas de cada escena
//                                                (para revisar el diseño rápido)
//   node herramientas/construir.mjs --voz ruta/al/audio.mp3
//                                              → usa ese audio en vez de buscar en voz/
//
// Con voz: ubica cada frase del guion en el audio de ElevenLabs para saber
// dónde cambia cada escena, genera la música a la duración exacta, renderiza
// y mezcla (música baja, que además baja sola cuando habla la voz).

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { escenas, PAUSA_ENTRE_ESCENAS, paraSubtitulos } from "../guion.mjs";
import { renderizar } from "./render.mjs";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const TMP = join(RAIZ, "tmp");
const SALIDA = join(RAIZ, "salida");
const HTML = join(RAIZ, "escenas", "index.html");
mkdirSync(TMP, { recursive: true });
mkdirSync(SALIDA, { recursive: true });

const FPS = 30;
const ANTES_DE_LA_VOZ = 1.0; // segundos de música antes de que arranque la voz
const COLA = 4.0; // segundos de cierre después de la última palabra
const soloCuadros = process.argv.includes("--cuadros");

// 1 · Texto para pegar en ElevenLabs (siempre sincronizado con guion.mjs):
// con etiquetas de pausa (Multilingual v2) y sin etiquetas (v3 u otros).
writeFileSync(
  join(RAIZ, "guion_para_pegar.txt"),
  escenas.map((e) => e.texto).join(`\n<break time="${PAUSA_ENTRE_ESCENAS}" />\n`) + "\n",
);
writeFileSync(join(RAIZ, "guion_sin_etiquetas.txt"), escenas.map((e) => e.texto).join("\n\n") + "\n");

// 2 · Tiempos de cada frase (en segundos del audio)
const argVoz = process.argv.indexOf("--voz");
const rutaVoz = argVoz > 0
  ? process.argv[argVoz + 1]
  : existsSync(join(RAIZ, "voz"))
    ? readdirSync(join(RAIZ, "voz")).filter((f) => /\.(mp3|wav|m4a)$/i.test(f)).map((f) => join(RAIZ, "voz", f))[0]
    : undefined;
const voz = rutaVoz && basename(rutaVoz);

const FRASES = escenas.flatMap((e, i) =>
  e.texto.match(/[^.?!]+[.?!]+/g).map((f) => ({ escena: i, texto: f.trim(), letras: f.trim().length })),
);

const duracionDe = (archivo) =>
  parseFloat(
    execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", archivo])
      .toString(),
  );

function silencios(archivo, minimo) {
  const r = spawnSync("ffmpeg", ["-hide_banner", "-i", archivo, "-af", `silencedetect=noise=-36dB:d=${minimo}`, "-f", "null", "-"]);
  const lista = [];
  for (const linea of r.stderr.toString().split("\n")) {
    const a = linea.match(/silence_start: ([\d.]+)/);
    const b = linea.match(/silence_end: ([\d.]+)/);
    if (a) lista.push({ inicio: parseFloat(a[1]), fin: null });
    if (b && lista.length) lista.at(-1).fin = parseFloat(b[1]);
  }
  return lista;
}

// Entre frase y frase siempre hay una pausa, pero también hay pausas en comas
// y dos puntos. Programación dinámica: elige, en orden, las pausas que hacen
// que la duración de cada frase se parezca más a la esperada por su largo.
// Las pausas largas (las <break> del guion) suman a favor.
function alinearFrases(ini, fin, pausas) {
  const K = FRASES.length, M = pausas.length;
  const letras = FRASES.reduce((n, f) => n + f.letras, 0);
  let ritmo = letras / (fin - ini - 0.35 * (K - 1)); // letras por segundo
  let frases;
  for (let vuelta = 0; vuelta < 3; vuelta++) {
    const costo = (k, a, b) => {
      if (b - a < 0.4) return 1e9;
      const r = Math.log(((b - a) * ritmo) / FRASES[k].letras);
      return r * r;
    };
    const premio = (j) => 0.25 * Math.min(pausas[j].fin - pausas[j].inicio, 1.5);
    const dp = Array.from({ length: K - 1 }, () => new Array(M).fill(Infinity));
    const de = Array.from({ length: K - 1 }, () => new Array(M).fill(-1));
    for (let j = 0; j < M; j++) dp[0][j] = costo(0, ini, pausas[j].inicio) - premio(j);
    for (let k = 1; k < K - 1; k++)
      for (let j = k; j < M; j++)
        for (let i = k - 1; i < j; i++) {
          const c = dp[k - 1][i] + costo(k, pausas[i].fin, pausas[j].inicio) - premio(j);
          if (c < dp[k][j]) { dp[k][j] = c; de[k][j] = i; }
        }
    let ultima = -1, mejor = Infinity;
    for (let j = K - 2; j < M; j++) {
      const c = dp[K - 2][j] + costo(K - 1, pausas[j].fin, fin);
      if (c < mejor) { mejor = c; ultima = j; }
    }
    const elegidas = [];
    for (let k = K - 2, j = ultima; k >= 0; k--) { elegidas.unshift(j); j = de[k][j]; }
    frases = FRASES.map((f, k) => ({
      ...f,
      inicio: k === 0 ? ini : pausas[elegidas[k - 1]].fin,
      fin: k === K - 1 ? fin : pausas[elegidas[k]].inicio,
    }));
    ritmo = letras / frases.reduce((n, f) => n + f.fin - f.inicio, 0);
  }
  return frases;
}

function frasesDesdeVoz(archivo) {
  const dur = duracionDe(archivo);
  const sil = silencios(archivo, 0.15).map((s) => ({ ...s, fin: s.fin ?? dur }));
  let ini = 0, fin = dur;
  if (sil.length && sil[0].inicio <= 0.05) ini = sil.shift().fin;
  if (sil.length && sil.at(-1).fin >= dur - 0.05) fin = sil.pop().inicio;
  if (sil.length < FRASES.length - 1) {
    console.log("voz: hay menos pausas que frases; reparto el tiempo por largo de cada frase");
    return frasesEstimadas(ini, fin);
  }
  const frases = alinearFrases(ini, fin, sil);
  console.log(`voz: ${dur.toFixed(1)} s · ${FRASES.length} frases ubicadas entre ${sil.length} pausas`);
  return frases;
}

// Sin voz (o sin pausas claras): reparte por cantidad de letras.
function frasesEstimadas(ini = 0, fin) {
  const PAUSA_FRASE = 0.35, PAUSA_ESCENA = 1.3;
  const pausaTras = (k) => (k === FRASES.length - 1 ? 0 : FRASES[k + 1].escena !== FRASES[k].escena ? PAUSA_ESCENA : PAUSA_FRASE);
  const pausas = FRASES.reduce((n, _, k) => n + pausaTras(k), 0);
  const letras = FRASES.reduce((n, f) => n + f.letras, 0);
  const ritmo = fin ? letras / (fin - ini - pausas) : 15.5;
  let t = ini;
  return FRASES.map((f, k) => {
    const fr = { ...f, inicio: t, fin: t + f.letras / ritmo };
    t = fr.fin + pausaTras(k);
    return fr;
  });
}

const frases = rutaVoz ? frasesDesdeVoz(rutaVoz) : frasesEstimadas();
const corrimiento = ANTES_DE_LA_VOZ - frases[0].inicio; // tiempo de video = tiempo de audio + corrimiento
const deEscena = (i) => frases.filter((f) => f.escena === i);
const total = frases.at(-1).fin + corrimiento + COLA;
const tiempos = {
  total,
  escenas: escenas.map((e, i) => {
    // El cambio de escena cae en el medio de la pausa que las separa.
    const inicio = i === 0 ? 0 : (deEscena(i - 1).at(-1).fin + deEscena(i)[0].inicio) / 2 + corrimiento;
    const fin = i === escenas.length - 1 ? total : (deEscena(i).at(-1).fin + deEscena(i + 1)[0].inicio) / 2 + corrimiento;
    // Frases en tiempo local de la escena, para que cada elemento aparezca
    // cuando la voz lo nombra.
    const fr = deEscena(i).map((f) => ({ texto: f.texto, inicio: f.inicio + corrimiento - inicio, fin: f.fin + corrimiento - inicio }));
    return { id: e.id, inicio, fin, frases: fr };
  }),
};
writeFileSync(join(RAIZ, "escenas", "tiempos.js"), `window.TIEMPOS = ${JSON.stringify(tiempos, null, 2)};\n`);
console.log(`video: ${total.toFixed(1)} s ${rutaVoz ? `con la voz de ${voz}` : "(vista previa sin voz, tiempos estimados)"}`);
for (const e of tiempos.escenas) console.log(`  ${e.id.padEnd(15)} ${e.inicio.toFixed(1).padStart(6)} → ${e.fin.toFixed(1)}`);
if (process.argv.includes("--frases"))
  for (const f of frases)
    console.log(`    ${(f.inicio + corrimiento).toFixed(2).padStart(7)} ${(f.fin + corrimiento).toFixed(2).padStart(7)}  ${f.texto}`);

if (soloCuadros) {
  const cuadros = tiempos.escenas.map((e, i) => [Math.min(e.fin - 0.4, e.inicio + (e.fin - e.inicio) * 0.82), join(TMP, `cuadro-${String(i + 1).padStart(2, "0")}-${e.id}.png`)]);
  await renderizar({ html: HTML, tiempos, cuadros });
  console.log(`cuadros en ${TMP}`);
  process.exit(0);
}

// 3 · Subtítulos: una entrada por frase (las largas, partidas en la coma
// más cercana al medio)
function srt() {
  const hhmmss = (s) => {
    const ms = Math.round(s * 1000);
    const p = (n, w = 2) => String(n).padStart(w, "0");
    return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
  };
  const partir = (frase) => {
    if (frase.length <= 84) return [frase];
    const medio = frase.length / 2;
    const comas = [...frase.matchAll(/[,:] /g)].map((m) => m.index + 1);
    if (!comas.length) return [frase];
    const c = comas.reduce((a, b) => (Math.abs(b - medio) < Math.abs(a - medio) ? b : a));
    return [...partir(frase.slice(0, c).trim()), ...partir(frase.slice(c).trim())];
  };
  const enDosLineas = (txt) => {
    if (txt.length <= 42) return txt;
    const medio = txt.length / 2;
    const espacios = [...txt.matchAll(/ /g)].map((m) => m.index);
    const c = espacios.reduce((a, b) => (Math.abs(b - medio) < Math.abs(a - medio) ? b : a));
    return txt.slice(0, c) + "\n" + txt.slice(c + 1);
  };
  const cues = [];
  for (const f of frases) {
    const partes = partir(paraSubtitulos(f.texto));
    const largo = partes.reduce((n, p) => n + p.length, 0);
    let t = f.inicio + corrimiento;
    for (const p of partes) {
      const d = ((f.fin - f.inicio) * p.length) / largo;
      cues.push([t, t + d, enDosLineas(p)]);
      t += d;
    }
  }
  return cues.map(([a, b, txt], i) => `${i + 1}\n${hhmmss(a)} --> ${hhmmss(b)}\n${txt}\n`).join("\n");
}
writeFileSync(join(SALIDA, "subtitulos.srt"), srt());

// 4 · Música a la duración exacta
const musica = join(TMP, "musica.wav");
execFileSync("python", [join(RAIZ, "herramientas", "musica.py"), total.toFixed(3), musica], { stdio: "inherit" });

// 5 · Imagen
const mudo = join(TMP, "imagen.mp4");
console.log("renderizando cuadros…");
await renderizar({ html: HTML, tiempos, fps: FPS, salida: mudo });

// 6 · Mezcla
const final = join(SALIDA, rutaVoz ? "sunchales-transparente-presentacion.mp4" : "vista-previa-sin-voz.mp4");
let filtro, entradas;
if (rutaVoz) {
  const ajuste = corrimiento >= 0
    ? `adelay=${Math.round(corrimiento * 1000)}:all=1`
    : `atrim=start=${(-corrimiento).toFixed(3)},asetpts=PTS-STARTPTS`;
  // Voz a -16 LUFS; música unos 14 dB por debajo y con compresión lateral
  // para que baje un poco más cuando hay voz.
  filtro = [
    `[1:a]aformat=channel_layouts=stereo,aresample=44100,${ajuste},loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100,apad,asplit[voz][llave]`,
    `[2:a]loudnorm=I=-30:TP=-8:LRA=11,aresample=44100[mus]`,
    `[mus][llave]sidechaincompress=threshold=0.04:ratio=3:attack=40:release=600:makeup=1[musb]`,
    `[musb][voz]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.9[a]`,
  ].join(";");
  entradas = ["-i", mudo, "-i", rutaVoz, "-i", musica];
} else {
  filtro = `[1:a]loudnorm=I=-20:TP=-2:LRA=11,aresample=44100[a]`;
  entradas = ["-i", mudo, "-i", musica];
}
execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...entradas, "-filter_complex", filtro,
  "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-t", total.toFixed(3),
  "-movflags", "+faststart", final], { stdio: "inherit" });
console.log(`listo → ${final}`);
