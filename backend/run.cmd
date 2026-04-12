@echo off
cd /d "%~dp0"

setlocal enableextensions enabledelayedexpansion

REM Flags:
REM   --resetdb        Drop + recreate DB (non-interactive)
REM   --no-resetdb     Do not reset DB (default)
REM   --kill-8080      Kill any process listening on 8080
REM   --auto-port      If 8080 busy, use 8081/8082/... automatically

set "DO_RESETDB=0"
set "KILL_8080=0"
set "AUTO_PORT=0"

REM Default behavior for safety: do NOT reset DB automatically
REM (use one-click.cmd to run with resetdb + fixes)

for %%A in (%*) do (
  if /i "%%~A"=="--resetdb" set "DO_RESETDB=1"
  if /i "%%~A"=="--no-resetdb" set "DO_RESETDB=0"
  if /i "%%~A"=="--kill-8080" set "KILL_8080=1"
  if /i "%%~A"=="--auto-port" set "AUTO_PORT=1"
)

set "PORT=8080"

REM If requested, kill whatever is on 8080
if "%KILL_8080%"=="1" (
  for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":8080" ^| findstr "LISTENING"') do (
    if not "%%P"=="0" (
      echo Port 8080 is in use. Stopping PID %%P ...
      taskkill /F /PID %%P >nul 2>&1
    )
  )
  netstat -ano | findstr ":8080" | findstr "LISTENING" >nul 2>&1
  if not errorlevel 1 (
    echo ERROR: Port 8080 is still in use. Close the app using it and try again.
    pause
    goto :eof
  )
)

REM If requested, automatically choose a free port starting at 8080
if "%AUTO_PORT%"=="1" (
  set "PORT=8080"
  :find_port
  netstat -ano | findstr ":!PORT! .*LISTENING" >nul 2>&1
  if not errorlevel 1 (
    set /a PORT=!PORT!+1
    if !PORT! GTR 8090 (
      echo ERROR: Could not find a free port between 8080-8090.
      pause
      goto :eof
    )
    goto :find_port
  )
  if not "%PORT%"=="8080" (
    echo Port 8080 busy. Using port !PORT! instead.
  )
)

REM Reset DB before app startup (drops + recreates database)
if "%DO_RESETDB%"=="1" (
  if exist "%~dp0reset-db.cmd" (
    call "%~dp0reset-db.cmd" --yes
    if errorlevel 1 (
      echo.
      echo Database reset failed. Not starting the backend.
      pause
      goto :eof
    )
  )
)

:run_app
REM Try mvn first (if Maven is installed)
where mvn >nul 2>&1
if %errorlevel% equ 0 (
  echo Using Maven...
  echo Cleaning and starting backend on port %PORT% ...
  mvn clean -Dspring-boot.run.arguments="--server.port=%PORT%" -Dspring-boot.run.jvmArguments="-Dserver.port=%PORT%" spring-boot:run
  goto :eof
)

REM Try mvnw
if exist "%~dp0mvnw.cmd" (
  echo Using Maven Wrapper...
  echo Cleaning and starting backend on port %PORT% ...
  call mvnw.cmd clean -Dspring-boot.run.arguments="--server.port=%PORT%" -Dspring-boot.run.jvmArguments="-Dserver.port=%PORT%" spring-boot:run
  goto :eof
)

echo.
echo Maven not found. Install it with one of these options:
echo.
echo   1. Run: winget install Apache.Maven
echo      Then close and reopen this terminal, and run this script again.
echo.
echo   2. Download from: https://maven.apache.org/download.cgi
echo      Extract and add the 'bin' folder to your PATH.
echo.
pause
