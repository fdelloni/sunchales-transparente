-- =====================================================================
-- Sunchales Transparente — Módulo JUZGADO MUNICIPAL DE FALTAS
-- Migración Postgres / Supabase — extensión del esquema base
-- =====================================================================
-- Diseñado siguiendo principios de:
--   - máxima divulgación (lectura pública por defecto, datos AGREGADOS)
--   - privacidad por diseño (Ley 25.326): NO se almacenan datos personales
--     del infractor en este esquema. Solo categorías agregadas.
--   - independencia funcional del Juzgado (no se exponen contenidos
--     decisorios individuales, solo estadísticos)
--   - trazabilidad inmutable (cadena SHA-256 herencia del audit_log)
--   - declaración pública de brechas de transparencia (tabla brechas)
-- Marco normativo aplicable (verificado al 02/05/2026):
--   - Ley provincial 10.703 (Código de Faltas)
--   - Ley provincial 13.169 (tránsito), 13.133 (convenios)
--   - Ley 14.436 (LOM, Decreto 711/2026)
--   - Ley nacional 27.275 (acceso a la información pública)
--   - Ley nacional 25.326 (protección de datos personales)
-- =====================================================================

-- ============== LIMPIEZA INICIAL ================================
drop table if exists juzgado_brecha_firmas cascade;
drop table if exists juzgado_brechas cascade;
drop table if exists juzgado_pedidos_aip cascade;
drop table if exists juzgado_indicadores_economicos cascade;
drop table if exists juzgado_indicadores_actividad cascade;
drop table if exists juzgado_indicadores_calidad cascade;
drop table if exists juzgado_afectacion_fondos cascade;
drop table if exists juzgado_tipos_faltas cascade;
drop table if exists juzgado_eventos cascade;
drop type if exists falta_ambito cascade;
drop type if exists brecha_estado cascade;
drop type if exists brecha_categoria cascade;

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============== TIPOS ENUM =======================================
create type falta_ambito as enum (
    'provincial',          -- juzgada bajo convenio Ley 13.133
    'municipal',           -- ordenanza local
    'mixto'                -- aplica ambas
);

create type brecha_estado as enum (
    'no_publicado',        -- el municipio no publica el dato
    'pedido_presentado',   -- AIP formalmente presentado
    'pedido_vencido',      -- venció el plazo legal sin respuesta
    'respondido_parcial',  -- el municipio respondió pero la respuesta es insuficiente
    'subsanado'            -- el municipio publicó correctamente
);

create type brecha_categoria as enum (
    'actividad_sancionatoria',
    'recursos_publicos',
    'trazabilidad_fondos',
    'marco_normativo',
    'convenios_publicos',
    'calidad_institucional',
    'datos_abiertos',
    'estructura_organica',
    'participacion_ciudadana'
);

-- ============== CATÁLOGO DE TIPOS DE FALTAS =====================
-- IMPORTANTE: este catálogo describe TIPOS de faltas (categorías),
-- NO faltas individuales. No hay datos personales aquí.
create table if not exists juzgado_tipos_faltas (
    id                  text primary key,
    nombre              text not null,
    descripcion         text,
    ambito              falta_ambito not null,
    norma_origen        text,                              -- ej: "Ley 10.703 art. 71"
    norma_origen_url    text,                              -- link a digesto/SAIJ
    norma_local_id      uuid,                              -- referencia a digesto_normas si aplica
    escala_min          numeric(10,2),                     -- en jus o UCM
    escala_max          numeric(10,2),
    unidad              text not null check (unidad in ('jus','UCM','peso')),
    activo              boolean not null default true,
    creado_en           timestamptz not null default now()
);

create index if not exists idx_juzgado_tipos_ambito on juzgado_tipos_faltas(ambito);

