// app/strategy-session/MultiStepForm.tsx
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import ButtonAtom from "@/components/atoms/ButtonAtom";
import HeadingAtom from "@/components/atoms/HeadingAtom";

// ─── Types ────────────────────────────────────────────────────────────────────
type FormData = {
  name: string; position: string; company: string; product: string;
  industry: string; years: string; employees: string; strengths: string;
  marketing: string; online: string; challenge: string; pastSolutions: string;
  timeline: string; phone: string;
};

const initialData: FormData = {
  name: "", position: "", company: "", product: "", industry: "",
  years: "", employees: "", strengths: "", marketing: "", online: "",
  challenge: "", pastSolutions: "", timeline: "", phone: "",
};

// ─── Step Definitions ─────────────────────────────────────────────────────────
const positions = ["Business owner", "Manager", "Marketing Manager", "Other"];
const employeeOptions = ["1-5", "5-10", "10-20", "20+", "Other"];
const timelineOptions = ["ASAP", "This month", "This quarter", "Just exploring"];

const steps = [
  { label: "Let's start with your name! 😁", field: "name", type: "text", required: true },
  { label: "What is your position, {name}?", field: "position", type: "radio", required: true, options: positions },
  { label: "What is the name of your company, {name}?", field: "company", type: "text", required: true },
  { label: "Can you list the product/service your company sells? Give us a little detail.", field: "product", type: "textarea", required: true },
  { label: "What industry does your business operate in, {name}? (e.g. Real Estate, E-commerce…)", field: "industry", type: "text", required: true },
  { label: "How long have you been in business, {name}?", field: "years", type: "text", required: true },
  { label: "How many employees do you have, {name}?", field: "employees", type: "radio", required: true, options: employeeOptions },
  { label: "What are your company's strengths and weaknesses, {name}?", field: "strengths", type: "textarea", required: false },
  { label: "How do you promote to new and existing customers, {name}? (Tell us about your marketing!)", field: "marketing", type: "textarea", required: false },
  { label: "Where can we find you online, {name}? (Website, socials, etc.)", field: "online", type: "text", required: false },
  { label: "What's your biggest challenge right now, {name}, and how is it impacting your business?", field: "challenge", type: "textarea", required: true },
  { label: "Have you tried to solve this before, {name}? How did it work out?", field: "pastSolutions", type: "textarea", required: false },
  { label: "When do you hope to get started if we could offer a solution, {name}?", field: "timeline", type: "radio", required: true, options: timelineOptions },
  { label: "Drop your phone number, {name} (we'll only call if we have something awesome for you).", field: "phone", type: "text", required: true },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function MultiStepForm() {
  const [showExitModal, setShowExitModal] = useState(false);
  const [data, setData] = useState<FormData>(initialData);
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const exitIntentEnabled = useRef(false);
  const exitIntentFired = useRef(false);

  // ── Exit Intent – only trigger when mouse leaves toward the TOP of the viewport
  // Adds a 2-second delay after mount before activating (gives the user time to
  // read the form without immediately triggering on a natural scroll landing).
  useEffect(() => {
    const ACTIVATE_DELAY_MS = 2000;
    const TOP_THRESHOLD_PX = 40; // pixels from top – must be moving toward browser chrome

    const timer = setTimeout(() => {
      exitIntentEnabled.current = true;
    }, ACTIVATE_DELAY_MS);

    const handleMouseLeave = (e: MouseEvent) => {
      if (
        !exitIntentEnabled.current ||
        exitIntentFired.current ||
        e.clientY > TOP_THRESHOLD_PX // only trigger when exiting from the top
      ) return;

      exitIntentFired.current = true; // show once per session
      setShowExitModal(true);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const isFirst = step === 0;
  const progress = Math.round(((step + 1) / steps.length) * 100);

  const getLabel = () => step === 0
    ? current.label
    : current.label.replace(/{name}/g, data.name || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadio = (field: string, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    if (!current.required) return true;
    return data[current.field as keyof FormData]?.toString().trim().length > 0;
  };

  const handleNext = () => {
    setTouched(true);
    if (!validate()) return;
    setTouched(false);
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setTouched(false);
    setStep((s) => s - 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLast) { e.preventDefault(); handleNext(); }
  };

  // GA: page view
  useEffect(() => {
    trackEvent("strategy_session_view", {
      event_category: "lead_generation",
      event_label: "strategy_session_booking",
      source: "direct",
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!validate()) return;
    setSubmitted(true);

    try {
      const response = await fetch("/api/strategy-session-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const success = response.ok;
      trackEvent("strategy_session_submit", {
        event_category: "lead_generation",
        event_label: "strategy_session_booking",
        status: success ? "success" : "error",
        step_completed: step + 1,
        has_phone: !!data.phone,
      });
      if (!success) console.error("Failed to send to Telegram");
    } catch (err) {
      trackEvent("strategy_session_submit", {
        event_category: "lead_generation",
        event_label: "strategy_session_booking",
        status: "error",
        error_message: err instanceof Error ? err.message : "Network error",
      });
      console.error("Network error sending to Telegram", err);
    }
  };

  // ── Success Screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="text-center py-12 space-y-4">
        <span className="text-5xl">🎉</span>
        <HeadingAtom as="h2" size="md" title="You're all set!" variant="gradient" align="center" />
        <p className="text-text-light dark:text-text-dark">
          We've received your info and will be in touch within 5–15 minutes.
        </p>
      </div>
    );
  }

  // ── Shared input classes ──────────────────────────────────────────────────
  const inputBase =
    "w-full border border-neutral-300 dark:border-neutral-600 rounded-lg px-4 py-3 " +
    "bg-white dark:bg-neutral-800 " +
    "text-text-light dark:text-text-dark placeholder:text-neutral-400 dark:placeholder:text-neutral-500 " +
    "focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition";

  return (
    <>
      {/* ── Exit Intent Dialog ─────────────────────────────────────────── */}
      <Dialog.Root open={showExitModal} onOpenChange={setShowExitModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full z-[9999] border border-neutral-200 dark:border-neutral-700">
            <Dialog.Title className="sr-only">Exit intent dialog</Dialog.Title>
            <img
              alt="Please stay!"
              className="mx-auto mb-4 rounded-xl"
              height={180}
              src="https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif"
              width={220}
            />
            <HeadingAtom as="h2" size="sm" title="Wait! Don't leave yet!" variant="default" align="center" />
            <p className="mt-2 mb-6 text-text-light dark:text-text-dark">
              Finish your strategy session and we'll have something special for you. 🎁
            </p>
            <ButtonAtom variant="primary" size="md" shimmer onClick={() => setShowExitModal(false)} className="justify-center">
              I'll stay! 🙌
            </ButtonAtom>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* ── Form ────────────────────────────────────────────────────────── */}
      <form className="space-y-8" onSubmit={handleSubmit}>

        {/* Progress Bar – custom div so we can apply gradient fill */}
        <div className="space-y-1">
          <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FF595E] to-orange-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-text-light dark:text-text-dark text-right">
            Step {step + 1} of {steps.length}
          </div>
        </div>

        {/* Question */}
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-text-light dark:text-text-dark leading-snug">
            {getLabel()}
          </label>

          {current.type === "text" && (
            <input
              autoFocus
              className={inputBase}
              name={current.field}
              type="text"
              value={data[current.field as keyof FormData]}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          )}

          {current.type === "textarea" && (
            <textarea
              className={inputBase}
              name={current.field}
              rows={4}
              value={data[current.field as keyof FormData]}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          )}

          {current.type === "radio" && (
            <div className="flex flex-col gap-3">
              {(current.options || []).map((option: string) => (
                <label
                  key={option}
                  className={`flex items-center gap-3 cursor-pointer rounded-lg px-4 py-3 border transition
                    ${data[current.field as keyof FormData] === option
                      ? "border-brand-primary bg-brand-primary/10 text-text-light dark:text-text-dark"
                      : "border-neutral-300 dark:border-neutral-600 text-text-light dark:text-text-dark hover:border-brand-primary/50"
                    }`}
                >
                  <input
                    checked={data[current.field as keyof FormData] === option}
                    className="accent-brand-primary"
                    name={current.field}
                    type="radio"
                    value={option}
                    onChange={() => handleRadio(current.field, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}

          {touched && current.required && !validate() && (
            <p className="text-red-500 text-sm">This field is required.</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-2">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition ${isFirst
              ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
              : "bg-neutral-100 dark:bg-neutral-800 text-text-light dark:text-text-dark hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            disabled={isFirst}
            type="button"
            onClick={handleBack}
          >
            ← Back
          </button>

          {!isLast ? (
            <ButtonAtom variant="primary" size="md" shimmer type="button" onClick={handleNext}>
              Next →
            </ButtonAtom>
          ) : (
            <ButtonAtom variant="primary" size="md" shimmer type="submit">
              Submit 🚀
            </ButtonAtom>
          )}
        </div>
      </form>
    </>
  );
}