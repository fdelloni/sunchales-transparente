-- =====================================================================
-- Sunchales Transparente — Módulo DIGESTO Y CONCEJO DELIBERANTE
-- Migración Postgres / Supabase — extensión del esquema base
-- =====================================================================
-- Diseñado siguiendo principios de:
--   - máxima divulgación (lectura pública por defecto)
--   - privacidad por diseño (datos personales del ciudadano protegidos)
--   - trazabilidad inmutable (eventos firmados con SHA-256, herencia del audit_log)
--   - interoperabilidad (campos compatibles con Akoma Ntoso para documentos legales)
-- Marco normativo aplicable (verificado al 02/05/2026):
--   - Constitución Nacional, Constitución de Santa Fe (reforma 2025)
--   - Ley provincial 14.436 (LOM, Decreto 711/2026)
--   - Ordenanza Sunchales N° 1872/2009 (acceso a la información pública municipal)
--   - Decreto Pcial. Santa Fe N° 0692/2009 (mecanismo provincial supletorio)
--   - Ley nacional 25.326 (protección de datos personales)
-- =====================================================================

-- ============== LIMPIEZA INICIAL =================================
drop table if exists digesto_eventos cascade;
drop table if exists digesto_suscripciones cascade;
drop table if exists digesto_comentarios cascade;
drop table if exists digesto_votaciones_voto cascade;
drop table if exists digesto_votaciones cascade;
drop table if exists digesto_proyectos cascade;
drop table if exists digesto_sesiones cascade;
drop table if exists digesto_concejales cascade;
drop table if exists digesto_relaciones_normas cascade;
drop table if exists digesto_normas cascade;
drop table if exists digesto_subtemas cascade;
drop table if exists digesto_temas cascade;
drop type if exists norma_tipo cascade;
drop type if exists norma_estado cascade;
drop type if exists relacion_tipo cascade;
drop type if exists proyecto_estado cascade;
drop type if exists sesion_tipo cascade;
drop type if exists voto_valor cascade;
drop type if exists suscripcion_tipo cascade;

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";        -- búsqueda full-text con tolerancia
create extension if not exists "unaccent";       -- normalización de español

-- ============== TIPOS ENUM ========================================
create type norma_tipo as enum (
    'ordenanza',
    'decreto',
    'resolucion',
    'declaracion',
    'comunicacion',
    'minuta'
);

create type norma_estado as enum (
    'vigente',
    'modificada',
    'derogada',
    'observada',
    'vetada',
    'suspendida'
);

create type relacion_tipo as enum (
    'deroga',           -- N1 deroga N2
    'modifica',         -- N1 modifica N2
    'reglamenta',       -- N1 reglamenta N2
    'cita',             -- N1 cita / remite a N2
    'contradice',       -- detección automática (sugerencia)
    'consolida'         -- N1 consolida varias normas anteriores
);

create type proyecto_estado as enum (
    'ingresado',
    'en_comision',
    'con_despacho',
    'aprobado',
    'rechazado',
    'archivado',
    'observado',
    'vetado'
);

create type sesion_tipo as enum (
    'ordinaria',
    'extraordinaria',
    'especial',
    'preparatoria',
    'audiencia_publica'
);

create type voto_valor as enum (
    'afirmativo',
    'negativo',
    'abstencion',
    'ausente',
    'excusado'
);

create type suscripcion_tipo as enum (
    'tema',
    'norma',
    'proyecto',
    'concejal',
    'comision',
    'palabra_clave'
);

-- ============== TAXONOMÍA ========================================
-- Continuidad con los 7 temas generales del Digesto en miportal.
create table if not exists digesto_temas (
    id              text primary key,
    nombre          text not null,
    descripcion     text,
    orden           smallint default 0,
    creado_en       timestamptz not null default now()
);

create table if not exists digesto_subtemas (
    id              text primary key,
    tema_id         text not null references digesto_temas(id) on delete cascade,
    nombre          text not null,
    descripcion     text,
    orden           smallint default 0,
    creado_en       timestamptz not null default now()
);

create index if not exists idx_subtemas_tema on digesto_subtemas(tema_id);

-- ============== CONCEJALES =======================================
create table if not exists digesto_concejales (
    id                  text primary key,
    nombre              text not null,
    bloque              text,
    foto_url            text,
    biografia           text,
    mandato_inicio      date not null,
    mandato_fin         date,
    rol                 text,                              -- presidente, vicepresidente 1°, etc.
    es_presidente       boolean not null default false,
    declaracion_jurada  jsonb,                             -- objeto con campos públicos según ordenanza
    contacto_publico    jsonb,                             -- email institucional, redes oficiales
    activo              boolean not null default true,
    creado_en           timestamptz not null default now(),
    actualizado_en      timestamptz not null default now()
);

