# 🧠 Brainrot Meme Face Tracker

Make the face or do the gesture, and the matching meme pops up over your head.
Everything (the AI models too) is inside this folder, so it works on any computer
with no internet. Just copy the whole folder.

## How to run

| | |
|---|---|
| **Mac** | double-click `start.command` (first time: right-click → Open) |
| **Windows** | double-click `start.bat` (needs Python, free at python.org) |

Then allow camera access when the browser asks.

If the start script doesn't work:
1. With internet: just double-click `index.html`. It loads the AI from the web instead of the `vendor` folder.
2. Any terminal: run `python3 -m http.server 8765` in this folder, then open http://localhost:8765

## The memes

| Meme | How to trigger it |
|---|---|
| **6 7** (67 Kid / Six Seven) | bounce both hands up & down |
| **Absolute Cinema** (Martin Scorsese) | hold both palms out, still |
| **No Way** (shocked guy) | jaw drop + both hands on your head |
| **Surprised Pikachu** 🆕 | mouth wide open + eyebrows up, no hands |
| **Scuba** (Scuba Dance) | pinch your nose |
| **Roll Safe** 🆕 | tap your temple with one finger |
| **Erm, Actually** ☝️🤓 | point up |
| **Facepalm** (Picard) 🆕 | palm over your eyes / forehead |
| **Hold Up** | one palm out to the camera |
| **Silly Cat** 🤙 | tongue out + 🤙 hand |
| **Hide the Pain Harold** 🆕 | hand by your ear like a phone + big smile |
| **Who, Me?** (Guy Pointing at Himself) | point at your chest |
| **Jimmy Butler** (Jimmy Butler Reading) | hold a paper up + squint |
| **Speed** (IShowSpeed) | scrunch: eyes shut + pucker |
| **Cooked Dog** (Dog Closing His Eyes) | close your eyes & tilt your head up |
| **The Rock** 🤨 🆕 | raise ONE eyebrow |
| **Awkward Monkey** (Monkey Puppet) 🆕 | look away with just your eyes 👀 |

## Tips

- **Tap a meme** in the sidebar to preview it. Tap 📁 to use your own image or GIF, and ✕ to go back to the default.
- **📸** (top-right of the video) saves a picture of you with the meme.
- **Vine boom 🔊** plays a boom every time a meme pops.
- **🖼 Try a photo**: no camera? Run the tracker on a picture instead.
- Turn on **Debug values** if a face or gesture is hard to trigger. It shows the live detection scores.
