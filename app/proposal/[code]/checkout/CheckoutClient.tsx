// app/p/[code]/checkout/CheckoutClient.tsx
'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@heroui/button'
import { Loader2, Upload, CheckCircle2 } from 'lucide-react'

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
                setIsSuccess(true)
            } else {
                alert('Upload failed. Try again.')
            }
        } catch (err) {
            alert('Network error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
            setPreview(URL.createObjectURL(selectedFile))
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            {/* Upload Area */}
            <div>
                <label className="block text-white text-2xl font-black mb-8 text-center">
                    Upload Payment Screenshot <span className="text-red-400">(Required)</span>
                </label>

                <div className="relative border-4 border-dashed border-cyan-400 rounded-3xl p-5 text-center hover:border-cyan-300 transition-all cursor-pointer bg-white/5 backdrop-blur">
                    <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-cyan-300">
                        <Upload className="w-24 h-24 mx-auto mb-6" />
                        <p className="text-2xl font-black">Drop or Click to Upload</p>
                        <p className="text-2xl mt-4 opacity-80">Bank transfer / Telebirr / CBE Birr</p>
                    </div>
                </div>

                {/* Preview */}
                {preview && (
                    <div className="mt-10 text-center">
                        <img
                            src={preview}
                            alt="Payment proof"
                            className="max-w-full max-h-96 mx-auto rounded-2xl border-8 border-green-400 shadow-2xl"
                        />
                        <p className="text-green-400 text-2xl font-bold mt-6">Screenshot Ready!</p>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isLoading || !file}
                className="w-full py-5 text-2xl font-black bg-gradient-to-r from-green-400 to-cyan-400 hover:from-green-300 hover:to-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed text-black rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 uppercase tracking-widest"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-20 h-20 animate-spin mx-auto" />
                        <span className="block mt-4">SENDING PROOF...</span>
                    </>
                ) : isSuccess ? (
                    <>
                        <CheckCircle2 className="w-20 h-20 mx-auto" />
                        <span className="block mt-4">PROOF SENT!</span>
                    </>
                ) : (
                    'I HAVE PAID — SEND PROOF'
                )}
            </Button>

            {isSuccess && (
                <p className="text-center text-green-400 font-black text-6xl animate-pulse">
                    We received your proof! Project starts in 1 hour
                </p>
            )}
        </form>
    )
}