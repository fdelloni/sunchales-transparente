# Ingesta del Presupuesto 2026 — guía operativa

Este documento describe el procedimiento para reemplazar la estructura
ejemplificadora actual (`src/lib/data/presupuesto.ts`) por el desglose oficial
del Presupuesto Municipal 2026, una vez obtenido el documento fuente.

## Pasos

1. **Obtener el documento oficial.** Solicitar al Concejo Municipal o al
   Departamento Ejecutivo el archivo del proyecto/sanción de la Ordenanza
   de Presupuesto 2026, idealmente en PDF estructurado o XLS/CSV.

2. **Verificar totales.** Confirmar que coinciden con los publicados:
   - Gastos: $30.938.107.965
   - Recursos corrientes: $30.950.227.077

3. **Extraer el desglose.** Si el documento es PDF tabular:
   ```bash
   # Sugerido: pdfplumber (Python) o tabula-py para tablas
   pip install pdfplumber pandas
   python scripts/parse_pdf.py presupuesto2026.pdf > partidas.csv
   ```

4. **Mapear al esquema interno.** Cada fila debe quedar con:
   - `finalidad` (1. Administración Gubernamental, 2. Servicios de Seguridad, …)
   - `funcion`
   - `programa` (opcional, si el documento lo identifica)
   - `presupuestado` (ARS, número entero o con dos decimales)
   - `verificado: true`
   - `sourceId: 'presupuesto2026'`

5. **Reemplazar el array `partidas` en `src/lib/data/presupuesto.ts`** con los
   datos oficiales y todos los `verificado: true`.

6. **Validar suma == total oficial** corriendo:
   ```bash
   npm run check  # ejecutará checkTotal() en build
   ```

7. **Cuando exista Supabase real:** correr la migración 0001 + un script
   `scripts/sync_from_ts.ts` que inserte las filas en `partidas_presupuesto`.

## Notas

- Todo cambio queda registrado en `audit_log` con hash SHA-256 cuando se hace
  vía Supabase, garantizando trazabilidad inmutable.
- Si el municipio publica también la ejecución mensual, agregar una migración
  posterior con la columna `ejecutado_mensual` (jsonb por mes).
