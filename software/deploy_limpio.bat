@echo off
echo ===================================================
echo   DEPLOY DESDE CERO - Sunchales Transparente
echo ===================================================
echo.
echo Esto va a borrar el vinculo local con Vercel y
echo reiniciar el flujo desde cero, para evitar el bug
echo "single file deployments".
echo.
pause

echo.
echo Paso 1: Borrando vinculo local .vercel/
echo ---------------------------------------------------
if exist .vercel rmdir /S /Q .vercel
echo OK.
echo.

echo Paso 2: Ejecutando vercel deploy interactivo...
echo ---------------------------------------------------
echo CONTESTAR ASI:
echo   - Set up and deploy? -^> Y (Enter)
echo   - Which scope? -^> Enter (acepta tu cuenta)
echo   - Link to existing project? -^> Y (Enter)
echo   - What's the name of your existing project? -^>
echo     software-sunchales-transparente (escribilo y Enter)
echo.
echo Cuando termine, te pregunta si queres deploy a prod;
echo despues correr: vercel --prod
echo.
pause
call vercel
echo.
pause
