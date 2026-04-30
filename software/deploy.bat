@echo off
echo =====================================================
echo   DEPLOY A VERCEL - Sunchales Transparente
echo =====================================================
echo.
echo Paso 1: Verificando si Vercel CLI esta instalado...
where vercel >nul 2>&1
if errorlevel 1 goto INSTALAR_CLI
echo Vercel CLI ya instalado. OK.
goto LOGIN

:INSTALAR_CLI
echo Vercel CLI no encontrado. Instalando globalmente...
call npm install -g vercel
if errorlevel 1 goto FALLO_INSTALL

:LOGIN
echo.
echo Paso 2: Iniciando sesion en Vercel...
echo Si no estas logueado, se abrira el navegador para autenticarte.
echo (Si ya estas logueado, este paso pasa de largo)
call vercel whoami >nul 2>&1
if errorlevel 1 call vercel login

echo.
echo Paso 3: Desplegando a produccion...
echo Cuando pregunte:
echo   - Set up and deploy? -^> ENTER (si)
echo   - Which scope? -^> tu cuenta (ENTER)
echo   - Link to existing project? -^> N
echo   - Project name? -^> sunchales-transparente (o el que prefieras)
echo   - Directory? -^> ./ (ENTER)
echo   - Modify settings? -^> N
echo.
pause
call vercel --prod
echo.
echo =====================================================
echo   Si ves "Production: https://..." arriba,
echo   ese es el enlace publico para compartir.
echo =====================================================
echo.
pause
goto FIN

:FALLO_INSTALL
echo.
echo ERROR: No se pudo instalar Vercel CLI.
echo Probar manualmente:  npm install -g vercel
pause

:FIN
