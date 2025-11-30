// app/p/[code]/checkout/CheckoutClient.tsx
'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@heroui/button'
import { Loader2, Upload, CheckCircle2 } from 'lucide-react'
import confetti from 'canvas-confetti'

interface CheckoutClientProps {
    proposalId: string
    clientName: string
    code: string
    totalPrice: number
    depositAmount: number
}

export default function CheckoutClient({
    proposalId,
    clientName,
    code,
    totalPrice,
    depositAmount,
}: CheckoutClientProps) {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return alert('Please upload payment proof')

        setIsLoading(true)

        const formData = new FormData()
        formData.append('proof', file)
        formData.append('proposalId', proposalId)
        formData.append('clientName', clientName)
        formData.append('code', code)
        formData.append('totalPrice', totalPrice.toString())
        formData.append('depositAmount', depositAmount.toString())

        try {
            const res = await fetch('/api/proposal/payment', {
                method: 'POST',
                body: formData,
            })

            if (res.ok) {
                console.log('Payment proof uploaded successfully!')
                setIsSuccess(true)
                triggerConfetti()
            } else {
                console.error('Upload failed with status:', res.status)
                alert('Upload failed. Try again.')
            }
        } catch (err) {
            console.error('Upload error:', err)
            alert('Network error')
        } finally {
            setIsLoading(false)
        }
    }

    const triggerConfetti = () => {
        console.log('Triggering confetti celebration! 🎉')
        const duration = 3 * 1000
        const animationEnd = Date.now() + duration
        // Increased z-index to ensure visibility over dark background
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 50 * (timeLeft / duration)
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
        }, 250)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
            setPreview(URL.createObjectURL(selectedFile))
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload Area */}
            <div>
                <label className="block text-white font-medium mb-4 text-sm uppercase tracking-wide">
                    Upload Payment Proof <span className="text-red-400">*</span>
                </label>

                <div className="relative border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-cyan-500/50 hover:bg-white/5 transition-all cursor-pointer group">
                    <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="text-neutral-400 group-hover:text-cyan-400 transition-colors">
                        <Upload className="w-10 h-10 mx-auto mb-3" />
                        <p className="font-medium text-sm">Click or Drop Screenshot Here</p>
                        <p className="text-xs mt-2 opacity-60">Supports JPG, PNG (Max 5MB)</p>
                    </div>
                </div>

                {/* Preview */}
                {preview && (
                    <div className="mt-6 relative group">
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full shadow-lg z-10">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <img
                            src={preview}
                            alt="Payment proof"
                            className="w-full h-48 object-cover rounded-lg border border-white/10 shadow-xl"
                        />
                        <p className="text-green-400 text-xs font-bold mt-2 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Screenshot attached
                        </p>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isLoading || !file}
                className="w-full py-6 font-bold text-sm bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all uppercase tracking-wider"
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                    </div>
                ) : isSuccess ? (
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Proof Sent Successfully</span>
                    </div>
                ) : (
                    'Confirm Payment'
                )}
            </Button>

            {isSuccess && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                    <p className="text-green-400 text-sm font-medium">
                        Payment proof received! We'll verify and activate your project shortly.
                    </p>
                </div>
            )}
        </form>
    )
}