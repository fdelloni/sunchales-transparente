# AUDITORÍA EXHAUSTIVA DE TRANSPARENCIA — sunchales.gob.ar

**Fecha:** 12 de mayo de 2026
**Auditor:** Sunchales Transparente — coordinado por Franco Delloni con asistencia de IA
**Stack del sitio auditado:** WordPress 6.9.4 (motor principal) + Drupal legacy (subsistente) + plataforma externa `miportal.ar` (digesto/pagos) + Munidigital (reclamos)
**Marco normativo de referencia:**
- Ordenanza Sunchales Nº 1872/2009 (acceso a información pública municipal)
- Decreto Provincial Santa Fe Nº 0692/2009 (acceso a información pública en el ámbito provincial)
- Constitución Nacional Argentina
- Convención Americana sobre Derechos Humanos (CADH), art. 13

**Lo que NO se cita y por qué:** Ley 27.275 (es de Poder Ejecutivo Nacional, no aplica al municipio); "Ord. 2561/2016" y "Ley 13.241" descartadas como alucinaciones en auditorías previas — no existen con ese número/contenido.

---

## ÍNDICE

1. Resumen ejecutivo
2. Metodología y limitaciones
3. Árbol completo del sitio mapeado
4. Sección por sección — qué publica, qué no
5. Brechas críticas priorizadas
6. Inconsistencias internas y errores técnicos detectados
7. Mapeo cruzado vs. Ord. 1872/2009
8. Hallazgos institucionales que corrigen información previa
9. Recomendaciones operativas para el sitio Sunchales Transparente
10. Anexo — URLs verificadas

---

## 1. RESUMEN EJECUTIVO

El sitio `sunchales.gob.ar` tiene una superficie informativa razonable a nivel formal (existen secciones de Autoridades, Municipio Transparente, Trámites, Boletín, Digesto), pero al revisar el contenido **sección por sección** aparecen brechas estructurales en la información de oficio que la Ord. 1872/2009 manda publicar. Las brechas más graves detectadas son:

1. **El Presupuesto 2026 sancionado** ($30.938 millones aprobados por el Concejo el 22-dic-2025) **no está publicado** en `/municipio-transparente/presupuesto/`. Tampoco lo están los presupuestos 2024 ni 2025. Sólo hay ejecuciones mensuales.
2. **Ninguna licitación de 2026** publicada al 12-may-2026 (4,5 meses sin actividad licitatoria visible).
3. **Las adjudicaciones nunca se publican** para ningún proceso 2019-2025: no se exponen actas de apertura, dictámenes, decretos de adjudicación, contratos firmados ni montos finales.
4. **No existen Declaraciones Juradas Patrimoniales** publicadas de ningún funcionario, ni del Ejecutivo ni del Concejo.
5. **Las remuneraciones publicadas se limitan a "funcionarios"** (categoría limitada): no hay nómina nominal consolidada con cargo, función, dependencia y salario para todo el personal.
6. **La Nómina de Personal tiene sólo 5 archivos en toda la historia** del sitio (no-permanente, parcial, mezclada con planta).
7. **Las Audiencias Públicas municipales** terminan en 2019. Siete años sin convocatorias del municipio.
8. **El Boletín Oficial Municipal** aparenta no actualizarse desde abril de 2025 (≈13 meses). Convive además fragmentado en tres puntos de acceso (`sunchales.gob.ar`, subdominio `boletinoficial.sunchales.gob.ar` legacy y `miportal.ar`).
9. **No hay formulario público de solicitud de información Ord. 1872/2009**, ni responsable de acceso identificado, ni plazos declarados, ni informe anual.
10. **El sitio del Concejo Municipal no aparece linkeado** desde el menú de `sunchales.gob.ar`. Y la página propia del Concejo `/concejales-actuales.aspx` aparenta no reflejar la jura del 3-mar-2026.

Además de las brechas de contenido, el sitio presenta inconsistencias técnicas que erosionan la fiabilidad: links rotos, archivos duplicados (Planos 3-9 de licitación que apuntan al mismo PDF), rotulación falsa de años (12 PDFs de remuneraciones rotulados "2017" que apuntan a archivos 2018), página de "Mapa interactivo" vacía, cronograma de farmacias de turno que no llega al mes en curso, JPGs en lugar de PDF/HTML buscable, slugs erróneos, y coexistencia de tres tecnologías (Drupal viejo + WordPress + plataformas externas) sin redirecciones.

**Conclusión:** la Municipalidad de Sunchales cumple el principio de **existencia** de secciones de transparencia, pero falla sistemáticamente en el principio de **completitud, vigencia y trazabilidad**. El sitio Sunchales Transparente puede declarar estas brechas con fundamento normativo verificable y CTA al ciudadano (formulario de pedido de informe Ord. 1872/2009, Defensoría del Pueblo de Santa Fe).

---

## 2. METODOLOGÍA Y LIMITACIONES