create index if not exists idx_concejales_activo on digesto_concejales(activo);
create index if not exists idx_concejales_bloque on digesto_concejales(bloque);

-- ============== NORMAS ===========================================
create table if not exists digesto_normas (
    id                  uuid primary key default uuid_generate_v4(),
    tipo                norma_tipo not null,
    numero              text not null,                     -- texto para soportar "2900/2021" o "2900-bis"
    anio                integer not null,
    titulo              text not null,
    sintesis            text,                              -- versión en lenguaje claro
    texto_completo      text not null,                     -- HTML estructurado
    texto_plano         text generated always as (regexp_replace(coalesce(texto_completo,''), '<[^>]+>', '', 'g')) stored,
    fecha_sancion       date,
    fecha_promulgacion  date,
    fecha_publicacion   date,                              -- en boletín oficial
    fuente_publicacion  text,                              -- ej: "Boletín Oficial Municipal N° XX/2026"
    autor_concejal_id   text references digesto_concejales(id),
    autor_organismo     text,                              -- DEM, comisión, etc., para autores no individuales
    comisiones          text[],                            -- comisiones intervinientes
    estado              norma_estado not null default 'vigente',
    tema_id             text references digesto_temas(id),
    subtema_id          text references digesto_subtemas(id),
    etiquetas           text[],                            -- libres, para enriquecer la búsqueda
    anexos              jsonb,                             -- [{nombre, url, hash_sha256}]
    pdf_original_url    text,
    pdf_original_hash   text,                              -- SHA-256 del PDF original importado
    referencia_supranac text[],                            -- ["constitucion-nacional", "ley-14436", ...]
    metadatos           jsonb,                             -- campo libre para extensiones (Akoma Ntoso, etc.)
    fuente_id           text,                              -- referencia a fuentes (catálogo del esquema base)
    visibilidad         text not null default 'publica' check (visibilidad in ('publica','reservada','privada')),
    motivo_reserva      text,                              -- obligatorio si visibilidad != publica
    creado_en           timestamptz not null default now(),
    actualizado_en      timestamptz not null default now(),
    constraint norma_unica unique (tipo, numero, anio)
);

create index if not exists idx_normas_tipo on digesto_normas(tipo);
create index if not exists idx_normas_estado on digesto_normas(estado);
create index if not exists idx_normas_anio on digesto_normas(anio);
create index if not exists idx_normas_tema on digesto_normas(tema_id);
create index if not exists idx_normas_subtema on digesto_normas(subtema_id);
create index if not exists idx_normas_fecha_sancion on digesto_normas(fecha_sancion);
-- Búsqueda full-text en español:
create index if not exists idx_normas_titulo_trgm
    on digesto_normas using gin (titulo gin_trgm_ops);
create index if not exists idx_normas_texto_trgm
    on digesto_normas using gin (texto_plano gin_trgm_ops);
create index if not exists idx_normas_etiquetas_gin
    on digesto_normas using gin (etiquetas);

-- ============== RELACIONES ENTRE NORMAS ==========================
create table if not exists digesto_relaciones_normas (
    id                  uuid primary key default uuid_generate_v4(),
    origen_id           uuid not null references digesto_normas(id) on delete cascade,
    destino_id          uuid not null references digesto_normas(id) on delete cascade,
    tipo                relacion_tipo not null,
    articulos           text[],                            -- artículos específicos afectados
    descripcion         text,
    sugerida_por_ai     boolean not null default false,    -- distingue automáticas de manuales
    confianza_ai        numeric(4,3),                      -- 0..1, solo si sugerida_por_ai
    revisada            boolean not null default false,    -- una persona la verificó
    revisada_por        text,
    fecha_relacion      date,                              -- fecha en que se establece la relación
    creado_en           timestamptz not null default now(),
    constraint rel_unica unique (origen_id, destino_id, tipo),
    constraint rel_no_self check (origen_id <> destino_id)
);

create index if not exists idx_rel_origen on digesto_relaciones_normas(origen_id);
create index if not exists idx_rel_destino on digesto_relaciones_normas(destino_id);
create index if not exists idx_rel_tipo on digesto_relaciones_normas(tipo);
create index if not exists idx_rel_revisada on digesto_relaciones_normas(revisada);

