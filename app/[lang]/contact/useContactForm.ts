// components/contact/useContactForm.ts
"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useMemo } from "react";

import { contactFormSchema, ContactFormInputs } from "./contactFormSchema";
import { useToast } from "@/components/providers/ToastProvider";
import { trackEvent } from "@/lib/analytics";

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

  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Watchers for selects
  const currentCountryCodeValue = useWatch({
    control,
    name: "countryCode",
    defaultValue: "+251",
  });
  const currentServiceEnquiryValue = useWatch({
    control,
    name: "serviceEnquiry",
    defaultValue: "",
  });
  const currentPreferredCommunicationValue = useWatch({
    control,
    name: "preferredCommunication",
    defaultValue: "telegram",
  });

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

  // ==================== FORM SUBMISSION WITH ANALYTICS ====================
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
        // SUCCESS - Track the event
        trackEvent("contact_form_submit", {
          event_category: "lead_generation",
          event_label: "contact_form",
          form_name: "main_contact_form",
          status: "success",
          service_enquiry: data.serviceEnquiry,
          preferred_communication: data.preferredCommunication,
        });

        setSubmissionStatus("success");
        reset();
        addToast({
          type: "success",
          title: "Message Sent!",
          message:
            "Sit tight — one of our team members will reach out within 5–10 minutes.",
        });

        // Scroll to "What Happens Next" section
        setTimeout(() => {
          const nextSection = document.getElementById("what-happens-next");
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 3000);
      } else {
        // ERROR - Track the failed submission
        trackEvent("contact_form_submit", {
          event_category: "lead_generation",
          event_label: "contact_form",
          form_name: "main_contact_form",
          status: "error",
          error_message: errorData?.message || "Server error",
        });

        setErrorMessage(errorData?.message || "Something went wrong. Please try again.");
        setSubmissionStatus("error");
      }
    } catch (error) {
      // Network / Unexpected error
      trackEvent("contact_form_submit", {
        event_category: "lead_generation",
        event_label: "contact_form",
        form_name: "main_contact_form",
        status: "error",
        error_message: error instanceof Error ? error.message : "Network error",
      });

      addToast({
        type: "error",
        title: "Submission Failed",
        message:
          "Looks like the form didn’t go through. Please try again or email us directly.",
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