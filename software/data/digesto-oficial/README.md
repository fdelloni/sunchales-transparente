# Digesto Oficial — datos sincronizados

Esta carpeta contiene los datos sincronizados desde el Digesto Municipal oficial.

## Fuente

- Sitio: https://sunchales.miportal.ar/digesto
- API: https://api.miportal.ar/sunchales/digInicio (`accion=primerIngreso` para listar; `accion=buscarItem` + `idDigesto` para detalle).
- Token: público guest (idUsuario=-10), obtenido vía `POST /sunchales/primerIngreso`.

## Archivos

- `items_completos.json` — Las 964 normas con metadata + texto HTML completo. Usado para análisis posteriores (NLP, búsqueda full-text, detección de derogaciones).
- `detalles/<id>.json` — Cache local de cada item descargado (un archivo por norma). El script `sincronizar-digesto-oficial.mjs` lo usa como cache incremental para no re-bajar lo que ya tiene.

## Regenerar

```bash
node scripts/sincronizar-digesto-oficial.mjs            # incremental
node scripts/sincronizar-digesto-oficial.mjs --reset    # baja todo de cero
```

El script regenera también `src/lib/data/digesto-oficial.generated.ts`, que es el archivo que importa el sitio.

## Resumen del catálogo (snapshot 2026-05-04)

- 479 Decretos
- 296 Ordenanzas
- 189 Resoluciones
- Total: 964 normas
- Cobertura temporal: 2022 — 2026
