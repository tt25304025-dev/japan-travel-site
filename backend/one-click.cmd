@echo off
cd /d "%~dp0"

REM One-click start:
REM - Reset DB (drop + recreate) without asking
REM - Fix "port 8080 already in use" by killing the old process on 8080
REM   (this keeps your backend always on http://localhost:8080)

call "%~dp0run.cmd" --resetdb --kill-8080

