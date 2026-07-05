🧠 BRAINROT MEME TRACKER — HOW TO RUN

Everything (AI models included) is inside this folder, so it works on any
computer with no internet — just copy the whole folder.

  Mac:     double-click  start.command   (first time: right-click → Open)
  Windows: double-click  start.bat       (needs Python — free at python.org)

Then allow camera access when the browser asks.

If the start script doesn't work, two other ways:
  1. With internet: just double-click index.html — it loads the AI from the
     web instead of the vendor folder.
  2. Any terminal: run   python3 -m http.server 8765   in this folder,
     then open http://localhost:8765

TIPS
  - Click the 📁 button on any meme in the sidebar to use your own image
    or GIF. ✕ goes back to the default.
  - Turn on "Debug values" if a face/gesture is hard to trigger — it shows
    the live detection scores.
