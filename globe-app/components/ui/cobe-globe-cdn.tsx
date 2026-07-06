"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import createGlobe from "cobe"

const MARKERS = [
  { id: "transfer", location: [49.99, 36.23] as [number, number], label: "Kharkiv" },
  { id: "realty",   location: [50.45, 30.52] as [number, number], label: "Kyiv" },
  { id: "eu",       location: [48.85, 2.35]  as [number, number], label: "Paris" },
  { id: "us",       location: [40.71, -74.01] as [number, number], label: "New York" },
  { id: "asia",     location: [35.68, 139.69] as [number, number], label: "Tokyo" },
  { id: "aus",      location: [-33.86, 151.20] as [number, number], label: "Sydney" },
]

const ARCS = [
  { id: "a1", from: [49.99, 36.23] as [number, number], to: [48.85, 2.35]   as [number, number] },
  { id: "a2", from: [49.99, 36.23] as [number, number], to: [40.71, -74.01] as [number, number] },
  { id: "a3", from: [48.85, 2.35]  as [number, number], to: [35.68, 139.69] as [number, number] },
  { id: "a4", from: [40.71, -74.01] as [number, number], to: [-33.86, 151.20] as [number, number] },
  { id: "a5", from: [35.68, 139.69] as [number, number], to: [-33.86, 151.20] as [number, number] },
  { id: "a6", from: [48.85, 2.35]  as [number, number], to: [50.45, 30.52]  as [number, number] },
]

export function GlobeCdn() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const isPausedRef = useRef(false)
  const [traffic, setTraffic] = useState(() =>
    ARCS.map((a, i) => ({ id: a.id, value: [420, 380, 290, 185, 156, 134][i] || 100 }))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTraffic(data => data.map(t => ({
        ...t,
        value: Math.max(50, t.value + Math.floor(Math.random() * 21) - 10)
      })))
    }, 250)
    return () => clearInterval(interval)
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
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
        mapSamples: 30000,
        mapBrightness: 6,
        baseColor: [1, 1, 1],
        markerColor: [0, 0, 0],
        glowColor: [0.94, 0.93, 0.91],
        markers: MARKERS.map(m => ({ location: m.location, size: 0.035, id: m.id })),
        // @ts-ignore
        arcs: ARCS.map(a => ({ from: a.from, to: a.to, id: a.id })),
        // @ts-ignore
        arcColor: [0, 0, 0] as unknown as number[],
        // @ts-ignore
        arcWidth: 0.3,
        // @ts-ignore
        arcHeight: 0.4,
        onRender(state) {
          if (!isPausedRef.current) phi += 0.003
          state.phi = phi + phiOffsetRef.current + dragOffset.current.phi
          state.theta = 0.2 + dragOffset.current.theta
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
      <style>{`@keyframes pyramid-spin { 0% { transform: rotateX(20deg) rotateY(0deg); } 100% { transform: rotateX(20deg) rotateY(360deg); } }`}</style>
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
