'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent
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

type LetterSegment = {
  start: [number, number]
  end: [number, number]
  control?: [number, number]
}

type ThreadNode = {
  x: number
  y: number
  vx: number
  vy: number
  offset: number
}

type Thread = {
  nodes: ThreadNode[]
  color: string
  noiseSeed: number
  letterSegment: LetterSegment
  thickness: number
  anchor: { x: number; y: number }
}

type ThreadCanvasProps = {
  pointer: PointerState
  timeline: number
  pointerEnergy: number
}

const TOTAL_DURATION = 5000
const LOGO_HOLD_MS = 900
const THREAD_COUNT = 84
const NODES_PER_THREAD = 8
const BACKDROP = '#f8f4ec'
const THREAD_COLORS = [
  'rgba(32,30,30,0.85)',
  'rgba(70,55,48,0.8)',
  'rgba(116,84,68,0.78)',
  'rgba(164,112,76,0.76)',
  'rgba(202,150,102,0.72)',
  'rgba(210,178,130,0.68)',
  'rgba(186,132,144,0.7)',
  'rgba(148,118,176,0.66)',
  'rgba(118,136,192,0.64)',
  'rgba(102,152,168,0.62)',
  'rgba(88,132,150,0.63)',
  'rgba(64,90,112,0.65)'
]

const LETTER_SPACE = {
  offsetX: 0.5,
  offsetY: 0.53,
  scaleX: 0.62,
  scaleY: 0.78
}

const LETTER_SEGMENTS: LetterSegment[] = [
  // T
  { start: [0.12, 0.25], end: [0.28, 0.25] },
  { start: [0.28, 0.25], end: [0.42, 0.25] },
  { start: [0.27, 0.25], end: [0.27, 0.75] },
  // H
  { start: [0.46, 0.25], end: [0.46, 0.75] },
  { start: [0.46, 0.5], end: [0.6, 0.5] },
  { start: [0.6, 0.25], end: [0.6, 0.75] },
  // E
  { start: [0.68, 0.25], end: [0.68, 0.75] },
  { start: [0.68, 0.25], end: [0.82, 0.25] },
  { start: [0.68, 0.5], end: [0.81, 0.5] },
  { start: [0.68, 0.75], end: [0.82, 0.75] },
  // A
  { start: [0.88, 0.78], end: [0.94, 0.22], control: [0.85, 0.45] },
  { start: [0.98, 0.78], end: [0.94, 0.22], control: [1.01, 0.45] },
  { start: [0.89, 0.55], end: [0.99, 0.55] }
]

