// components/proposal/PackageCard.tsx
'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

import type { BasePackage } from '@/types/ProposalType'
import { cn } from '@/utils/cn'

interface PackageCardProps {
  pkg: BasePackage
  selected: boolean
  onSelect: () => void
}

export default function PackageCard({ pkg, selected, onSelect }: PackageCardProps) {
  return (
    <div
      className={cn(
        "bg-white/10 backdrop-blur-md p-6 rounded-xl cursor-pointer transition-all",
        selected ? "border-4 border-blue-500 scale-105" : "border border-white/20 hover:scale-102"
      )}
      onClick={onSelect}
    >
      {pkg.popular && (
        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
          Most Popular
        </span>
      )}
      <h4 className="text-2xl font-bold text-white mb-2">{pkg.name}</h4>
      <p className="text-3xl text-blue-300 mb-6">₹{pkg.price.toLocaleString('en-IN')}</p>
      <ul className="space-y-2">
        {pkg.features.map((feature, i) => (
          <li key={i} className="text-gray-300 flex items-center">
            <CheckCircle2 className="mr-2 h-4 w-4 text-green-400" /> {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}