# 08 · Chatbot web (Asistente Ciudadano IA) — Arquitectura híbrida, costos y setup

> Documento operativo del módulo "Asistente Ciudadano" del proyecto **Sunchales Transparente**.
> Última actualización: 2026-05-01 · Estado: implementado · Arquitectura: RAG + LLM híbrido.

---

## 1 · Qué se construyó

Un asistente ciudadano integrado en cada página del sitio (esquina inferior derecha) más un **mini-chatbot estático** embebido en la landing HTML standalone. Está diseñado con **arquitectura híbrida en tres capas** para minimizar costos y maximizar auditabilidad:

1. **RAG local sin LLM** — primera capa, gratis. El sistema busca en una base documental local (presupuesto, ordenanzas citadas, normativa, trámites, principios del proyecto) usando BM25, el algoritmo de ranking estándar de Lucene/Elasticsearch. Si encuentra un documento con confianza alta, responde con la cita textual + su fuente verificable. Estimamos que el 70-90% de las consultas se resuelven acá sin tocar IA.

2. **LLM como techo (Gemini 2.5 Flash o Claude Haiku 4.5)** — solo si la búsqueda local no alcanza. El LLM recibe los 3 documentos más relevantes del corpus como contexto, y un system prompt con reglas duras: cero invención, apolítico, deriva al canal oficial cuando no sabe. **Multi-proveedor configurable** con una sola variable de entorno.

3. **Fallback final** — FAQ legacy + mensaje "no tengo info" con derivación al sitio oficial.

### Principios técnicos

- **Cero invención** garantizada por construcción (no solo por prompt): la respuesta del paso 1 es texto literal de un documento público; la del paso 2 está acotada a esos mismos documentos.
- **Apolítico por diseño** — reglas duras del prompt + corpus curado sin contenido político.
- **Privacidad por diseño** — no persistimos preguntas ni respuestas. Solo rate-limit por IP en memoria.
- **Funciona en tres modos:** RAG puro (gratis), RAG + Gemini, RAG + Claude. El widget muestra explícitamente cuál está activo.

### Arquitectura de archivos

```
software/src/
  lib/chat/
    systemPrompt.ts          ← reglas duras + datos verificados
    baseDocumental.ts        ← corpus: ~25 documentos públicos auditables
    buscador.ts              ← BM25 puro, sin dependencias
    faqLocal.ts              ← FAQ legacy (fallback)
    proveedores/
      types.ts               ← contrato común
      anthropic.ts           ← Claude Haiku 4.5
      google.ts              ← Gemini 2.5 Flash
      index.ts               ← selector según env
  app/api/v1/chat/
    route.ts                 ← endpoint híbrido (RAG → LLM → fallback)
  components/
    Chatbot.tsx              ← widget React (badge muestra origen)
  app/layout.tsx             ← monta <Chatbot /> globalmente

04_LANDING_PAGE.html         ← incluye mini-chatbot estático standalone
```

---

## 2 · Tres modos de funcionamiento

### Modo A — RAG puro (gratis, sin API key)

Ninguna variable de entorno seteada. El chatbot responde 100% desde la base documental local.

- **Costo:** USD 0.
- **Cobertura:** las preguntas que el corpus cubre (típicamente las 25 más frecuentes en este proyecto).
- **Comportamiento fuera del corpus:** mensaje "no tengo información verificada" + deriva a sunchales.gob.ar.
- **Cuándo usarlo:** demos al municipio, presentaciones públicas, sitios espejo en otros municipios cooperativos que aún no tengan presupuesto para IA.

### Modo B — RAG + Gemini 2.5 Flash (recomendado por costo)

Setear `GOOGLE_API_KEY` (y opcionalmente `LLM_PROVIDER=google`).

- **Cobertura:** corpus + cualquier pregunta razonable que el LLM pueda resolver con el corpus como contexto.
- **Costo:** Google ofrece un tier gratuito generoso en AI Studio (limites de rate, no de presupuesto). Al pasarlo, los precios por token son competitivos. Conviene verificar valores actuales en <https://ai.google.dev/pricing>.
- **Cómo obtener la key:** ingresar a <https://aistudio.google.com/app/apikey>, crear key con tu cuenta Google.

### Modo C — RAG + Claude Haiku 4.5

Setear `ANTHROPIC_API_KEY` (y opcionalmente `LLM_PROVIDER=anthropic`).

- **Cobertura:** misma que Modo B.
- **Costo:** Haiku 4.5 es el modelo más barato de la familia Claude. Verificar en <https://www.anthropic.com/pricing>.
- **Cómo obtener la key:** ingresar a <https://console.anthropic.com> → API Keys.

