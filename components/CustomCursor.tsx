'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (navigator.maxTouchPoints > 0) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const HISTORY = 80
    const RIBBONS = 20
    const MAX_SPREAD = 11
    const points: { x: number; y: number }[] = []
    let mouseX = 0
    let mouseY = 0
    let animId = 0
    let colorProgress = 0
    let lastX = 0
    let lastY = 0
    let frameCount = 0

    function getColor(p: number): string {
      const t = ((p % 1) + 1) % 1 * 4
      let r = 64, g = 64, b = 191

      if (t < 1) {
        g = Math.round(64 + (149 - 64) * t)
      } else if (t < 2) {
        const s = t - 1
        g = Math.round(149 - (149 - 64) * s)
        r = Math.round(64 + (134 - 64) * s)
      } else if (t < 3) {
        const s = t - 2
        r = Math.round(134 + (191 - 134) * s)
        b = Math.round(191 - (191 - 155) * s)
      } else {
        const s = t - 3
        r = Math.round(191 - (191 - 64) * s)
        g = Math.round(64 + (149 - 64) * s)
        b = Math.round(155 + (191 - 155) * s)
      }

      return `rgba(${r}, ${g}, ${b}, 0.2)`
    }

    function onResize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = width
      canvas!.height = height
    }

    function onMouseMove(e: MouseEvent) {
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const speed = Math.sqrt(dx * dx + dy * dy)
      colorProgress = (colorProgress + speed * 0.001) % 1
      lastX = e.clientX
      lastY = e.clientY
      mouseX = e.clientX
      mouseY = e.clientY
      points.push({ x: mouseX, y: mouseY })
      if (points.length > HISTORY) points.shift()
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)
      frameCount++
      if (frameCount % 4 === 0) {
        colorProgress = (colorProgress + 0.001) % 1
      }

      if (points.length > 3) {
        const color = getColor(colorProgress)

        for (let r = 0; r < RIBBONS; r++) {
          const angle = (r / RIBBONS) * Math.PI * 2
          const spread = (r / RIBBONS) * MAX_SPREAD
          const ox = Math.cos(angle) * spread
          const oy = Math.sin(angle) * spread

          ctx!.beginPath()
          ctx!.moveTo(points[0].x + ox, points[0].y + oy)

          for (let i = 1; i < points.length - 2; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2 + ox
            const yc = (points[i].y + points[i + 1].y) / 2 + oy
            ctx!.quadraticCurveTo(
              points[i].x + ox,
              points[i].y + oy,
              xc,
              yc
            )
          }

          const last = points[points.length - 1]
          const prev = points[points.length - 2]
          ctx!.quadraticCurveTo(
            prev.x + ox,
            prev.y + oy,
            last.x + ox,
            last.y + oy
          )

          ctx!.strokeStyle = color
          ctx!.lineWidth = 1
          ctx!.lineCap = 'round'
          ctx!.lineJoin = 'round'
          ctx!.globalAlpha = 1
          ctx!.shadowBlur = 0
          ctx!.stroke()
        }
      }

      if (points.length > 0) {
        const rgb = getColor(colorProgress).match(/\d+/g)!
        ctx!.beginPath()
        ctx!.arc(mouseX, mouseY, 3, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.9)`
        ctx!.globalAlpha = 1
        ctx!.shadowBlur = 0
        ctx!.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    animId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) return null

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  )
}
