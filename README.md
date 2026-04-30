# Sunchales Transparente

> Plataforma cívica de transparencia y eficiencia operativa para la
> Municipalidad de Sunchales — Capital Nacional del Cooperativismo.

[![Licencia: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Datos: CC-BY-4.0](https://img.shields.io/badge/Data-CC--BY--4.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)

## Qué es

Una plataforma con código abierto y datos auditables para que cada vecino
pueda controlar el uso de los recursos públicos del municipio. Construida
sobre principios de **máxima divulgación**, **privacidad por diseño**,
**trazabilidad criptográfica** y **datos abiertos por defecto**.

## Estructura del repo

```
.
├── index.html                      → Landing page pública
├── privacidad.html                 → Política de privacidad (Ley 25.326)
├── terminos.html                   → Términos y condiciones de uso
├── LICENSE                         → MIT
├── README.md                       → Este archivo
│
├── software/                       → Aplicación Next.js completa (Fase 1)
│   ├── src/app/                    → Páginas y API routes
│   ├── src/lib/                    → Lógica de negocio + hash-chain SHA-256
│   ├── supabase/migrations/        → Esquema Postgres con RLS y audit_log
│   └── README.md                   → Detalle técnico
│
└── (entregables del proyecto en .docx, .pptx, .html para el municipio)
```

## Cómo desplegar

Ver instrucciones paso a paso en
[`06_GUIA_DE_DESPLIEGUE.md`](06_GUIA_DE_DESPLIEGUE.md).

Resumen:

1. **Landing pública** → un proyecto Vercel apuntando a la **raíz** del repo.
   No necesita variables de entorno. URL: `sunchales-transparente.vercel.app`.
2. **Software completo** → un segundo proyecto Vercel apuntando a la carpeta
   `software/`. Detecta Next.js automáticamente. Variables de entorno opcionales
   para conectar Supabase. URL: `app.sunchales-transparente.vercel.app`.

## Honestidad de datos

Cada dato del portal trae su fuente verificable y su estado:

- ✅ **Verificado** — respaldado por documento oficial publicado.
- ⏳ **Pendiente / referencial** — estructura ejemplificadora hasta que el
  municipio publique los datos oficiales en formato estructurado.

**No se inventa información.** Cuando un dato no está oficialmente
publicado, el sistema lo etiqueta explícitamente.

## Licencias

- **Código fuente** → [MIT](LICENSE)
- **Datos publicados** → [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)

Reutilizable libremente por otros municipios cooperativos del Departamento
Castellanos y de la provincia de Santa Fe.

## Contacto

Proyecto cívico independiente. Sin afiliación oficial al municipio hasta
que sea adoptado formalmente.
