# Investigación de fuentes oficiales — Sunchales

**Fecha:** 2026-05-09
**Alcance:** sunchales.gob.ar, concejosunchales.gob.ar, sunchales.miportal.ar, búsqueda lateral en prensa local y sitios institucionales provinciales.

Este documento es la base factual sobre qué información publica hoy el Estado municipal de Sunchales y qué información sigue siendo brecha confirmada, para alimentar el portal cívico Sunchales Transparente.

---

## 1. sunchales.gob.ar — Departamento Ejecutivo

Stack: WordPress + Kadence (migración 2025).

### Hub de transparencia
URL base: https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/

Lista 6 ítems: Remuneraciones de funcionarios, Presupuesto, Boletín Oficial, Nómina de Personal, Audiencias públicas, Licitaciones y contrataciones.

### Remuneraciones de funcionarios
- URL: https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/remuneraciones-de-funcionarios-municipales/
- Cobertura: mensual desde enero 2014 hasta MARZO 2026 (incluye SAC junio y diciembre).
- Formato: ~140 PDFs.
- Patrones de URL:
  - `/wp-content/uploads/{año}/{mes}/{NN}_remuneraciones_funcionarios_{mes}_{año}.pdf` (formato viejo)
  - `/wp-content/uploads/{año}/{mes}/{año}-{MM}-sueldos-funcionarios.pdf` (desde mediados 2025)
  - `/wp-content/uploads/2026/04/MARZO-2026.pdf` (formato más reciente)

### Presupuesto / ejecuciones
- URL: https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/presupuesto/
- Cobertura: mensual y acumulada 2018 → FEBRERO 2026.
- Formato: ~338 PDFs por reporte (Egresos por destino, Gasto total por objeto, Ejecución comprometido/devengado mensual, Recursos mes, Recursos acumulado, Cuenta Ahorro Inversión Financiamiento). Para 2025 desglosa por unidad: Intendencia, IMV, HCD, Secretaría de Gobierno, Subsec. Desarrollo, etc.

### Audiencias públicas
- URL: https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/audiencias-publicas/
- Solo 2 audiencias documentadas: 25/10/2022 (caso Caglieris c/ Municipalidad — basural) y 05/09/2019 (Complejo Ambiental).
- Brecha grave: no hay audiencias 2020, 2021, 2023, 2024, 2025, 2026.

### Licitaciones y contrataciones
- URL: https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/licitaciones-y-contrataciones/
- Cobertura: 2015 → Licitación Pública N° 04/2025 (Decreto 3537/2025, 261 luminarias NAOS 220W, presupuesto $56.714.843,25, apertura 04/12/2025).
- ~80 licitaciones detectadas. Distribución mínima por año: 2025 (4), 2024 (3), 2023 (8), 2022 (8), 2021 (9), 2020 (3), 2019 (10), 2018 (8).
- Decretos identificados: N° 3397/2024, 3411/2024, 3462/2025, 3467/2025, 3523/2025, 3537/2025.
- Formato: HTML + PDFs de pliegos (a veces .RAR).
- Limitación: NO publica adjudicaciones, oferentes ni montos finales contratados — sólo presupuestos oficiales y pliegos.

### Autoridades
- URL: https://sunchales.gob.ar/municipio/autoridades/
- Estructura completa con 14+ funcionarios identificados (6 secretarías + subsecretarías + direcciones + Agencia Municipal de Seguridad).
- Brecha visible: no publica DNI, fecha de designación, decreto de nombramiento, CV, ni DDJJ.

### Carta Orgánica
- Sin sección dedicada en sunchales.gob.ar.
- Única referencia oficial pública: discurso de apertura de Pinotti del 03/03/2026.
- Brecha confirmada: no hay cronograma, no hay comisión redactora designada, no hay ordenanza de convocatoria.

### Otras
- API REST WordPress: https://sunchales.gob.ar/wp-json/wp/v2/posts (noticias) y /wp-json/tribe/events/v1/ (eventos).
- Eventos con feed iCal: `?ical=1`.

---

## 2. concejosunchales.gob.ar — Concejo Municipal

Stack: ASP.NET Web Forms (formularios `__VIEWSTATE`).

### Concejales actuales (verbatim)
URL: https://concejosunchales.gob.ar/concejales-actuales.aspx

