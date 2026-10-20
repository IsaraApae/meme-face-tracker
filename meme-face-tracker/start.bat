@echo off
rem Meme tracker launcher (Windows) - starts a tiny local server and opens the page
cd /d "%~dp0"
rem open the browser a moment after the server starts
start "" cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:8765"
where py >nul 2>nul && (py -m http.server 8765 & goto :eof)
where python >nul 2>nul && (python -m http.server 8765 & goto :eof)
echo.
echo Python was not found. Either install it free from python.org,
echo or connect to the internet and open index.html directly instead.
pause
