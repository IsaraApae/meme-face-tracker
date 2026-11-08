# Vendored MediaPipe

These files are unmodified copies, so the tracker works offline. They are
Google's, under the Apache License 2.0 (see [LICENSE](LICENSE)).

| File | Source |
|---|---|
| `vision_bundle.mjs`, `wasm/*` | npm [`@mediapipe/tasks-vision@0.10.14`](https://www.npmjs.com/package/@mediapipe/tasks-vision/v/0.10.14) |
| `models/face_landmarker.task` | `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task` |
| `models/gesture_recognizer.task` | `https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task` |

If you update the library, also update the CDN fallback version in
`../index.html` (the `CDN` constant) so both stay the same.