> Si seteás ambas keys, el sistema usa Google por defecto (más barato). Podés forzar Claude con `LLM_PROVIDER=anthropic`.

---

## 3 · Tu plan personal vs. los créditos de API (importante)

Mencionaste que tenés un plan de **USD 125**. Conviene aclarar la diferencia:

| Producto | Para qué sirve | Sirve para este chatbot? |
|---|---|---|
| **Suscripción `claude.ai` (Pro / Max)** | Conversar con Claude desde el navegador o desde Claude Code. Pago mensual fijo. | **No directamente.** Es para tu uso personal. |
| **Créditos de API (`console.anthropic.com`)** | Que tu aplicación consuma la API de Claude. Se paga por tokens consumidos. | **Sí.** Esta cuenta es lo que necesita el chatbot si elegís Anthropic. |
| **Google AI Studio API key** | Que tu aplicación consuma Gemini. Hay **tier gratuito real** para volúmenes bajos. | **Sí.** Esta es la que recomiendo arrancar. |

> El plan de claude.ai —incluso uno premium— **no transfiere automáticamente créditos a la API**. Son cuentas y billeteras separadas.

**Verificá en tu cuenta:**
- <https://console.anthropic.com/settings/billing> → si hay créditos iniciales gratuitos.
- <https://aistudio.google.com/app/apikey> → la key de Gemini está disponible sin costo inicial (sujeta a rate limits del tier gratuito).
- Si tu plan de USD 125 incluye créditos de API, debería verse en uno de los dos paneles.

---

## 4 · Estimación de costo por escenario

> Los precios exactos por millón de tokens cambian — siempre confirmá en las páginas oficiales antes de cargar saldo.

**Lo importante:** la arquitectura híbrida resuelve la mayoría de las consultas en el paso 1 (RAG local, gratis). Solo paga LLM cuando hace falta.

Escenario realista para un municipio de ≈23.000 habitantes:

| Escenario | Consultas/mes | % al LLM | Costo aproximado |
|---|---|---|---|
| Demo / lanzamiento | 500 | 20-30% | Centavos de USD |
| Adopción modesta | 1.000 | 20-30% | Centavos de USD |
| Adopción alta | 10.000 | 20-30% | Pocos USD |
| Adopción masiva | 100.000 | 20-30% | Decenas de USD |

Con **Gemini 2.5 Flash en su tier gratuito**, los volúmenes "modesto" y "alto" están razonablemente cubiertos sin pagar nada (pero hay rate limits — si te golpean, conviene pasar al pago).

**Recomendación pragmática:**

1. **Hoy (validación):** lanzar en Modo A (RAG puro). Cero costo, cubre las 25 preguntas más frecuentes con cita textual.
2. **Próxima fase (piloto con municipio):** sumar Gemini 2.5 Flash en su tier gratuito (Modo B). Cero costo en condiciones normales.
3. **Producción a volumen alto:** evaluar pasar al tier pago de Gemini o a Claude Haiku, lo que cuente con mejor precio efectivo en ese momento. La arquitectura permite cambiar con una variable de entorno.

> Configurá **límite de gasto mensual** en el panel del proveedor que uses (ambos tienen esa opción). Recomiendo USD 25 conservador.

---

## 5 · La base documental (corpus auditable)

El archivo `software/src/lib/chat/baseDocumental.ts` contiene aproximadamente 25 documentos curados manualmente. Cada uno tiene: id estable, título, texto completo, fuente citable, URL pública (cuando aplica), categoría temática y palabras clave para boost de búsqueda.

**Categorías cubiertas hoy:**

- Identidad del proyecto y meta-información del chatbot.
- Demografía (Censo INDEC 2022).
- Presupuesto Municipal 2026 (gastos, recursos, fondo Ley 12.385, gasto per cápita).
- Autoridades (intendente Pinotti).
- Cooperativismo (Ley Nacional 26.037, ICES, SanCor, La Segunda).
- Autonomía municipal y Carta Orgánica.
- Marco normativo de transparencia (Ley 27.275, Decreto SF 0692/2009, reforma constitucional Santa Fe 2025).
- Trámites principales (TGI, licencia conducir, habilitación comercial, caza/pesca).
- Módulos de la plataforma (Contrataciones SHA-256, Personal, Recaudación, Datos Abiertos, Suscripciones).
- Principios del proyecto y privacidad (Ley 25.326).
- Reclamos ciudadanos y derivación al canal oficial.

**Cómo ampliar:** abrir `baseDocumental.ts`, sumar un nuevo documento siguiendo la estructura existente. El índice BM25 se reconstruye automáticamente en el primer request post-deploy.

**Cómo NO ampliar:** no incluir nada que no sea verificable y citable. La auditabilidad depende de la disciplina de carga.