| Concejal | Cargo | Partido | Mandato | Email | Tel |
|---|---|---|---|---|---|
| Fernando Cattaneo | Presidente | Más para Santa Fe | 2025-2029 | fc2249@gmail.com | 03493-15418500 |
| Laura Balduino | Vicepresidenta 1ª | La Libertad Avanza | 2023-2027 | laura.balduino@hotmail.com | 03493-15415764 |
| Brenda Torriri | Vicepresidenta 2ª | Ahora Sunchales – Partido Socialista | 2023-2027 | brendatorririconcejal@gmail.com | 03493-15455600 |
| Juan Ignacio Astor | Concejal | Ahora Sunchales – Partido Socialista | 2023-2027 | juan.astor95@gmail.com | 03493-15495863 |
| José Delmastro | Concejal | Ahora Sunchales – Partido Socialista | 2025-2029 | josedelmastro41@gmail.com | 3493-416305 |
| Sebastián Nicolau | Concejal | La Libertad Avanza | 2025-2029 | sebastian.nicolau@gmail.com | 3493-401164 |

CV en PDF disponibles para Cattaneo, Balduino, Torriri y Astor. Delmastro y Nicolau con botón CV vacío.
Composición política: 3 Ahora Sunchales-PS / 2 LLA / 1 Más para Santa Fe.

### Personal del Concejo
- URL: https://concejosunchales.gob.ar/personal-del-concejo.aspx
- Lista solo 3 personas: Soledad Mendoza (Secretaria), Marina Mondino (Resp. Adm.), Micaela Bergesio (Resp. Comunicación).
- Brecha: según prensa hay 10 personas (3 empleadas + 1 contratado + 6 asesores). Faltan 7.

### Acceso a la Información Pública
- URL: https://concejosunchales.gob.ar/acceso-informacion-publica.aspx
- Funda en Ord. 1872/09, art. 75 CN, DDHH, CADH.
- Plazo: 10 días hábiles + 5 de prórroga.
- Formulario: https://concejosunchales.gob.ar/documentos/digesto/formularioacceso.pdf
- Texto Ord.: https://concejosunchales.gob.ar/documentos/digesto/O18722009.pdf

### Sesiones (Acta / Diario / Orden del día)
- URLs:
  - https://concejosunchales.gob.ar/orden-del-dia.aspx
  - https://concejosunchales.gob.ar/acta-de-sesiones.aspx
  - https://concejosunchales.gob.ar/diario-de-sesiones.aspx
- Hallazgo crítico: las 3 páginas exponen sólo un FORMULARIO ASP.NET de búsqueda por año/mes (combos 2010-2026). NO listan sesiones públicamente al cargar — requieren POST con `__VIEWSTATE` y `__EVENTVALIDATION`.
- Brecha: voto nominal NO se publica en HTML accesible directo.

### Boletín informativo bimestral
- URL: https://concejosunchales.gob.ar/boletin-informativo-bimestral.aspx
- Cobertura: marzo 2017 → ENERO 2026 (bimestres regulares).

### Resumen anual del Concejo
- URL: https://concejosunchales.gob.ar/resumen-anual.aspx
- 14 ediciones (2012-2025). Último: 20/03/26 "Resumen Anual 2025".

### Movimiento de saldos (Concejo)
- URL: https://concejosunchales.gob.ar/movimiento-de-saldos.aspx
- Cobertura: mensual 2017-2022 + cierres 2020/21/22.
- Brecha grave: NO publica 2023, 2024, 2025, 2026 (gap de 4 años). Asimetría notable con el Ejecutivo, que sí publica hasta febrero 2026.

### Ejecución partida presupuestaria (Concejo)
- URL: https://concejosunchales.gob.ar/ejecucion-partida-presupuestaria.aspx
- Cobertura: mensual desde enero 2014 hasta MARZO 2026 (~150 entradas).

### Valor de la UCM
- URL: https://concejosunchales.gob.ar/valor-de-la-ucm.aspx
- 30 ordenanzas hasta Ord. 3281/2026 y Ord. 3276/2026.

### Normativa local — DIGESTO COMPLETO DEL CONCEJO
- URL: https://concejosunchales.gob.ar/normativa-local.aspx
- Conteo verbatim (al 09/05/2026):
  - **5.309 normas totales** (Declaración 465 + Minuta 1.039 + Ordenanza 3.273 + Resolución 532).
  - Cobertura por año: 1973 → 2026, con curva creciente. Picos: 2022 (259), 2023 (258), 2021 (251), 2012 (249). 2025 = 191. 2026 = 30 al momento.