export default function SplashScreen({ onComplete, duration = TOTAL_DURATION }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastMoveRef = useRef({
    x: 0.5,
    y: 0.5,
    time: typeof performance !== 'undefined' ? performance.now() : 0
  })
  const [pointer, setPointer] = useState<PointerState>({ x: 0.5, y: 0.5, velocity: 0.08 })
  const [timeline, setTimeline] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) {
        setTimeout(onComplete, 450)
      }
    }, duration + LOGO_HOLD_MS)

    return () => clearTimeout(exitTimer)
  }, [duration, onComplete])

  useEffect(() => {
    let frame: number
    const start = performance.now()

    const loop = () => {
      const elapsed = performance.now() - start
      const progress = Math.min(elapsed / duration, 1)
      setTimeline(progress)
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
        velocity: Math.max(prev.velocity * 0.88 - 0.01, 0.04)
      }))
    }, 90)

    return () => clearInterval(decay)
  }, [])

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    const clampedX = Math.min(Math.max(x, 0), 1)
    const clampedY = Math.min(Math.max(y, 0), 1)

    const now = performance.now()
    const last = lastMoveRef.current
    const dx = clampedX - last.x
    const dy = clampedY - last.y
    const dt = Math.max(now - last.time, 16)
    const velocity = Math.min(Math.sqrt(dx * dx + dy * dy) / (dt / 16), 1)

    lastMoveRef.current = { x: clampedX, y: clampedY, time: now }

    setPointer({ x: clampedX, y: clampedY, velocity: velocity + 0.05 })
  }

  const handlePointerLeave = () => {
    setPointer(prev => ({ ...prev, velocity: 0.04 }))
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerMove}
          onPointerEnter={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <ThreadCanvas pointer={pointer} timeline={timeline} pointerEnergy={pointer.velocity} />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), transparent 50%), radial-gradient(circle at 70% 80%, rgba(180,160,140,0.25), transparent 60%)',
              mixBlendMode: 'soft-light'
            }}
          />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.08),transparent_60%)]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ThreadCanvas({ pointer, timeline, pointerEnergy }: ThreadCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const threadsRef = useRef<Thread[]>([])
  const pointerRef = useRef(pointer)
  const timelineRef = useRef(timeline)
  const energyRef = useRef(pointerEnergy)
  const grainRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    pointerRef.current = pointer
  }, [pointer])

  useEffect(() => {
    timelineRef.current = timeline
  }, [timeline])

  useEffect(() => {
    energyRef.current = pointerEnergy
  }, [pointerEnergy])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (!grainRef.current) {
      grainRef.current = createGrainPattern()
    }

    threadsRef.current = createThreads()

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    let frame: number
    const render = (time: number) => {
      frame = requestAnimationFrame(render)
      drawThreads(ctx, canvas, time)
    }

    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const drawThreads = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number) => {
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    ctx.fillStyle = BACKDROP
    ctx.fillRect(0, 0, width, height)

    const grainCanvas = grainRef.current
    if (grainCanvas) {
      ctx.save()
      ctx.globalAlpha = 0.08
      ctx.drawImage(grainCanvas, 0, 0, width, height)
      ctx.restore()
    }

    const threads = threadsRef.current
    if (!threads.length) return

    const progress = timelineRef.current
    const alignPhase = clamp((progress - 0.3) / 0.5)
    const stitchPhase = clamp((progress - 0.8) / 0.1)
    const settlePhase = clamp((progress - 0.9) / 0.1)
    const pointerState = pointerRef.current
    const energy = energyRef.current

    threads.forEach((thread, index) => {
      thread.nodes.forEach((node, nodeIndex) => {
        const t = time * 0.00035
        const swirlX =
          0.5 +
          Math.sin(t + thread.noiseSeed + node.offset) * 0.4 +
          Math.cos(t * 1.1 + node.offset * 1.3) * 0.18
        const swirlY =
          0.5 +
          Math.cos(t * 0.85 + thread.noiseSeed * 1.4 + node.offset) * 0.35 +
          Math.sin(t * 0.6 + node.offset * 0.8) * 0.12

        const baseX = clamp(lerp(thread.anchor.x, swirlX, 0.6), -0.08, 1.08)
        const baseY = clamp(lerp(thread.anchor.y, swirlY, 0.6), -0.08, 1.08)

        const pointerDirX = pointerState.x - node.x
        const pointerDirY = pointerState.y - node.y
        const pointerInfluence = {
          x: node.x + pointerDirX * 0.35 * energy,
          y: node.y + pointerDirY * 0.35 * energy
        }

        const rawSegmentPoint = getSegmentPoint(thread.letterSegment, nodeIndex / (thread.nodes.length - 1))
        const segmentPoint = applyLetterSpace(rawSegmentPoint)

        let targetX = lerp(baseX, pointerInfluence.x, alignPhase * 0.65)
        let targetY = lerp(baseY, pointerInfluence.y, alignPhase * 0.65)

        targetX = lerp(targetX, segmentPoint[0], stitchPhase)
        targetY = lerp(targetY, segmentPoint[1], stitchPhase)

        if (settlePhase > 0) {
          targetX = lerp(targetX, segmentPoint[0], settlePhase)
          targetY = lerp(targetY, segmentPoint[1], settlePhase)
        }

        const tension = 0.12 + index * 0.0008
        node.vx += (targetX - node.x) * tension
        node.vy += (targetY - node.y) * tension
        node.vx *= 0.82
        node.vy *= 0.82
        node.x = clamp(node.x + node.vx)
        node.y = clamp(node.y + node.vy)
      })

      ctx.save()
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      const thickness = thread.thickness + stitchPhase * 0.4
      ctx.strokeStyle = 'rgba(0,0,0,0.08)'
      ctx.lineWidth = thickness + 0.55
      traceThread(ctx, thread.nodes, width, height)
      ctx.stroke()

      ctx.strokeStyle = thread.color
      ctx.lineWidth = thickness
      ctx.globalAlpha = clamp(0.9 - index * 0.0045 + stitchPhase * 0.18, 0.25, 0.98)
      traceThread(ctx, thread.nodes, width, height)
      ctx.stroke()
      ctx.restore()
    })

    if (progress >= 0.85) {
      const logoReveal = clamp((progress - 0.85) / 0.15)
      ctx.save()
      ctx.textAlign = 'center'
      ctx.font = '900 118px "Playfair Display", "Cormorant Garamond", serif'
      ctx.lineJoin = 'round'
      ctx.lineWidth = 2.4
      ctx.globalAlpha = 0.45 + logoReveal * 0.4
      ctx.fillStyle = '#171312'
      ctx.strokeStyle = 'rgba(12,10,10,0.9)'
      const logoY = height * LETTER_SPACE.offsetY + 34
      ctx.fillText('THEA', width / 2, logoY)
      ctx.strokeText('THEA', width / 2, logoY)
      ctx.restore()
    }
  }

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}

