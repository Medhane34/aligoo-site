"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { useRef } from "react"

export default function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Rotate based on cursor position
  const rotateX = useTransform(y, [0, 1], [15, -15])
  const rotateY = useTransform(x, [0, 1], [-15, 15])

  function handleMouseMove(e: React.MouseEvent) {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()

    // Get mouse position as a percentage of the card size
    const mouseX = (e.clientX - rect.left) / rect.width
    const mouseY = (e.clientY - rect.top) / rect.height

    x.set(mouseX)
    y.set(mouseY)
  }

  function resetTilt() {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={cardRef}
      className="w-72 h-44 rounded-xl shadow-xl bg-white dark:bg-zinc-900 flex items-center justify-center text-lg"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseLeave={resetTilt}
      onMouseMove={handleMouseMove}
    >
      {children}
    </motion.div>
  )
}
