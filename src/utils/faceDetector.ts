import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision'

export type FaceBox = { x: number; y: number; width: number; height: number }

let detectorPromise: Promise<FaceDetector> | undefined

async function getDetector() {
  if (!detectorPromise) detectorPromise = (async () => {
    const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm')
    return FaceDetector.createFromOptions(vision, {
      baseOptions: { modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite' },
      runningMode: 'IMAGE',
      minDetectionConfidence: 0.35,
      minSuppressionThreshold: 0.3,
    })
  })()
  return detectorPromise
}

/** Returns the largest detected face as a normalised source-image box. */
export async function detectPrimaryFace(image: HTMLImageElement): Promise<FaceBox | null> {
  const detector = await getDetector()
  const result = detector.detect(image)
  const candidates = result.detections
    .map(detection => detection.boundingBox)
    .filter((box): box is NonNullable<typeof box> => Boolean(box))
  if (!candidates.length) return null
  const box = candidates.reduce((largest, current) => current.width * current.height > largest.width * largest.height ? current : largest)
  return { x: box.originX / image.naturalWidth, y: box.originY / image.naturalHeight, width: box.width / image.naturalWidth, height: box.height / image.naturalHeight }
}
