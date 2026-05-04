-- =====================================================================
-- Migration 0006 — Suscripciones a Alertas Ciudadanas
-- =====================================================================
-- Tabla central para persistir las suscripciones del módulo /suscripciones.
-- Cada vecino puede suscribirse a 1+ categorías de alertas. Cada categoría
-- puede tener filtros propios (guardados como JSONB libre).
--
-- Diseño:
--   - email O whatsapp (al menos uno requerido, el otro puede ser NULL)
--   - categorias: array de strings ('contrataciones', 'concejo', etc.)
--   - filtros: JSONB con un objeto por categoría
--   - confirmada: boolean. Las nuevas entran como FALSE; un click en el link
--     opt-in que llega por email/WhatsApp la marca TRUE.
--   - token_optin: string secreto que va en el link de confirmación.
--   - revocada_en: timestamp cuando el usuario se da de baja.
--
-- RLS:
--   - SELECT: nadie desde anon (privacidad). Solo service_role lee.
--   - INSERT: anon puede insertar (necesario para el formulario público).
--   - UPDATE: solo service_role (el endpoint /api/v1/suscripciones/confirmar
--     marca confirmada=true después de validar el token).
--   - DELETE: nunca. Para "borrar" usamos revocada_en.
--
-- Privacidad por diseño:
--   - No guardamos ip ni user-agent ni nada del visitante salvo lo necesario.
--   - Los emails/whatsapps están sin hashear (necesario para enviarles).
--   - Cumple Ley 25.326: doble opt-in, opt-out en un click, no se ceden a terceros.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ============== TABLA PRINCIPAL ================================
create table if not exists suscripciones_alertas (
    id              uuid primary key default gen_random_uuid(),
    email           text,
    whatsapp        text,
    categorias      text[] not null default '{}',
    filtros         jsonb  not null default '{}'::jsonb,
    confirmada      boolean not null default false,
    token_optin     text not null,
    creada_en       timestamptz not null default now(),
    confirmada_en   timestamptz,
    revocada_en     timestamptz,

    -- Al menos un canal:
    constraint chk_al_menos_un_canal
        check (email is not null or whatsapp is not null),

    -- Email con shape básico (regex simple, no perfecto pero filtra ruido):
    constraint chk_email_shape
        check (email is null or email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),

    -- Token opt-in: hex de 32 caracteres (16 bytes), suficiente entropía:
    constraint chk_token_optin_shape
        check (length(token_optin) >= 16)
);

-- Índices útiles para consultas frecuentes:
create index if not exists idx_suscripciones_email on suscripciones_alertas (email)
    where revocada_en is null;
create index if not exists idx_suscripciones_whatsapp on suscripciones_alertas (whatsapp)
    where revocada_en is null;
create index if not exists idx_suscripciones_confirmada on suscripciones_alertas (confirmada)
    where confirmada = true and revocada_en is null;

-- ============== ROW LEVEL SECURITY ================================
alter table suscripciones_alertas enable row level security;

-- Limpieza de policies previas si existieran (idempotencia):
drop policy if exists susc_insert_anon on suscripciones_alertas;
drop policy if exists susc_select_service on suscripciones_alertas;
drop policy if exists susc_update_service on suscripciones_alertas;
drop policy if exists susc_no_delete on suscripciones_alertas;

-- INSERT: cualquiera (rol anon o authenticated) puede insertar.
-- El endpoint público /api/v1/suscripciones inserta usando el cliente anon.
create policy susc_insert_anon
    on suscripciones_alertas
    for insert
    to anon, authenticated
    with check (true);

-- SELECT: NADIE desde anon. Solo service_role (que bypassa RLS)
-- puede leer. Esto protege la lista de suscriptores.
create policy susc_select_service
    on suscripciones_alertas
    for select
    to authenticated
    using (false);

-- UPDATE: nadie desde anon/authenticated. Solo service_role (el endpoint
-- /api/v1/suscripciones/confirmar marca confirmada=true tras validar token).
create policy susc_update_service
    on suscripciones_alertas
    for update
    to authenticated
    using (false);

-- DELETE: nunca. Para "borrar" usamos revocada_en (auditabilidad).
create policy susc_no_delete
    on suscripciones_alertas
    for delete
    to anon, authenticated
    using (false);

-- ============== VISTAS PÚBLICAS DE TRANSPARENCIA ==============
-- Esta vista expone agregados (no contactos) para mostrar al ciudadano
-- "cuántas personas ya están suscriptas" — refuerza credibilidad sin
-- comprometer privacidad.
create or replace view v_suscripciones_agregadas as
select
    unnest(categorias) as categoria,
    count(*) filter (where confirmada and revocada_en is null) as suscriptores_activos,
    count(*) filter (where not confirmada and revocada_en is null) as pendientes_confirmacion
from suscripciones_alertas
group by unnest(categorias);

-- Permitir que anon lea solo la vista agregada (no la tabla cruda):
grant select on v_suscripciones_agregadas to anon, authenticated;

-- =====================================================================
-- FIN DE LA MIGRACIÓN
-- =====================================================================
-- Para verificar:
--   select * from suscripciones_alertas limit 1;
--   select * from v_suscripciones_agregadas;
-- =====================================================================
