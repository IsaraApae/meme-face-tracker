@echo off
rem Meme tracker launcher (Windows) - starts a tiny local server and opens the page
cd /d "%~dp0"
start "" "http://localhost:8765"
py -m http.server 8765 2>nul
if %errorlevel% neq 0 python -m http.server 8765
if %errorlevel% neq 0 (
  echo.
  echo Python was not found. Either install it free from python.org,
  echo or connect to the internet and open index.html directly instead.
  pause
)