Esta auditoría se construyó así:
- Recorrido en paralelo por sub-agentes de IA con `web_fetch` directo sobre `sunchales.gob.ar` y URLs derivadas del HTML servido.
- 6 sub-agentes especializados en: (a) Municipio/Autoridades, (b) Municipio Transparente + Licitaciones, (c) Gestión y pilares Vive/Impulsa/Crece/Protege, (d) Trámites y Ciudad, (e) Noticias y portales temáticos, (f) Concejo Municipal y Digesto.
- Verificación cruzada con búsquedas web en fuentes periodísticas locales (Meridiano Digital, SunchalesHoy, Diario Castellanos, El Eco de Sunchales) para confirmar hechos como el monto del Presupuesto 2026 sancionado.

**Limitaciones explícitas:**
- El `web_fetch` del entorno tiene una whitelist de provenance: algunas URLs externas (Munidigital, miportal.ar, redes sociales) no pudieron abrirse directamente y se reportaron como "no verificable in situ".
- Los datos del Concejo Municipal se reconstruyeron en parte desde snippets indexados por buscadores cuando el `web_fetch` rechazó las URLs `.aspx`. Esas afirmaciones quedan marcadas como "a verificar manualmente".
- La auditoría cubre las páginas estructurales del sitio, no las ≈180 noticias individuales del archivo (sí se relevaron las últimas 30).

---

## 3. ÁRBOL COMPLETO DEL SITIO MAPEADO

Menú superior (header) y submenús de `sunchales.gob.ar`:

**Ciudad**
- Ubicación
- Mapa interactivo (página vacía — sólo título)
- Turismo → Hospedaje, Gastronomía, Patrimonio Cultural, Capital del Cooperativismo, Capital del Fútbol Infantil, Circuitos
- Agenda de eventos (`/eventos/`, motor The Events Calendar)
- Símbolos
- Estación meteorológica
- Farmacias de turno
- Teléfonos útiles

**Municipio**
- Autoridades (19 funcionarios listados, 13 con ficha individual y 6 sin ficha)
- Secretarías (6 secretarías/áreas)
- Organigrama (sólo imagen JPG + PDF)

**Gestión** (4 pilares con nombre de marketing)
- Sunchales Vive (cultura, patrimonio, turismo, vecinales)
- Sunchales Impulsa (administración transparente, participación, personal, educación, ESS)
- Sunchales Crece (obras públicas, espacios urbanos, productivo)
- Sunchales Protege (seguridad, movilidad, cuidados, salud, ambiente, vivienda)

**Trámites** → 17 trámites listados en 9 rubros

**Municipio Transparente** → Remuneraciones, Presupuesto, Boletín Oficial (link externo), Nómina, Audiencias Públicas, Licitaciones

**Noticias** → 15 páginas de archivo, ≈180 entradas totales

**Links de la home (no en menú superior):**
- Consultas y reclamos → Munidigital (externo)
- Recolección de residuos (4 imágenes JPG)
- Ambiente (página con sólo 3 botones)
- Movilidad segura
- Licitaciones y contrataciones (alias)
- Concursos y selección de personal (huérfana del menú)

**Footer:** Av. Belgrano 103, tel. (03493) 425500, comunicacion@sunchales.gov.ar, Facebook, Instagram, YouTube.

**Lo que NO aparece linkeado en ninguna parte del sitio:**
- Concejo Municipal de Sunchales (existe `/hcd` y dominio independiente `concejosunchales.gob.ar`)
- Datos abiertos (existe dataset `sun-sfe-datos.paisdigital.modernizacion.gob.ar` pero no se enlaza)
- Twitter/X, LinkedIn, TikTok, WhatsApp oficial

---

## 4. SECCIÓN POR SECCIÓN

### 4.1 Municipio / Autoridades / Secretarías / Organigrama

**Lo que publica:**
- **Autoridades:** 19 funcionarios con nombre, apellido, cargo y área. 13 tienen ficha individual con CV (formación, trayectoria, capacitaciones, congresos), retrato y mail institucional. Pinotti, Ochat y los demás secretarios tienen CV razonablemente sustantivo.
- **Secretarías:** 6 áreas (Gobierno, Producción y Empleo, Gestión Ambiental y Territorial, Desarrollo Humano, Hacienda y Finanzas, Agencia Municipal de Seguridad). Cada ficha de secretaría describe objeto y funciones.
- **Organigrama:** una imagen JPG + un PDF descargable (`organigrama-2526-horizontal.pdf`).

**Lo que falta:**
- DDJJ patrimoniales de Pinotti y de los 18 funcionarios — **no publicado para ninguno**.
- Remuneraciones por cargo dentro de las fichas — no las cruza con `/municipio-transparente/remuneraciones-de-funcionarios-municipales/`.
- 6 funcionarios sin ficha individual: Marti, Bovo, Sánchez, Gorosito, Kemmerer, Moyano. No hay CV ni datos de contacto granular.
- Organigrama no navegable (solo imagen + PDF; no es accesible para lectores de pantalla, no permite click por cargo).
- No se cita decreto/ordenanza de aprobación del organigrama ni fecha formal.
- Slug erróneo persistente: `/secretaria-de-produccion-y-finanzas/` cuando la secretaría se llama "Producción y Empleo".
- **Inconsistencia interna oficial:** José Galli figura como "Subsecretario de Cultura y Educación" en Autoridades, pero como "Subsecretaría de Cultura" (sin Educación) en el Organigrama PDF.
- Ninguna de las 4 páginas (Municipio, Autoridades, Secretarías, Organigrama) muestra fecha de última actualización ni responsable de publicación.
- Ninguna cita la Ord. 1872/2009 como fundamento.

