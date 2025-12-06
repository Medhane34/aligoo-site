// components/contact/useContactForm.ts
"use client";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useMemo } from "react";
import { contactFormSchema, ContactFormInputs } from "./contactFormSchema";
import { useToast } from "@/components/providers/ToastProvider";

export function useContactForm() {
  const { addToast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    register,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      countryCode: "+251",
      companyName: "",
      serviceEnquiry: "",
      preferredCommunication: "telegram",
    },
  });

  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Watchers for selects
  const currentCountryCodeValue = useWatch({ control, name: "countryCode", defaultValue: "+251" });
  const currentServiceEnquiryValue = useWatch({ control, name: "serviceEnquiry", defaultValue: "" });
  const currentPreferredCommunicationValue = useWatch({ control, name: "preferredCommunication", defaultValue: "telegram" });

  // Memoized select keys
  const selectedPreferredCommunicationKey = useMemo(() => {
    return currentPreferredCommunicationValue;
  }, [currentPreferredCommunicationValue]);

  const selectedCountryDisplayKey = useMemo(() => {
    return currentCountryCodeValue;
  }, [currentCountryCodeValue]);

  const selectedServiceEnquiryKey = useMemo(() => {
    return currentServiceEnquiryValue;
  }, [currentServiceEnquiryValue]);

  function fireGAEvent() {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "contact_form_submit", {
        event_category: "lead",
        event_label: "Contact Form",
      });
    } else {
      setTimeout(fireGAEvent, 500);
    }
  }

  const onSubmit = async (data: ContactFormInputs) => {
    setSubmissionStatus("idle");
    setErrorMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let errorData = null;
      try {
        const responseBody = await response.text();
        errorData = responseBody ? JSON.parse(responseBody) : null;
      } catch (jsonError) {
        setErrorMessage("Server returned an invalid response.");
        setSubmissionStatus("error");
        return;
      }

      if (response.ok) {
        setSubmissionStatus("success");
        reset();
        addToast({
          type: "success",
          title: "Message Sent!",
          message: "Sit tight — one of our team members will reach out within 5–10 minutes.",
        });
        fireGAEvent();

        // Scroll to "What Happens Next" section so user sees the process
        setTimeout(() => {
          const nextSection = document.getElementById("what-happens-next");
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 3000);
      } else {
        setErrorMessage(errorData?.message || "Something went wrong. Please try again.");
        setSubmissionStatus("error");
      }
    } catch (error) {
      addToast({
        type: "error",
        title: "Submission Failed",
        message: "Looks like the form didn’t go through. Please try again or email us directly.",
      });
      setErrorMessage("");
      setSubmissionStatus("error");
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    setValue,
    register,
    submissionStatus,
    errorMessage,
    onSubmit,
    selectedCountryDisplayKey,
    selectedServiceEnquiryKey,
    selectedPreferredCommunicationKey,
  };
}
