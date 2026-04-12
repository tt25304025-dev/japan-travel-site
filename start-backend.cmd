@echo off
echo ========================================
echo   Travel Agency - Start Backend (check)
echo ========================================
echo.
echo Starts Spring Boot at http://localhost:8080
echo Does NOT reset your database (your data stays).
echo.

cd /d "%~dp0backend"
if not exist "mvnw.cmd" (
    echo ERROR: mvnw.cmd not found. Expected folder:
    echo %~dp0backend
    pause
    exit /b 1
)

echo Opening a new window for the server...
echo   Site:  http://localhost:8080
echo   Admin: http://localhost:8080/admin/login
echo   Stop:  Close that window or press Ctrl+C there.
echo.

start "Travel Agency Backend" cmd /k mvnw.cmd spring-boot:run

echo Waiting ~15s for Spring Boot to start (longer on first run)...
timeout /t 15 /nobreak >nul

start "" "http://localhost:8080"

echo.
echo If the browser shows an error, wait and refresh — first run downloads dependencies.
echo.
pause
