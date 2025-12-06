// components/proposal/AddonCard.tsx
'use client'

import { motion } from 'framer-motion'
import { Plus, Check, Sparkles } from 'lucide-react'
import type { AddOn } from '@/types/ProposalType'
import { cn } from '@/utils/cn'
import PortableText from '@/components/ui/PortableTextSanity'

interface AddonCardProps {
  addon: AddOn
  selected: boolean
  onToggle: () => void
}

export default function AddonCard({ addon, selected, onToggle }: AddonCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={cn(
        "relative group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300",
        selected
          ? "bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
      )}
    >
      {/* Active Indicator Glow */}
      {selected && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-50" />
      )}

      <div className="relative p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-4">
            <h5 className={cn(
              "text-lg font-bold mb-1 transition-colors",
              selected ? "text-cyan-400" : "text-white group-hover:text-cyan-200"
            )}>
              {addon.name}
            </h5>
            <div className="text-2xl font-bold text-white">
              ETB {addon.price.toLocaleString('en-US')}
            </div>
          </div>

          {/* Toggle Button */}
          <motion.div
            initial={false}
            animate={{
              backgroundColor: selected ? '#06b6d4' : 'rgba(255,255,255,0.1)',
              rotate: selected ? 0 : 0
            }}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
              selected ? "text-black" : "text-white group-hover:bg-white/20"
            )}
          >
            <motion.div
              initial={false}
              animate={{ rotate: selected ? 360 : 0, scale: selected ? 1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {selected ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
            </motion.div>
          </motion.div>
        </div>

        {/* Description */}
        <div className="text-sm text-neutral-400 leading-relaxed mb-4 flex-grow prose prose-invert prose-sm max-w-none">
          {typeof addon.description === 'string' ? (
            addon.description
          ) : (
            <PortableText blocks={addon.description} />
          )}
        </div>

        {/* Status Badge */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <span className={cn(
            "text-xs font-bold uppercase tracking-wider flex items-center gap-2",
            selected ? "text-cyan-400" : "text-neutral-500"
          )}>
            {selected ? (
              <>
                <Sparkles className="w-3 h-3" />
                Added to Package
              </>
            ) : (
              "Optional Add-on"
            )}
          </span>
        </div>
      </div>
    </motion.div>
  )
}