-- ============== SESIONES =========================================
create table if not exists digesto_sesiones (
    id                  uuid primary key default uuid_generate_v4(),
    fecha               timestamptz not null,
    tipo                sesion_tipo not null,
    sala                text default 'Sala "Mirta Rodríguez"',
    presidente          text,                              -- quien preside la sesión
    orden_del_dia       jsonb,                             -- estructura del orden del día
    acta_url            text,                              -- enlace al acta oficial
    acta_html           text,                              -- versión HTML accesible
    video_url           text,
    transcripcion_url   text,
    asistentes          text[],                            -- ids de digesto_concejales
    ausentes            text[],
    quorum_legal        boolean,
    publica             boolean not null default true,
    creado_en           timestamptz not null default now(),
    actualizado_en      timestamptz not null default now()
);

create index if not exists idx_sesiones_fecha on digesto_sesiones(fecha desc);
create index if not exists idx_sesiones_tipo on digesto_sesiones(tipo);

-- ============== PROYECTOS LEGISLATIVOS ===========================
create table if not exists digesto_proyectos (
    id                      uuid primary key default uuid_generate_v4(),
    expediente              text unique not null,          -- ej: "2026-0118"
    titulo                  text not null,
    sintesis                text,
    texto_completo          text,
    autor_concejal_id       text references digesto_concejales(id),
    autor_otro              text,                          -- DEM, vecinos, instituciones
    coautores               text[],                        -- ids de concejales coautores
    comisiones_intervienen  text[],
    estado                  proyecto_estado not null default 'ingresado',
    fecha_ingreso           date not null,
    fecha_despacho          date,
    fecha_tratamiento       date,
    sesion_id               uuid references digesto_sesiones(id),
    norma_resultante_id     uuid references digesto_normas(id),  -- si fue aprobado
    tema_id                 text references digesto_temas(id),
    etiquetas               text[],
    permite_comentarios     boolean not null default true,
    creado_en               timestamptz not null default now(),
    actualizado_en          timestamptz not null default now()
);

create index if not exists idx_proyectos_estado on digesto_proyectos(estado);
create index if not exists idx_proyectos_fecha_ingreso on digesto_proyectos(fecha_ingreso desc);
create index if not exists idx_proyectos_autor on digesto_proyectos(autor_concejal_id);

-- ============== VOTACIONES =======================================
create table if not exists digesto_votaciones (
    id                  uuid primary key default uuid_generate_v4(),
    sesion_id           uuid not null references digesto_sesiones(id) on delete cascade,
    proyecto_id         uuid references digesto_proyectos(id),
    titulo              text not null,
    es_nominal          boolean not null default true,
    requiere_mayoria    text not null default 'simple' check (requiere_mayoria in ('simple','absoluta','dos_tercios')),
    resultado           text not null check (resultado in ('aprobado','rechazado','empate','no_alcanzo_quorum')),
    cantidad_afirmativos smallint,
    cantidad_negativos   smallint,
    cantidad_abstenciones smallint,
    observaciones       text,
    creado_en           timestamptz not null default now()
);

create index if not exists idx_vot_sesion on digesto_votaciones(sesion_id);
create index if not exists idx_vot_proyecto on digesto_votaciones(proyecto_id);

create table if not exists digesto_votaciones_voto (
    votacion_id         uuid not null references digesto_votaciones(id) on delete cascade,
    concejal_id         text not null references digesto_concejales(id),
    voto                voto_valor not null,
    fundamento          text,                              -- fundamentación pública del voto
    primary key (votacion_id, concejal_id)
);

create index if not exists idx_vot_voto_concejal on digesto_votaciones_voto(concejal_id);

-- ============== COMENTARIOS CIUDADANOS ===========================
-- Comentarios públicos sobre proyectos en tratamiento.
-- usuario_id es opaco: NO almacenamos email ni datos personales aquí; eso vive en auth.users.
create table if not exists digesto_comentarios (
    id                  uuid primary key default uuid_generate_v4(),
    proyecto_id         uuid not null references digesto_proyectos(id) on delete cascade,
    usuario_id          uuid not null,                     -- referencia a auth.users de Supabase
    seudonimo_publico   text,                              -- lo que se muestra (no el nombre real)
    contenido           text not null check (length(contenido) between 5 and 4000),
    aprobado            boolean not null default false,    -- moderación previa
    moderado_por        text,
    moderado_en         timestamptz,
    creado_en           timestamptz not null default now()
);

create index if not exists idx_com_proyecto on digesto_comentarios(proyecto_id);
create index if not exists idx_com_aprobado on digesto_comentarios(aprobado);

