-- =====================================================================
-- Sunchales Transparente — Migracion 0004: RAG con pgvector
-- =====================================================================
-- Habilita la extension pgvector y crea la tabla `chunks_rag` que
-- almacena los fragmentos vectorizados de toda la documentacion publica
-- del municipio (Digesto, presupuesto, personal, contrataciones, FAQ,
-- actas y resumenes del Concejo, etc.).
--
-- El handler IA del chatbot (src/lib/whatsapp/handlers/ia.ts) consulta
-- esta tabla con similarity search para construir contexto dinamico
-- antes de llamar a Gemini 2.5 Flash.
--
-- Embeddings:
--   - Modelo: Google Gemini text-embedding-004
--   - Dimensiones: 768
--   - Distancia: cosine (vector_cosine_ops)
-- =====================================================================

create extension if not exists vector;

-- ============== Tabla maestra de chunks ==============
create table if not exists chunks_rag (
    id              uuid primary key default uuid_generate_v4(),
    fuente_tipo     text not null
                    check (fuente_tipo in (
                        'digesto',           -- norma del Digesto oficial
                        'pdf-concejo',       -- acta o documento PDF del Concejo
                        'resumen-anual',     -- resumen anual de gestion
                        'funcionario',       -- ficha del organigrama municipal
                        'presupuesto',       -- partida presupuestaria
                        'contratacion',      -- compulsa o licitacion publica
                        'faq',               -- entrada del catalogo FAQ del bot
                        'normativa-marco'    -- marco normativo general (Ley 26.037, etc.)
                    )),
    fuente_id       text not null,           -- id estable del documento origen
    fuente_titulo   text not null,           -- titulo legible (ej "Ord. 1872/2009 - ...")
    fuente_url      text,                    -- link publico cuando exista
    fuente_fecha    date,                    -- cuando aplica
    chunk_idx       integer not null,        -- 0..N por documento
    texto           text not null,           -- contenido textual del chunk
    metadata        jsonb not null default '{}'::jsonb,
    embedding       vector(768),             -- nullable: se setea al vectorizar
    hash_origen     text,                    -- SHA-256 del documento padre, para detectar cambios
    creado_en       timestamptz not null default now(),
    actualizado_en  timestamptz not null default now(),
    unique(fuente_tipo, fuente_id, chunk_idx)
);

-- ============== Indices ==============

-- HNSW para similarity search (cosine). Parametros default; tuneable
-- mas adelante si el dataset crece mucho.
create index if not exists idx_chunks_rag_embedding
    on chunks_rag using hnsw (embedding vector_cosine_ops);

-- Filtros frecuentes
create index if not exists idx_chunks_rag_fuente_tipo
    on chunks_rag(fuente_tipo);

create index if not exists idx_chunks_rag_fuente_id
    on chunks_rag(fuente_tipo, fuente_id);

create index if not exists idx_chunks_rag_hash
    on chunks_rag(hash_origen);

-- ============== Funcion de busqueda RPC ==============
-- Expuesta via Supabase RPC para que el cliente JS la llame con tipos.
-- Retorna los top-K chunks mas similares al embedding consultado.
create or replace function match_chunks_rag(
    query_embedding vector(768),
    match_count integer default 5,
    filter_tipo text default null,
    threshold double precision default 0.5
)
returns table (
    id uuid,
    fuente_tipo text,
    fuente_id text,
    fuente_titulo text,
    fuente_url text,
    fuente_fecha date,
    chunk_idx integer,
    texto text,
    metadata jsonb,
    similarity double precision
)
language sql
stable
as $$
    select
        c.id,
        c.fuente_tipo,
        c.fuente_id,
        c.fuente_titulo,
        c.fuente_url,
        c.fuente_fecha,
        c.chunk_idx,
        c.texto,
        c.metadata,
        1 - (c.embedding <=> query_embedding) as similarity
    from chunks_rag c
    where c.embedding is not null
      and (filter_tipo is null or c.fuente_tipo = filter_tipo)
      and (1 - (c.embedding <=> query_embedding)) >= threshold
    order by c.embedding <=> query_embedding asc
    limit match_count;
$$;

-- ============== ROW LEVEL SECURITY ==============
alter table chunks_rag enable row level security;

-- Lectura publica: la informacion indexada es 100% publica por diseno.
create policy if not exists "Lectura publica chunks_rag"
    on chunks_rag for select
    using (true);

-- Escritura solo service_role (el indexer corre con service_role key).
create policy if not exists "Escritura admin chunks_rag"
    on chunks_rag for all
    using (auth.role() = 'service_role')
    with check (auth.role() = 'service_role');

-- ============== Trigger updated_at ==============
create or replace function fn_set_actualizado_en() returns trigger as $$
begin
    new.actualizado_en = now();
    return new;
end;
$$ language plpgsql;

drop trigger if exists tg_chunks_rag_actualizado_en on chunks_rag;
create trigger tg_chunks_rag_actualizado_en
before update on chunks_rag
for each row execute function fn_set_actualizado_en();

-- ============== Comentarios documentales ==============
comment on table chunks_rag is
    'Fragmentos vectorizados de documentacion publica municipal. Usado por el chatbot WhatsApp para retrieval-augmented generation con Gemini 2.5 Flash.';
comment on column chunks_rag.embedding is
    'Vector 768-dim generado con Gemini text-embedding-004. NULL hasta que el indexer lo procesa.';
comment on column chunks_rag.hash_origen is
    'SHA-256 del documento padre completo. Permite detectar cambios e indexar incrementalmente.';
comment on function match_chunks_rag is
    'Devuelve los top-K chunks mas similares al embedding dado, opcionalmente filtrados por tipo de fuente.';
