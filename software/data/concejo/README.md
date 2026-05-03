# Datos del Concejo Municipal de Sunchales

Esta carpeta contiene los archivos públicos del Concejo Municipal de Sunchales,
descargados desde [concejosunchales.gob.ar](https://concejosunchales.gob.ar)
y organizados por materia y fecha.

## Estructura

```
data/concejo/
├── normativa/
│   ├── ordenanzas/             # Ordenanzas sancionadas (PDF)
│   ├── decretos/                # Decretos
│   ├── resoluciones/            # Resoluciones
│   ├── declaraciones/           # Declaraciones del Concejo
│   └── minutas/                 # Minutas de comunicación
├── normativa-ambiental/
│   ├── ordenanzas/              # Ordenanzas ambientales
│   ├── decretos/                # Decretos reglamentarios ambientales
│   ├── jurisprudencia/          # Sentencias judiciales locales
│   └── informes-trimestrales/   # Informes ambientales trimestrales
├── sesiones/
│   ├── actas/                   # Actas oficiales
│   ├── diarios/                 # Diarios de sesiones
│   └── ordenes-del-dia/         # Órdenes del día
├── proyectos/
│   ├── en-tratamiento/          # Proyectos en estado parlamentario
│   └── perdidos/                # Proyectos que perdieron estado parlamentario
├── transparencia-economica/
│   ├── ejecucion-presupuestaria/ # Ejecución partida presupuestaria mensual
│   ├── movimiento-saldos/       # Movimientos de saldos del presupuesto
│   └── ucm/                     # Ordenanzas de actualización de la UCM
├── boletines-bimestrales/       # Boletines bimestrales del Concejo
├── resumenes-anuales/           # Resúmenes anuales (desde 2012)
├── patrimonio-cultural/         # Bienes y normativa de patrimonio cultural
├── iniciativas-ciudadanas/      # Notas/iniciativas presentadas por ciudadanos
├── acceso-informacion-publica/  # Régimen AIP local (Ordenanza 1872/09)
├── programa-fortalecimiento/    # Programa de fortalecimiento y apoyo comunitario
└── personal-y-curriculums/      # CVs públicos de concejales y personal
```

## Índice de archivos

Los archivos se referencian con metadatos completos (URL original, fecha,
categoría, tamaño, hash SHA-256) en `_indice.json`.

## Actualización automática

El script `scripts/descargar-pdfs-concejo.mjs` realiza la descarga selectiva
por categoría. Está pensado para correrse:

- Manualmente con `npm run descargar-pdfs-concejo`
- Automáticamente vía GitHub Actions (workflow diario, en construcción)

Cada PDF descargado conserva su nombre original cuando es posible y, si no,
se le asigna un nombre estable basado en su URL.

## Licencia y uso

Los PDFs son documentos públicos producidos por el Concejo Municipal de
Sunchales. Su republicación es lícita en virtud del derecho de acceso a la
información pública (Ley 27.275, Constitución de Santa Fe). Esta carpeta
los reúne para facilitar consultas, análisis automatizado y reutilización
ciudadana, sin alterar su contenido.