-- ============== SUSCRIPCIONES ====================================
create table if not exists digesto_suscripciones (
    id                  uuid primary key default uuid_generate_v4(),
    usuario_id          uuid not null,                     -- auth.users
    tipo                suscripcion_tipo not null,
    target_id           text,                              -- id de tema/norma/proyecto/concejal
    palabra_clave       text,                              -- si tipo = 'palabra_clave'
    canal_email         boolean not null default true,
    canal_whatsapp      boolean not null default false,
    frecuencia          text not null default 'inmediata' check (frecuencia in ('inmediata','diaria','semanal','mensual')),
    confirmada          boolean not null default false,    -- doble opt-in
    activa              boolean not null default true,
    creada_en           timestamptz not null default now(),
    confirmada_en       timestamptz,
    desactivada_en      timestamptz,
    constraint sub_target_o_keyword check (
        (tipo = 'palabra_clave' and palabra_clave is not null) or
        (tipo <> 'palabra_clave' and target_id is not null)
    )
);

create index if not exists idx_sub_usuario on digesto_suscripciones(usuario_id);
create index if not exists idx_sub_target on digesto_suscripciones(tipo, target_id);
create index if not exists idx_sub_activa on digesto_suscripciones(activa);

-- ============== EVENTOS DE AUDITORIA (CADENA SHA-256) ============
-- Cada cambio relevante deja un evento firmado, encadenado con el anterior.
-- Compatible con la lógica del audit_log del esquema base.
create table if not exists digesto_eventos (
    id                  uuid primary key default uuid_generate_v4(),
    entidad             text not null,                     -- 'norma' | 'proyecto' | 'sesion' | 'votacion'
    entidad_id          text not null,
    accion              text not null,                     -- 'crear' | 'editar' | 'derogar' | 'modificar' | 'sancionar'
    autor               text not null,                     -- usuario o sistema que ejecuta la acción
    payload             jsonb not null,                    -- snapshot del cambio
    hash_anterior       text,                              -- SHA-256 del evento previo
    hash_actual         text not null,                     -- SHA-256 de este evento
    creado_en           timestamptz not null default now()
);

create index if not exists idx_eventos_entidad on digesto_eventos(entidad, entidad_id);
create index if not exists idx_eventos_creado on digesto_eventos(creado_en desc);

-- ============== VISTAS DE ANÁLISIS DE COHERENCIA ================

-- Vista: normas con citas a la antigua Ley 2756 (referencias rotas tras LOM 14.436)
create or replace view v_digesto_remisiones_a_2756 as
select
    n.id,
    n.tipo,
    n.numero,
    n.anio,
    n.titulo,
    n.estado
from digesto_normas n
where n.texto_plano ~* '\m(ley\s+(provincial\s+)?2756|l\.o\.m\.\s+2756)\M';

-- Vista: clusters de normas potencialmente superpuestas por tema
create or replace view v_digesto_superposiciones_tema as
select
    tema_id,
    subtema_id,
    count(*) as normas_vigentes,
    array_agg(numero || '/' || anio order by anio) as numeros
from digesto_normas
where estado = 'vigente'
group by tema_id, subtema_id
having count(*) >= 4;   -- 4 o más vigentes en mismo subtema = candidato a consolidación

-- Vista: salud normativa pública
create or replace view v_digesto_salud_normativa as
select
    (select count(*) from digesto_normas where estado = 'vigente') as vigentes,
    (select count(*) from digesto_normas where estado = 'modificada') as modificadas,
    (select count(*) from digesto_normas where estado = 'derogada') as derogadas,
    (select count(*) from digesto_relaciones_normas where sugerida_por_ai and not revisada) as detecciones_pendientes,
    (select count(*) from digesto_proyectos where estado in ('ingresado','en_comision','con_despacho')) as proyectos_activos,
    (select count(*) from digesto_suscripciones where activa and confirmada) as suscripciones_activas;

-- ============== ROW LEVEL SECURITY ================================
alter table digesto_normas               enable row level security;
alter table digesto_relaciones_normas    enable row level security;
alter table digesto_temas                enable row level security;
alter table digesto_subtemas             enable row level security;
alter table digesto_concejales           enable row level security;
alter table digesto_sesiones             enable row level security;
alter table digesto_proyectos            enable row level security;
alter table digesto_votaciones           enable row level security;
alter table digesto_votaciones_voto      enable row level security;
alter table digesto_comentarios          enable row level security;
alter table digesto_suscripciones        enable row level security;
alter table digesto_eventos              enable row level security;

