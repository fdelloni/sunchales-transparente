@echo off
echo ===================================================
echo   INICIALIZAR GIT + COMMIT
echo   Sunchales Transparente
echo ===================================================
echo.
echo Esto va a:
echo  1. Inicializar git (si no lo esta)
echo  2. Configurar tu nombre y email para git (una sola vez)
echo  3. Hacer el primer commit con todo el codigo actual
echo  4. Dejarte listo para hacer push a GitHub
echo.
pause

echo.
echo Paso 1: Inicializando git en la carpeta...
echo ---------------------------------------------------
if exist .git goto GIT_OK
git init -b main
goto GIT_DONE

:GIT_OK
echo .git ya existe, salteando init.

:GIT_DONE
echo.

echo Paso 2: Configurando usuario git (si no esta seteado)...
echo ---------------------------------------------------
git config user.email >nul 2>&1
if not errorlevel 1 goto USER_OK
git config user.name "Franco Delloni"
git config user.email "fdelloni1@gmail.com"
echo Usuario configurado: Franco Delloni / fdelloni1@gmail.com
goto USER_DONE

:USER_OK
echo Usuario git ya configurado:
git config user.name
git config user.email

:USER_DONE
echo.

echo Paso 3: Agregando archivos al stage...
echo ---------------------------------------------------
git add .
echo OK.
echo.

echo Paso 4: Haciendo commit inicial...
echo ---------------------------------------------------
git commit -m "Sunchales Transparente v0.1 - marco normativo verificado (Ord. 1872/2009)"
echo.

echo ===================================================
echo   GIT LISTO LOCALMENTE.
echo.
echo   PROXIMO PASO: crear el repo en GitHub.
echo.
echo   1) Abri en tu navegador: https://github.com/new
echo.
echo   2) Completa:
echo      - Repository name: sunchales-transparente
echo      - Description: Plataforma civica de transparencia municipal
echo      - PRIVATE (recomendado por ahora)
echo      - NO marques "Add a README"
echo      - NO marques "Add .gitignore"
echo      - NO marques "Choose a license"
echo      - Click "Create repository"
echo.
echo   3) En la pagina siguiente, GitHub te muestra
echo      comandos. COPIAME aca cuales son y los corremos
echo      juntos. Tipicamente seran:
echo        git remote add origin https://github.com/USUARIO/sunchales-transparente.git
echo        git branch -M main
echo        git push -u origin main
echo ===================================================
echo.
pause
