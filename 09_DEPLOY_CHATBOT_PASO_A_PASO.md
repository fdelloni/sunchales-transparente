# 09 · Cómo subir el chatbot a producción (Vercel) — Paso a paso

> Documento operativo — **leelo de arriba abajo y andá tildando** mentalmente cada paso.
> Tiempo estimado total: 30–45 minutos.
> Última actualización: 2026-05-01.

---

## Contexto rápido (para que te ubiques cuando vuelvas)

Hoy armamos un **Asistente Ciudadano IA** que ya funciona en tu máquina local en `npm run dev`.
Falta una sola cosa: **subirlo a las URLs públicas** que vos ya tenés en Vercel:

- <https://software-sunchales-transparente.vercel.app/> (la app Next.js)
- <https://landing-page-sunchales-transparente.vercel.app/> (la landing HTML)

Hoy esas URLs muestran versiones **viejas** sin chatbot. El último commit deployado es
`5874f88 feat: módulo Recaudación con tributos locales + ajustes módulo chatbot WhatsApp`,
que es anterior a todo lo que hicimos.

El proyecto está conectado a **GitHub → Vercel** (rama `main`): cada push a `main`
deploya automáticamente. Entonces el plan es: cargar variables en Vercel, subir
archivos al repo de GitHub, esperar a que Vercel deploye solo.

---

## PASO A — Cargar variables de entorno en Vercel (10 min)

> **¿Por qué primero?** Si subís el código antes que las variables, Vercel deploya pero
> el chatbot queda en "Modo RAG puro" (sin Gemini). No se rompe, pero no usa la IA.

1. Entrá a <https://vercel.com/dashboard>.
2. Buscá y abrí el proyecto **software-sunchales-transparente**.
3. En el sidebar izquierdo, clickeá **Environment Variables** (icono `X`).
4. Click en **Add Variable** (o "Add Another"). Cargá la primera:
   - **Key:** `GOOGLE_API_KEY`
   - **Value:** la key que tenés en `software/.env` (la que empieza con `AIza...`)
   - **Environment:** marcar las **tres** opciones (Production, Preview, Development).
   - Click **Save**.
5. Repetí para la segunda variable:
   - **Key:** `GOOGLE_MODEL`
   - **Value:** `gemini-2.5-flash`
   - **Environment:** las tres.
   - **Save**.

> **Importante:** las variables NO se aplican retroactivamente a deploys que ya existen.
> Tienen efecto recién con el próximo deploy (que vamos a hacer en el paso B).

---

## PASO B — Subir el código nuevo a GitHub (15–25 min)

> **¿Cómo subir los archivos al repo?** Depende de qué herramienta uses. Elegí UNA de
> las tres opciones según lo que tengas instalado.

### Antes de empezar — averiguá la URL del repo

1. En Vercel, abrí el proyecto **software-sunchales-transparente**.
2. Sidebar izquierdo → **Settings** → **Git** (o el item que mencione GitHub).
3. Vas a ver algo como `Connected Repository: github.com/<tu-usuario>/<nombre-repo>`.
4. Anotá esa URL — la vas a necesitar.

---

### Opción 1 — Tenés Git instalado y el repo clonado localmente (la más profesional)

Para chequear si tenés git instalado, abrí PowerShell y corré:

```
git --version
```

Si te devuelve un número de versión, lo tenés. Si no, instalalo desde <https://git-scm.com/download/win>.

Si NO tenés el repo clonado en tu PC, cloná primero:

```
cd C:\Users\franc
git clone https://github.com/<tu-usuario>/<nombre-repo>.git temp-repo
```

> Reemplazá `<tu-usuario>` y `<nombre-repo>` con los datos del paso "Antes de empezar".

