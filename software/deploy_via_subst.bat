@echo off
echo ===================================================
echo   DEPLOY VIA SUBST (sin espacios en path)
echo   Sunchales Transparente
echo ===================================================
echo.
echo Hipotesis: el bug "single file deployments" es por
echo el path con espacios y caracteres acentuados.
echo.
echo Vamos a crear una unidad virtual V: que apunta a
echo la carpeta del proyecto (sin espacios) y deployar
echo desde ahi.
echo.
pause

echo.
echo Paso 1: Liberando V: si existia mapeo previo...
echo ---------------------------------------------------
subst V: /D >nul 2>&1
echo OK.
echo.

echo Paso 2: Creando V: como acceso rapido al proyecto...
echo ---------------------------------------------------
subst V: "C:\Users\franc\IA GESTION MUNICIPALIDAD SUNCHALES\software"
if errorlevel 1 goto SUBST_FALLO
echo OK. La carpeta del proyecto ahora es V:\
echo.

echo Paso 3: Cambiando a V: y ejecutando deploy...
echo ---------------------------------------------------
V:
cd \
echo Path actual:
cd
echo.
echo Deployando...
echo (Si pregunta algo, contesta como te explique)
echo.
call vercel --prod
set DEPLOY_EXIT=%ERRORLEVEL%
echo.

echo Paso 4: Volviendo a C: y limpiando V:
echo ---------------------------------------------------
C:
cd "C:\Users\franc\IA GESTION MUNICIPALIDAD SUNCHALES\software"
subst V: /D
echo OK.
echo.

if "%DEPLOY_EXIT%"=="0" (
    echo ===================================================
    echo   DEPLOY EXITOSO.
    echo   URL publica:
    echo   https://software-sunchales-transparente.vercel.app
    echo ===================================================
) else (
    echo ===================================================
    echo   DEPLOY FALLO. Revisar mensajes arriba.
    echo ===================================================
)
goto FIN

:SUBST_FALLO
echo ERROR: no se pudo crear la unidad V:.
echo Probar reiniciar la PC y reintentar.

:FIN
echo.
pause
