@echo off
setlocal enableextensions

REM ---- MySQL connection (matches application.properties) ----
set "MYSQL_HOST=localhost"
set "MYSQL_PORT=3306"
set "DB_NAME=travel_agency"
set "DB_USER=root"
set "DB_PASS=1234"

REM Allow non-interactive mode: reset-db.cmd --yes
if /i "%~1"=="--yes" goto :do_reset

echo.
echo This will DROP and recreate the MySQL database "%DB_NAME%".
echo All data in that database will be permanently deleted.
echo.
set /p "CONFIRM=Continue? (Y/N): "
if /i not "%CONFIRM%"=="Y" (
  echo Skipping database reset.
  exit /b 0
)

:do_reset
where mysql >nul 2>&1
if errorlevel 1 (
  echo.
  echo ERROR: "mysql" CLI not found in PATH.
  echo Install MySQL Server - includes mysql.exe - and add it to PATH,
  echo or run this from a terminal where mysql.exe is available.
  echo.
  exit /b 1
)

echo.
echo Resetting database...
mysql -h %MYSQL_HOST% -P %MYSQL_PORT% -u %DB_USER% -p%DB_PASS% -e "DROP DATABASE IF EXISTS %DB_NAME%; CREATE DATABASE %DB_NAME% CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
if errorlevel 1 (
  echo.
  echo ERROR: Failed to reset DB. Check:
  echo - MySQL is running
  echo - Username/password are correct
  echo - User has permission to DROP/CREATE databases
  echo.
  exit /b 1
)

echo Database "%DB_NAME%" reset successfully.
exit /b 0

