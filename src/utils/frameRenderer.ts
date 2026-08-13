import { coverCrop, type NormalizedFaceBox } from './imageCrop'

const W = 1080
const emerald = '#00502c'
const yellow = '#fed400'
const pink = '#b7005b'
const cream = '#fff9ec'
const ink = '#1a1a1a'

function leaf(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rotation: number, color: string) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rotation); ctx.fillStyle = color
  for (let i = 0; i < 7; i++) { ctx.rotate(Math.PI / 3.5); ctx.beginPath(); ctx.ellipse(0, -r * .55, r * .20, r * .72, 0, 0, Math.PI * 2); ctx.fill() }
  ctx.restore()
}

function lineText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, font: string, color: string, align: CanvasTextAlign = 'left') {
  ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.fillText(text, x, y)
}

export async function generateHHGoaFrame(image: CanvasImageSource, face?: NormalizedFaceBox | null): Promise<Blob> {
  const canvas = document.createElement('canvas'); canvas.width = W; canvas.height = W
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) throw new Error('Canvas rendering is unavailable in this browser.')
  const source = image as { width: number; height: number; naturalWidth?: number; naturalHeight?: number }
  const sw = source.naturalWidth || source.width; const sh = source.naturalHeight || source.height
  if (!sw || !sh) throw new Error('The photo could not be read.')
  ctx.fillStyle = emerald; ctx.fillRect(0, 0, W, W)
  const crop = coverCrop(sw, sh, 860, 860, face)
  ctx.drawImage(image, crop.sx, crop.sy, crop.sw, crop.sh, 110, 110, 860, 860)
  // Strong ink mount and four-color editorial frame.
  ctx.strokeStyle = ink; ctx.lineWidth = 16; ctx.strokeRect(96, 96, 888, 888)
  ctx.strokeStyle = cream; ctx.lineWidth = 24; ctx.strokeRect(118, 118, 844, 844)
  ctx.strokeStyle = yellow; ctx.lineWidth = 9; ctx.strokeRect(77, 77, 926, 926)
  ctx.fillStyle = cream; ctx.fillRect(0, 0, W, 72); ctx.fillRect(0, 1008, W, 72)
  ctx.fillStyle = yellow; ctx.fillRect(0, 72, W, 14); ctx.fillRect(0, 994, W, 14)
  leaf(ctx, 79, 90, 76, -.45, '#0a7345'); leaf(ctx, 1000, 88, 73, .45, '#0a7345'); leaf(ctx, 83, 1000, 66, .42, pink); leaf(ctx, 996, 998, 66, -.42, pink)
  ctx.fillStyle = yellow; ctx.strokeStyle = ink; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(950, 132, 39, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
  ctx.fillStyle = pink; ctx.strokeStyle = ink; ctx.fillRect(802, 902, 165, 46); ctx.strokeRect(802, 902, 165, 46)
  lineText(ctx, 'HH GOA 2026', 540, 48, '900 42px Georgia, serif', emerald, 'center')
  lineText(ctx, 'BUILD. SHIP. REPEAT.', 540, 70, '700 14px monospace', ink, 'center')
  lineText(ctx, 'BUILDER', 884, 933, '700 18px monospace', cream, 'center')
  lineText(ctx, 'GOA / INDIA', 38, 1041, '700 14px monospace', emerald)
  lineText(ctx, '28—31 OCT 2026', 1042, 1041, '700 14px monospace', emerald, 'right')
  // Construction corners and subtle printed grain.
  ctx.strokeStyle = ink; ctx.lineWidth = 5
  for (const [x, y, dx, dy] of [[55,55,35,0],[1025,55,-35,0],[55,1025,35,0],[1025,1025,-35,0]] as number[][]) { ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+dx,y); ctx.moveTo(x,y); ctx.lineTo(x,y + (y < 540 ? 35 : -35)); ctx.stroke() }
  ctx.globalAlpha = .07; ctx.fillStyle = ink
  for (let i = 0; i < 6000; i++) ctx.fillRect(Math.random() * W, Math.random() * W, 1, 1)
  ctx.globalAlpha = 1
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('PNG export failed.')), 'image/png'))
}
