@echo off
echo ==============================================
echo   REINSTALACION LIMPIA - Sunchales Transparente
echo ==============================================
echo.
echo Cerrando procesos node.exe...
taskkill /F /IM node.exe >nul 2>&1
echo.
echo Borrando node_modules...
if exist node_modules rmdir /S /Q node_modules
echo Borrando package-lock.json...
if exist package-lock.json del /F /Q package-lock.json
echo.
echo Limpiando cache de npm...
call npm cache clean --force
echo.
echo Configurando npm para descarga estable...
call npm config set fetch-retries 10
call npm config set fetch-retry-mintimeout 60000
call npm config set fetch-retry-maxtimeout 300000
call npm config set fetch-timeout 600000
call npm config set maxsockets 1
call npm config set registry https://registry.npmjs.org/
echo.
echo Instalando dependencias (puede tardar varios minutos)...
echo ----------------------------------------------
call npm install --no-audit --no-fund --loglevel=error
echo ----------------------------------------------
echo.
echo Verificando si Next se instalo...
if exist node_modules\next\package.json (echo OK: Next.js instalado correctamente.) else (echo FALLO: Next.js NO se instalo. Probar con hotspot del celular.)
echo.
pause