-- ============== INDICADORES AGREGADOS DE ACTIVIDAD ==============
-- Series temporales agregadas. NO contiene infractores ni causas individuales.
create table if not exists juzgado_indicadores_actividad (
    id                  uuid primary key default uuid_generate_v4(),
    periodo_anio        integer not null,
    periodo_mes         integer not null check (periodo_mes between 1 and 12),
    tipo_falta_id       text references juzgado_tipos_faltas(id),
    cantidad_actas      integer not null default 0,
    cantidad_resueltas  integer not null default 0,
    cantidad_archivadas integer not null default 0,
    cantidad_prescriptas integer not null default 0,
    cantidad_pendientes integer not null default 0,
    zona_general        text,                              -- p. ej. "Centro", "Norte" — nunca dirección puntual
    aplica_microagregacion boolean not null default true,  -- bandera de control
    cantidad_minima_para_publicar integer not null default 5,  -- umbral
    fuente_datos        text,                              -- "registro interno Juzgado", "convenio APSV", etc.
    actualizado_en      timestamptz not null default now(),
    constraint unq_act unique (periodo_anio, periodo_mes, tipo_falta_id, zona_general)
);

create index if not exists idx_jiact_periodo on juzgado_indicadores_actividad(periodo_anio desc, periodo_mes desc);
create index if not exists idx_jiact_tipo on juzgado_indicadores_actividad(tipo_falta_id);

-- Salvaguarda: nunca publicar conteos por debajo del umbral de microagregación
create or replace view v_juzgado_actividad_publica as
select
    id, periodo_anio, periodo_mes, tipo_falta_id,
    case when cantidad_actas >= cantidad_minima_para_publicar then cantidad_actas else null end as cantidad_actas,
    case when cantidad_resueltas >= cantidad_minima_para_publicar then cantidad_resueltas else null end as cantidad_resueltas,
    case when cantidad_archivadas >= cantidad_minima_para_publicar then cantidad_archivadas else null end as cantidad_archivadas,
    case when cantidad_prescriptas >= cantidad_minima_para_publicar then cantidad_prescriptas else null end as cantidad_prescriptas,
    case when cantidad_pendientes >= cantidad_minima_para_publicar then cantidad_pendientes else null end as cantidad_pendientes,
    zona_general, fuente_datos, actualizado_en
from juzgado_indicadores_actividad;

-- ============== INDICADORES ECONÓMICOS ==========================
create table if not exists juzgado_indicadores_economicos (
    id                  uuid primary key default uuid_generate_v4(),
    periodo_anio        integer not null,
    periodo_mes         integer not null check (periodo_mes between 1 and 12),
    tipo_falta_id       text references juzgado_tipos_faltas(id),
    monto_recaudado_ars         numeric(18,2) not null default 0,
    monto_pendiente_ars         numeric(18,2) not null default 0,
    monto_descuento_pronto_pago numeric(18,2) not null default 0,
    cantidad_pagos              integer not null default 0,
    canal_pago                  jsonb,                     -- desglose por canal (tótem, banco, online, presencial)
    tasa_cobrabilidad           numeric(5,4),              -- 0..1, opcional
    fuente_datos                text,
    actualizado_en              timestamptz not null default now(),
    constraint unq_eco unique (periodo_anio, periodo_mes, tipo_falta_id)
);

create index if not exists idx_jieco_periodo on juzgado_indicadores_economicos(periodo_anio desc, periodo_mes desc);

-- ============== INDICADORES DE CALIDAD PROCESAL =================
-- Foco en calidad institucional, NO en "productividad sancionatoria".
create table if not exists juzgado_indicadores_calidad (
    id                          uuid primary key default uuid_generate_v4(),
    periodo_anio                integer not null,
    periodo_mes                 integer not null check (periodo_mes between 1 and 12),
    tipo_falta_id               text references juzgado_tipos_faltas(id),
    dias_promedio_tramitacion   numeric(8,2),
    tasa_recursos_interpuestos  numeric(5,4),
    tasa_revocaciones_justicia  numeric(5,4),
    tasa_cumplimiento_plazos    numeric(5,4),
    notas                       text,                       -- explicaciones en lenguaje claro
    actualizado_en              timestamptz not null default now(),
    constraint unq_cal unique (periodo_anio, periodo_mes, tipo_falta_id)
);

