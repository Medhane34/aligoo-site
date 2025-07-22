// app/strategy-session/MultiStepForm.tsx
"use client";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { usePageLeave } from "react-use";

import { Progress } from "@heroui/progress"; // HeroUI Progress component
/* import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Optional, for hiding the title */

// At the top of your file
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type FormData = {
  name: string;
  position: string;
  company: string;
  product: string;
  industry: string;
  years: string;
  employees: string;
  strengths: string;
  marketing: string;
  online: string;
  challenge: string;
  pastSolutions: string;
  timeline: string;
  phone: string;
};

const initialData: FormData = {
  name: "",
  position: "",
  company: "",
  product: "",
  industry: "",
  years: "",
  employees: "",
  strengths: "",
  marketing: "",
  online: "",
  challenge: "",
  pastSolutions: "",
  timeline: "",
  phone: "",
};

const positions = ["Business owner", "Manager", "Marketing Manager", "Other"];

const employeeOptions = ["1-5", "5-10", "10-20", "20+", "Other"];

const timelineOptions = [
  "ASAP",
  "This month",
  "This quarter",
  "Just exploring",
];

const steps = [
  {
    label: "Let's start with your name! 😁",
    field: "name",
    type: "text",
    required: true,
  },
  {
    label: "What is your position, {name}?",
    field: "position",
    type: "radio",
    options: positions,
    required: true,
  },
  {
    label: "What is the name of your company, {name}?",
    field: "company",
    type: "text",
    required: true,
  },
  {
    label:
      "Can you list the product/service your company sells? Please give us a little detail what your business is about.",
    field: "product",
    type: "textarea",
    required: true,
  },
  {
    label:
      "What industry does your business operate in, {name}? (e.g. Real Estate, E-commerce, Automobile...)",
    field: "industry",
    type: "text",
    required: true,
  },
  {
    label: "How long have you been in business, {name}?",
    field: "years",
    type: "text",
    required: true,
  },
  {
    label: "How many employees do you have, {name}?",
    field: "employees",
    type: "radio",
    options: employeeOptions,
    required: true,
  },
  {
    label:
      "What do you think is your company's strengths and weaknesses, {name}?",
    field: "strengths",
    type: "textarea",
    required: false,
  },
  {
    label:
      "How do you promote to new customers/clients and your existing customer base, {name}? (Tell us about your team’s marketing efforts, if any!)",
    field: "marketing",
    type: "textarea",
    required: false,
  },
  {
    label: "Where can we find you online, {name}? (Website, socials, etc.)",
    field: "online",
    type: "text",
    required: false,
  },
  {
    label:
      "What’s the biggest challenge you’re facing right now, {name}, and how is it impacting your business?",
    field: "challenge",
    type: "textarea",
    required: true,
  },
  {
    label:
      "Have you made a purchase to try to solve this problem before, {name}? How did it work out for you?",
    field: "pastSolutions",
    type: "textarea",
    required: false,
  },
  {
    label:
      "When do you hope to get started if we could offer a solution, {name}?",
    field: "timeline",
    type: "radio",
    options: timelineOptions,
    required: true,
  },
  {
    label:
      "Drop your phone number, {name} (we’ll only call if we have something awesome for you).",
    field: "phone",
    type: "text",
    required: true,
  },
];

export default function MultiStepForm() {
  // ...existing state
  const [showExitModal, setShowExitModal] = useState(false);

  usePageLeave(() => setShowExitModal(true));

  const [data, setData] = useState<FormData>(initialData);
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const isFirst = step === 0;

  // Progress calculation
  const progress = Math.round(((step + 1) / steps.length) * 100);

  // Personalized label for every step after the first
  const getLabel = () => {
    if (step === 0) return current.label;
    return current.label.replace(/{name}/g, data.name || "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadio = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

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

  //actions on sumbit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!validate()) return;

    setSubmitted(true);

    // Send to Telegram API route
    try {
      const response = await fetch("/api/strategy-session-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Optionally show an error toast/message
        console.error("Failed to send to Telegram");
      }
    } catch (err) {
      console.error("Network error sending to Telegram", err);
    }

    function fireGAEvent() {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "strategy_session_submit", {
          event_category: "lead",
          event_label: "Strategy Session",
        });
      } else {
        // Try again in 500ms (up to a few times)
        setTimeout(fireGAEvent, 500);
      }
    }

    // In your handleSubmit, after successful submit:
    fireGAEvent();

    // Optionally: show a thank you message, reset form, etc.
    console.log("Form submitted:", data);
  };

  // Prevent Enter from submitting unless on last step
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLast) {
      e.preventDefault();
      handleNext();
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <h2 className="text-heading text-2xl font-bold mb-2">Thank you!</h2>
        <p className="text-body">
          We’ve received your info and will be in touch in like 5-15 minutes.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Exit Intent Meme Modal */}
      <Dialog.Root open={showExitModal} onOpenChange={setShowExitModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-background-dark p-8 rounded-xl shadow-lg text-center max-w-md w-full z-9999">
            {/* Accessible title (can be visually hidden if you want) */}
            <Dialog.Title>Wait! Don’t leave yet!</Dialog.Title>
            {/* Or visually hidden: */}
            {/* <Dialog.Title asChild>
        <VisuallyHidden>Wait! Don’t leave yet!</VisuallyHidden>
      </Dialog.Title> */}

            <img
              alt="Please stay!"
              className="mx-auto mb-4 rounded-lg"
              height={180}
              src="https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif"
              width={220}
            />
            <h2 className="text-xl font-bold mb-2">Wait! Don’t leave yet!</h2>
            <p className="mb-4 text-body">
              {/* Personalize as needed */}
              Finish your strategy session for a surprise!
            </p>
            <button
              className="px-6 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600"
              onClick={() => setShowExitModal(false)}
            >
              I&apos;ll stay!
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Progress Bar */}
        <div className="mb-4">
          <Progress
            className="h-2 rounded-full bg-red-100"
            color="danger" // HeroUI's "danger" is red
            showValueLabel={false}
            value={progress}
          />
          <div className="text-xs text-gray-500 mt-1 text-right">
            Step {step + 1} of {steps.length}
          </div>
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2 text-heading">
            {getLabel()}
          </label>
          {current.type === "text" && (
            <input
              name={current.field}
              type="text"
              value={data[current.field as keyof FormData]}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="w-full border rounded-md px-4 py-2 text-body"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            />
          )}
          {current.type === "textarea" && (
            <textarea
              className="w-full border rounded-md px-4 py-2 text-body"
              name={current.field}
              rows={4}
              value={data[current.field as keyof FormData]}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          )}
          {current.type === "radio" && (
            <div className="flex flex-col gap-2">
              {(current.options || []).map((option: string) => (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    checked={data[current.field as keyof FormData] === option}
                    className="accent-red-500"
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
            <div className="text-red-500 text-sm mt-2">
              This field is required.
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              isFirst
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            disabled={isFirst}
            type="button"
            onClick={handleBack}
          >
            Back
          </button>
          {!isLast ? (
            <button
              className="px-6 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600"
              type="button"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              className="px-6 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600"
              type="submit"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </>
  );
}
