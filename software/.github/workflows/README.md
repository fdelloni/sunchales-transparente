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