### 4.2 Municipio Transparente

Esta es la sección **más importante** para el proyecto y donde se concentran las peores brechas.

**Página índice (`/gestion/sunchales-impulsa/municipio-transparente/`):** sólo 6 enlaces, sin texto explicativo, sin contacto del responsable de acceso a la información, sin formulario de solicitud, sin mención de la Ord. 1872/2009 ni del plazo de respuesta. Los 6 enlaces apuntan a Remuneraciones, Presupuesto, Boletín, Nómina, Audiencias Públicas, Licitaciones.

**Remuneraciones de funcionarios municipales:**
- Cobertura: 2014 a 2026 (enero, febrero y marzo 2026 disponibles; abril 2026 NO).
- Anomalías:
  - **Los 12 meses rotulados "2017" apuntan en realidad a archivos `_2018.pdf`**: rotulación falsa o error de carga sistemático.
  - **Enero 2020 figura sin link** (texto huérfano).
  - Mayo a octubre 2020 en formato **JPG**, no PDF.
  - Noviembre 2020 en JPEG.
- No publica nómina nominal con cargo/función/dependencia para personal no funcionario.
- No publica SAC, descuentos, aportes ni adicionales.
- No hay CSV/XLS estructurado.

**Presupuesto:**
- Ejecuciones mensuales sí: 2026 hasta abril, 2025 completo, 2024, 2023, 2022.
- **El texto del Presupuesto sancionado**: para 2022 y 2023 sí está. **Para 2024, 2025 y 2026 NO está publicado el PDF de la ordenanza presupuestaria.** El Concejo aprobó el Presupuesto 2026 por $30.938.107.965 (gastos) y $30.950.227.077 (recursos) el 22-dic-2025 según cobertura periodística; el documento no está en `/municipio-transparente/presupuesto/`.
- Para junio-septiembre 2025 hay desagregación por jurisdicción (Secretarías, IMV, HCD); a partir de octubre 2025 esa desagregación **desaparece**.
- No hay CSV/JSON/XLS — todo es PDF.
- Links rotos detectados: en abril 2026 "Egreso mensual base ejecutado" y "Egreso mensual base devengado por fecha de comprobante" apuntan al mismo archivo. En febrero 2026 "Gasto total por objeto." figura sin link.

**Boletín Oficial:**
- El menú redirige fuera del dominio principal a `https://sunchales.miportal.ar/digesto` (operador externo, sin previo aviso al ciudadano).
- Existen URLs Drupal viejas paralelas que no se redirigen: `/boletines-oficiales`, `/content/contenido-boletin-oficial`.
- Subdominio independiente: `boletinoficial.sunchales.gob.ar/archive-filter/YYYY-MM`.
- Dataset en portal nacional: `sun-sfe-datos.paisdigital.modernizacion.gob.ar/dataset/boletin-oficial-municipal-de-la-ciudad-de-sunchales`.
- **Último BO confirmado vía buscador y URL directa: abril de 2025** (subido en junio 2025). A 12-may-2026 son potencialmente **13 meses sin BO regular**. **Verificación manual urgente requerida.**

**Nómina de Personal:**
- Slug: `/municipio-transparente/nomina-de-personal-no-permanente/`.
- **Sólo 5 archivos en toda la historia del sitio**: Abril 2026, Agosto 2025, Enero 2025, Octubre 2024, Agosto 2024.
- El archivo de Abril 2026 mezcla personal de planta con no-permanente sin claridad del alcance.
- No se publican datos por empleado de cargo, función, dependencia, tipo de vínculo, fecha de ingreso ni remuneración (sólo nombre+DNI+resolución+puesto según muestra encontrada).

**Audiencias Públicas:**
- Sólo 2 audiencias listadas: una de 2019 (Proyecto Complejo Ambiental) y una de 2022 ordenada judicialmente (no convocada por el municipio).
- **Cero audiencias municipales desde 2019**. Pinotti asumió en dic-2023 y no figura ninguna en su gestión.
- No hay reglamento general de audiencias accesible.

**Licitaciones y contrataciones:**
- **Cero licitaciones 2026 al 12-may-2026.**
- 2025: 4 procesos (LP 01 GIRSU, LP 01 jardín — duplicidad de numeración —, LP 02, LP 03, LP 04).
- 2024: 3 procesos (LP 01 luminarias, LP 02 motor Cummins, LP 03 seguridad privada).
- 2023, 2022, años anteriores: varios.
- **No se publican adjudicaciones de ningún proceso 2019-2025:** no hay actas de apertura, cuadros de ofertas, dictámenes de comisión evaluadora, decretos de adjudicación, contratos firmados ni montos finales.
- **No se publican Compras Directas ni Concursos de Precios** (procesos bajo el monto de licitación).
- Bug crítico: en LP 01/2025 GIRSU, los Planos N° 3 a N° 9 apuntan todos al mismo archivo `PLANO-1.pdf`. Solo PLANO-1 y PLANO-2 son únicos.