function createThreads(): Thread[] {
  return Array.from({ length: THREAD_COUNT }, (_, threadIndex) => {
    const color = THREAD_COLORS[threadIndex % THREAD_COLORS.length]
    const letterSegment = LETTER_SEGMENTS[threadIndex % LETTER_SEGMENTS.length]
    const noiseSeed = Math.random() * 10
    const thickness = 1 + (threadIndex % 6) * 0.12
    const anchor = {
      x: Math.random() * 1.2 - 0.1,
      y: Math.random() * 1.2 - 0.1
    }

    const nodes: ThreadNode[] = Array.from({ length: NODES_PER_THREAD }, (_, nodeIndex) => ({
      x: anchor.x + (Math.random() - 0.5) * 0.2,
      y: anchor.y + (Math.random() - 0.5) * 0.2,
      vx: 0,
      vy: 0,
      offset: Math.random() * Math.PI * 2 + nodeIndex * 0.32
    }))

    return { nodes, color, letterSegment, noiseSeed, thickness, anchor }
  })
}

function getSegmentPoint(segment: LetterSegment, t: number): [number, number] {
  if (segment.control) {
    const [x1, y1] = segment.start
    const [cx, cy] = segment.control
    const [x2, y2] = segment.end
    const u = 1 - t
    const x = u * u * x1 + 2 * u * t * cx + t * t * x2
    const y = u * u * y1 + 2 * u * t * cy + t * t * y2
    return [x, y]
  }

  const [x1, y1] = segment.start
  const [x2, y2] = segment.end
  return [lerp(x1, x2, t), lerp(y1, y2, t)]
}

function applyLetterSpace([x, y]: [number, number]): [number, number] {
  const centeredX = (x - 0.5) * LETTER_SPACE.scaleX + LETTER_SPACE.offsetX
  const centeredY = (y - 0.5) * LETTER_SPACE.scaleY + LETTER_SPACE.offsetY
  return [centeredX, centeredY]
}

function getTimelineAudioEnvelope(progress: number) {
  if (progress <= 0) return 0
  if (progress < 0.28) {
    return progress / 0.28
  }
  if (progress < 0.8) {
    const mid = (progress - 0.28) / 0.52
    return 1 - (1 - mid) * 0.08
  }
  if (progress < 0.95) {
    return 1 - (progress - 0.8) / 0.15
  }
  return 0
}

function traceThread(ctx: CanvasRenderingContext2D, nodes: ThreadNode[], width: number, height: number) {
  if (!nodes.length) return
  const first = nodes[0]
  ctx.beginPath()
  ctx.moveTo(first.x * width, first.y * height)
  for (let i = 1; i < nodes.length; i++) {
    const prev = nodes[i - 1]
    const current = nodes[i]
    const midX = ((prev.x + current.x) / 2) * width
    const midY = ((prev.y + current.y) / 2) * height
    ctx.quadraticCurveTo(prev.x * width, prev.y * height, midX, midY)
  }
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max)
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp(t)
}

function createGrainPattern() {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas
  const imageData = ctx.createImageData(size, size)
  for (let i = 0; i < imageData.data.length; i += 4) {
    const shade = 230 + Math.random() * 25
    imageData.data[i] = shade
    imageData.data[i + 1] = shade
    imageData.data[i + 2] = shade
    imageData.data[i + 3] = Math.random() * 35
  }
  ctx.putImageData(imageData, 0, 0)
  return canvas
}
