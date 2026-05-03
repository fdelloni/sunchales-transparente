@echo off
echo ===================================================
echo   BUILD LOCAL + REDEPLOY A VERCEL
echo   Sunchales Transparente
echo ===================================================
echo.
echo Paso 1: Build local de produccion para validar...
echo (Si hay errores de compilacion los vamos a ver aca antes
echo  de subir nada a Vercel)
echo ---------------------------------------------------
call npm run build
set BUILD_EXIT=%ERRORLEVEL%
if not "%BUILD_EXIT%"=="0" goto BUILD_FALLO
echo.
echo OK: build local exitoso. Procediendo al deploy.
echo.
echo Paso 2: Deploy a produccion en Vercel...
echo ---------------------------------------------------
call vercel --prod
echo.
echo ===================================================
echo   Si arriba ves "Production: https://..." el deploy OK.
echo   La URL publica es:
echo   https://sunchales-transparente.vercel.app
echo ===================================================
goto FIN

:BUILD_FALLO
echo.
echo ===================================================
echo   ERROR: el build local fallo (codigo %BUILD_EXIT%).
echo   NO se subio nada a Vercel.
echo   Copia y pega los errores de arriba para diagnosticar.
echo ===================================================

:FIN
echo.
pause
