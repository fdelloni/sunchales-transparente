# GitHub Actions del proyecto

## `reindex-rag.yml` — Reindex automático del corpus RAG

Cada vez que se hace push a `main` con cambios en datos institucionales (padrón
de funcionarios, presupuesto, FAQ, PDFs del Concejo, ítems del Digesto) o en el
indexer mismo, este workflow:

1. Sincroniza los `.ts` a JSON (`npm run sincronizar-datos`).
2. Corre el indexer incremental (`node scripts/indexar-rag.mjs`), que reprocesa
   por hash SHA-256 solo los documentos que cambiaron.

El resultado es que **el chatbot WhatsApp y el chat web del sitio se mantienen
siempre al día** sin intervención manual.

### Configuración inicial (una sola vez)

En GitHub: **Settings → Secrets and variables → Actions → New repository secret**.

Crear estos tres secrets con los mismos valores que ya están en `.env.local`:

| Nombre | Valor |
| --- | --- |
| `GOOGLE_API_KEY` | API key de Google AI Studio (la misma que usa Gemini en producción) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL de la instancia Supabase del proyecto |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-role key de Supabase (NO la `anon`) |

Importante: el `SUPABASE_SERVICE_ROLE_KEY` permite escritura completa en la base.
Mantenerlo solo como secret de GitHub, nunca commitearlo.

### Disparos manuales

Desde **Actions → Reindex RAG (Supabase pgvector) → Run workflow** podés:

- Correr un reindex incremental ad-hoc (mismo efecto que un push).
- Hacer reset completo del corpus marcando la opción `reset = true`.
  Esto borra toda la tabla `chunks_rag` y reindexa desde cero (~1-2 horas).
- Indexar solo una fuente seleccionando `solo` (funcionario, presupuesto, faq, etc.).

### Verificar que funcionó

Después de cada run podés revisar en Supabase:

```sql
SELECT fuente_tipo, COUNT(*) AS chunks, MAX(updated_at) AS ultima_actualizacion
FROM chunks_rag
GROUP BY fuente_tipo
ORDER BY fuente_tipo;
```

Y probar una pregunta nueva en el chat web (`ciudadan.com/`) o en el bot WhatsApp.
Como ambos consultan la misma tabla, el resultado debe coincidir.

## `scrape-fuentes.yml` — Scrape diario de fuentes municipales

Todos los días a las **06:00 ART (09:00 UTC)** este workflow lee los portales
públicos del Municipio y del Concejo, y si algo cambió desde el último corrida,
commitea los `.generated.ts` actualizados a `main`. Ese commit dispara
automáticamente `reindex-rag.yml` por matching de paths, de modo que el chat
web y el bot de WhatsApp reflejan la novedad sin intervención manual.

Scrapers livianos que corre (todos contra fuentes públicas, sin auth):

| Scraper | Fuente | Archivo generado |
| --- | --- | --- |
| `scrapear-publicaciones-concejo` | `concejosunchales.gob.ar` (boletines + resúmenes) | `src/lib/data/publicaciones-concejo.generated.ts` |
| `scrapear-licitaciones` | `sunchales.gob.ar` | `src/lib/data/licitaciones.generated.ts` |
| `scrapear-digesto-concejo` | `concejosunchales.gob.ar` (digesto) | `src/lib/data/digesto-concejo.generated.ts` |
| `scrapear-remuneraciones` | `sunchales.gob.ar` (sólo lista, no descarga PDFs) | `src/lib/data/remuneraciones.generated.ts` |
| `sincronizar-digesto` | `sunchales.miportal.ar/digesto` | `src/lib/data/digesto-oficial.generated.ts` + `data/digesto-oficial/items_completos.json` |

Procesos pesados que **NO** entran al cron diario y se siguen corriendo a mano
cuando hace falta:

- `ocr-remuneraciones`, `parsear-remuneraciones` (Tesseract.js sobre PDFs).
- `descargar-pdfs-concejo`, `procesar-pdfs-concejo` (descargas masivas).
- `analizar-derogaciones` (costo Gemini).
- `indexar-resumenes` (depende de descarga previa).

### Disparos manuales

Desde **Actions → Scrape fuentes municipales (diario) → Run workflow** podés
correr ahora mismo todo el set, o usar el campo `solo` para correr un único
scraper (handy al debuggear uno puntual).

### Si falla

GitHub manda email automáticamente al owner del repo cuando un workflow falla.
Las causas más probables son:

1. El portal cambió HTML/JSON y el parser del scraper quedó desfasado.
2. El portal devuelve 5xx temporal — en ese caso, re-correr a mano suele alcanzar.
3. Conflicto de push (alguien commiteó entre el `npm ci` y el `git push`).
   El próximo run diario lo resuelve solo, pero si urge podés disparar manual.

### Permisos

El workflow usa `permissions: contents: write` para que el `GITHUB_TOKEN` pueda
hacer push. No requiere PAT (Personal Access Token). El commit lo firma
`github-actions[bot]`, visible en el historial como "chore(scrape): actualización
automática de fuentes municipales".
