-- ============================================================
-- Sunchales Transparente — Migracion 0007: ampliar fuente_tipo de chunks_rag
-- ============================================================
-- La tabla chunks_rag (migracion 0004) tenia un CHECK constraint que solo
-- permitia 8 tipos:
--   digesto, pdf-concejo, resumen-anual, funcionario, presupuesto,
--   contratacion, faq, normativa-marco
--
-- Mayo 2026 sumamos 7 rubros nuevos al indexer (sincronizados desde los .ts
-- canonicos del repo): concejo, juzgado, brecha, catastro, zonificacion,
-- licencias, recaudacion.
--
-- Esta migracion DROPea el CHECK viejo y agrega uno nuevo con la lista
-- completa. Si en el futuro se suman mas rubros, agregar la nueva migracion
-- con el mismo patron.
-- ============================================================

-- DROP del CHECK viejo. Usamos DO PL/pgSQL para no depender del nombre
-- exacto del constraint (Postgres genera un nombre automatico al crear el
-- CHECK inline; otros entornos podrian haber cambiado el nombre).
do $$
declare
  cname text;
begin
  for cname in
    select conname
    from pg_constraint
    where conrelid = 'chunks_rag'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) like '%fuente_tipo%'
  loop
    execute format('alter table chunks_rag drop constraint %I', cname);
  end loop;
end $$;

-- ADD del nuevo CHECK con la lista ampliada.
alter table chunks_rag
  add constraint chunks_rag_fuente_tipo_check
  check (fuente_tipo in (
    -- Originales (migracion 0004)
    'digesto',
    'pdf-concejo',
    'resumen-anual',
    'funcionario',
    'presupuesto',
    'contratacion',
    'faq',
    'normativa-marco',
    -- Nuevos (mayo 2026)
    'concejo',         -- Concejo Municipal: concejales, comisiones, personal
    'juzgado',         -- Juzgado Municipal de Faltas
    'brecha',          -- brechas de transparencia declaradas
    'catastro',        -- normas catastrales + oficina + tramites
    'zonificacion',    -- zonificacion urbana y plano de areas
    'licencias',       -- licencias de conducir (CETOS)
    'recaudacion'      -- calculo de recursos y tributos locales
  ));