-- Lectura pública por defecto (máxima divulgación)
create policy normas_lectura_publica           on digesto_normas               for select using (visibilidad = 'publica');
create policy temas_lectura_publica            on digesto_temas                for select using (true);
create policy subtemas_lectura_publica         on digesto_subtemas             for select using (true);
create policy concejales_lectura_publica       on digesto_concejales           for select using (true);
create policy sesiones_lectura_publica         on digesto_sesiones             for select using (publica = true);
create policy proyectos_lectura_publica        on digesto_proyectos            for select using (true);
create policy votaciones_lectura_publica       on digesto_votaciones           for select using (true);
create policy votaciones_voto_lectura_publica  on digesto_votaciones_voto      for select using (true);
create policy comentarios_lectura_publica      on digesto_comentarios          for select using (aprobado = true);
create policy relaciones_lectura_publica       on digesto_relaciones_normas    for select using (true);
create policy eventos_lectura_publica          on digesto_eventos              for select using (true);

-- Suscripciones: cada usuario solo ve y administra las suyas
create policy suscripciones_lectura_propia     on digesto_suscripciones        for select using (auth.uid() = usuario_id);
create policy suscripciones_escritura_propia   on digesto_suscripciones        for all    using (auth.uid() = usuario_id) with check (auth.uid() = usuario_id);

-- Comentarios: el usuario crea con su id, edita propios; lectura pública si aprobados
create policy comentarios_crear                on digesto_comentarios          for insert with check (auth.uid() = usuario_id);
create policy comentarios_editar_propios       on digesto_comentarios          for update using (auth.uid() = usuario_id);

-- ============== FUNCIONES UTILITARIAS =============================

-- Genera el hash SHA-256 encadenado para eventos de auditoría.
create or replace function fn_digesto_evento_hash(
    p_entidad text,
    p_entidad_id text,
    p_accion text,
    p_autor text,
    p_payload jsonb,
    p_hash_anterior text
) returns text
language plpgsql
as $$
declare
    v_input text;
begin
    v_input := coalesce(p_hash_anterior, '') ||
               '|' || p_entidad ||
               '|' || p_entidad_id ||
               '|' || p_accion ||
               '|' || p_autor ||
               '|' || p_payload::text;
    return encode(digest(v_input, 'sha256'), 'hex');
end;
$$;

-- Inserta un evento garantizando la cadena.
create or replace function fn_digesto_evento_registrar(
    p_entidad text,
    p_entidad_id text,
    p_accion text,
    p_autor text,
    p_payload jsonb
) returns digesto_eventos
language plpgsql
as $$
declare
    v_hash_anterior text;
    v_hash_actual text;
    v_evento digesto_eventos;
begin
    select hash_actual into v_hash_anterior
    from digesto_eventos
    where entidad = p_entidad and entidad_id = p_entidad_id
    order by creado_en desc
    limit 1;

    v_hash_actual := fn_digesto_evento_hash(p_entidad, p_entidad_id, p_accion, p_autor, p_payload, v_hash_anterior);

    insert into digesto_eventos (entidad, entidad_id, accion, autor, payload, hash_anterior, hash_actual)
    values (p_entidad, p_entidad_id, p_accion, p_autor, p_payload, v_hash_anterior, v_hash_actual)
    returning * into v_evento;

    return v_evento;
end;
$$;

-- ============== SEED MÍNIMO DE TAXONOMÍA =========================
-- Continuidad con los 7 temas generales actuales del Digesto en miportal.
insert into digesto_temas (id, nombre, orden) values
    ('hacienda',     'Hacienda y Finanzas',           1),
    ('obras',        'Obras Públicas y Servicios',    2),
    ('ambiente',     'Ambiente y Espacios Verdes',    3),
    ('salud',        'Salud y Acción Social',         4),
    ('seguridad',    'Seguridad y Convivencia',       5),
    ('institucional','Régimen Institucional',         6),
    ('cultura',      'Cultura, Educación y Deportes', 7)
on conflict (id) do nothing;

-- =====================================================================
-- FIN DE LA MIGRACIÓN
-- =====================================================================
-- Para aplicar:
--   1) Ejecutar este script en el editor SQL de Supabase (Project → SQL Editor)
--   2) Verificar: select * from v_digesto_salud_normativa;
--   3) Probar inserción mínima: insert into digesto_normas
--        (tipo, numero, anio, titulo, texto_completo, fecha_sancion, tema_id)
--      values
--        ('ordenanza','2998',2026,'Consejo Consultivo Ambiental',
--         '<h1>Ordenanza N° 2998</h1>...', '2026-04-30','ambiente');
-- =====================================================================
