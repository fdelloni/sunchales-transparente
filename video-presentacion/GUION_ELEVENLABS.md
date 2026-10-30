# Guion para ElevenLabs — Presentación de Sunchales Transparente

Duración estimada de la locución: **unos 2 minutos** (≈290 palabras + pausas).
El video agrega 1 segundo de música antes de la voz y unos 4 segundos de cierre.

## Configuración recomendada en ElevenLabs

| Opción | Valor |
|---|---|
| Modelo | **Eleven Multilingual v2** (respeta las pausas `<break>`) |
| Voz | Una voz rioplatense, cálida y clara. En *Voice Library* buscá "Argentina" o "rioplatense", estilo *narration*. |
| Stability | 45–55 % |
| Similarity | 75 % |
| Style exaggeration | 10–20 % |
| Speaker boost | Activado |
| Velocidad | 1.0 (si queda apurado, 0.95) |
| Formato de salida | MP3 44,1 kHz, 128 kbps o más |

Pegá **todo el bloque de abajo de una sola vez** (también está solo en
`guion_para_pegar.txt`). Las etiquetas `<break time="1.2s" />` son las pausas
entre escenas: no las borres, porque el armado del video las usa para saber
dónde cambia cada escena.

> En Multilingual v2 las etiquetas `<break>` **no se leen**: se convierten en
> pausas. Si usás Eleven v3 (que no las soporta) o escuchás que dice "break
> time", usá `guion_sin_etiquetas.txt` (solo texto, un párrafo por escena). El
> armado igual busca los silencios más largos, aunque la sincronización queda
> un poco menos precisa.

## Texto para pegar

```
¿Sabés en qué se gasta cada peso público de Sunchales? ¿Quién lo decide, cuándo, y con qué norma?
<break time="1.2s" />
Te presentamos Sunchales Transparente: una plataforma cívica, abierta y gratuita, para que cualquier vecino pueda seguir de cerca la gestión de su ciudad. Está en ciudadan punto com.
<break time="1.2s" />
Ahí vas a encontrar el presupuesto dos mil veintiséis, de más de treinta mil millones de pesos, explicado en gráficos y partida por partida.
<break time="1.2s" />
Las licitaciones y compras del municipio. Los cargos políticos y más de diez años de remuneraciones, con los documentos oficiales a un clic.
<break time="1.2s" />
Las ordenanzas y decretos, y la actividad del Concejo Municipal: sus concejales, sus comisiones y los proyectos en tratamiento.
<break time="1.2s" />
¿Tenés una duda? Preguntale al asistente ciudadano, en la web o por WhatsApp, a cualquier hora. Responde solo con datos públicos verificados, y siempre te dice de dónde sale cada dato.
<break time="1.2s" />
Porque acá no se inventa nada. Cada dato cita su fuente oficial. Lo verificado se marca como verificado, y lo que todavía no es oficial, se marca como pendiente.
<break time="1.2s" />
Y lo que el municipio está obligado a publicar, pero todavía no publica, también se muestra. Hoy son cincuenta y nueve brechas de transparencia, cada una con su fundamento legal y el camino para pedir esa información.
<break time="1.2s" />
La plataforma se actualiza sola, todos los días. Podés descargar los datos en formatos abiertos, conectarlos a tus propias aplicaciones, o suscribirte para recibir alertas de cada nueva contratación.
<break time="1.2s" />
Sunchales Transparente es un proyecto cívico independiente y de código abierto, pensado para que cualquier otra ciudad lo pueda replicar.
<break time="1.2s" />
Porque la información pública es de todos. Entrá a ciudadan punto com. Explorá, preguntá, y compartilo.
```

## Escena por escena (qué se dice y qué se ve)

| # | Locución | En pantalla |
|---|---|---|
| 1 | ¿Sabés en qué se gasta cada peso público…? | Las preguntas aparecen en grande sobre verde institucional |
| 2 | Te presentamos Sunchales Transparente… | Logo, nombre y el sitio en una ventana de navegador |
| 3 | El presupuesto 2026… | Contador **$30,94 mil millones · VERIFICADO** + página de presupuesto |
| 4 | Licitaciones, cargos y remuneraciones… | Páginas de contrataciones y personal |
| 5 | Ordenanzas, decretos y Concejo… | Digesto y Concejo Municipal |
| 6 | Preguntale al asistente ciudadano… | Chat con la pregunta "¿Cuál es el presupuesto 2026?" y respuesta con fuente |
| 7 | Acá no se inventa nada… | Las reglas: trazabilidad, etiquetas VERIFICADO / PENDIENTE, privacidad |
| 8 | 59 brechas de transparencia… | Contador **59** y página de brechas |
| 9 | Se actualiza sola todos los días… | Actualización diaria, datos abiertos, API, alertas |
| 10 | Proyecto cívico independiente… | Código abierto (MIT), datos CC-BY-4.0, replicable |
| 11 | Entrá a ciudadan punto com… | Cierre con logo y **ciudadan.com** |

## Notas de pronunciación

- "ciudadan punto com" está escrito así a propósito, para que lo lea bien.
- Los números van en palabras ("dos mil veintiséis", "cincuenta y nueve")
  porque ElevenLabs a veces lee mal cifras como "$30,94 mil M".
- Si alguna palabra sale con acento neutro o mexicano, probá otra voz antes
  que tocar el texto: el guion está en voseo rioplatense.

## Cifras usadas (del sitio, 30/10/2026)

- Presupuesto 2026 — gastos: $30,94 mil millones (proyecto remitido al Concejo).
- Remuneraciones oficiales 2014–2026 (de ahí "más de diez años").
- 59 brechas de transparencia declaradas.
- Si alguna cifra cambia antes de publicar el video, actualizala en
  `guion.mjs` y en las escenas (`escenas/index.html`).

## Cuando tengas el audio

1. Dejá el MP3 de ElevenLabs en `video-presentacion/voz/` (cualquier nombre;
   si hay varios, usa el primero en orden alfabético).
2. Corré (tarda unos 8–10 minutos):

   ```bash
   node video-presentacion/herramientas/construir.mjs
   ```

3. El video final queda en `video-presentacion/salida/sunchales-transparente-presentacion.mp4`
   (con los subtítulos en `salida/subtitulos.srt`).

La sincronización ubica cada frase del guion en el audio usando las pausas
naturales y el largo de cada frase, así que funciona con o sin las etiquetas
`<break>`. Para ver dónde cayó cada frase sin renderizar todo:
`node video-presentacion/herramientas/construir.mjs --cuadros --frases`.

Si cambiás el texto del guion, editá `guion.mjs` (de ahí salen los dos .txt
y los subtítulos), generá el audio nuevo y volvé a correr el armado.
