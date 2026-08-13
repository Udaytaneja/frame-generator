import { useRef, useState } from 'react'

export function UploadZone({ onFile }: { onFile: (file: File) => void }) {
  const input = useRef<HTMLInputElement>(null); const [dragging, setDragging] = useState(false)
  return <section className="upload-station" onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); const f=e.dataTransfer.files[0]; if(f) onFile(f) }}>
    <div className="station-bar"><span>FILE_UPLOAD V.2026</span><span className="awaiting">● AWAITING_INPUT</span></div>
    <div className={`drop-target ${dragging ? 'is-dragging' : ''}`}><span className="camera">▣</span><h2>SELECT SOURCE</h2><p>JPG / PNG / HEIC<br/>MAX 12MB</p><button className="pink-button" onClick={() => input.current?.click()}>CHOOSE PHOTO</button><input ref={input} type="file" hidden accept="image/jpeg,image/png,image/heic,image/heif" onChange={e => { const f=e.target.files?.[0]; if(f) onFile(f); e.currentTarget.value='' }} /></div>
    <span className="sticker">+</span>
  </section>
}
