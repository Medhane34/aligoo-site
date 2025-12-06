// components/proposal/Calculator.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import PackageCard from './PackageCard'
import AddonCard from './AddonCard'
import { addToast } from "@heroui/toast"

import { CheckCircle2, Loader2 } from 'lucide-react'
import type { ProposalData, BasePackage, AddOn } from '@/types/ProposalType'
import { PrimaryButton } from '../atoms/button'
import { useRouter } from 'next/navigation'

interface CalculatorProps {
  initialSelection: ProposalData['currentSelection']
  packages: BasePackage[]
  addOns: AddOn[]
  proposalId: string
  uniqueCode: ProposalData['uniqueCode']
}

export default function Calculator({
  initialSelection,
  packages,
  addOns,
  proposalId,
  uniqueCode

}: CalculatorProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(initialSelection?.selectedPackage)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(initialSelection?.selectedAddOns || [])
  const [total, setTotal] = useState<number>(initialSelection?.totalPrice || 0)
  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Load defaults on mount
  useEffect(() => {
    const defaultPkg = packages.find(p => p.isDefault)?.name
    if (!selectedPackage && defaultPkg) setSelectedPackage(defaultPkg)

    const preselected = addOns.filter(a => a.preselected).map(a => a.name)
    if (selectedAddOns.length === 0 && preselected.length > 0) {
      setSelectedAddOns(preselected)
    }
  }, [packages, addOns])

  // Recalculate total instantly (preview only)
  useEffect(() => {
    let newTotal = 0
    const pkg = packages.find(p => p.name === selectedPackage)
    if (pkg) newTotal += pkg.price

    selectedAddOns.forEach(name => {
      const addon = addOns.find(a => a.name === name)
      if (addon) newTotal += addon.price
    })
    setTotal(newTotal)
  }, [selectedPackage, selectedAddOns, packages, addOns])

  const router = useRouter()

  const confirmSelection = async () => {
    setIsSaving(true)
    try {
      const res = await fetch(`/api/proposal/${proposalId}/selection`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedPackage,
          selectedAddOns,
          totalPrice: total
        }),
      })
      const data = await res.json()  // ADD THIS
      console.log('API response:', data)  // ADD THIS
      if (!res.ok) throw new Error('Failed')

      setIsSaved(true)
      addToast({
        title: "Selection Confirmed!",
        description: `We've saved your package: ${selectedPackage} + ${selectedAddOns.length} add-on(s)`,
        color: "success"
      })

      router.push(`/proposal/${uniqueCode}/checkout`)
      // Reset saved state after 5s
      setTimeout(() => setIsSaved(false), 5000)

    } catch (error) {
      addToast({
        title: "Save Failed",
        description: "Please try again or contact us.",
        color: "danger"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const toggleAddOn = (name: string) => {
    setSelectedAddOns(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    )
    setIsSaved(false) // Unsave on change
  }

  const handleCheckout = () => {
    // This function is currently empty, but the instruction implies adding a redirect
    // based on the context of the confirmSelection function
  }



  return (
    <section className="py-16 bg-gray-900 relative">
      <div className="container mx-auto px-4">
        {/* Packages Grid */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
        >
          Choose Your Perfect Package
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <PackageCard
                pkg={pkg}
                selected={selectedPackage === pkg.name}
                onSelect={() => {
                  setSelectedPackage(pkg.name)
                  setIsSaved(false)
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Sticky Confirm Bar */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-800 to-indigo-900 p-6 shadow-2xl z-50 md:static md:bg-transparent md:p-0"
        >
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white text-center md:text-left">
              <p className="text-lg opacity-90">Your Total Investment</p>
              <p className="text-4xl md:text-5xl font-bold">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total)}
              </p>
              {isSaved && (
                <p className="text-green-400 text-sm mt-2 flex items-center justify-center md:justify-start">
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Selection Confirmed
                </p>
              )}
            </div>

            <PrimaryButton
              size="md"
              className="bg-white text-blue-900 hover:bg-gray-100 font-bold text-lg px-10 py-7 rounded-xl shadow-xl"
              onClick={confirmSelection}
              disabled={isSaving || !selectedPackage}


            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Confirm My Selection"
              )}
            </PrimaryButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}