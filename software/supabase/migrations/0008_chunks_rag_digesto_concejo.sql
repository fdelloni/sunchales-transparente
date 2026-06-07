-- ============================================================
-- Sunchales Transparente — Migracion 0008: fuente_tipo 'digesto-concejo'
-- ============================================================
-- Junio 2026: se suma el digesto del Concejo Municipal (normativa local:
-- minutas de comunicacion, declaraciones, ordenanzas, resoluciones y
-- decretos del Concejo, scrapeado de concejosunchales.gob.ar) como fuente
-- del RAG, incluyendo textos completos extraidos de los PDFs.
--
-- El CHECK de la migracion 0007 no incluia este tipo, por lo que TODOS los
-- inserts de la fuente nueva rebotaban con error 23514 (descubierto en el
-- reindex del 2026-06-06). Mismo patron que 0007: DROP del CHECK existente
-- y ADD con la lista completa.
-- ============================================================

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
    -- Mayo 2026 (migracion 0007)
    'concejo',
    'juzgado',
    'brecha',
    'catastro',
    'zonificacion',
    'licencias',
    'recaudacion',
    -- Junio 2026
    'digesto-concejo'  -- digesto del Concejo Municipal (normativa local + textos de PDFs)
  ));
