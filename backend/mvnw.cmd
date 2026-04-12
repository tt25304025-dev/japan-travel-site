@echo off
setlocal

set "WRAPPER_DIR=%~dp0"
set "WRAPPER_DIR=%WRAPPER_DIR:~0,-1%"
cd /d "%WRAPPER_DIR%"

REM Find Java
set "JAVA_CMD=java"
if defined JAVA_HOME set "JAVA_CMD=%JAVA_HOME%\bin\java.exe"
where java >nul 2>&1
if errorlevel 1 (
  echo ERROR: Java not found. Install Java 17+ from https://adoptium.net/
  pause
  exit /b 1
)

REM Download wrapper jar if missing
set "JAR_PATH=%WRAPPER_DIR%\.mvn\wrapper\maven-wrapper.jar"
if not exist "%JAR_PATH%" (
  echo Downloading Maven Wrapper...
  if not exist "%WRAPPER_DIR%\.mvn\wrapper" mkdir "%WRAPPER_DIR%\.mvn\wrapper"
  powershell -NoProfile -ExecutionPolicy Bypass -Command "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.1.0/maven-wrapper-3.1.0.jar', '%JAR_PATH%')"
  if not exist "%JAR_PATH%" (
    echo Download failed. Try: winget install Apache.Maven
    pause
    exit /b 1
  )
)

REM Run wrapper (use short path to avoid special chars)
set "PROJECT_DIR=%WRAPPER_DIR%"
"%JAVA_CMD%" -cp "%JAR_PATH%" -Dmaven.multiModuleProjectDirectory="%PROJECT_DIR%" org.apache.maven.wrapper.MavenWrapperMain %*
exit /b %ERRORLEVEL%
