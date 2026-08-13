export const shareCaption = 'Just framed my builder identity for HH Goa 2026 ⚡\n\n#FrameInGoa'

function isMobile(): boolean {
  // Prefer the newer userAgentData flag when available, fallback to userAgent regex
  const nav = navigator as any
  if (nav.userAgentData && typeof nav.userAgentData.mobile === 'boolean') return nav.userAgentData.mobile
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export async function shareGeneratedFrame(blob: Blob): Promise<'shared' | 'fallback'> {
  const file = new File([blob], 'hh-goa-2026-frame.png', { type: 'image/png' })
  // Only attempt the native Web Share flow on mobile devices.
  // Desktop browsers can expose navigator.share but that leads to the OS share dialog (Windows Share, etc.),
  // which we must avoid — desktop should open X intent instead.
  if (isMobile() && navigator.share && navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ text: shareCaption, files: [file] }); return 'shared' }
    catch (error) { if (error instanceof DOMException && error.name === 'AbortError') return 'shared'; return 'fallback' }
  }
  return 'fallback'
}

export function openXIntent() {
  // Use X's modern intent URL and encode the caption. Desktop should open this directly.
  window.open(`https://x.com/intent/post?text=${encodeURIComponent(shareCaption)}`, '_blank', 'noopener,noreferrer')
}
