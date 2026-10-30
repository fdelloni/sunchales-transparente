// Guion del video de presentación de Sunchales Transparente (ciudadan.com).
// Única fuente del texto: de acá salen el archivo para pegar en ElevenLabs,
// los subtítulos (.srt) y la estimación de tiempos cuando todavía no hay voz.
// Si cambiás un texto, volvé a correr `node herramientas/construir.mjs`.

export const escenas = [
  {
    id: "pregunta",
    texto:
      "¿Sabés en qué se gasta cada peso público de Sunchales? ¿Quién lo decide, cuándo, y con qué norma?",
  },
  {
    id: "presentacion",
    texto:
      "Te presentamos Sunchales Transparente: una plataforma cívica, abierta y gratuita, para que cualquier vecino pueda seguir de cerca la gestión de su ciudad. Está en ciudadan punto com.",
  },
  {
    id: "presupuesto",
    texto:
      "Ahí vas a encontrar el presupuesto dos mil veintiséis, de más de treinta mil millones de pesos, explicado en gráficos y partida por partida.",
  },
  {
    id: "contrataciones",
    texto:
      "Las licitaciones y compras del municipio. Los cargos políticos y más de diez años de remuneraciones, con los documentos oficiales a un clic.",
  },
  {
    id: "normativa",
    texto:
      "Las ordenanzas y decretos, y la actividad del Concejo Municipal: sus concejales, sus comisiones y los proyectos en tratamiento.",
  },
  {
    id: "asistente",
    texto:
      "¿Tenés una duda? Preguntale al asistente ciudadano, en la web o por WhatsApp, a cualquier hora. Responde solo con datos públicos verificados, y siempre te dice de dónde sale cada dato.",
  },
  {
    id: "honestidad",
    texto:
      "Porque acá no se inventa nada. Cada dato cita su fuente oficial. Lo verificado se marca como verificado, y lo que todavía no es oficial, se marca como pendiente.",
  },
  {
    id: "brechas",
    texto:
      "Y lo que el municipio está obligado a publicar, pero todavía no publica, también se muestra. Hoy son cincuenta y nueve brechas de transparencia, cada una con su fundamento legal y el camino para pedir esa información.",
  },
  {
    id: "datos",
    texto:
      "La plataforma se actualiza sola, todos los días. Podés descargar los datos en formatos abiertos, conectarlos a tus propias aplicaciones, o suscribirte para recibir alertas de cada nueva contratación.",
  },
  {
    id: "independiente",
    texto:
      "Sunchales Transparente es un proyecto cívico independiente y de código abierto, pensado para que cualquier otra ciudad lo pueda replicar.",
  },
  {
    id: "cierre",
    texto:
      "Porque la información pública es de todos. Entrá a ciudadan punto com. Explorá, preguntá, y compartilo.",
  },
];

// Pausa entre escenas en el audio de ElevenLabs. La sincronización busca
// estos silencios para saber dónde cambia cada escena.
export const PAUSA_ENTRE_ESCENAS = "1.2s";

// Para los subtítulos: lo que se pronuncia distinto de como se escribe.
export const paraSubtitulos = (t) =>
  t
    .replace(/ciudadan punto com/g, "ciudadan.com")
    .replace(/dos mil veintiséis/g, "2026")
    .replace(/treinta mil millones/g, "30.000 millones")
    .replace(/cincuenta y nueve/g, "59");
