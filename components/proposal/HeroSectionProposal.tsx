// components/proposal/HeroSection.tsx
'use client'

import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface HeroData {
  title: string
  subtitle?: string
  backgroundImage?: { asset: { url: string } }
}

interface HeroSectionProps {
  hero: HeroData
  clientName: string
}

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
}

export default function HeroSection({ hero, clientName }: HeroSectionProps) {
  const personalizedTitle = `${hero.title} for ${clientName}`

  return (
    <section 
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-900 to-blue-600"
    >
      {hero.backgroundImage?.asset.url && (
        <Image
          src={hero.backgroundImage.asset.url + '?w=1920&q=80'}
          alt="Hero Background"
          fill
          className="object-cover opacity-70"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={variants}
          className={cn("text-4xl md:text-6xl font-bold text-white mb-4")}
        >
          {personalizedTitle}
        </motion.h1>
        
        {hero.subtitle && (
          <motion.p
            initial='hidden'
            animate='visible'
            variants={variants}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-8"
          >
            {hero.subtitle}
          </motion.p>
        )}
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="text-white text-xl"
        >
          ↓ Scroll to Customize
        </motion.div>
      </div>
    </section>
  )
}