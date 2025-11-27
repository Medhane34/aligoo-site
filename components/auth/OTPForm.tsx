// components/auth/OTPForm.tsx — FINAL 100% WORKING IN PRODUCTION
'use client'

import { useState, useEffect } from 'react'
import { Input } from '@heroui/input'
import { PrimaryButton } from '../atoms/button'
import { addToast } from '@heroui/toast'
import { Loader2, Send, Shield } from 'lucide-react'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { verifyProposalPhone } from '@/app/actions/auth'

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier
    confirmationResult?: any
  }
}

interface OTPFormProps {
  proposalId: string
}

export default function OTPForm({ proposalId }: OTPFormProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // --------------------------------------------------------------
  // Initialise invisible reCAPTCHA once when the component mounts
  // --------------------------------------------------------------
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => console.log('reCAPTCHA solved'),
        'expired-callback': () => {
          // If the token expires, re‑render so a fresh one can be obtained later
          window.recaptchaVerifier?.render().catch(() => { })
        }
      })

      // Render the invisible widget – this MUST be called before verify()
      window.recaptchaVerifier.render().catch(err => {
        console.error('reCAPTCHA render failed:', err)
      })
    }

    // Cleanup on unmount (important for hot‑reload scenarios)
    return () => {
      window.recaptchaVerifier?.clear()
    }
  }, [])

  // --------------------------------------------------------------
  // Send OTP – this is where the reCAPTCHA token is verified
  // --------------------------------------------------------------
  const sendOTP = async () => {
    const cleanPhone = phone.replace(/[\s\-()]/g, '')

    if (!cleanPhone.startsWith('+251')) {
      addToast({ title: 'Invalid Format', description: 'Must start with +251', color: 'danger' })
      return
    }

    setIsLoading(true)
    try {
      // Server‑side validation of the proposal + phone
      const verification = await verifyProposalPhone(proposalId, cleanPhone)
      if (!verification.success) {
        addToast({ title: 'Access Denied', description: verification.error || 'Access Denied', color: 'danger' })
        return
      }

      // ----------------------------------------------------------
      // Ensure we have a fresh reCAPTCHA token for the current domain
      // ----------------------------------------------------------
      if (!window.recaptchaVerifier) {
        throw new Error('reCAPTCHA not initialized. Refresh the page.')
      }

      // [verify()](cci:1://file:///Users/daniel/Documents/Next.Js-Course%20/aligoo-digital-agency/components/auth/OTPForm.tsx:120:2-143:3) returns the token string; we don’t need the value,
      // we just need the promise to resolve (or reject) before proceeding.
      await window.recaptchaVerifier.verify()

      // Now the token is valid – call Firebase Auth
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        cleanPhone,
        window.recaptchaVerifier
      )

      window.confirmationResult = confirmationResult
      addToast({ title: 'OTP Sent!', description: 'Check your phone' })
      setStep('otp')
    } catch (err: any) {
      console.error('Send OTP failed:', err)

      // ----------------------------------------------------------
      // Friendly messages for the most common error codes
      // ----------------------------------------------------------
      let message = 'Try again'
      if (err.code === 'auth/too-many-requests') message = 'Too many attempts. Try later.'
      else if (err.code === 'auth/invalid-phone-number') message = 'Invalid phone number format.'
      else if (err.code === 'auth/quota-exceeded') message = 'SMS quota exceeded.'
      else if (err.code === 'auth/billing-not-enabled') message = 'Project requires Blaze plan (Billing) to send SMS.'
      else if (err.code === 'auth/invalid-app-credential') message = 'Domain not authorized. Add to Firebase Console.'
      else if (err.code === 'auth/captcha-check-failed' || err.code === 'auth/error-code:-39')
        message = 'reCAPTCHA verification failed. Refresh the page or try a different browser.'
      else if (err.message) message = `${err.code || 'Error'}: ${err.message}`

      addToast({
        title: 'Failed to Send OTP',
        description: message,
        color: 'danger',
        variant: 'solid'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // --------------------------------------------------------------
  // Verify the OTP the user typed
  // --------------------------------------------------------------
  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code || code.length !== 6) return

    setIsLoading(true)
    try {
      await window.confirmationResult.confirm(code)

      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalId })
      })

      if (!res.ok) throw new Error('Session failed')

      addToast({ title: 'Welcome!', description: 'Proposal unlocked!' })
      setTimeout(() => window.location.reload(), 800)
    } catch (err: any) {
      addToast({ title: 'Invalid Code', description: 'Try again', color: 'danger' })
    } finally {
      setIsLoading(false)
    }
  }

  // --------------------------------------------------------------
  // UI
  // --------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 max-w-md w-full border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Secure Access</h1>
          <p className="text-gray-300">Enter your phone to continue.</p>
        </div>

        {step === 'phone' ? (
          <>
            <Input
              type="tel"
              placeholder="+251983294228"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="mb-6 bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
            <PrimaryButton
              onClick={sendOTP}
              disabled={isLoading || !phone.startsWith('+251')}
              className="w-full"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Send className="mr-2" />} Send OTP
            </PrimaryButton>
          </>
        ) : (
          <form onSubmit={verifyOTP}>
            <Input
              type="text"
              maxLength={6}
              placeholder="123456"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="text-center text-3xl tracking-widest mb-6"
            />
            <PrimaryButton type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="animate-spin" /> : 'Unlock Proposal'}
            </PrimaryButton>
          </form>
        )}

        {/* Invisible reCAPTCHA container – must stay in the DOM */}
        <div id="recaptcha-container" />
      </div>
    </div>
  )
}