# 🧠 Brainrot Meme Face Tracker

[![Check](https://github.com/IsaraApae/meme-face-tracker/actions/workflows/check.yml/badge.svg)](https://github.com/IsaraApae/meme-face-tracker/actions/workflows/check.yml)

### ▶️ [Try it online](https://isaraapae.github.io/meme-face-tracker/)

Make the face or do the gesture, and the matching meme pops up over your head.
It runs entirely in your browser: the camera never leaves your device.

<img src="docs/screenshot.jpg" width="300" alt="The tracker on a phone, on a photo of The Rock raising one eyebrow, with The Rock meme popped up over his head">

## Features

- **17 memes**, each set off by a face, a hand gesture, or both ([full list](meme-face-tracker/README.md#the-memes))
- **📸 Snapshot**: save a picture of you with the meme
- **📁 Your own memes**: swap in any image or GIF (kept in your browser; a big picture is stored as a smaller copy)
- **🖼 No camera?** Run the tracker on a photo instead. The camera is switched off while a photo is up
- **Keyboard and screen-reader friendly**: Tab to any meme and press Enter to preview it, and the meme that pops up is read out
- **Works offline**: the AI models are bundled, and nothing is uploaded anywhere. The online version keeps a copy of itself too, so after one visit it opens with no connection
- **Add to Home Screen**: on a phone it installs like an app, with its own icon

## What you need

- A recent browser with a camera, on a computer or a phone
- The page opened over `https://` or from `localhost`, since browsers only allow the camera there (the online version and the start scripts both do this)
- About 12 MB of download the first time (the tracking models); after that it's saved in your browser

## Run it offline

1. [Download the ZIP](https://github.com/IsaraApae/meme-face-tracker/archive/refs/heads/main.zip) and unzip it.
2. Open the `meme-face-tracker` folder inside and double-click `start.command` (Mac) or `start.bat` (Windows).
   See [its README](meme-face-tracker/README.md) if that doesn't work.

Or from a terminal:

```bash
git clone https://github.com/IsaraApae/meme-face-tracker.git
cd meme-face-tracker/meme-face-tracker
python3 -m http.server 8765
```

Then open http://localhost:8765.

## How it works

Plain HTML, CSS and JavaScript in one file, [`index.html`](meme-face-tracker/index.html): no build step and nothing to install.

- [MediaPipe](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker) (by Google) tracks 478 points on your face plus 52 expression scores, and both hands with their gesture, on every camera frame.
- The models run in a [Web Worker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API), off the page's own thread, so the page stays smooth while they work. Where a browser can't do that, they run on the page as before.
- Each meme has a small scoring function over those values. The best match above its threshold, held for a few frames, pops up.
- The library and models live in [`meme-face-tracker/vendor`](meme-face-tracker/vendor), so it works offline. If that folder is missing, it loads them from the web instead.

## Developing

- Turn on **Debug values** in the sidebar to see the live scores while tuning a meme.
- Add `?photo=memes/rock.webp` to the URL to run the tracker on a picture instead of the camera.
- Add `?worker=0` to keep the tracking on the page instead of in the worker. The last line of **Debug values** says which of the two is in use.
- The **Check** workflow runs on every push and pull request. It validates the HTML, checks that every meme has its image, and checks that the files in `vendor` are still the unmodified MediaPipe ones.
- [`sw.js`](meme-face-tracker/sw.js) is the service worker behind the online version's offline copy. It isn't used on `localhost`, so it never gets in the way while developing.
- Every push to `main` publishes the `meme-face-tracker` folder to GitHub Pages ([`pages.yml`](.github/workflows/pages.yml)).
- No environment variables or API keys are needed.

## License

The code is [MIT](LICENSE). The meme images in `meme-face-tracker/memes` belong to their respective owners and aren't covered by that license.
MediaPipe and its models are by Google, under the [Apache License 2.0](meme-face-tracker/vendor/LICENSE).
The app icons show the brain from Google's [Noto Emoji](https://github.com/googlefonts/noto-emoji), under the same license. [NOTICE](NOTICE) has the details.
