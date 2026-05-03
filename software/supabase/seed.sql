-- Datos semilla derivados de src/lib/data/* — útil cuando migremos a Supabase real.
-- Los totales son cifras oficiales verificadas.

insert into fuentes (id, titulo, url, consultada, notas) values
('censo2022_sunchales','Censo Nacional 2022 — Sunchales','https://pidolapalabraweb.com.ar/contenido/362/segun-el-censo-2022-sunchales-tiene-23416-habitantes','2026-04-29','23.416 habitantes; 9.710 viviendas (INDEC).'),
('presupuesto2026','Presupuesto Municipal Sunchales 2026 (proyecto)','https://meridianodigital.com.ar/el-concejo-municipal-de-sunchales-analiza-el-proyecto-del-presupuesto-municipal-2026/','2026-04-29','Gastos $30.938.107.965 — Recursos $30.950.227.077'),
('fondoLey12385','Ley 12.385 — Programa de Obras Menores 2026','https://movilquique.com/politica/sunchales-recibira-613-millones-de-recursos-provinciales','2026-04-29','Sunchales recibe $613.691.020,73.'),
('organigramaMunicipal','Organigrama Municipal Sunchales — Pinotti','https://meridianodigital.com.ar/nombre-por-nombre-el-nuevo-organigrama-municipal-completo/','2026-04-29','Estructura de Secretarías y Subsecretarías.'),
('ordenanza1872','Ordenanza Sunchales N° 1872/2009 — Acceso a la Información Pública','https://concejosunchales.gob.ar/documentos/digesto/O18722009.pdf','2026-05-03','Norma municipal vinculante. Plazo 10 días + 5 prórroga.'),
('decreto0692','Decreto Pcial. Santa Fe N° 0692/2009 — Mecanismo de acceso','https://www.santafe.gov.ar/index.php/web/content/view/full/199538/(subtema)/93811','2026-05-03','Aplicable supletoriamente.'),
('concejoAccesoInfoPagina','Concejo Sunchales — Pág. oficial Acceso a Info Pública','https://concejosunchales.gob.ar/acceso-informacion-publica.aspx','2026-05-03','Comunicación institucional + formulario.'),
('ley25326','Ley Nacional N° 25.326 — Protección de Datos Personales','https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790','2026-05-03','Límite legítimo a la transparencia.'),
('ley26037','Ley 26.037 — Capital del Cooperativismo','https://sunchales.gob.ar/ciudad/turismo/capital-nacional-del-cooperativismo/','2026-04-29',null)
on conflict (id) do nothing;

-- (Las inserciones de partidas y personal pueden generarse desde scripts/sync_from_ts.ts)