- Patrón de URL listado por año: `https://concejosunchales.gob.ar/normativa-local-resultados.aspx?anio=YYYY`
- Patrón de PDF de cada norma: `https://concejosunchales.gob.ar/documentos/digesto/digesto.NNNN.{tipo} NNNN YYYY.pdf` (ej: `O 3227 2025.pdf`, `R 884 2026.pdf`).

> Importante: el proyecto Sunchales Transparente tiene indexadas ~964 normas (período 2022-2026 + algunas previas). El universo real del digesto es 5.309 normas, lo que cambia la presentación. Lo no indexado es subset de lo no sincronizado en el portal nuevo del Ejecutivo (digesto.miportal.ar/digesto), no del Concejo.

### Agenda legislativa
- URL: https://concejosunchales.gob.ar/agenda-legislativa.aspx — iframe con Google Calendar embebido (concsunch@gmail.com, América/Argentina/Buenos_Aires).

### Otras secciones del Concejo
- /participacion-comision.aspx — Concejales en comisiones.
- /comisiones-vecinales.aspx
- /presupuesto-participativo.aspx
- /proyectos-estado-parlamentario.aspx + /proyectos-perdieron-estado-parlamentario.aspx
- /correspondencia-recibida.aspx + /notas-en-comision.aspx
- /registro-de-iniciativas-ciudadanas.aspx

---

## 3. sunchales.miportal.ar/digesto

- Stack: SPA Vite/React (Cloudflare). Sin SSR.
- HTML inicial es esqueleto vacío; todo el contenido se carga vía API tras hidratación JS.
- Implicancia: scraping requiere navegador headless (Puppeteer/Playwright) o ingeniería inversa de las llamadas a `/api/...`.
- El sitio del Concejo SÍ muestra los PDFs reales del digesto (`concejosunchales.gob.ar/documentos/digesto/...`); el "miportal" parece ser una capa visual sobre los mismos archivos.
- Otro portal hallado: https://sunchales.boletaweb.com.ar/login (E-Gobierno boletaweb, paga de boletas).

---

## 4. Portal del ciudadano / trámites online

- No existe dominio dedicado tipo `ciudadano.sunchales.gob.ar` ni `tramites.sunchales.gob.ar`.
- En el sitio nuevo: https://sunchales.gob.ar/gestion/sunchales-impulsa/tramites/ (mencionado en menú).
- `sunchales.miportal.ar` funciona como portal "E-Gobierno" pero requiere login.
- Brecha: no hay datos abiertos sobre cuenta corriente del vecino accesibles sin autenticación.

---

## 5. Juzgado de Faltas

- Sin sitio dedicado. No existe `juzgadofaltas.sunchales.gob.ar`.
- No publica: estadísticas de actas, recaudación por multas, convenio APSV, régimen de faltas/catálogo, ordenanza orgánica.
- Brecha confirmada en su totalidad.
- Nota PDF histórica: https://www.concejosunchales.gob.ar/Archivos/Link/link.2111.Nota%20de%20la%20Jueza%20de%20Faltas%20sobre%20resolución%20de%20multa%20a%20Liu%20Yigang.pdf

---

## 6. Otros sitios institucionales

### Legislaturas Conectadas (Honorable.ar)
- URL: https://www.legislaturasconectadas.gob.ar/Legislatura/164/Honorable-Concejo-Municipal-de-Sunchales
- Agregador nacional de Concejos. Lista noticias y autoridades. Útil como fuente secundaria.

### Tribunal de Cuentas Provincia de Santa Fe
- No verificado. Recomendado: scraping de auditorías de Sunchales si publica online.

---

## 7. Diarios y prensa local con cobertura institucional

- meridianodigital.com.ar (Grupo Meridiano) — fuente verbatim para datos de presupuesto/sesiones.
- sunchaleshoy.com.ar
- elecodesunchales.com.ar
- movilquique.com
- radiorafaela.com.ar/sunchales/

### Citas verbatim apertura Sesiones 2026 (03/03/2026)
- "Fondo 2026 del Programa de Obras Urbanas (POU) ... inversión cercana a los 1.000 millones de pesos destinada a pavimento urbano"
- "plan de iluminación LED ... ya alcanzó el 50% de recambio"
- "cerrar definitivamente el basural a cielo abierto en 2027"
- "videovigilancia urbana incrementó un 90% la cantidad de cámaras operativas"
- "envío al Concejo del proyecto para crear el Fondo de Inversión y Desarrollo, destinado a saldar deudas históricas en obras públicas"
- "iniciativa para avanzar hacia la redacción de una Carta Orgánica propia, con el objetivo de alcanzar la autonomía municipal"

