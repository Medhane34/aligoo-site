// components/proposal/TimelineSection.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, ChevronDown } from 'lucide-react'
import { useState } from 'react'
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

export default function TimelineSection({ timeline }: TimelineSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
        >
          {timeline.sectionTitle || 'Your Project Timeline'}
        </motion.h2>

        {/* Desktop: Vertical Timeline */}
        <div className="hidden md:block relative">
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full"
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ top: 0, bottom: 0 }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-20"
          >
            {timeline.items.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={cn(
                  'relative flex items-center justify-center',
                  i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                )}
              >
                {/* Content Card */}
                <div
                  className={cn(
                    'w-5/12 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl',
                    i % 2 === 0 ? 'mr-10 text-right' : 'ml-10 text-left'
                  )}
                >
                  <div className="flex items-center gap-3 mb-3 justify-end">
                    {i % 2 === 0 && <Calendar className="w-6 h-6 text-cyan-400" />}
                    <h3 className="text-3xl font-bold text-cyan-400">{item.week}</h3>
                    {i % 2 === 1 && <Calendar className="w-6 h-6 text-cyan-400" />}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
                  {item.description && (
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  )}
                </div>

                {/* Circle Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-2xl ring-8 ring-black/50">
                  {i + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: Accordion */}
        <div className="md:hidden space-y-4">
          {timeline.items.map((item, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-xl font-bold text-cyan-400">{item.week}</p>
                    <p className="text-white font-semibold">{item.title}</p>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    'w-6 h-6 text-gray-400 transition-transform',
                    openIndex === i && 'rotate-180'
                  )}
                />
              </button>

              {openIndex === i && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="px-6 pb-6"
                >
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}