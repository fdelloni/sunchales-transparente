# Sunchales Transparente — Fase 1: Cimientos

Plataforma cívica de transparencia y eficiencia operativa para la Municipalidad
de Sunchales. Esta es la **versión 0.1**, que incluye los cuatro módulos de
la Fase 1 funcionando como demo navegable.

## Qué incluye esta prueba

- **Portal Home (`/`)** con KPIs verificados del Presupuesto 2026 y los
  cuatro módulos accesibles.
- **Explorador de Presupuesto (`/presupuesto`)** con visualización por
  finalidad-función, KPIs, gráfico circular y de barras.
- **Padrón de Personal (`/personal`)** con organigrama real verificado y
  remuneraciones de referencia (etiquetadas como tales).
- **Datos Abiertos (`/datos-abiertos`)** con catálogo, descargas CSV/JSON
  y listado de fuentes citadas.
- **API REST (`/api/v1/*`)** con endpoints públicos y especificación OpenAPI 3.0.
- **Esquema Postgres** completo con RLS y trigger de auditoría inmutable
  (`supabase/migrations/0001_initial.sql`), listo para migrar cuando se
  conecte Supabase real.

## Honestidad de datos

Todo dato que se muestra en la plataforma respeta tres reglas:

1. **Trazabilidad total.** Cada dato cita su fuente verificable con URL y fecha
   de consulta (módulo Datos Abiertos → "Fuentes citadas").
2. **Etiquetado honesto.** Lo verificado se marca como tal; lo pendiente se
   marca explícitamente como pendiente. **No se inventa información.**
3. **Privacidad protegida.** No se almacenan ni publican datos personales
   sensibles. La granularidad se ajusta al fin público.

Los **totales del Presupuesto 2026** son oficiales (proyecto remitido al
Concejo Municipal). El **desglose por finalidad-función** es una estructura
ejemplificadora basada en la clasificación estándar municipal argentina; se
reemplazará por el desglose oficial cuando el municipio lo publique
(ver `scripts/ingest_presupuesto.md`).

Los **cargos del organigrama** son información pública verificada; las
**remuneraciones** son referenciales hasta que se publique la nómina oficial.

## Cómo levantarlo localmente

Requisitos: Node.js 18+ y npm.

```bash
cd software
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

> No requiere conexión a Supabase para correr la demo: los datos viven en
> `src/lib/data/*` y la app es 100% navegable sin backend externo.

## Endpoints de la API

| Método | Path                       | Descripción                              |
|--------|----------------------------|------------------------------------------|
| GET    | `/api/v1/presupuesto`      | Partidas presupuestarias (json/csv)      |
| GET    | `/api/v1/personal`         | Padrón de personal (json/csv)            |
| GET    | `/api/v1/datasets`         | Catálogo + fuentes citadas               |
| GET    | `/api/v1/openapi`          | Especificación OpenAPI 3.0 de la API     |

Parámetros comunes:
- `?format=json` (default) | `?format=csv`
- `?finalidad=...` (presupuesto) | `?area=...` (personal)

## Estructura del repo

```
software/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── postcss.config.mjs
├── README.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    (home)
│   │   ├── globals.css
│   │   ├── presupuesto/
│   │   │   ├── page.tsx
│   │   │   └── BudgetCharts.tsx
│   │   ├── personal/page.tsx
│   │   ├── datos-abiertos/page.tsx
│   │   └── api/v1/
│   │       ├── presupuesto/route.ts
│   │       ├── personal/route.ts
│   │       ├── datasets/route.ts
│   │       └── openapi/route.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── StatCard.tsx
│   │   └── SourceTag.tsx
│   └── lib/
│       ├── format.ts
│       ├── csv.ts
│       └── data/
│           ├── sources.ts
│           ├── presupuesto.ts
│           ├── personal.ts
│           └── datasets.ts
├── supabase/
│   ├── migrations/0001_initial.sql
│   └── seed.sql
└── scripts/
    └── ingest_presupuesto.md
```

## Próximos pasos (Fase 2 y siguientes)

1. **Conectar Supabase real**: aplicar la migración 0001, sembrar fuentes,
   y reemplazar lecturas locales por queries (`@supabase/supabase-js`).
2. **Reemplazar el desglose presupuestario** con datos oficiales según
   `scripts/ingest_presupuesto.md`.
3. **Reemplazar remuneraciones referenciales** con la nómina oficial.
4. **Despliegue**: Vercel (gratis para start), URL pública con dominio
   `sunchalestransparente.org` (a registrar).
5. **Módulos de Fase 2**: Gestión de Expedientes, Compras y Contrataciones,
   Cronogramas y Obras (ver hoja de ruta en el informe ejecutivo).

---

**Licencia del software**: MIT — el código es abierto y reutilizable por
otros municipios cooperativos.
**Licencia de los datos**: CC-BY-4.0.