### Cifras presupuesto 2026 (verbatim Meridiano Digital, 18/11/2025)
- Gastos corrientes y de capital: $30.938.107.965
- Recursos corrientes proyectados: $30.950.227.077
- Planta: 279 permanentes (9 retiro especial), 83 temporales, 130 prestadores, 18 funcionarios DE, 6 concejales + 3 empleadas Secretaría Concejo + 1 contratado + 6 asesores. Total: **526 trabajadores**.

---

## 8. Brechas confirmadas (no publicadas en NINGÚN canal oficial verificado)

1. Voto nominal de concejales: páginas Acta/Diario/Orden son sólo formularios ASP.NET; sin listado abierto.
2. Declaraciones juradas patrimoniales (DDJJ) de funcionarios e intendente: no existe sección DDJJ.
3. Cronograma de Carta Orgánica / comisión redactora / ordenanza de convocatoria: sólo declaración política en discurso 03/03/2026.
4. Boletín Oficial Municipal con decretos del intendente: ítem listado en hub Transparencia pero sin URL accesible directa.
5. Estadísticas Juzgado de Faltas: no publicadas; sin sitio dedicado.
6. Convenio APSV / régimen de faltas / ordenanza orgánica del Juzgado: no publicado online.
7. Adjudicaciones reales de licitaciones: el sitio publica pliegos+presupuesto oficial, no resultado de adjudicación.
8. Texto completo Ordenanza Presupuesto 2026 + anexo de partidas: cifras agregadas sí (vía prensa); ordenanza completa no encontrada en /presupuesto/.
9. Movimiento de saldos del Concejo 2023-2026: sólo cubre hasta cierre 2022; gap de 4 años.
10. Datos abiertos / API REST estructurada: inexistente; todo es PDF.
11. Audiencias públicas 2020-2026: sólo 2 audiencias documentadas (2019 y 2022).
12. Asesores y contratados del Concejo identificados: sitio lista 3 personas; según prensa hay 10.
13. CV de 2 concejales (Delmastro, Nicolau): botones CV vacíos.
14. Información del Juzgado de Faltas en sitio oficial: ningún dato online.
15. Cuenta corriente del vecino / portal del ciudadano abierto sin login.
16. Trámites Online — directorio público.
17. Texto consolidado de normativa con modificatorias.

---

## 9. Vías de consumo programático recomendadas

| Fuente | Estrategia |
|---|---|
| sunchales.gob.ar (WordPress) | REST API: /wp-json/wp/v2/posts, /wp-json/tribe/events/v1/. PDFs por scraping de listados HTML. |
| Licitaciones | Scraping HTML del listado + regex `Licitación Pública N° XX/AAAA` + montos; parseo de pliegos PDF. |
| Remuneraciones | Listado de PDFs por convención de nombre. |
| Presupuesto/Ejecución | Scraping del índice mensual + descarga PDFs por categoría. Parseo PDF a CSV. |
| Concejo — normativa local | Iterar `?anio=YYYY` para cada año (1973-2026). Descarga directa de PDFs por patrón. |
| Concejo — sesiones | Replicar POST ASP.NET con `__VIEWSTATE` (alta complejidad). Mejor consumir Resúmenes Anuales y Boletines Bimestrales. |
| Resumen anual y Boletín bimestral | Scraping HTML + descarga PDFs. Cobertura completa. |
| Agenda legislativa | Google Calendar — verificar feed iCal público. |
| sunchales.miportal.ar | Navegador headless + ingeniería inversa de la API. |

---

## 10. Confiabilidad

- Datos de concejales, autoridades, licitaciones, normativa, remuneraciones, ejecuciones, resúmenes anuales y boletines bimestrales: verbatim de fuentes oficiales accesibles.
- Datos del Juzgado de Faltas (dirección, mails, horario): provienen de búsquedas web, no confirmados en página oficial actual.
- Cifras del Presupuesto 2026 ($30.938.107.965): citadas por meridianodigital.com.ar (18/11/2025) basándose en proyecto del DEM. El texto original de la ordenanza aprobada no fue ubicado.
- Sitio antiguo Drupal de sunchales.gob.ar fue reemplazado por WordPress en 2025; cualquier link viejo `?q=...` redirige al inicio.
