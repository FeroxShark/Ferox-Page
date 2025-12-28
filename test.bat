@echo off
SETLOCAL EnableDelayedExpansion

echo ========================================
echo   Ferox Page - Dev Server Starter
echo ========================================

:: Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] node_modules not found. Installing dependencies...
    call npm install
    if !errorlevel! neq 0 (
        echo [ERROR] npm install failed.
        pause
        exit /b !errorlevel!
    )
)

echo [INFO] Starting Vite development server...
echo [INFO] The page should open automatically at http://localhost:3000/Ferox-Page/
echo.

:: Run dev server and open browser
call npm run dev -- --open

if !errorlevel! neq 0 (
    echo [ERROR] Failed to start the server.
    pause
)

ENDLOCAL
