# Vendored MediaPipe

These files are unmodified copies, so the tracker works offline. They are
Google's, under the Apache License 2.0 (see [LICENSE](LICENSE)).

| File | Source |
|---|---|
| `vision_bundle.mjs`, `wasm/*` | npm [`@mediapipe/tasks-vision@0.10.14`](https://www.npmjs.com/package/@mediapipe/tasks-vision/v/0.10.14) |
| `models/face_landmarker.task` | `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task` |
| `models/gesture_recognizer.task` | `https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task` |

[`SHA256SUMS`](SHA256SUMS) records the checksum of each file; the Check workflow
fails if a file here no longer matches it. To verify by hand, run
`sha256sum -c SHA256SUMS` in this folder.

If you update the library:

1. Replace the files and write the new checksums (`sha256sum vision_bundle.mjs wasm/* models/* > SHA256SUMS`).
2. Update the CDN fallback version in `../index.html` (the `CDN` constant).
3. Update `MEDIAPIPE` in `../sw.js` to the same version, so browsers that
   saved the old files for offline use fetch the new ones.
