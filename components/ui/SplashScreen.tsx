'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type MutableRefObject
} from 'react'

interface SplashScreenProps {
  onComplete?: () => void
  duration?: number
}

type PointerState = {
  x: number
  y: number
  velocity: number
}

type FabricCanvasProps = {
  pointer: PointerState
  intensity: number
  timeline: number
}

export default function SplashScreen({ onComplete, duration = 10000 }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastMoveRef = useRef({
    x: 0.5,
    y: 0.5,
    time: typeof performance !== 'undefined' ? performance.now() : 0
  })
  const [pointer, setPointer] = useState<PointerState>({ x: 0.5, y: 0.5, velocity: 0.12 })
  const [timeline, setTimeline] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) {
        setTimeout(onComplete, 400)
      }
    }, duration)

    return () => clearTimeout(exitTimer)
  }, [duration, onComplete])

  useEffect(() => {
    let frame: number
    const start = performance.now()

    const loop = () => {
      const elapsed = performance.now() - start
      setTimeline(Math.min(elapsed / duration, 1))
      if (elapsed < duration) {
        frame = requestAnimationFrame(loop)
      }
    }

    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [duration])

  useEffect(() => {
    const decay = setInterval(() => {
      setPointer(prev => ({
        x: prev.x,
        y: prev.y,
        velocity: Math.max(prev.velocity * 0.9 - 0.01, 0.05)
      }))
    }, 80)

    return () => clearInterval(decay)
  }, [])

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    const now = performance.now()
    const last = lastMoveRef.current
    const dx = x - last.x
    const dy = y - last.y
    const dt = Math.max(now - last.time, 16)
    const velocity = Math.min(Math.sqrt(dx * dx + dy * dy) / (dt / 16), 1)

    lastMoveRef.current = { x, y, time: now }

    setPointer({
      x: Math.min(Math.max(x, 0), 1),
      y: Math.min(Math.max(y, 0), 1),
      velocity: velocity + 0.08
    })
  }

  const handlePointerLeave = () => {
    setPointer(prev => ({ ...prev, velocity: 0.05 }))
  }

  const interactionWindow = Math.min(Math.max((timeline - 0.2) / 0.6, 0), 1)
  const settlingFactor = timeline > 0.8 ? Math.max(1 - (timeline - 0.8) / 0.15, 0) : 1
  const intensity = Math.max(0.04, pointer.velocity * interactionWindow * settlingFactor + 0.05)
  const fabricOpacity = Math.min(timeline / 0.2, 1)
  const showLogo = timeline >= 0.95

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 overflow-hidden bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerMove}
          onPointerEnter={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <FabricCanvas pointer={pointer} intensity={intensity} timeline={timeline} opacity={fabricOpacity} />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at center, rgba(255,248,235,0.12), transparent 55%), linear-gradient(135deg, rgba(18,18,18,0.95), rgba(28,25,23,0.85))',
              mixBlendMode: 'soft-light'
            }}
          />

          {showLogo && (
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, letterSpacing: '1em' }}
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={{ duration: 0.8, ease: [0.45, 0.05, 0.2, 1] }}
            >
              <span className="text-4xl tracking-[0.35em] text-ivory md:text-6xl">THEA</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function FabricCanvas({ pointer, intensity, timeline, opacity }: FabricCanvasProps & { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerRef = useRef(pointer)
  const intensityRef = useRef(intensity)
  const timelineRef = useRef(timeline)
  const programRef = useRef<WebGLProgram | null>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const uniformRef = useRef<
    Record<'resolution' | 'time' | 'pointer' | 'intensity' | 'progress', WebGLUniformLocation | null>
  >({
    resolution: null,
    time: null,
    pointer: null,
    intensity: null,
    progress: null
  })

  useEffect(() => {
    pointerRef.current = pointer
  }, [pointer])

  useEffect(() => {
    intensityRef.current = intensity
  }, [intensity])

  useEffect(() => {
    timelineRef.current = timeline
  }, [timeline])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { alpha: false, antialias: true })

    if (!gl) {
      canvas.dataset.fallback = 'true'
      return
    }

    glRef.current = gl

    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_pointer;
      uniform float u_intensity;
      uniform float u_progress;

      float random(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = v_uv;
        vec2 pointer = vec2(u_pointer.x, 1.0 - u_pointer.y);
        vec2 dir = pointer - uv;
        float dist = length(dir + 0.0001);
        float influence = exp(-dist * 3.2);

        float slowDown = mix(1.0, 0.2, smoothstep(0.8, 1.0, u_progress));
        float t = u_time * slowDown;

        float drift = fbm(uv * 3.5 + vec2(t * 0.3, t * 0.1));
        float folds = fbm(uv * 7.0 - vec2(t * 0.6, t * 0.4));
        float ripple = sin((uv.y + t) * 10.0) * 0.03;
        float pointerWave = sin(dist * 30.0 - t * 14.0) * influence * u_intensity * 0.45;

        float displacement = drift * 0.35 + folds * 0.25 + ripple + pointerWave;
        vec2 warped = uv + vec2(displacement * 0.4, displacement);

        float depth = fbm(warped * 4.0 - vec2(t * 0.3, t * 0.2));
        float sheen = smoothstep(0.35, 0.85, fbm(warped * 6.0 + vec2(t)) + influence * u_intensity * 0.5);

        vec3 base = vec3(0.94, 0.92, 0.89);
        vec3 shadow = vec3(0.25, 0.24, 0.23);
        vec3 highlight = vec3(0.98, 0.94, 0.88);

        vec3 color = mix(base, shadow, depth * 0.55);
        color = mix(color, highlight, sheen * 0.85);

        float vignette = smoothstep(1.1, 0.2, dist + 0.1);
        color *= vignette;

        float fadeIn = smoothstep(0.0, 0.15, u_progress);
        float fadeOut = 1.0 - smoothstep(0.95, 1.0, u_progress);

        gl_FragColor = vec4(color, fadeIn * fadeOut);
      }
    `

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader) || 'Shader compile error')
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource)

    if (!vertexShader || !fragmentShader) {
      canvas.dataset.fallback = 'true'
      return
    }

    const program = gl.createProgram()
    if (!program) {
      canvas.dataset.fallback = 'true'
      return
    }

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program) || 'Program link error')
      canvas.dataset.fallback = 'true'
      return
    }

    gl.useProgram(program)
    programRef.current = program

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1
      ]),
      gl.STATIC_DRAW
    )

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    uniformRef.current = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      pointer: gl.getUniformLocation(program, 'u_pointer'),
      intensity: gl.getUniformLocation(program, 'u_intensity'),
      progress: gl.getUniformLocation(program, 'u_progress')
    }

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      const displayWidth = Math.floor(width * pixelRatio)
      const displayHeight = Math.floor(height * pixelRatio)

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth
        canvas.height = displayHeight
        gl.viewport(0, 0, displayWidth, displayHeight)
        const resolutionUniform = uniformRef.current.resolution
        if (resolutionUniform) {
          gl.uniform2f(resolutionUniform, displayWidth, displayHeight)
        }
      }
    }

    resize()
    window.addEventListener('resize', resize)

    let frameId: number
    const render = (now: number) => {
      frameId = requestAnimationFrame(render)
      if (!gl || !programRef.current) return

      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)

      if (uniformRef.current.time) {
        gl.uniform1f(uniformRef.current.time, now * 0.001)
      }

      if (uniformRef.current.pointer) {
        gl.uniform2f(
          uniformRef.current.pointer,
          pointerRef.current.x,
          pointerRef.current.y
        )
      }

      if (uniformRef.current.intensity) {
        gl.uniform1f(uniformRef.current.intensity, intensityRef.current)
      }

      if (uniformRef.current.progress) {
        gl.uniform1f(uniformRef.current.progress, timelineRef.current)
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    frameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      if (positionBuffer) gl.deleteBuffer(positionBuffer)
      if (program) gl.deleteProgram(program)
      if (vertexShader) gl.deleteShader(vertexShader)
      if (fragmentShader) gl.deleteShader(fragmentShader)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
      aria-hidden
    />
  )
}
