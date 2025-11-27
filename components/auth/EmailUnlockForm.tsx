'use client'

import { useState } from 'react'
import { Input } from '@heroui/input'
import { PrimaryButton } from '../atoms/button'
import { addToast } from '@heroui/toast'
import { Loader2, Mail, Shield, Key } from 'lucide-react'
import { SignIn, useSignIn } from '@clerk/nextjs'

interface Props {
    proposalId: string
    clientName: string
    expectedEmail?: string
    Uniquecode: string
}

export default function EmailUnlockForm({ proposalId, clientName, expectedEmail, Uniquecode }: Props) {


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
            <SignIn
                routing="hash"
                forceRedirectUrl={`/proposal/${Uniquecode}`}
                appearance={{
                    elements: {
                        formButtonPrimary: 'bg-yellow-500 hover:bg-cyan-400 text-black font-bold py-3',
                        card: 'bg-transparent border-0 shadow-none',
                        headerTitle: 'text-red text-2xl',
                        headerSubtitle: 'text-gray-300',
                        formFieldLabel: 'text-white',
                        formFieldInput: 'bg-white/10 border-white/20 text-white placeholder-gray-400',
                        footerActionText: 'text-gray-300',
                        footerActionLink: 'text-cyan-400 hover:text-cyan-300',
                    },
                }}
            />
        </div>
    )
}