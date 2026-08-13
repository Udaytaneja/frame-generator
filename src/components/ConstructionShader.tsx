import { useEffect, useRef } from 'react'

/** Direct React port of the approved Stitch WebGL construction shader. */
export function ConstructionShader({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
    if (!gl) { canvas.dataset.fallback = 'true'; return }
    const vertex = `attribute vec2 a_position; varying vec2 v_texCoord; void main(){ v_texCoord=a_position*.5+.5; gl_Position=vec4(a_position,0.,1.); }`
    const fragment = `precision highp float; uniform float u_time; uniform vec2 u_resolution; uniform vec2 u_mouse; varying vec2 v_texCoord;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
      void main(){ vec2 uv=v_texCoord; vec3 backgroundColor=vec3(0.,.42,.235); float noise=hash(uv+u_time*.1); float scanline=sin(uv.y*100.+u_time*10.)*.02; float progress=mod(u_time*.5,1.); float frameThickness=.02; float padding=.1; float border=0.; float edgeProgress=smoothstep(0.,1.,progress);
      if(uv.y>1.-padding-frameThickness&&uv.y<1.-padding&&uv.x>padding&&uv.x<padding+(1.-2.*padding)*edgeProgress)border=1.;
      if(uv.y>padding&&uv.y<padding+frameThickness&&uv.x<1.-padding&&uv.x>1.-padding-(1.-2.*padding)*edgeProgress)border=1.;
      if(uv.x>padding&&uv.x<padding+frameThickness&&uv.y<1.-padding&&uv.y>1.-padding-(1.-2.*padding)*edgeProgress)border=1.;
      if(uv.x>1.-padding-frameThickness&&uv.x<1.-padding&&uv.y>padding&&uv.y<padding+(1.-2.*padding)*edgeProgress)border=1.;
      vec3 color=mix(backgroundColor,vec3(1.,.83,0.),border); color+=noise*.05; color+=scanline; gl_FragColor=vec4(color,1.); }`
    const compile = (type: number, source: string) => { const shader = gl.createShader(type)!; gl.shaderSource(shader, source); gl.compileShader(shader); return shader }
    const program = gl.createProgram()!; const vs = compile(gl.VERTEX_SHADER, vertex); const fs = compile(gl.FRAGMENT_SHADER, fragment)
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program); gl.useProgram(program)
    const buffer = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'a_position'); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    const uTime = gl.getUniformLocation(program, 'u_time'); const uResolution = gl.getUniformLocation(program, 'u_resolution'); const uMouse = gl.getUniformLocation(program, 'u_mouse')
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 }
    const onMouseMove = (event: MouseEvent) => { const rect = canvas.getBoundingClientRect(); if (rect.width && rect.height) { mouse = { x: ((event.clientX - rect.left) / rect.width) * canvas.width, y: (1 - (event.clientY - rect.top) / rect.height) * canvas.height } } }
    window.addEventListener('mousemove', onMouseMove)
    const resize = () => { const rect = canvas.getBoundingClientRect(); const ratio = Math.min(window.devicePixelRatio, 2); canvas.width = Math.max(1, rect.width * ratio); canvas.height = Math.max(1, rect.height * ratio) }
    const observer = new ResizeObserver(resize); observer.observe(canvas); resize()
    let id = 0
    const render = (time: number) => { gl.viewport(0,0,canvas.width,canvas.height); if(uTime) gl.uniform1f(uTime,time*.001); if(uResolution) gl.uniform2f(uResolution,canvas.width,canvas.height); if(uMouse) gl.uniform2f(uMouse,mouse.x,mouse.y); gl.drawArrays(gl.TRIANGLE_STRIP,0,4); id=requestAnimationFrame(render) }
    id = requestAnimationFrame(render)
    return () => { cancelAnimationFrame(id); observer.disconnect(); window.removeEventListener('mousemove', onMouseMove); gl.deleteBuffer(buffer); gl.deleteShader(vs); gl.deleteShader(fs); gl.deleteProgram(program) }
  }, [])
  return <canvas ref={canvasRef} aria-hidden="true" className={`construction-shader ${className}`} />
}
