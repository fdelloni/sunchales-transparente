@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion

echo ============================================================
echo   DIAGNOSTICO DE RED Y NPM - Sunchales Transparente
echo ============================================================
echo.

echo [1/6] Probando conectividad basica (ping a 8.8.8.8)...
echo ------------------------------------------------------------
ping -n 3 8.8.8.8
echo.

echo [2/6] Probando resolucion DNS de registry.npmjs.org...
echo ------------------------------------------------------------
nslookup registry.npmjs.org
echo.

echo [3/6] Probando conectividad HTTPS al registro de npm...
echo ------------------------------------------------------------
curl -s -o nul -w "HTTP %%{http_code} - tiempo total: %%{time_total}s\n" https://registry.npmjs.org/
if errorlevel 1 (
    echo   [!] curl fallo. Puede ser DNS, firewall o antivirus.
)
echo.

echo [4/6] Configuracion actual de npm (proxy y registro)...
echo ------------------------------------------------------------
echo proxy:
call npm config get proxy
echo https-proxy:
call npm config get https-proxy
echo registry:
call npm config get registry
echo.

echo [5/6] Limpiando configuracion de proxy de npm...
echo ------------------------------------------------------------
call npm config delete proxy
call npm config delete https-proxy
call npm config set registry https://registry.npmjs.org/
call npm config set fetch-retries 5
call npm config set fetch-retry-mintimeout 20000
call npm config set fetch-retry-maxtimeout 120000
echo   Configuracion de proxy limpiada y reintentos aumentados.
echo.

echo [6/6] Reintentando npm install...
echo ------------------------------------------------------------
call npm install
echo.

echo ============================================================
if errorlevel 1 (
    echo   RESULTADO: npm install FALLO nuevamente.
    echo   Revisa la salida de los pasos 1, 2 y 3 arriba:
    echo     - Si el ping a 8.8.8.8 no responde: no hay internet.
    echo     - Si nslookup falla: problema de DNS ^(cambia a 1.1.1.1 / 8.8.8.8^).
    echo     - Si curl da error pero el ping anda: firewall/antivirus
    echo       bloquea HTTPS hacia npmjs.org.
) else (
    echo   RESULTADO: npm install OK.
    echo   Ahora podes correr:  npm run dev
)
echo ============================================================
echo.
pause
