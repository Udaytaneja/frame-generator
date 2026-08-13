export type CoverCrop = { sx: number; sy: number; sw: number; sh: number }
export type NormalizedFaceBox = { x: number; y: number; width: number; height: number }

export function coverCrop(sourceWidth: number, sourceHeight: number, targetWidth: number, targetHeight: number, face?: NormalizedFaceBox | null): CoverCrop {
  const sourceRatio = sourceWidth / sourceHeight
  const targetRatio = targetWidth / targetHeight
  if (sourceRatio > targetRatio) {
    const sw = sourceHeight * targetRatio
    const defaultX = (sourceWidth - sw) / 2
    if (!face) return { sx: defaultX, sy: 0, sw, sh: sourceHeight }
    const faceCenterX = (face.x + face.width / 2) * sourceWidth
    const safeCenterX = Math.max(sw / 2, Math.min(sourceWidth - sw / 2, faceCenterX))
    return { sx: safeCenterX - sw / 2, sy: 0, sw, sh: sourceHeight }
  }
  const sh = sourceWidth / targetRatio
  const defaultY = (sourceHeight - sh) / 2
  if (!face) return { sx: 0, sy: defaultY, sw: sourceWidth, sh }
  const faceCenterY = (face.y + face.height / 2) * sourceHeight
  const safeCenterY = Math.max(sh / 2, Math.min(sourceHeight - sh / 2, faceCenterY))
  return { sx: 0, sy: safeCenterY - sh / 2, sw: sourceWidth, sh }
}
