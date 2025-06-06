"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const { resolvedTheme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const bgColor =
    resolvedTheme === "dark" ? "bg-white/60" : "bg-black/60"

  // 👇 Detect hover on target elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const showCursor = () => setIsVisible(true)
    const hideCursor = () => setIsVisible(false)

    document.addEventListener("mousemove", handleMouseMove)

    // Only show cursor on hover targets
    const hoverTargets = document.querySelectorAll(".cursor-hover-target")
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", showCursor)
      el.addEventListener("mouseleave", hideCursor)
    })

    // Hide on load
    setIsVisible(false)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", showCursor)
        el.removeEventListener("mouseleave", hideCursor)
      })
    }
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      ref={cursorRef}
      className={`pointer-events-none fixed top-0 left-0 z-[9999] h-6 w-6 rounded-full ${bgColor}`}
      animate={{
        x: position.x - 12,
        y: position.y - 12,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  )
}