-- ============== AFECTACIÓN DE FONDOS ============================
-- Trazabilidad presupuestaria: cuánto se recaudó y dónde fue.
create table if not exists juzgado_afectacion_fondos (
    id                          uuid primary key default uuid_generate_v4(),
    periodo_anio                integer not null,
    categoria                   text not null,             -- "Multas tránsito", "Multas ambiente", etc.
    monto_recaudado_ars         numeric(18,2) not null,
    afectacion_especifica       boolean not null,
    norma_afectacion            text,                      -- ordenanza/ley que la regula
    norma_afectacion_url        text,
    cuenta_presupuestaria       text,                      -- partida del presupuesto
    monto_ejecutado_destino_ars numeric(18,2),             -- si tiene afectación específica
    detalle_ejecucion           jsonb,                     -- breakdown del gasto financiado
    notas                       text,
    actualizado_en              timestamptz not null default now()
);

create index if not exists idx_jafec_anio on juzgado_afectacion_fondos(periodo_anio desc);

-- =====================================================================
-- BRECHAS DE TRANSPARENCIA — declaración pública del cumplimiento estatal
-- =====================================================================
-- Cada brecha es información de publicación obligatoria que el Estado
-- aún no expone. Tabla diseñada para ser PÚBLICA y reutilizable por
-- terceros (periodismo, academia). NO contiene datos personales.
create table if not exists juzgado_brechas (
    id                  uuid primary key default uuid_generate_v4(),
    titulo              text not null,
    descripcion         text not null,
    categoria           brecha_categoria not null,
    estado              brecha_estado not null default 'no_publicado',
    fundamento_normativo text not null,                    -- norma que obliga a publicar
    fundamento_url      text[],                            -- enlaces oficiales al fundamento
    detectada_el        date not null,
    ultimo_seguimiento  date,
    pedido_aip_id       uuid,                              -- si se presentó AIP, ref a juzgado_pedidos_aip
    plazo_legal_dias    integer,                           -- plazo de respuesta según Ley 27.275 (15 hábiles)
    plazo_vence_el      date,                              -- calculado al presentar el AIP
    respuesta_municipal text,                              -- contenido recibido (si la hubo)
    visibilidad         text not null default 'publica',
    creada_en           timestamptz not null default now(),
    actualizada_en      timestamptz not null default now()
);

create index if not exists idx_jbrec_estado on juzgado_brechas(estado);
create index if not exists idx_jbrec_categoria on juzgado_brechas(categoria);

-- ============== PEDIDOS FORMALES DE ACCESO A LA INFORMACIÓN =====
create table if not exists juzgado_pedidos_aip (
    id                  uuid primary key default uuid_generate_v4(),
    brecha_id           uuid not null references juzgado_brechas(id),
    titulo              text not null,
    texto_completo      text not null,
    fecha_presentacion  date not null,
    organismo_destino   text not null default 'Municipalidad de Sunchales',
    canal_presentacion  text not null check (canal_presentacion in ('mesa_entradas','correo','plataforma_digital','otro')),
    numero_expediente   text,                              -- número del trámite si lo hay
    plazo_vence_el      date generated always as (fecha_presentacion + interval '15 days') stored,
    fecha_respuesta     date,
    respuesta_url       text,
    respuesta_satisfactoria boolean,
    accion_judicial_iniciada boolean default false,
    creado_en           timestamptz not null default now()
);

create index if not exists idx_jaip_brecha on juzgado_pedidos_aip(brecha_id);
create index if not exists idx_jaip_fecha on juzgado_pedidos_aip(fecha_presentacion desc);

-- Vínculo bidireccional brecha ↔ pedido AIP
alter table juzgado_brechas
    add constraint fk_brecha_pedido foreign key (pedido_aip_id) references juzgado_pedidos_aip(id);

-- ============== FIRMAS / ADHESIONES CIUDADANAS ==================
-- Permite que un ciudadano se sume al pedido de AIP. Privacidad: el correo
-- vive en auth.users, acá solo guardamos el vínculo.
create table if not exists juzgado_brecha_firmas (
    id                  uuid primary key default uuid_generate_v4(),
    brecha_id           uuid not null references juzgado_brechas(id) on delete cascade,
    usuario_id          uuid not null,                     -- auth.users
    seudonimo_publico   text,                              -- opcional, para mostrar
    motivo              text,                              -- comentario del firmante
    confirmada          boolean not null default false,    -- doble opt-in
    creada_en           timestamptz not null default now(),
    constraint unq_firma unique (brecha_id, usuario_id)
);

