/**
 * Generador de CSV minimalista, sin dependencias.
 * Maneja escape de comas, comillas y saltos de línea según RFC 4180.
 */
export function toCSV(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    if (/[",\n;]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push(headers.map((h) => escape(r[h])).join(","));
  }
  return lines.join("\n");
}

export function csvResponse(name: string, rows: Record<string, unknown>[]): Response {
  return new Response(toCSV(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${name}.csv"`,
      "Cache-Control": "public, max-age=300"
    }
  });
}

export function jsonResponse(data: unknown): Response {
  return Response.json(data, {
    headers: { "Cache-Control": "public, max-age=300" }
  });
}
