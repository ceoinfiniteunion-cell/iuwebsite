"use client"
import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

const MARKERS = [
  { location: [49.99, 36.23] as [number, number], size: 0.05 },
  { location: [50.45, 30.52] as [number, number], size: 0.04 },
  { location: [48.85, 2.35]  as [number, number], size: 0.04 },
  { location: [40.71, -74.01] as [number, number], size: 0.04 },
  { location: [35.68, 139.69] as [number, number], size: 0.04 },
  { location: [-33.86, 151.20] as [number, number], size: 0.04 },
  { location: [51.50, -0.12] as [number, number], size: 0.04 },
  { location: [1.35, 103.82] as [number, number], size: 0.04 },
]

export function GlobeCdn() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{x:number;y:number}|null>(null)
  const dragOffset = useRef({ phi: 0 })
  const phiOffsetRef = useRef(0)
  const isPausedRef = useRef(false)

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      dragOffset.current.phi = 0
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current.phi = (e.clientX - pointerInteracting.current.x) / 300
      }
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let globe: ReturnType<typeof createGlobe>
    let phi = 0

    const init = () => {
      const width = canvas.offsetWidth
      if (!width) return
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width, height: width,
        phi: 0, theta: 0.2,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [1, 1, 1],
        markerColor: [0.1, 0.1, 0.1],
        glowColor: [0.94, 0.93, 0.91],
        markers: MARKERS,
        onRender(state) {
          if (!isPausedRef.current) phi += 0.003
          state.phi = phi + phiOffsetRef.current + dragOffset.current.phi
          state.theta = 0.2
          state.width = canvas.offsetWidth
          state.height = canvas.offsetWidth
        }
      })
      setTimeout(() => { canvas.style.opacity = "1" })
    }

    if (canvas.offsetWidth > 0) init()
    else {
      const ro = new ResizeObserver(entries => {
        if (entries[0]?.contentRect.width > 0) { ro.disconnect(); init() }
      })
      ro.observe(canvas)
    }
    return () => { globe?.destroy() }
  }, [])

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1", userSelect: "none" }}>
      <canvas
        ref={canvasRef}
        onPointerDown={e => {
          pointerInteracting.current = { x: e.clientX, y: e.clientY }
          e.currentTarget.style.cursor = "grabbing"
          isPausedRef.current = true
        }}
        style={{ width: "100%", height: "100%", opacity: 0, transition: "opacity 1.2s ease", cursor: "grab", touchAction: "none" }}
      />
    </div>
  )
}
