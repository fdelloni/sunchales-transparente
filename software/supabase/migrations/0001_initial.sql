-- =====================================================================
-- Sunchales Transparente — Esquema inicial Postgres / Supabase
-- =====================================================================
-- Diseñado siguiendo principios de:
--   - máxima divulgación (lectura pública por defecto)
--   - privacidad por diseño (RLS para PII; columnas mínimas)
--   - trazabilidad inmutable (audit_log con hash SHA-256)
-- =====================================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============== Catálogo de fuentes ==============
create table if not exists fuentes (
    id           text primary key,
    titulo       text not null,
    url          text not null,
    consultada   date not null,
    notas        text
);

-- ============== Presupuesto ==============
create table if not exists partidas_presupuesto (
    id              text primary key,
    finalidad       text not null,
    funcion         text not null,
    programa        text,
    presupuestado   numeric(18, 2) not null,
    ejecutado       numeric(18, 2),
    ejercicio       integer not null,
    verificado      boolean not null default false,
    fuente_id       text references fuentes(id),
    creado_en       timestamptz not null default now(),
    actualizado_en  timestamptz not null default now()
);

create index if not exists idx_partidas_ejercicio on partidas_presupuesto(ejercicio);
create index if not exists idx_partidas_finalidad on partidas_presupuesto(finalidad);

-- ============== Personal (planta política) ==============
create table if not exists personal_municipal (
    id                       text primary key,
    apellido_nombre          text not null,
    cargo                    text not null,
    area                     text not null,
    jerarquia                smallint not null check (jerarquia between 1 and 4),
    remuneracion_bruta_ars   numeric(14, 2),  -- nullable: pendiente de informar
    fuente_cargo             text not null check (fuente_cargo in ('verificado_publico','pendiente_oficial')),
    fuente_remuneracion      text not null check (fuente_remuneracion in ('estimacion_referencial','verificado_oficial','pendiente_oficial')),
    ejercicio                integer not null,
    creado_en                timestamptz not null default now(),
    actualizado_en           timestamptz not null default now()
);

create index if not exists idx_personal_area on personal_municipal(area);

-- ============== Catálogo de datasets ==============
create table if not exists datasets (
    id               text primary key,
    titulo           text not null,
    descripcion      text not null,
    tags             text[] not null default '{}',
    formatos         text[] not null default '{CSV,JSON}',
    licencia         text not null default 'CC-BY-4.0',
    publicado        date not null,
    actualizado      date not null,
    endpoint         text not null,
    total_registros  integer not null default 0,
    fuente_id        text references fuentes(id)
);

-- ============== Audit log (trazabilidad inmutable) ==============
-- Cada cambio en cualquier tabla pública genera un registro con hash.
create table if not exists audit_log (
    id           uuid primary key default uuid_generate_v4(),
    actor        text not null,         -- user id o "system"
    accion       text not null check (accion in ('insert','update','delete')),
    tabla        text not null,
    registro_id  text not null,
    payload      jsonb not null,
    hash         text not null,         -- SHA-256(payload)
    creado_en    timestamptz not null default now()
);

create index if not exists idx_audit_tabla_registro on audit_log(tabla, registro_id);

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================
-- Lectura pública (anon) para tablas de transparencia.
-- Escritura solo para roles autenticados con el claim adecuado.

alter table fuentes enable row level security;
alter table partidas_presupuesto enable row level security;
alter table personal_municipal enable row level security;
alter table datasets enable row level security;
alter table audit_log enable row level security;

-- Lectura pública
create policy if not exists "Lectura pública fuentes" on fuentes
    for select using (true);
create policy if not exists "Lectura pública presupuesto" on partidas_presupuesto
    for select using (true);
create policy if not exists "Lectura pública personal" on personal_municipal
    for select using (true);
create policy if not exists "Lectura pública datasets" on datasets
    for select using (true);

-- Escritura solo administradores autenticados
create policy if not exists "Escritura admin presupuesto" on partidas_presupuesto
    for all using (auth.role() = 'authenticated' and auth.jwt() ->> 'role' = 'admin')
    with check (auth.role() = 'authenticated' and auth.jwt() ->> 'role' = 'admin');

create policy if not exists "Escritura admin personal" on personal_municipal
    for all using (auth.role() = 'authenticated' and auth.jwt() ->> 'role' = 'admin')
    with check (auth.role() = 'authenticated' and auth.jwt() ->> 'role' = 'admin');

-- audit_log: append-only (sin update ni delete)
create policy if not exists "Audit insert" on audit_log
    for insert with check (true);
-- (Sin policy de select para anon: el log es admin-only.)

-- =====================================================================
-- TRIGGER de auditoría automática
-- =====================================================================
create or replace function fn_audit_change() returns trigger as $$
declare
    payload jsonb;
    h text;
begin
    payload := to_jsonb(coalesce(NEW, OLD));
    h := encode(digest(payload::text, 'sha256'), 'hex');
    insert into audit_log (actor, accion, tabla, registro_id, payload, hash)
    values (
        coalesce(current_setting('app.actor', true), 'system'),
        TG_OP::text,
        TG_TABLE_NAME::text,
        coalesce((payload ->> 'id'), 'unknown'),
        payload,
        h
    );
    return coalesce(NEW, OLD);
end;
$$ language plpgsql security definer;

drop trigger if exists tg_audit_partidas on partidas_presupuesto;
create trigger tg_audit_partidas
after insert or update or delete on partidas_presupuesto
for each row execute function fn_audit_change();

drop trigger if exists tg_audit_personal on personal_municipal;
create trigger tg_audit_personal
after insert or update or delete on personal_municipal
for each row execute function fn_audit_change();

-- =====================================================================
-- Comentarios documentales
-- =====================================================================
comment on table partidas_presupuesto is
    'Partidas del Presupuesto Municipal por ejercicio. La columna `verificado` indica si la fila está respaldada por documento oficial publicado.';
comment on table personal_municipal is
    'Padrón de personal de planta política. Solo cargos públicos; los datos personales sensibles no se almacenan acá.';
comment on table audit_log is
    'Registro inmutable de cambios. Cada fila incluye SHA-256 del payload para verificar integridad histórica.';
