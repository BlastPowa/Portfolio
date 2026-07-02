'use client'

import { useEffect, useRef } from 'react'

export function useHoverSound(selector: string = 'a, button, [role="button"]') {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('/audio/click.wav')
    audioRef.current.volume = 0.15

    function play() {
      if (!audioRef.current) return
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }

    const elements = document.querySelectorAll(selector)
    elements.forEach(el => el.addEventListener('mouseenter', play))

    return () => {
      elements.forEach(el => el.removeEventListener('mouseenter', play))
    }
  }, [selector])
}