**Concursos y selección de personal (página huérfana del menú de transparencia):**
- 3 concursos abiertos al 12-may-2026 (cierre 19-may-2026): Subdirector Asesoría Legal, Asesor Normativas, Auxiliar de Compras.
- 1 concurso "en proceso" con plazo vencido el 10-abr-2026 (Ingeniero Agrónomo) sin novedades ni acta.
- 7 concursos "finalizados" listados solo con su decreto de llamado: **no se publican postulantes, jurado, dictamen, orden de mérito ni persona designada**.
- Declaración del propio sitio: "en julio de 2024 se presentó al Concejo un proyecto de ordenanza que propone el establecimiento de un régimen de concursos. A pesar de que aún no se ha convertido en ordenanza..." — el régimen sigue funcionando sin marco normativo sancionado, casi dos años después.

### 4.3 Gestión (Vive / Impulsa / Crece / Protege)

**Patrón sistémico:** texto declarativo + bullets, muchos en negrita pero **sin link** — significan "anunciado, no publicado".

**Sunchales Vive:** ≈15 plazas/parques nombrados sin link individual; Oficina de Turismo en "próxima apertura" sin fecha.

**Sunchales Impulsa:** dos rubros centrales para transparencia con texto plano sin link: **Informes de Auditoría** y **Registro de Proveedores**.

**Sunchales Crece (peor cobertura informativa relativa):** todas las obras públicas (anegamientos, cloacas, cordones cuneta, pavimentación, terminal de ómnibus, accesibilidad, microcréditos) figuran como viñetas sin link, sin monto, sin plazo, sin estado.

**Sunchales Protege:** ítems sin link de los más graves para el ciudadano: **Centro de Emergencia y Monitoreo**, **Guardia Vial**, **Centros de salud** (ni siquiera el listado con dirección/horario).

**Datos cuantitativos en toda la sección Gestión:** prácticamente cero. El único monto preciso encontrado es el ANR provincial del Plan de Iluminación: **$405.828.700,04** (1° etapa: 515 luminarias colocadas; 2° etapa: 500 nuevas en ejecución). No hay tablero de obras, no hay indicadores con línea de base.

**Observatorios sin publicar lo que producen:**
- Observatorio de Seguridad y Siniestralidad Vial (creado 2015): "10 años de vida ininterrumpida" — **ningún informe anual publicado**.
- Observatorio Municipal de Violencias y Seguridad Democrática (Ord. 2576/2016): emite informes mensuales — **ninguno publicado**.

**Ambiente:** la página `/ambiente/` tiene sólo 3 botones (Complejo Ambiental, Arbolado, EcoEstación). El Complejo Ambiental sí publica varios PDFs normativos (convenios, decretos, factibilidad hídrica). Arbolado cita ordenanzas (2270/2013, 2420/2014) pero no publica inventario ni datos. EcoEstación es alianza con empresa privada Reaquila + Sancor Seguros + CIPE; ningún indicador cuantitativo publicado.

**Recolección de residuos:** **4 imágenes JPG con mapas de sectores**, sin tabla HTML del calendario por sector. Día y horario embebidos en imagen, no accesible.

### 4.4 Trámites y Ciudad

**Trámites:** 17 trámites en 9 rubros. Profundidad variable. Habilitación comercial tiene ficha sustantiva (normativa, documentación, formularios `.docx` descargables). Catastro y Licencias de conducir más austeros. **No publican costos en pesos** (sólo UCM en algunos, sin definir el valor de la UCM); **no publican plazos / tiempos estimados**; iniciar trámite depende de proveedores externos (Munidigital, MiPortal, turnos.santafe.gov.ar). **No hay ficha de "Solicitud de acceso a la información pública" prevista en Ord. 1872/2009.**

**Ciudad (subsecciones):**
- **Mapa interactivo:** página vacía. Solo el título. **Sin mapa, sin capas, sin iframe.** Engañosa.
- **Ubicación:** coordenadas, accesos, plano PDF. **No publica población** (último dato censal), superficie del ejido, ni link al IPEC/INDEC.
- **Estación meteorológica:** 4 fotos, descripción institucional. **NO publica datos meteorológicos en tiempo real ni históricos**, pese a operar 24/7 e integrar la red del SMN.
- **Farmacias de turno:** cronograma sólo hasta **abril 2026** (4 PNGs). **No publican mayo 2026** (mes en curso). El ciudadano no puede saber qué farmacia está de turno hoy. Además, formato imagen, no texto accesible.
- **Teléfonos útiles:** 18 entradas, sin WhatsApp oficial, sin emails, sin teléfonos de secretarías internas, sin defensoría del vecino.
- **Símbolos:** descripción heráldica completa de bandera, escudo y marcha — **pero no se publica ordenanza/decreto que los aprueba** ni archivos vectoriales descargables (PDF/SVG/PNG en alta).

### 4.5 Noticias

- Última noticia al 12-may-2026: 08-may-2026 (hace 4 días). Razonablemente al día.
- **Pero cadencia 2026 muy baja:** sólo 6 noticias entre 30-ene y 08-may (≈1,2 por mes). Brecha total del 22-dic-2025 al 30-ene-2026 (39 días sin noticias).
- **No hay categorías navegables**, no hay filtros por área (Obras, Salud, Eventos, Gobierno), no hay archivo cronológico, no hay RSS visible. Sólo paginación lineal 1-15.
- Las redes sociales linkeadas son Facebook, Instagram y YouTube. **No hay WhatsApp oficial linkeado**, **no hay X/Twitter**, **no hay LinkedIn**, **no hay TikTok**.