create index if not exists idx_jfirm_brecha on juzgado_brecha_firmas(brecha_id);

-- ============== EVENTOS DE AUDITORIA ============================
create table if not exists juzgado_eventos (
    id                  uuid primary key default uuid_generate_v4(),
    entidad             text not null,
    entidad_id          text not null,
    accion              text not null,
    autor               text not null,
    payload             jsonb not null,
    hash_anterior       text,
    hash_actual         text not null,
    creado_en           timestamptz not null default now()
);

create index if not exists idx_jevn_entidad on juzgado_eventos(entidad, entidad_id);

-- ============== VISTAS PÚBLICAS =================================

-- Resumen ejecutivo del estado de transparencia del Juzgado.
create or replace view v_juzgado_estado_transparencia as
select
    (select count(*) from juzgado_brechas) as brechas_totales,
    (select count(*) from juzgado_brechas where estado = 'no_publicado') as brechas_no_publicadas,
    (select count(*) from juzgado_brechas where estado in ('pedido_presentado','pedido_vencido')) as brechas_con_aip,
    (select count(*) from juzgado_brechas where estado = 'subsanado') as brechas_subsanadas,
    (select count(*) from juzgado_pedidos_aip) as aips_presentados,
    (select count(*) from juzgado_pedidos_aip where fecha_respuesta is null and plazo_vence_el < current_date) as aips_vencidos_sin_respuesta;

-- Salud económica pública (datos agregados, sin reidentificación).
create or replace view v_juzgado_recaudacion_anual as
select
    periodo_anio,
    sum(monto_recaudado_ars) as recaudado,
    sum(monto_pendiente_ars) as pendiente,
    avg(tasa_cobrabilidad) filter (where tasa_cobrabilidad is not null) as tasa_cobrabilidad_avg
from juzgado_indicadores_economicos
group by periodo_anio
order by periodo_anio desc;

-- ============== ROW LEVEL SECURITY ==============================
alter table juzgado_tipos_faltas             enable row level security;
alter table juzgado_indicadores_actividad    enable row level security;
alter table juzgado_indicadores_economicos   enable row level security;
alter table juzgado_indicadores_calidad      enable row level security;
alter table juzgado_afectacion_fondos        enable row level security;
alter table juzgado_brechas                  enable row level security;
alter table juzgado_pedidos_aip              enable row level security;
alter table juzgado_brecha_firmas            enable row level security;
alter table juzgado_eventos                  enable row level security;

-- Lectura pública por defecto
create policy tipos_faltas_publica       on juzgado_tipos_faltas             for select using (true);
create policy actividad_publica          on juzgado_indicadores_actividad    for select using (true);
create policy economicos_publica         on juzgado_indicadores_economicos   for select using (true);
create policy calidad_publica            on juzgado_indicadores_calidad      for select using (true);
create policy afectacion_publica         on juzgado_afectacion_fondos        for select using (true);
create policy brechas_publica            on juzgado_brechas                  for select using (visibilidad = 'publica');
create policy aips_publica               on juzgado_pedidos_aip              for select using (true);
create policy eventos_publica            on juzgado_eventos                  for select using (true);

-- Firmas: cada usuario administra las propias; público ve conteos via vista
create policy firmas_propias_select      on juzgado_brecha_firmas            for select using (auth.uid() = usuario_id);
create policy firmas_propias_all         on juzgado_brecha_firmas            for all    using (auth.uid() = usuario_id) with check (auth.uid() = usuario_id);

-- Vista pública: cantidad de firmas por brecha (sin exponer firmantes)
create or replace view v_juzgado_brechas_publicas as
select
    b.id,
    b.titulo,
    b.descripcion,
    b.categoria,
    b.estado,
    b.fundamento_normativo,
    b.fundamento_url,
    b.detectada_el,
    b.ultimo_seguimiento,
    b.plazo_vence_el,
    (select count(*) from juzgado_brecha_firmas f where f.brecha_id = b.id and f.confirmada) as firmas_confirmadas
