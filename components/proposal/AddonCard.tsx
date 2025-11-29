// components/proposal/AddonCard.tsx
'use client'

import { PlusCircle, MinusCircle } from 'lucide-react'

import type { AddOn } from '@/lib/proposal'
import { cn } from '@/utils/cn'

interface AddonCardProps {
  addon: AddOn
  selected: boolean
  onToggle: () => void
}

export default function AddonCard({ addon, selected, onToggle }: AddonCardProps) {
  return (
    <div
      className={cn(
        "bg-white/5 p-4 rounded-lg cursor-pointer transition-all",
        selected ? "border-2 border-green-500" : "border border-white/10 hover:border-green-300"
      )}
      onClick={onToggle}
    >
      <div className="flex justify-between items-center mb-2">
        <h5 className="text-lg font-semibold text-white">{addon.name}</h5>
        {selected ? <MinusCircle className="h-5 w-5 text-red-400" /> : <PlusCircle className="h-5 w-5 text-green-400" />}
      </div>
      <p className="text-blue-300 mb-2">+ETB {addon.price.toLocaleString('en-US')}</p>
      <p className="text-sm text-gray-400">{addon.description}</p>
    </div>
  )
}