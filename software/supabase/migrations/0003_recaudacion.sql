-- =====================================================================
-- 0003_recaudacion.sql
-- Módulo de Recaudación Municipal — Cálculo de Recursos
-- =====================================================================

do $$ begin
  create type categoria_recurso as enum (
    'tributarios_propios',
    'no_tributarios_propios',
    'coparticipacion_provincial',
    'coparticipacion_nacional',
    'recursos_capital'
  );
exception when duplicate_object then null; end $$;

-- =====================================================================
-- Recursos del presupuesto (income side)
-- =====================================================================
create table if not exists recursos_presupuesto (
    id                text primary key,
    categoria         categoria_recurso not null,
    nombre            text not null,
    descripcion       text not null,
    contraprestacion  text,                          -- aplica a tributarios_propios
    presupuestado_ars numeric(18,2) not null,
    recaudado_ars     numeric(18,2),
    ejercicio         integer not null,
    verificado        boolean not null default false,
    fuente_id         text references fuentes(id),
    creado_en         timestamptz not null default now(),
    actualizado_en    timestamptz not null default now()
);

create index if not exists idx_recursos_categoria on recursos_presupuesto(categoria);
create index if not exists idx_recursos_ejercicio on recursos_presupuesto(ejercicio);

-- =====================================================================
-- Vista materializada de KPIs (autonomía fiscal, dependencia copartip.)
-- =====================================================================
create or replace view v_kpis_recaudacion as
select
    ejercicio,
    sum(presupuestado_ars) filter (
        where categoria in ('tributarios_propios','no_tributarios_propios')
    ) as recursos_propios,
    sum(presupuestado_ars) filter (
        where categoria in ('coparticipacion_provincial','coparticipacion_nacional')
    ) as coparticipacion,
    sum(presupuestado_ars) filter (
        where categoria <> 'recursos_capital'
    ) as recursos_corrientes,
    sum(presupuestado_ars) filter (
        where categoria = 'recursos_capital'
    ) as recursos_capital,
    -- Indicadores derivados
    round(
        100.0 * sum(presupuestado_ars) filter (
            where categoria in ('tributarios_propios','no_tributarios_propios')
        ) / nullif(sum(presupuestado_ars) filter (
            where categoria <> 'recursos_capital'
        ), 0),
        2
    ) as porcentaje_autonomia_fiscal,
    round(
        100.0 * sum(presupuestado_ars) filter (
            where categoria in ('coparticipacion_provincial','coparticipacion_nacional')
        ) / nullif(sum(presupuestado_ars) filter (
            where categoria <> 'recursos_capital'
        ), 0),
        2
    ) as porcentaje_dependencia_coparticipacion
from recursos_presupuesto
group by ejercicio;

-- =====================================================================
-- RLS — lectura pública, escritura admin
-- =====================================================================
alter table recursos_presupuesto enable row level security;

create policy "Lectura pública recursos" on recursos_presupuesto
    for select using (true);

create policy "Escritura admin recursos" on recursos_presupuesto
    for all using (auth.role() = 'authenticated' and auth.jwt() ->> 'role' = 'admin')
    with check (auth.role() = 'authenticated' and auth.jwt() ->> 'role' = 'admin');

-- =====================================================================
-- Trigger de auditoría inmutable
-- =====================================================================
drop trigger if exists tg_audit_recursos on recursos_presupuesto;
create trigger tg_audit_recursos
after insert or update or delete on recursos_presupuesto
for each row execute function fn_audit_change();

comment on table recursos_presupuesto is
    'Cálculo de Recursos del Presupuesto Municipal. Distingue tributos locales (con contraprestación específica) de impuestos coparticipados (sin contraprestación específica) — distinción jurídica clave del régimen federal argentino.';
comment on column recursos_presupuesto.contraprestacion is
    'Servicio o beneficio específico que el contribuyente recibe a cambio del tributo. Es lo que jurídicamente diferencia una tasa municipal de un impuesto.';
