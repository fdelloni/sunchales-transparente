@echo off
echo ===================================================
echo   FIX VERCEL CLI Y DEPLOY
echo   Sunchales Transparente
echo ===================================================
echo.
echo Vercel CLI 52.2.0 tiene un bug con paths con espacios.
echo Vamos a bajar a la version 37 (estable conocida).
echo.
pause

echo.
echo Paso 1: Desinstalando Vercel CLI actual...
echo ---------------------------------------------------
call npm uninstall -g vercel
echo.

echo Paso 2: Instalando Vercel CLI version 37...
echo ---------------------------------------------------
call npm install -g vercel@37
echo.

echo Paso 3: Verificando version instalada...
echo ---------------------------------------------------
call vercel --version
echo.

echo Paso 4: Borrando vinculo .vercel/ para empezar limpio...
echo ---------------------------------------------------
if exist .vercel rmdir /S /Q .vercel
echo OK.
echo.

echo Paso 5: Deploy interactivo...
echo ---------------------------------------------------
echo CONTESTAR ASI:
echo   - Set up and deploy? -^> Y (Enter)
echo   - Which scope? -^> Enter
echo   - Link to existing project? -^> Y (Enter)
echo   - What's the name of your existing project? -^>
echo     software-sunchales-transparente
echo.
pause
call vercel --prod
echo.
echo ===================================================
echo   Si arriba ves "Production: https://..." el deploy OK.
echo   La URL publica es:
echo   https://software-sunchales-transparente.vercel.app
echo ===================================================
echo.
pause
