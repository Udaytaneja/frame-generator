import { useCallback, useEffect, useState } from 'react'
import { Header } from './components/Header'
import { UploadZone } from './components/UploadZone'
import { PhotoPreview } from './components/PhotoPreview'
import { GeneratingState } from './components/GeneratingState'
import { GeneratedResult } from './components/GeneratedResult'
import { ErrorState } from './components/ErrorState'
import { generateHHGoaFrame } from './utils/frameRenderer'
import { downloadImage } from './utils/downloadImage'
import { openXIntent, shareGeneratedFrame } from './utils/shareToX'
import { detectPrimaryFace, type FaceBox } from './utils/faceDetector'

type State = 'upload' | 'checking' | 'preview' | 'generating' | 'result' | 'error'
const acceptable = new Set(['image/jpeg', 'image/png', 'image/heic', 'image/heif'])

export default function App() {
  const [state, setState] = useState<State>('upload'); const [photo, setPhoto] = useState(''); const [fileName, setFileName] = useState(''); const [result, setResult] = useState(''); const [resultBlob, setResultBlob] = useState<Blob | null>(null); const [face, setFace] = useState<FaceBox | null>(null); const [error, setError] = useState(''); const [noFace, setNoFace] = useState(false)
  useEffect(() => () => { if(photo) URL.revokeObjectURL(photo); if(result) URL.revokeObjectURL(result) }, [photo, result])
  const chooseFile = useCallback((file: File) => {
    if (!acceptable.has(file.type) && !/\.(jpe?g|png|hei[cf])$/i.test(file.name)) { setError("We couldn't process this file. The digital palms are rustling in confusion."); setState('error'); return }
    if (file.size > 12 * 1024 * 1024) { setError('This file is larger than the 12MB studio limit. Please choose a smaller image.'); setState('error'); return }
    const url = URL.createObjectURL(file); const probe = new Image(); probe.onload = async () => {
      if(photo) URL.revokeObjectURL(photo); setPhoto(url); setFileName(file.name); setState('checking')
      try { const detectedFace = await detectPrimaryFace(probe); if (!detectedFace) { setNoFace(true); setError("We couldn't find a face in this photo. Please upload a clear photo of yourself."); setState('error'); return } setFace(detectedFace); setNoFace(false); setState('preview') }
      catch { setError("We couldn't check this photo right now. Please try another clear photo."); setState('error') }
    }; probe.onerror = () => { URL.revokeObjectURL(url); setError('This image format could not be decoded by your browser.'); setState('error') }; probe.src = url
  }, [photo])
  const generate = useCallback(async () => { setState('generating'); try { const image = new Image(); image.src = photo; await image.decode(); const blob = await generateHHGoaFrame(image, face); const url = URL.createObjectURL(blob); if(result) URL.revokeObjectURL(result); setResultBlob(blob); setResult(url); window.setTimeout(() => setState('result'), 1050) } catch { setError('The frame renderer hit a processing error. Your original photo was not changed.'); setState('error') } }, [photo, result, face])
  const reset = () => { setState('upload'); setPhoto(''); setResult(''); setResultBlob(null); setFace(null); setNoFace(false) }
  const share = async () => { if (!resultBlob) return; const outcome = await shareGeneratedFrame(resultBlob); if (outcome === 'fallback') { downloadImage(resultBlob); openXIntent() } }
  return <div id="top" className="app"><Header/>{state === 'upload' && <main className="upload-page" id="studio"><section className="upload-copy"><span className="eyebrow">// SYS_SEQ: INITIATE</span><h1>FRAME YOUR<br/>BUILDER IDENTITY</h1><div className="paper-note">Create your HH Goa 2026 frame and share it with the world.<br/><b>HH GOA // 2026 | GOA, IN | 28—31 OCT</b></div><span className="palm palm-left">✹</span></section><UploadZone onFile={chooseFile}/></main>}{state === 'checking' && <GeneratingState src={photo} checking/>}{state === 'preview' && <PhotoPreview src={photo} fileName={fileName} onGenerate={generate} onReplace={reset}/>} {state === 'generating' && <GeneratingState src={photo}/>} {state === 'result' && <GeneratedResult src={result} onDownload={() => resultBlob && downloadImage(resultBlob)} onShare={share} onReset={reset}/>} {state === 'error' && <ErrorState message={error} onRetry={reset} retryLabel={noFace ? 'TRY ANOTHER PHOTO' : undefined} showFormats={!noFace}/>}<footer>© 2026 HH GOA • BUILDER CULTURE <span>✦ ✦ ✦</span></footer></div>
}
