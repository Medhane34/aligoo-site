// utils/auth.ts
import { RecaptchaVerifier } from 'firebase/auth'
import { auth } from '@/lib/firebase'

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier
  }
}

export const setupRecaptcha = () => {
  if (typeof window === 'undefined') return null

  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear()
  }

  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    size: 'invisible',
    callback: () => console.log('reCAPTCHA solved'),
  })

  return window.recaptchaVerifier
}

export const getRecaptchaToken = async (): Promise<string> => {
  if (!window.recaptchaVerifier) throw new Error('reCAPTCHA not ready')
  await window.recaptchaVerifier.render()
  return await window.recaptchaVerifier.verify()
}