Ahora tenés que **copiar los archivos nuevos** desde tu carpeta de trabajo
(`C:\Users\franc\IA GESTION MUNICIPALIDAD SUNCHALES\`) hacia el repo clonado.
Los archivos críticos a copiar son:

```
04_LANDING_PAGE.html
08_CHATBOT_WEB_SETUP.md
09_DEPLOY_CHATBOT_PASO_A_PASO.md   (este mismo archivo)
software/.env.example
software/src/app/api/v1/chat/route.ts          (NUEVO)
software/src/app/layout.tsx                    (modificado)
software/src/app/page.tsx                      (modificado)
software/src/components/Chatbot.tsx            (NUEVO)
software/src/components/Header.tsx
software/src/lib/chat/                         (CARPETA NUEVA — copiala completa)
software/src/lib/whatsapp/handlers/ia.ts       (modificado)
```

> Ojo: NO copies `software/.env` (tu archivo con la API key real). Está en `.gitignore`.

Después:

```
cd temp-repo
git add .
git status                          # revisá qué cambia antes de commitear
git commit -m "feat: chatbot web con RAG + Gemini Flash, guardrails anti-opinión"
git push origin main
```

Vercel detecta el push y deploya solo. Esperá 1–2 minutos.

---

### Opción 2 — Sin git local, todo desde la web de GitHub (más manual pero accesible)

1. Abrí <https://github.com/<tu-usuario>/<nombre-repo>> con la URL que anotaste.
2. **Subir archivos modificados** uno por uno:
   - Para cada archivo modificado, navegá hasta él en el árbol de GitHub.
   - Click en el ícono de lápiz (✏️ "Edit this file").
   - Borrá todo y pegá el contenido nuevo desde tu archivo local (abrilo con Notepad / VS Code, Ctrl+A, Ctrl+C, Ctrl+V en GitHub).
   - Abajo: "Commit changes" → mensaje del commit → Commit directly to `main`.
3. **Subir archivos nuevos** (los de `software/src/lib/chat/`):
   - En la raíz del repo, navegá a `software/src/lib/`.
   - Click en **Add file** → **Upload files**.
   - Arrastrá los archivos nuevos respetando la estructura. Si Vercel no acepta drag con carpetas, vas a tener que crear las carpetas a mano:
     - GitHub web → Add file → Create new file → Nombre: `chat/baseDocumental.ts` (la barra crea la carpeta).
     - Pegá el contenido y commit.
   - Repetir para cada archivo de `software/src/lib/chat/`.

**Lista mínima de archivos a subir** (en orden de prioridad):

1. `software/src/lib/chat/systemPrompt.ts` (NUEVO)
2. `software/src/lib/chat/baseDocumental.ts` (NUEVO)
3. `software/src/lib/chat/buscador.ts` (NUEVO)
4. `software/src/lib/chat/faqLocal.ts` (NUEVO)
5. `software/src/lib/chat/guardrails.ts` (NUEVO)
6. `software/src/lib/chat/proveedores/types.ts` (NUEVO)
7. `software/src/lib/chat/proveedores/anthropic.ts` (NUEVO)
8. `software/src/lib/chat/proveedores/google.ts` (NUEVO)
9. `software/src/lib/chat/proveedores/index.ts` (NUEVO)
10. `software/src/app/api/v1/chat/route.ts` (NUEVO)
11. `software/src/components/Chatbot.tsx` (NUEVO)
12. `software/src/app/layout.tsx` (MODIFICADO — sumar `import Chatbot` y `<Chatbot />`)
13. `software/src/app/page.tsx` (MODIFICADO — banner del asistente)
14. `software/src/lib/whatsapp/handlers/ia.ts` (MODIFICADO — usa systemPrompt centralizado)
15. `software/.env.example` (MODIFICADO — instrucciones nuevas)
16. `04_LANDING_PAGE.html` (MODIFICADO — sección asistente + widget JS)

Cada commit que hagas en `main` dispara un deploy automático en Vercel.
Conviene **agruparlos** en pocos commits o, idealmente, hacerlos todos rápido y dejar
que solo el último deploy quede como producción.

---

### Opción 3 — GitHub Desktop (intermedia)

1. Abrí GitHub Desktop.
2. File → Clone Repository → seleccioná `<tu-usuario>/<nombre-repo>`.
3. Una vez clonado, copiá los archivos nuevos/modificados (lista arriba) desde
   `C:\Users\franc\IA GESTION MUNICIPALIDAD SUNCHALES\` al repo local que cloneó GitHub Desktop.
4. En GitHub Desktop vas a ver todos los cambios listados.
5. Abajo, escribí un mensaje de commit: `feat: chatbot web con RAG + Gemini Flash`.
6. Click **Commit to main**.
7. Click **Push origin** arriba a la derecha.

Vercel detecta el push y deploya solo.

---

## PASO C — Verificar que el deploy funcionó (5 min)

1. Volvé a <https://vercel.com/dashboard> → proyecto **software-sunchales-transparente**.
2. En **Deployments** vas a ver una build "Building..." y luego "Ready". Esperá 1–3 minutos.
3. Si el último deployment dice **"Error"**, click → revisar **Build Logs** para ver qué falló.
4. Si dice **"Ready"**, abrí <https://software-sunchales-transparente.vercel.app/> en una **ventana de incógnito** (para evitar caché vieja).
5. **Verificación visual:**
   - Botón circular naranja en la esquina inferior derecha. ✅
   - Click → se abre el chatbot.
   - Header del chatbot dice **"RAG + Gemini Flash"** (verde) → todo bien.
   - Si dice **"Base documental verificada"** (azul) → la `GOOGLE_API_KEY` no se cargó. Volvé al Paso A.
6. **Verificación funcional:**
   - "¿Cuál es el presupuesto 2026?" → debe responder con cita textual y badge azul "Documento verificado".
   - "¿Qué edad mínima tiene un intendente?" → debe responder con badge verde "IA generativa · Gemini Flash".
   - "¿Qué opinás del intendente?" → debe rehusarse cortésmente, badge gris "Política del asistente".

---

## PASO D — Repetir para la landing HTML (10 min)

La landing es un proyecto Vercel **separado** (`landing-page-sunchales-transparente`) que también
podría estar conectado a GitHub o ser un upload manual. Sigue la misma lógica:

1. Verificá en Vercel cómo está conectada esa página (Settings → Git).
2. Si está conectada a un repo:
   - Subí el archivo `04_LANDING_PAGE.html` actualizado al repo (mismas opciones que el Paso B).
   - Si la página espera el archivo como `index.html`, renómbralo o creá un `index.html` que sea un alias.
3. Si **no** está conectada a un repo (deploy manual con drag & drop):
   - <https://vercel.com/dashboard> → proyecto landing → último deployment → menú "..." → **Redeploy** **NO** sirve si subiste manualmente, porque redeploya la versión vieja.
   - En ese caso: <https://vercel.com/new> → drag & drop con `04_LANDING_PAGE.html` (renombrado a `index.html` si hace falta) → asignar el dominio `landing-page-sunchales-transparente`.

La landing **no necesita variables de entorno** (es solo HTML/CSS/JS estático con respuestas pregrabadas).

---

## Si te trabás

Cuando vuelvas, decime simplemente "estoy en el paso X y veo Y" — con eso te oriento puntualmente sin que tengas que rehacer todo.

**Cosas que pueden fallar y solución rápida:**

| Síntoma | Causa probable | Solución |
|---|---|---|
| Vercel: "Build failed" | typecheck o sintaxis | revisar Build Logs, copiar el error |
| Chatbot no aparece | deploy no incluyó `Chatbot.tsx` o `layout.tsx` | verificar que esos archivos están en GitHub |
| Header dice "Base documental verificada" en vez de Gemini | `GOOGLE_API_KEY` no cargada en Vercel | volver al Paso A, hacer redeploy desde Vercel UI |
| "Application error" | error en runtime — probablemente el endpoint `/api/v1/chat` falla | revisar Runtime Logs en Vercel |
| GitHub: "merge conflict" | el repo en GitHub tiene cambios que no están en local | hacer `git pull` antes de pushear |

---

## Notas finales

- **Costo en producción:** con Gemini 2.5 Flash en su tier gratuito, los volúmenes razonables
  para un municipio de 23 mil habitantes están cubiertos sin pagar nada. Igual conviene poner
  límite de gasto mensual en <https://console.cloud.google.com/billing> por las dudas.
- **No commitees nunca el archivo `software/.env`** — está en `.gitignore` y debe quedarse local.
- **Si rotás la API key**, repetí el Paso A (cargarla nueva en Vercel).
- **Para auditar qué responde el chatbot en producción:** Vercel → proyecto → Runtime Logs.
  Ahí ves cada request al endpoint `/api/v1/chat` (sin las preguntas/respuestas, solo metadata).

---

**Buenas noches. Andá a dormir tranquilo: todo el código está guardado y typechecked.
Cuando vuelvas, retomamos desde donde estés.**
