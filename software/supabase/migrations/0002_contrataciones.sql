-- =====================================================================
-- 0002_contrataciones.sql
-- Módulo de Licitaciones, Contrataciones Directas y Suscripciones a alertas
-- =====================================================================

-- ENUMS
do $$ begin
  create type procedimiento_tipo as enum (
    'licitacion_publica',
    'licitacion_privada',
    'concurso_precios',
    'contratacion_directa'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type contratacion_estado as enum (
    'preparacion','convocatoria','apertura','evaluacion','adjudicacion',
    'ejecucion','ampliacion','cierre','desierta','fracasada','cancelada'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type contratacion_categoria as enum (
    'obra_publica','bienes','servicios','consultoria','alquileres','informatica'
  );
exception when duplicate_object then null; end $$;

-- =====================================================================
-- Contrataciones (proceso administrativo)
-- =====================================================================
create table if not exists contrataciones (
    id                       text primary key,
    expediente               text not null,
    ejercicio                integer not null,
    procedimiento            procedimiento_tipo not null,
    numero                   text not null,
    objeto                   text not null,
    categoria                contratacion_categoria not null,
    area                     text not null,
    presupuesto_oficial_ars  numeric(18,2) not null,
    estado                   contratacion_estado not null,
    fecha_apertura           timestamptz,
    fecha_adjudicacion       timestamptz,
    adjudicatario_cuit       text,
    adjudicatario_razon      text,
    monto_adjudicado_ars     numeric(18,2),
    creado_en                timestamptz not null default now(),
    actualizado_en           timestamptz not null default now(),
    verificado               boolean not null default false,
    fuente_id                text references fuentes(id),
    unique (expediente, ejercicio)
);

create index if not exists idx_contrat_estado on contrataciones(estado);
create index if not exists idx_contrat_categoria on contrataciones(categoria);
create index if not exists idx_contrat_proc on contrataciones(procedimiento);

-- =====================================================================
-- Oferentes (relación N a 1)
-- =====================================================================
create table if not exists oferentes (
    id              uuid primary key default uuid_generate_v4(),
    contratacion_id text not null references contrataciones(id) on delete cascade,
    cuit            text not null,
    razon_social    text not null,
    monto_ars       numeric(18,2) not null,
    observaciones   text
);

-- =====================================================================
-- Pagos
-- =====================================================================
create table if not exists pagos_contratacion (
    id              uuid primary key default uuid_generate_v4(),
    contratacion_id text not null references contrataciones(id) on delete cascade,
    fecha           timestamptz not null,
    monto_ars       numeric(18,2) not null,
    orden           text not null
);

-- =====================================================================
-- Documentos del expediente (no almacena el archivo binario; sólo metadata + hash)
-- =====================================================================
create table if not exists documentos_contratacion (
    id              uuid primary key default uuid_generate_v4(),
    contratacion_id text not null references contrataciones(id) on delete cascade,
    nombre          text not null,
    tipo            text not null,
    publicado       timestamptz not null,
    bytes           integer not null,
    sha256          text not null      -- hash del archivo: permite verificar integridad sin almacenar el archivo
);

-- =====================================================================
-- Eventos del expediente (HASH-CHAIN inmutable)
-- =====================================================================
-- Cada fila es un evento sellado:
--   hash = SHA-256( canonical({ id, ts, tipo, actor, payload, hash_previo }) )
-- El primer evento de cada contratación referencia un hash génesis
-- determinístico calculado desde (expediente, ejercicio).
create table if not exists eventos_contratacion (
    id              text not null,
    contratacion_id text not null references contrataciones(id) on delete restrict,
    ts              timestamptz not null,
    tipo            text not null,
    actor           text not null,
    payload         jsonb not null,
    hash_previo     text not null,
    hash            text not null,
    primary key (contratacion_id, id)
);

create index if not exists idx_evcontrat_ts on eventos_contratacion(contratacion_id, ts);

-- Constraint anti-tampering: una vez insertado, no se permite UPDATE ni DELETE.
create or replace function fn_eventos_inmutables() returns trigger as $$
begin
    raise exception 'Eventos de contratación son inmutables (append-only).';
end;
$$ language plpgsql;

drop trigger if exists tg_inmutable_update on eventos_contratacion;
create trigger tg_inmutable_update
before update on eventos_contratacion
for each row execute function fn_eventos_inmutables();

drop trigger if exists tg_inmutable_delete on eventos_contratacion;
create trigger tg_inmutable_delete
before delete on eventos_contratacion
for each row execute function fn_eventos_inmutables();

-- =====================================================================
-- Suscripciones a alertas (opt-in con doble confirmación)
-- =====================================================================
create table if not exists suscripciones_alertas (
    id              uuid primary key default uuid_generate_v4(),
    email           text,
    whatsapp        text,
    filtros         jsonb not null default '{}'::jsonb,
    estado          text not null default 'pendiente_confirmacion'
                    check (estado in ('pendiente_confirmacion','activa','baja')),
    token_optin     text not null,
    creada_en       timestamptz not null default now(),
    confirmada_en   timestamptz,
    baja_en         timestamptz,
    check (email is not null or whatsapp is not null)
);

create index if not exists idx_susc_estado on suscripciones_alertas(estado);

-- =====================================================================
-- Cola de notificaciones pendientes (la procesa el despachador)
-- =====================================================================
create table if not exists cola_notificaciones (
    id              uuid primary key default uuid_generate_v4(),
    suscripcion_id  uuid not null references suscripciones_alertas(id) on delete cascade,
    contratacion_id text not null references contrataciones(id) on delete cascade,
    canal           text not null check (canal in ('email','whatsapp')),
    estado          text not null default 'pendiente'
                    check (estado in ('pendiente','enviada','fallida')),
    intentos        integer not null default 0,
    creada_en       timestamptz not null default now(),
    enviada_en      timestamptz,
    error           text
);

create index if not exists idx_cola_pendiente on cola_notificaciones(estado) where estado = 'pendiente';

-- =====================================================================
-- RLS
-- =====================================================================
alter table contrataciones enable row level security;
alter table oferentes enable row level security;
alter table pagos_contratacion enable row level security;
alter table documentos_contratacion enable row level security;
alter table eventos_contratacion enable row level security;
alter table suscripciones_alertas enable row level security;
alter table cola_notificaciones enable row level security;

-- Lectura pública para módulo de transparencia
create policy if not exists "Lectura pública contrataciones" on contrataciones
    for select using (true);
create policy if not exists "Lectura pública oferentes" on oferentes
    for select using (true);
create policy if not exists "Lectura pública pagos" on pagos_contratacion
    for select using (true);
create policy if not exists "Lectura pública documentos" on documentos_contratacion
    for select using (true);
create policy if not exists "Lectura pública eventos" on eventos_contratacion
    for select using (true);

-- Suscripciones: cada usuario solo ve la suya (vía token).
-- El despachador (rol service_role) puede leer todo para enviar.
create policy if not exists "Suscripcion propia por token" on suscripciones_alertas
    for select using (auth.jwt() ->> 'sub_id' = id::text);

-- Cola: solo despachador
create policy if not exists "Cola admin" on cola_notificaciones
    for all using (auth.role() = 'service_role');

-- =====================================================================
-- Trigger: cuando se publica una nueva contratación o cambia su estado a 'convocatoria',
-- encolar notificaciones para todas las suscripciones activas con filtros coincidentes.
-- =====================================================================
create or replace function fn_notify_nueva_publicacion() returns trigger as $$
declare
    s record;
    f jsonb;
begin
    if TG_OP = 'INSERT' or (TG_OP = 'UPDATE' and OLD.estado is distinct from NEW.estado and NEW.estado = 'convocatoria') then
        for s in select * from suscripciones_alertas where estado = 'activa' loop
            f := s.filtros;
            -- Coincidencia simple. (En prod se puede afinar con jsonb_path_exists.)
            if (
                (f->'procedimientos' is null or f->'procedimientos' @> to_jsonb(NEW.procedimiento::text))
                and (f->'categorias' is null or f->'categorias' @> to_jsonb(NEW.categoria::text))
                and (coalesce((f->>'montoMinimo')::numeric, 0) <= NEW.presupuesto_oficial_ars)
            ) then
                if s.email is not null then
                    insert into cola_notificaciones(suscripcion_id, contratacion_id, canal)
                    values (s.id, NEW.id, 'email');
                end if;
                if s.whatsapp is not null then
                    insert into cola_notificaciones(suscripcion_id, contratacion_id, canal)
                    values (s.id, NEW.id, 'whatsapp');
                end if;
            end if;
        end loop;
    end if;
    return NEW;
end;
$$ language plpgsql security definer;

drop trigger if exists tg_notify_publicacion on contrataciones;
create trigger tg_notify_publicacion
after insert or update on contrataciones
for each row execute function fn_notify_nueva_publicacion();

-- =====================================================================
-- Comentarios documentales
-- =====================================================================
comment on table contrataciones is
    'Procesos de contratación administrativa: licitaciones públicas, privadas, concursos de precios y contrataciones directas.';
comment on table eventos_contratacion is
    'Cadena hash-chain inmutable de eventos del expediente. Cada fila vincula con la anterior vía hash_previo. La cadena puede recalcularse en el navegador del ciudadano para verificar integridad sin necesidad de confiar en el servidor.';
comment on table suscripciones_alertas is
    'Suscripciones opt-in para alertas por email o WhatsApp. La activación requiere confirmar el token enviado al canal elegido.';
comment on table cola_notificaciones is
    'Cola interna de notificaciones por enviar. La procesa el despachador (función Edge o cron job) que llama a los proveedores de email/WhatsApp.';
