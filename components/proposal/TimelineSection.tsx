// components/proposal/TimelineSection.tsx
'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Calendar,
  ChevronDown,
  Rocket,
  Search,
  PenTool,
  Code2,
  CheckCircle2,
  Clock
} from 'lucide-react'
import { cn } from '@/utils/cn'

interface TimelineItem {
  week: string
  title: string
  description?: string
}

interface TimelineSectionProps {
  timeline: {
    sectionTitle?: string
    items: TimelineItem[]
  }
}

const ICONS = [Search, PenTool, Code2, CheckCircle2, Rocket]

export default function TimelineSection({ timeline }: TimelineSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Calculate total duration (naive estimate based on items)
  const totalWeeks = timeline.items.length
  const estimatedDays = totalWeeks * 7

  return (
    <section className="py-24 bg-neutral-950 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4">

        {/* Header Badge */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-medium text-sm uppercase tracking-wider"
          >
            <Clock className="w-4 h-4" />
            <span>Estimated Duration: {estimatedDays} Days</span>
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-20"
        >
          {timeline.sectionTitle || 'Project Roadmap'}
        </motion.h2>

        {/* Desktop: Enhanced Vertical Timeline */}
        <div className="hidden md:block relative max-w-5xl mx-auto">

          {/* Central Progress Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-full bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-orange-500 to-red-500 origin-top"
              style={{ scaleY, height: '100%' }}
            />
          </div>

          <div className="space-y-24 relative z-10">
            {timeline.items.map((item, i) => {
              const Icon = ICONS[i % ICONS.length]
              const isEven = i % 2 === 0

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={cn(
                    'relative flex items-center',
                    isEven ? 'flex-row' : 'flex-row-reverse'
                  )}
                >
                  {/* Content Card */}
                  <div className={cn('w-[42%]', isEven ? 'text-right pr-12' : 'text-left pl-12')}>
                    <div className="mb-2">
                      <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">
                        {item.week}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>

                    {item.description && (
                      <ul className={cn(
                        "space-y-2 text-neutral-400",
                        isEven ? "items-end" : "items-start"
                      )}>
                        {item.description.split('\n').map((line, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            {!isEven && <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50 flex-shrink-0" />}
                            <span>{line.replace(/^[•-]\s*/, '')}</span>
                            {isEven && <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50 flex-shrink-0" />}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-16 h-16 bg-neutral-900 border-4 border-neutral-800 rounded-full flex items-center justify-center z-20 shadow-xl">
                      <Icon className="w-7 h-7 text-orange-500" />
                    </div>

                    {/* Connector Line (SVG) */}
                    <svg
                      className={cn(
                        "absolute top-1/2 w-24 h-12 -z-10 text-neutral-800",
                        isEven ? "right-10 transform -scale-x-100" : "left-10"
                      )}
                      viewBox="0 0 100 50"
                      fill="none"
                    >
                      <path
                        d="M0 25 C 40 25, 60 25, 100 25"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="w-[42%]" />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: Clean Vertical List */}
        <div className="md:hidden space-y-8 relative pl-8 border-l-2 border-neutral-800 ml-4">
          {timeline.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-[41px] top-0 w-10 h-10 bg-neutral-900 border-2 border-orange-500 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-orange-500" />
                </div>

                <div className="bg-neutral-900/50 border border-white/5 rounded-xl p-6">
                  <span className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-2 block">
                    {item.week}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  {item.description && (
                    <ul className="space-y-2">
                      {item.description.split('\n').map((line, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-neutral-400 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50 mt-1.5 flex-shrink-0" />
                          <span>{line.replace(/^[•-]\s*/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}