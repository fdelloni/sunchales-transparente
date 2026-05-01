-- =====================================================================
-- Sunchales Transparente — Migracion 0003: chatbot WhatsApp
-- =====================================================================
-- Crea las tablas necesarias para:
--   1. wa_sesiones      → estado conversacional persistente entre lambdas
--   2. wa_mensajes_log  → trazabilidad de cada mensaje (in/out)
--   3. reclamos_ciudadanos → reclamos abiertos desde el bot
--
-- Diseno alineado con principios del proyecto:
--   - PII minima (numero de WhatsApp + nombre publico, nada mas)
--   - RLS estricto: el ciudadano solo ve sus propios reclamos via numero de caso
--   - audit_log heredado (trigger fn_audit_change ya creado en 0001)
-- =====================================================================

-- ============== Sesiones conversacionales ==============
create table if not exists wa_sesiones (
    from_number       text primary key,                 -- "whatsapp:+5493493xxxxxx"
    intent_activo     text,                             -- menu | faq | transparencia | reclamo | ia | null
    paso_reclamo      text,                             -- esperando_categoria | ... | null
    reclamo_borrador  jsonb not null default '{}'::jsonb,
    creado_en         timestamptz not null default now(),
    actualizado_en    timestamptz not null default now()
);

create index if not exists idx_wa_sesiones_actualizado on wa_sesiones(actualizado_en);

-- TTL: limpieza periodica de sesiones inactivas (>2h).
-- Se puede ejecutar via Supabase Cron / pg_cron, o desde un job propio.
-- Acá dejamos la funcion preparada.
create or replace function fn_purgar_wa_sesiones_inactivas() returns int as $$
declare
    eliminadas int;
begin
    delete from wa_sesiones
    where actualizado_en < now() - interval '2 hours';
    get diagnostics eliminadas = row_count;
    return eliminadas;
end;
$$ language plpgsql security definer;

-- ============== Log de mensajes (auditoria conversacional) ==============
create table if not exists wa_mensajes_log (
    id              uuid primary key default uuid_generate_v4(),
    from_number     text not null,
    to_number       text not null,
    direccion       text not null check (direccion in ('entrante','saliente')),
    cuerpo          text not null,
    intent          text,
    creado_en       timestamptz not null default now()
);

create index if not exists idx_wa_log_from on wa_mensajes_log(from_number, creado_en desc);

-- ============== Reclamos ciudadanos ==============
create table if not exists reclamos_ciudadanos (
    id                uuid primary key default uuid_generate_v4(),
    numero_caso       text not null unique,             -- ej R-2026-AB23CD
    from_number       text not null,
    nombre_contacto   text not null,
    categoria         text not null,
    descripcion       text not null,
    direccion         text not null,
    estado            text not null default 'recibido'  -- recibido | en_curso | resuelto | desestimado
                      check (estado in ('recibido','en_curso','resuelto','desestimado')),
    canal             text not null default 'whatsapp'
                      check (canal in ('whatsapp','web','presencial','telefono')),
    asignado_a        text,                             -- area municipal asignada
    nota_resolucion   text,
    creado_en         timestamptz not null default now(),
    actualizado_en    timestamptz not null default now()
);

create index if not exists idx_reclamos_estado on reclamos_ciudadanos(estado);
create index if not exists idx_reclamos_categoria on reclamos_ciudadanos(categoria);
create index if not exists idx_reclamos_from on reclamos_ciudadanos(from_number);

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================
alter table wa_sesiones enable row level security;
alter table wa_mensajes_log enable row level security;
alter table reclamos_ciudadanos enable row level security;

-- wa_sesiones y log: NO accesibles desde anon (es estado interno del bot).
-- Solo se accede via service_role desde el webhook (que bypassea RLS).
-- No definimos policies para anon ⇒ deny por default.

-- reclamos_ciudadanos:
--   - Lectura publica de la version anonimizada (ver vista mas abajo).
--   - Lectura completa solo para admin autenticado.
--   - Insert solo para service_role (el bot).
create policy if not exists "Reclamos: insert solo service_role"
    on reclamos_ciudadanos
    for insert
    with check (auth.role() = 'service_role');

create policy if not exists "Reclamos: lectura admin"
    on reclamos_ciudadanos
    for select
    using (auth.role() = 'authenticated' and auth.jwt() ->> 'role' = 'admin');

create policy if not exists "Reclamos: update admin"
    on reclamos_ciudadanos
    for update
    using (auth.role() = 'authenticated' and auth.jwt() ->> 'role' = 'admin')
    with check (auth.role() = 'authenticated' and auth.jwt() ->> 'role' = 'admin');

-- ============== Vista publica anonimizada ==============
-- Para que el portal de transparencia muestre estadisticas sin exponer
-- numeros de telefono ni datos personales.
create or replace view reclamos_publicos as
select
    numero_caso,
    categoria,
    direccion,
    estado,
    canal,
    creado_en,
    actualizado_en,
    case when nota_resolucion is not null then true else false end as tiene_resolucion
from reclamos_ciudadanos;

grant select on reclamos_publicos to anon;
grant select on reclamos_publicos to authenticated;

-- ============== Trigger de auditoria ==============
drop trigger if exists tg_audit_reclamos on reclamos_ciudadanos;
create trigger tg_audit_reclamos
after insert or update or delete on reclamos_ciudadanos
for each row execute function fn_audit_change();

-- ============== Comentarios documentales ==============
comment on table reclamos_ciudadanos is
    'Reclamos abiertos por ciudadanos a través de cualquier canal (chatbot, web, telefónico, presencial). PII mínima: solo número de contacto y nombre público.';
comment on table wa_sesiones is
    'Estado conversacional del chatbot WhatsApp. Se purga automáticamente después de 2 hs de inactividad.';
comment on view reclamos_publicos is
    'Vista anonimizada para portal de transparencia. NO incluye PII (sin from_number, sin nombre).';
