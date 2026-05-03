@echo off
echo ===================================================
echo   BUILD LOCAL Y PREPARAR PARA DEPLOY
echo   Sunchales Transparente
echo ===================================================
echo.

echo Paso 0: Verificando dependencias instaladas...
echo ---------------------------------------------------
if exist node_modules\next\package.json goto DEPS_OK
echo node_modules\next no encontrado. Instalando dependencias...
call npm install --no-audit --no-fund --loglevel=error
if not exist node_modules\next\package.json goto DEPS_FALLO
echo Dependencias instaladas OK.
goto BUILD

:DEPS_OK
echo Dependencias presentes. OK.

:BUILD
echo.
echo Paso 1: Build local de produccion...
echo ---------------------------------------------------
call npm run build
set BUILD_EXIT=%ERRORLEVEL%
if not "%BUILD_EXIT%"=="0" goto BUILD_FALLO
echo.
echo OK: build local exitoso.
echo.

echo Paso 2: Verificando vinculo con proyecto Vercel...
echo ---------------------------------------------------
if not exist .vercel\project.json goto LINK_FALLO
echo Proyecto vinculado: software-sunchales-transparente. OK.

echo.
echo ===================================================
echo   TODO LISTO PARA DEPLOY.
echo.
echo   Ahora ejecuta MANUALMENTE en esta misma terminal:
echo.
echo       vercel --prod
echo.
echo   Si pregunta algo, contesta:
echo     - "Set up and deploy?" -^> Y (Enter)
echo     - "Link to existing project?" -^> Y (Enter)
echo     - "What's the name of your existing project?" -^>
echo       software-sunchales-transparente
echo.
echo   Al final veras "Production: https://..."
echo   y la URL publica:
echo   https://software-sunchales-transparente.vercel.app
echo ===================================================
goto FIN

:DEPS_FALLO
echo.
echo ===================================================
echo   ERROR: no se pudieron instalar las dependencias.
echo ===================================================
goto FIN

:BUILD_FALLO
echo.
echo ===================================================
echo   ERROR: el build local fallo (codigo %BUILD_EXIT%).
echo ===================================================
goto FIN

:LINK_FALLO
echo.
echo ===================================================
echo   ERROR: falta .vercel\project.json
echo ===================================================

:FIN
echo.
pause