from juzgado_brechas b
where b.visibilidad = 'publica';

-- ============== SEED DE BRECHAS DETECTADAS AL 02/05/2026 =========
-- Estas brechas reflejan información que el Municipio está obligado a
-- publicar por Ley 27.275 y normas concordantes, y que al 02/05/2026
-- no se encuentra accesible.
insert into juzgado_brechas (titulo, descripcion, categoria, estado, fundamento_normativo, fundamento_url, detectada_el)
values
('Estadísticas agregadas de actas labradas y resueltas',
 'No se publica la cantidad anual y mensual de actas labradas, resueltas, archivadas o prescriptas por tipo de falta.',
 'actividad_sancionatoria','no_publicado',
 'Ley 27.275 art. 1 y 5 — máxima divulgación; principio constitucional de publicidad de los actos de gobierno.',
 array['https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949'],
 '2026-05-02'),
('Recaudación por multas y sanciones',
 'No se publica el monto recaudado mensual y anual, tasa de cobrabilidad y montos pendientes.',
 'recursos_publicos','no_publicado',
 'Ley 27.275; Constitución de Santa Fe (publicidad de la hacienda pública).',
 array['https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949'],
 '2026-05-02'),
('Destino y afectación de los fondos recaudados',
 'No se publica si la recaudación tiene afectación específica o va a Rentas Generales, ni la trazabilidad ingreso → ejecución.',
 'trazabilidad_fondos','no_publicado',
 'Constitución Nacional (forma republicana); Ley 27.275; principio de rendición de cuentas.',
 array['https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949'],
 '2026-05-02'),
('Ordenanza orgánica del Juzgado de Faltas',
 'La ordenanza que organiza el Juzgado, fija competencia y garantías de imparcialidad no se encuentra en buscadores estándar.',
 'estructura_organica','no_publicado',
 'Ley 27.275 art. 5 inc. b (estructura orgánica); art. 2 Código Civil y Comercial (publicidad de las normas).',
 array['https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949'],
 '2026-05-02'),
('Régimen Municipal de Faltas consolidado',
 'El catálogo de faltas municipales con tipología, escalas, plazos y procedimientos no está consolidado y disponible.',
 'marco_normativo','no_publicado',
 'Ley 27.275; principio de legalidad sancionatoria (CN art. 18) — no hay sanción sin ley previa accesible.',
 array['https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949'],
 '2026-05-02'),
('Convenio con la Agencia Provincial de Seguridad Vial',
 'No se publica si el Juzgado está habilitado bajo Ley 13.133 ni el texto del convenio con la APSV.',
 'convenios_publicos','no_publicado',
 'Ley 27.275 art. 5 inc. f (convenios y contratos celebrados por el Estado).',
 array['https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949'],
 '2026-05-02'),
('Indicadores de calidad procesal',
 'Tiempo medio de tramitación, tasa de recursos, tasa de revocaciones por la justicia ordinaria.',
 'calidad_institucional','no_publicado',
 'Ley 27.275 (información generada y custodiada por el Estado); estándares interamericanos de transparencia activa.',
 array['https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949'],
 '2026-05-02'),
('Datos abiertos del Juzgado',
 'Dataset agregado y anonimizado en formatos abiertos (CSV/JSON, CC-BY-4.0) reutilizable por terceros.',
 'datos_abiertos','no_publicado',
 'Ley 27.275 art. 32 (formatos abiertos por defecto); principio de máxima divulgación.',
 array['https://www.argentina.gob.ar/normativa/nacional/ley-27275-265949'],
 '2026-05-02');

-- =====================================================================
-- FIN DE LA MIGRACIÓN
-- =====================================================================
-- Para aplicar:
--   1) Ejecutar este script en el editor SQL de Supabase
--   2) Verificar: select * from v_juzgado_estado_transparencia;
--   3) Listar brechas: select * from v_juzgado_brechas_publicas;
-- =====================================================================