### 4.6 Concejo Municipal de Sunchales (sitio independiente `concejosunchales.gob.ar`)

**Corrección institucional importante:** en Santa Fe (Ley Orgánica 2756) los municipios de 2ª categoría tienen **Concejo Municipal**, no Concejo Deliberante. El cuerpo se llama **"Honorable Concejo Municipal de Sunchales"** (HCM). **Tiene 6 concejales, no 10** — corrección sobre supuesto previo del proyecto.

**Composición a mayo 2026 (reconstruida desde buscadores, requiere verificación in situ):**
- Mandato 2025-2029 (juraron 03-mar-2026): José Delmastro (Ahora Sunchales/PS), Sebastián Nicolau (LLA), Fernando Cattaneo (Más para Santa Fe/PJ).
- Mandato 2023-2027 (continúan): Juan Ignacio Astor (Ahora Sunchales/PS), Brenda Torriri (Ahora Sunchales/PS), Laura Balduino (LLA, originalmente Unidos).
- Cesaron en marzo 2026: Carolina Giusti, Santiago Dobler, Pablo Ghiano.

**Lo que publica el sitio del Concejo:**
- Actas de sesiones en PDF (numeradas, hay actas hasta Nº 1696, ya de 2026).
- Proyectos de ordenanza por número de expediente y autor.
- Ordenanzas sancionadas (digesto) desde 1981 al menos hasta 3242/2025 — más de 40 años de profundidad histórica.
- Boletín informativo bimestral del Concejo (formato divulgativo).
- Sección de normativa ambiental, normativa con perspectiva de género, concejales actuales y anteriores.

**Brechas del Concejo:**
- `/concejales-actuales.aspx` **aparenta no reflejar la jura del 3-mar-2026** (Giusti, Dobler y Ghiano siguen indexados como actuales según snippets de Google). A confirmar visualmente.
- **No se publican dietas/sueldos de concejales** — sección ausente.
- **No se publican DDJJ patrimoniales** de concejales.
- **No se publica calendario de sesiones** ni orden del día previo.
- **No hay banca ciudadana / banca abierta** documentada.
- **No hay transmisión en vivo** ni archivo audiovisual de sesiones.
- **El sitio del Concejo NO está linkeado** desde el menú principal de `sunchales.gob.ar`.
- Coexisten dos rutas para el digesto histórico: `/documentos/digesto/` y `/documentos/Digesto/` (case-sensitive bug).
- Tecnología `.aspx` antigua, sin API REST ni OpenData del Concejo.

### 4.7 Digesto Municipal — fragmentación

Existen **dos digestos paralelos**:
1. **Concejo:** `concejosunchales.gob.ar/normativa-local-resultados.aspx?tipo=2`. Mantiene buscador por tipo de norma.
2. **Ejecutivo:** `sunchales.miportal.ar/digesto`. Plataforma externa.

Ni uno ni otro publica "texto consolidado vigente" sistemáticamente (algunas ordenanzas tienen prefijo `T.A.` por Texto Actualizado, pero no es regla).

---

## 5. BRECHAS CRÍTICAS PRIORIZADAS