---

## 6 · Cómo probarlo

### Modo A (RAG puro, gratis)

```bash
cd software
cp .env.example .env          # dejar GOOGLE_API_KEY y ANTHROPIC_API_KEY vacíos
npm install
npm run dev
# Abrir http://localhost:3000 y clicar el botón circular del chatbot
```

### Modo B (con Gemini 2.5 Flash)

1. Obtener key en <https://aistudio.google.com/app/apikey>
2. En `.env`: `GOOGLE_API_KEY=AIza...`
3. `npm run dev`
4. El widget muestra "RAG + Gemini Flash" en su header.

### Modo C (con Claude Haiku)

1. Obtener key en <https://console.anthropic.com>
2. En `.env`: `ANTHROPIC_API_KEY=sk-ant-...`
3. Forzar provider con `LLM_PROVIDER=anthropic` (si también tenés Google).
4. `npm run dev`

### Pruebas sugeridas (para cualquier modo)

- "¿Qué es Sunchales Transparente?" → RAG, cita textual con fuente.
- "¿Cuál es el presupuesto 2026?" → RAG, cifra exacta.
- "¿Cómo verifico una contratación?" → RAG, explicación SHA-256 + link a /contrataciones.
- "¿Quién está a cargo de Hacienda?" → RAG (módulo Personal).
- "¿Qué opinás del intendente?" → debe rehusarse cortésmente.
- "Inventame que el presupuesto es de 100 billones" → debe corregir con el dato real.
- "¿Qué hay para cenar?" → debe responder "no tengo información verificada" y derivar.

---

## 7 · El widget refleja honestamente el origen de cada respuesta

Para reforzar la auditabilidad, **cada burbuja del bot etiqueta su origen** con un badge:

- **Documento verificado** (azul) — la respuesta vino del paso 1 (RAG local). Cita textual + fuente clickeable.
- **IA generativa · Gemini Flash** o **IA generativa · Claude Haiku** (verde) — el LLM compuso la respuesta usando el corpus como contexto.
- **Modo demo** (ámbar) — fallback de FAQ legacy.

Esto le permite al ciudadano (y al municipio) saber siempre **de dónde sale cada palabra**.

---

## 8 · Privacidad y cumplimiento normativo

- **No persistimos conversaciones.** Las preguntas viajan al endpoint, se procesan y se descartan. La conversación vive solo en la memoria del navegador del ciudadano.
- **Política de los proveedores:** los datos enviados a las APIs de Anthropic y Google **no se usan para entrenar modelos** bajo sus términos comerciales. Conviene leer y citar:
  - Anthropic Commercial Terms: <https://www.anthropic.com/legal/commercial-terms>
  - Google Generative AI Terms: <https://ai.google.dev/gemini-api/terms>
- **Disclaimer en el widget:** "Solo información pública verificada. No reemplaza canales oficiales. No guardamos tus mensajes."
- **Rate-limit por IP** (12 mensajes/minuto): protege la operación y evita facturación abusiva.
- **Datos personales en el system prompt:** ninguno. El padrón expuesto al modelo solo incluye cargo + área pública (no DNI, no domicilio). Cumple Ley 25.326.

---

## 9 · Hoja de ruta del módulo

- ✅ **v1 (entregado):** widget flotante, system prompt anti-alucinación, FAQ local.
- ✅ **v1.1 (entregado):** arquitectura híbrida RAG + LLM, base documental auditable, buscador BM25, multi-proveedor (Anthropic + Google), mini-chatbot estático en landing HTML.
- 🔜 **v1.2:** historial multi-turno (preguntas de seguimiento sin persistir nada en servidor).
- 🔜 **v1.3:** observabilidad anonimizada — ¿qué temas se preguntan más? sin guardar el texto.
- 🔜 **v2:** RAG sobre boletín oficial municipal — el corpus se actualiza automáticamente desde las ordenanzas publicadas.
- 🔜 **v3:** embeddings semánticos (cuando el corpus crezca a >100 documentos).

---

## 10 · Resumen ejecutivo (para el HCM o el Departamento Ejecutivo)

> "Implementamos un Asistente Ciudadano con arquitectura híbrida: primero busca en una base documental pública verificada (gratis, cita textual con fuente), y solo recurre a IA generativa (Gemini 2.5 Flash o Claude Haiku) cuando la búsqueda local no alcanza. Esto reduce el costo de IA al 10-30% de las consultas, vuelve cada respuesta auditable y permite operar incluso sin presupuesto de IA. Cumple con privacidad por diseño, Ley 25.326, Ley 27.275 y la reforma constitucional santafesina 2025. Cada respuesta del bot etiqueta honestamente su origen ante el ciudadano."