| # | Brecha | Severidad | Norma incumplida | Acción para Sunchales Transparente |
|---|---|---|---|---|
| 1 | Presupuesto 2026 sancionado ($30.938 M) no publicado en sitio oficial | **CRÍTICA** | Ord. 1872/2009 (info de oficio) | Mostrar dato + CTA "exigir publicación" |
| 2 | Ninguna licitación 2026 publicada al 12-may | **CRÍTICA** | Ord. 1872/2009 art. licitaciones | Contador "días sin publicación" |
| 3 | Adjudicaciones nunca publicadas (2019-2025) | **CRÍTICA** | Ord. 1872/2009 | Listar procesos sin adjudicación visible |
| 4 | Boletín Oficial sin actualizar desde abr-2025 (a verificar) | **CRÍTICA si se confirma** | Decreto SF 0692/2009 (periodicidad) | Verificar manualmente y declarar |
| 5 | DDJJ patrimoniales no publicadas para Pinotti ni para 18 funcionarios ni para 6 concejales | ALTA | Ord. 1872/2009 | Lista nominal de funcionarios con DDJJ ausente |
| 6 | Nómina de Personal: sólo 5 archivos en toda la historia | ALTA | Ord. 1872/2009 (personal) | Mostrar timeline de meses ausentes |
| 7 | Remuneraciones 2017: 12 PDFs rotulados "2017" apuntan a archivos 2018 | ALTA | Veracidad y trazabilidad | Capturar evidencia |
| 8 | Audiencias públicas municipales: 0 desde 2019 | ALTA | Ord. 1872/2009 + CADH art. 13 | Contador "años sin audiencia" |
| 9 | No hay formulario público de solicitud de info Ord. 1872/2009 | ALTA | Ord. 1872/2009 (procedimiento) | Implementar formulario en Sunchales Transparente |
| 10 | Concursos finalizados sin resultados publicados (postulantes, jurado, dictamen, ganador) | ALTA | Ord. 1872/2009 + buena administración | Listar concursos sin resolución visible |
| 11 | Concejo Municipal: dietas y DDJJ de concejales no publicadas | ALTA | Ord. 1872/2009 + Decreto SF 0692/2009 | Brecha visible con CTA |
| 12 | `/concejales-actuales.aspx` aparenta desactualizada post-jura 03-mar-2026 | ALTA | Ord. 1872/2009 (vigencia) | Verificar y declarar |
| 13 | Concejo Municipal no linkeado desde sunchales.gob.ar | MEDIA | Buena práctica institucional | Recomendar enlace |
| 14 | Informes de Auditoría: anunciados como ítem en Sunchales Impulsa, sin link | MEDIA-ALTA | Control interno y publicidad | Declarar |
| 15 | Registro de Proveedores: anunciado sin link | MEDIA-ALTA | Compras públicas | Declarar |
| 16 | Informes anuales del Observatorio Vial (2015-2025) no publicados | MEDIA | Buena práctica | 10 años de informes invisibles |
| 17 | Informes mensuales del OMVSD (Ord. 2576/2016) no publicados | MEDIA | Ord. específica que lo crea | Declarar |
| 18 | Datos abiertos: existe dataset `sun-sfe-datos.paisdigital` no enlazado | MEDIA | Buena práctica | Recomendar enlace |
| 19 | "Mapa interactivo" página vacía sin mapa | MEDIA | Veracidad de la denominación | Captura de pantalla |
| 20 | Farmacias de turno: cronograma sin mayo 2026 (mes en curso) | MEDIA | Servicio sanitario | Declarar |
| 21 | Estación meteorológica sin datos en tiempo real ni históricos | MEDIA | Buena práctica con activo público | Declarar |
| 22 | "Centros de salud" anunciados sin link | MEDIA | Información sanitaria básica | Declarar |
| 23 | Recolección de residuos en JPG, no texto accesible | MEDIA | WCAG / accesibilidad | Declarar |
| 24 | Ninguna página muestra fecha de última actualización ni responsable | MEDIA | Trazabilidad | Recomendar |
| 25 | Obras públicas sin tablero (monto, plazo, contratista, % avance) | MEDIA-ALTA | Ord. 1872/2009 obras y contratos | Implementar tablero |

---

## 6. INCONSISTENCIAS INTERNAS Y ERRORES TÉCNICOS DETECTADOS

1. **José Galli** figura con dos cargos distintos: "Subsecretario de Cultura y Educación" en Autoridades vs. "Subsecretaría de Cultura" en Organigrama PDF.
2. **Slug erróneo:** `/secretaria-de-produccion-y-finanzas/` para una secretaría que se llama "Producción y Empleo".
3. **Remuneraciones 2017:** los 12 links apuntan a archivos `_2018.pdf`.
4. **Remuneraciones enero 2020:** texto sin link (huérfano).
5. **Remuneraciones mayo-octubre 2020:** JPG, no PDF buscable. Noviembre 2020: JPEG.
6. **Licitación 01/2025 GIRSU:** planos 3, 4, 5, 6, 7, 8 y 9 apuntan al mismo `PLANO-1.pdf`.
7. **Presupuesto abril 2026:** "Egreso mensual base ejecutado" y "Egreso mensual base devengado" apuntan al mismo PDF.
8. **Presupuesto febrero 2026:** "Gasto total por objeto." figura sin link.
9. **Doble "Licitación Pública N° 01/2025"** (GIRSU y juegos jardín).
10. **Convivencia de tres tecnologías sin redirección:**
    - WordPress nuevo: `sunchales.gob.ar/wp-content/uploads/...`
    - Drupal viejo: `sunchales.gob.ar/sites/default/files/...`, `/boletines-oficiales`, `/content/...`, `/presupuesto` (legacy)
    - Plataformas externas: `sunchales.miportal.ar`, `munidigital.com`, `boletinoficial.sunchales.gob.ar`
11. **Concejo Municipal:** doble carpeta `/documentos/digesto/` y `/documentos/Digesto/` (case-sensitive).
12. **Página índice `/ciudad/`** omite "Farmacias de turno" que sí está en el header.
13. **Concursos y selección de personal:** huérfana del menú Municipio Transparente.
14. **Hospital "Almícar Gorosito" en /ciudad/telefonos-utiles/** — la grafía oficial es "Almilcar". A confirmar cuál corresponde.
15. **Ningún PDF de ejecuciones presupuestarias en CSV/XLS/JSON** pese a que la base es RAFAM (sistema con datos estructurados).

---

## 7. MAPEO CRUZADO vs. ORD. 1872/2009

| Categoría de info de oficio | Estado |
|---|---|
| Estructura orgánica / organigrama | Parcial (existe pero fuera del índice de transparencia, no navegable) |
| Funciones y competencias por área | Parcial (existe en `/municipio/secretarias/`) |
| Autoridades (nombres y cargos) | Sí |
| Presupuesto sancionado vigente | **NO para 2024, 2025, 2026** |
| Ejecución presupuestaria mensual | Sí (al día hasta abril 2026) |
| Cuenta de inversión anual completa | Parcial (CAIF cuatrimestral) |
| Remuneraciones | Parcial (sólo "funcionarios", con errores 2017) |
| Nómina del personal | **Brecha severa** (5 archivos en toda la historia) |
| Licitaciones llamadas | Sí hasta LP 04/2025; **ninguna 2026** |
| Adjudicaciones | **NO** (para ningún proceso 2019-2025) |
| Compras directas y concursos de precios | **NO** |
| Subsidios, becas y transferencias | **NO** |
| Audiencias públicas | Parcial (última municipal 2019) |
| Boletín Oficial | Fragmentado, último PDF confirmado abril 2025 |
| Decretos, resoluciones, ordenanzas | Parcial (vía digesto del Concejo) |
| Declaraciones Juradas Patrimoniales | **NO** (ningún funcionario, ningún concejal) |
| Concursos de personal | Parcial (huérfana del menú, sin resultados) |
| Datos abiertos desde el sitio | **NO** (existe dataset paisdigital, no enlazado) |
| Formulario de solicitud de info Ord. 1872/2009 | **NO** (sin formulario, sin responsable, sin plazo) |
| Informe anual del responsable de acceso | **NO** |
| Agenda pública de autoridades | **NO** |
| Bienes muebles e inmuebles del municipio | **NO** |
| Registro de viajes oficiales / viáticos | **NO** |
| Registro de visitas / lobby | **NO** |

---

## 8. HALLAZGOS QUE CORRIGEN INFORMACIÓN PREVIA DEL PROYECTO

Estos puntos modifican supuestos que teníamos en memoria del proyecto y deben actualizarse:

1. **El órgano legislativo se llama "Concejo Municipal"**, no "Concejo Deliberante". Es el Honorable Concejo Municipal de Sunchales (HCM).
2. **Tiene 6 concejales, no 10**. Renovación parcial de 3 bancas cada dos años.
3. **El sitio del Concejo tiene dominio propio** (`concejosunchales.gob.ar`) y NO está linkeado desde `sunchales.gob.ar` salvo por la URL legacy `/hcd`.
4. **Existen tres tecnologías superpuestas** en el portal: WordPress 6.9.4 (principal), Drupal legacy (subsistente), y plataformas externas (miportal.ar para digesto/pagos, munidigital.com para reclamos).
5. **El Presupuesto 2026 fue sancionado el 22-dic-2025** por $30.938.107.965 en gastos y $30.950.227.077 en recursos (cobertura periodística local), pero **el documento no está publicado** en el sitio oficial.

---

## 9. RECOMENDACIONES OPERATIVAS PARA SUNCHALES TRANSPARENTE

**Inmediatas (sprint actual):**
1. Implementar página/panel **"Brechas declaradas"** que liste, una por una, las 25 brechas de la sección 5 de este informe, con fundamento normativo, fecha de constatación y CTA al ciudadano (formulario Ord. 1872/2009).
2. **Implementar el formulario público de solicitud de información Ord. 1872/2009** que el municipio no provee. Adjuntar Defensoría del Pueblo de Santa Fe como alternativa de escalamiento.
3. Verificar manualmente (humano + screenshot):
   - Si efectivamente `concejales-actuales.aspx` no refleja la jura del 03-mar-2026.
   - Si efectivamente el Boletín Oficial no se publica desde abril 2025.
   - Estado de los perfiles sociales (Facebook, Instagram, YouTube).
4. **Indexar en el RAG del chatbot** las URLs reales del Concejo Municipal (`concejosunchales.gob.ar/documentos/digesto/`, actas, ordenanzas).

**Mediano plazo:**
5. Tablero de obras públicas (objeto, monto, plazo, contratista, % avance) reconstruido a partir de decretos y noticias.
6. Reconstrucción del histórico de licitaciones con adjudicaciones cruzadas (decretos publicados en BO + cobertura periodística).
7. Captura mensual del cronograma de farmacias de turno (scraper liviano) para evitar la brecha de "mes en curso no publicado".
8. Espejo público de los informes del Observatorio Vial y OMVSD si el municipio los provee por solicitud Ord. 1872/2009.

---

## 10. ANEXO — URLS VERIFICADAS DURANTE LA AUDITORÍA

### URLs principales del menú
- https://sunchales.gob.ar/
- https://sunchales.gob.ar/ciudad/
- https://sunchales.gob.ar/ciudad/ubicacion/
- https://sunchales.gob.ar/ciudad/mapa-interactivo/
- https://sunchales.gob.ar/ciudad/turismo/
- https://sunchales.gob.ar/eventos/
- https://sunchales.gob.ar/ciudad/simbolos/
- https://sunchales.gob.ar/ciudad/estacion-meteorologica-sunchales/
- https://sunchales.gob.ar/farmacias-de-turno/
- https://sunchales.gob.ar/ciudad/telefonos-utiles/
- https://sunchales.gob.ar/municipio/
- https://sunchales.gob.ar/municipio/autoridades/
- https://sunchales.gob.ar/municipio/secretarias/
- https://sunchales.gob.ar/municipio/organigrama/
- https://sunchales.gob.ar/gestion/
- https://sunchales.gob.ar/gestion/sunchales-vive/
- https://sunchales.gob.ar/gestion/sunchales-impulsa/
- https://sunchales.gob.ar/gestion/sunchales-crece/
- https://sunchales.gob.ar/gestion/sunchales-protege/
- https://sunchales.gob.ar/gestion/sunchales-protege/movilidad-segura/
- https://sunchales.gob.ar/gestion/sunchales-impulsa/tramites/
- https://sunchales.gob.ar/gestion/sunchales-impulsa/municipio-transparente/
- https://sunchales.gob.ar/noticias/

### Subpáginas de Municipio Transparente
- https://sunchales.gob.ar/municipio-transparente/remuneraciones-de-funcionarios-municipales/
- https://sunchales.gob.ar/municipio-transparente/presupuesto/
- https://sunchales.gob.ar/municipio-transparente/nomina-de-personal-no-permanente/
- https://sunchales.gob.ar/municipio-transparente/audiencias-publicas/
- https://sunchales.gob.ar/municipio-transparente/licitaciones-y-contrataciones/

### Páginas existentes pero NO enlazadas desde el índice de transparencia
- https://sunchales.gob.ar/concursos-y-seleccion-de-personal/
- https://sunchales.gob.ar/boletines-oficiales (Drupal viejo)
- https://sunchales.gob.ar/content/contenido-boletin-oficial (Drupal viejo)
- https://sunchales.gob.ar/presupuesto (Drupal viejo)
- https://sunchales.gob.ar/licitaciones-y-contrataciones (alias)
- https://sunchales.gob.ar/hcd

### Ambiente
- https://sunchales.gob.ar/ambiente/
- https://sunchales.gob.ar/ambiente/complejo-ambiental-sunchales/
- https://sunchales.gob.ar/ambiente/arbolado-publico-y-espacios-verdes/
- https://sunchales.gob.ar/ambiente/ecoestacion-reaquila/
- https://sunchales.gob.ar/recoleccion-de-residuos/
- https://sunchales.gob.ar/gestion/sunchales-protege/gestion-de-residuos/

### Observatorios y áreas de Sunchales Protege
- https://sunchales.gob.ar/gestion/sunchales-protege/observatorio-de-seguridad-y-siniestralidad-vial/
- https://sunchales.gob.ar/gestion/sunchales-protege/observatorio-municipal-de-violencias-y-seguridad-democratica-omvsd/
- https://sunchales.gob.ar/gestion/sunchales-protege/equipo-de-politicas-de-genero-y-diversidad-sexual/
- https://sunchales.gob.ar/gestion/sunchales-crece/plan-de-iluminacion/

### Plataformas externas referenciadas desde el sitio municipal
- https://sunchales.miportal.ar/digesto (Boletín Oficial / pagos)
- https://munidigital.com/citizenv2/sunchales/home (Consultas y reclamos)
- https://forms.munidigital.com/publico/contestar/jCggUYxdwZZIHNlw2WCm (alta de eventos agenda)
- https://turnos.santafe.gov.ar (licencias de conducir, derivado provincial)
- http://sun-sfe-datos.paisdigital.modernizacion.gob.ar/dataset/boletin-oficial-municipal-de-la-ciudad-de-sunchales

### Sitio del Concejo Municipal (independiente)
- https://www.concejosunchales.gob.ar/
- https://concejosunchales.gob.ar/que-es-el-concejo.aspx
- https://concejosunchales.gob.ar/concejales-actuales.aspx
- https://concejosunchales.gob.ar/concejales-anteriores.aspx
- https://concejosunchales.gob.ar/participacion-comision.aspx
- https://concejosunchales.gob.ar/diario-de-sesiones.aspx
- https://concejosunchales.gob.ar/acta-de-sesiones.aspx
- https://concejosunchales.gob.ar/normativa-local-resultados.aspx?tipo=2
- https://concejosunchales.gob.ar/normativa-ambiental.aspx
- https://concejosunchales.gob.ar/acciones-perspectiva-genero.aspx
- https://concejosunchales.gob.ar/Archivos/Link/
- https://concejosunchales.gob.ar/documentos/digesto/
- https://www.legislaturasconectadas.gob.ar/Legislatura/164/Honorable-Concejo-Municipal-de-Sunchales

### PDFs concretos verificados
- https://sunchales.gob.ar/wp-content/uploads/2026/01/organigrama-2526-horizontal.pdf
- https://sunchales.gob.ar/wp-content/uploads/2026/04/Nomina-Pagina-Web-2026-04.pdf
- https://sunchales.gob.ar/wp-content/uploads/2026/02/Sueldo-Funcionarios-01-2026.pdf
- https://sunchales.gob.ar/wp-content/uploads/2026/04/FEBRERO-2026.pdf
- https://sunchales.gob.ar/wp-content/uploads/2026/04/MARZO-2026.pdf
- https://sunchales.gob.ar/wp-content/uploads/2025/06/plano_sunchales_2024.pdf
- https://sunchales.gob.ar/wp-content/uploads/2025/06/boletin_completo_abril_2025.pdf

### Redes sociales declaradas (sin verificar in situ)
- https://www.facebook.com/municipalidadsunchales
- https://www.instagram.com/muni_sunchales/
- https://www.youtube.com/@MunicipalidadSunchales

---

**Fin del informe.** Cualquier afirmación marcada como "a verificar" requiere chequeo manual con navegador antes de publicarse al ciudadano en `sunchalestransparente.com`.
