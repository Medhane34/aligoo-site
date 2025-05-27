// components/ContactForm.tsx
"use client";

import { register } from "module";
import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Textarea, Input } from "@heroui/input";
import { Select, SelectSection, SelectItem } from "@heroui/select"; // Keep SelectSection if you use it elsewhere, otherwise not needed for this example
import { useForm, useWatch } from "react-hook-form"; // Import useWatch
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import classNames from "classnames"; // Not used in the provided snippet, but keeping for completeness

// Country data with flags, codes, and unique keys for SelectItems
const countriesData = [
  { code: "+251", name: "Ethiopia", flag: "🇪🇹", fullLabel: "Ethiopia (+251)" },
  {
    code: "+1",
    name: "United States",
    flag: "🇺🇸",
    fullLabel: "United States (+1)",
  },
  {
    code: "+44",
    name: "United Kingdom",
    flag: "🇬🇧",
    fullLabel: "United Kingdom (+44)",
  },
  { code: "+1", name: "Canada", flag: "🇨🇦", fullLabel: "Canada (+1)" },
  { code: "+61", name: "Australia", flag: "🇦🇺", fullLabel: "Australia (+61)" },
  { code: "+49", name: "Germany", flag: "🇩🇪", fullLabel: "Germany (+49)" },
  { code: "+33", name: "France", flag: "🇫🇷", fullLabel: "France (+33)" },
  { code: "+81", name: "Japan", flag: "🇯🇵", fullLabel: "Japan (+81)" },
  // Add more countries here as needed
].map((country, index) => ({
  ...country,
  // Create a unique key for each SelectItem, crucial for `selectedKeys` to work with duplicates
  displayKey: `${country.code}-${index}`,
  // The `value` that react-hook-form will store (e.g., "+251")
  value: country.code,
}));

// Service Enquiry options
const serviceEnquiryOptions = [
  // We don't add a "Select a Service" item here as a selectable option
  // Instead, we rely on the `placeholder` prop of the Select component
  // and Zod validation to ensure the user makes a choice.
  { key: "facebook_ad", label: "Facebook Ad" },
  { key: "web_design", label: "Web Design" },
  { key: "others", label: "Others" },
];

// Add this to the top of ContactForm.tsx, with other options
const communicationOptions = [
  { key: "whatsapp", label: "WhatsApp" },
  { key: "telegram", label: "Telegram" },
];

// Define the schema for validation
const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full Name is required."),
  countryCode: z.string().min(1, "Please select a country code."),
  phoneNumber: z
    .string()
    .min(1, "Phone Number is required.")
    .regex(
      /^[0-9\s\-()]*$/,
      "Invalid phone number format. Only numbers, spaces, hyphens, and parentheses allowed.",
    ),
  companyName: z.string().optional().or(z.literal("")),
  serviceEnquiry: z.string().min(1, "Please select a service."), // Zod will require a selection from the valid keys
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(500, "Message cannot exceed 500 characters."),
  preferredCommunication: z.enum(["whatsapp", "telegram"], {
    required_error: "Please select a preferred communication method.",
  }),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

// Define the ContactForm component default values
const ContactForm = () => {
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
      countryCode: "+251", // Set default country code value for RHF
      companyName: "", // Ensure companyName defaults to an empty string
      serviceEnquiry: "", // Set an empty string as initial for RHF to match placeholder logic
      preferredCommunication: "telegram", // Default to Telegram
    },
  });

  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Watch the values from react-hook-form to control the Select components
  const currentCountryCodeValue = useWatch({
    control,
    name: "countryCode",
    defaultValue: "+251", // Fallback for initial render
  });

  const currentServiceEnquiryValue = useWatch({
    control,
    name: "serviceEnquiry",
    defaultValue: "", // Fallback for initial render (empty string for placeholder)
  });

  const currentPreferredCommunicationValue = useWatch({
    control,
    name: "preferredCommunication",
    defaultValue: "telegram",
  });

  const selectedPreferredCommunicationKey = React.useMemo(() => {
    const foundItem = communicationOptions.find(
      (item) => item.key === currentPreferredCommunicationValue,
    );

    return foundItem ? foundItem.key : undefined;
  }, [currentPreferredCommunicationValue]);

  // Determine the `displayKey` for the currently selected country code
  const selectedCountryDisplayKey = React.useMemo(() => {
    // Find the item in `countriesData` that matches the RHF value (`currentCountryCodeValue`)
    // If there are duplicate `code` values, this will pick the first match.
    const foundItem = countriesData.find(
      (item) => item.value === currentCountryCodeValue,
    );

    return foundItem ? foundItem.displayKey : undefined;
  }, [currentCountryCodeValue]); // Dependency on currentCountryCodeValue

  // Determine the `key` for the currently selected service enquiry
  const selectedServiceEnquiryKey = React.useMemo(() => {
    const foundItem = serviceEnquiryOptions.find(
      (item) => item.key === currentServiceEnquiryValue,
    );

    return foundItem ? foundItem.key : undefined;
  }, [currentServiceEnquiryValue]);

  const onSubmit = async (data: ContactFormInputs) => {
        setSubmissionStatus("idle");
        setErrorMessage("");
        try {
            const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            });

            let errorData = null;

            try {
            const responseBody = await response.text();

            errorData = responseBody ? JSON.parse(responseBody) : null;
            } catch (jsonError) {
            console.error("Failed to parse response as JSON:", jsonError);
            setErrorMessage("Server returned an invalid response.");
            setSubmissionStatus("error");

            return;
            }

            if (response.ok) {
            setSubmissionStatus("success");
            reset({
                fullName: "",
                countryCode: "+251",
                phoneNumber: "",
                companyName: "",
                serviceEnquiry: "",
                message: "",
                preferredCommunication: "telegram",
            });
            } else {
            setErrorMessage(
                errorData?.message || "Something went wrong. Please try again."
            );
            setSubmissionStatus("error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setErrorMessage("Network error. Please check your connection and try again.");
            setSubmissionStatus("error");
        }
        };

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions or want to start a project? Reach out to us. We’re
            here to help!
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Left Section: Get in Touch with Us (Form) */}
          <div className="md:w-1/2 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6">
              Get in Touch with Us
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* FULL NAME */}
              <div>
                <Input
                  {...register("fullName")}
                  isClearable
                  className="w-full"
                  color={errors.fullName ? "danger" : "primary"}
                  errorMessage={errors.fullName?.message}
                  placeholder="Full Name"
                  variant="bordered"
                />
              </div>

              {/* PHONE NUMBER - Country Code Select & Phone Input */}
              <div className="relative flex items-center w-full">
                <Select
                  aria-label="Country Code" // For accessibility
                  className="w-24 md:w-32 z-10 mr-1"
                  color={errors.countryCode ? "danger" : "primary"}
                  errorMessage={errors.countryCode?.message}
                  items={countriesData} // Pass the array of country objects
                  placeholder="" // Render prop handles initial display
                  renderValue={(items) => {
                    const selectedItem = items.at(0)
                      ?.data as (typeof countriesData)[0];

                    if (!selectedItem) {
                      return <span className="text-gray-400">Select...</span>; // Fallback
                    }

                    return (
                      <div className="flex items-center gap-2">
                        <span>{selectedItem.flag}</span>
                        <span>{selectedItem.code}</span>
                      </div>
                    );
                  }}
                  selectedKeys={
                    selectedCountryDisplayKey ? [selectedCountryDisplayKey] : []
                  } // Controlled by RHF value
                  variant="bordered"
                  popoverProps={
                    {
                      className: "dark:bg-gray-700",
                    } as React.ComponentProps<typeof Select>["popoverProps"]
                  }
                  // This renderValue function defines what appears in the main Select field
                  onSelectionChange={(keys) => {
                    const selectedDisplayKey = Array.from(keys).at(0);

                    if (selectedDisplayKey) {
                      const selectedCountry = countriesData.find(
                        (item) => item.displayKey === selectedDisplayKey,
                      );

                      if (selectedCountry) {
                        // Update react-hook-form's state with the actual code value
                        setValue("countryCode", selectedCountry.value, {
                          shouldValidate: true,
                        });
                      }
                    } else {
                      // Handle case where selection is cleared
                      setValue("countryCode", "", { shouldValidate: true });
                    }
                  }}
                >
                  {/* This render function defines how each item looks in the dropdown list */}
                  {(
                    country, // `country` here is an object from `countriesData`
                  ) => (
                    <SelectItem
                      key={country.displayKey} // Unique key for HeroUI SelectItem
                      startContent={
                        <span className="text-xl">{country.flag}</span>
                      }
                      textValue={country.fullLabel} // Accessibility text
                    >
                      {country.fullLabel}{" "}
                      {/* Visible text in the dropdown list */}
                    </SelectItem>
                  )}
                </Select>
                <Input
                  {...register("phoneNumber")}
                  isClearable
                  className="flex-grow"
                  color={errors.phoneNumber ? "danger" : "primary"}
                  errorMessage={errors.phoneNumber?.message}
                  placeholder="Phone Number"
                  type="tel"
                  variant="bordered"
                />
              </div>

              {/* Company Name & Service Enquiry */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  {...register("companyName")}
                  isClearable
                  color={errors.companyName ? "danger" : "primary"}
                  errorMessage={errors.companyName?.message}
                  placeholder="Company Name (Optional)"
                  variant="bordered"
                />
                <Select
                  aria-label="Service Enquiry" // For accessibility
                  color={errors.serviceEnquiry ? "danger" : "primary"}
                  errorMessage={errors.serviceEnquiry?.message}
                  items={serviceEnquiryOptions} // Pass the array of service options
                  placeholder="Select a Service" // Initial prompt for the user
                  variant="bordered"
                  selectedKeys={
                    selectedServiceEnquiryKey ? [selectedServiceEnquiryKey] : []
                  } // Controlled by RHF value
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys).at(0) as string;

                    // Update react-hook-form's state with the selected key
                    setValue("serviceEnquiry", selectedKey, {
                      shouldValidate: true,
                    });
                  }}
                >
                  {/* Render function for each service item in the dropdown list */}
                  {(option) => (
                    <SelectItem
                      key={option.key} // Use the option's key
                      textValue={option.label} // Accessibility text
                    >
                      {option.label} {/* Visible text in the dropdown list */}
                    </SelectItem>
                  )}
                </Select>
              </div>
              {/* Preferred Communication Method */}
              <div>
                <Select
                  aria-label="Preferred Communication"
                  color={errors.preferredCommunication ? "danger" : "primary"}
                  errorMessage={errors.preferredCommunication?.message}
                  items={communicationOptions}
                  placeholder="Select Preferred Communication"
                  selectedKeys={
                    selectedPreferredCommunicationKey
                      ? [selectedPreferredCommunicationKey]
                      : []
                  }
                  variant="bordered"
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys).at(0) as string;

                    setValue(
                      "preferredCommunication",
                      selectedKey as "whatsapp" | "telegram",
                      {
                        shouldValidate: true,
                      },
                    );
                  }}
                >
                  {(option) => (
                    <SelectItem key={option.key} textValue={option.label}>
                      {option.label}
                    </SelectItem>
                  )}
                </Select>
              </div>
              {/* Message */}
              <Textarea
                {...register("message")}
                color={errors.message ? "danger" : "primary"}
                errorMessage={errors.message?.message}
                placeholder="Submit your message request"
                rows={6}
                variant="bordered"
              />
              <Button
                className="w-full bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>

              {submissionStatus === "success" && (
                <p className="text-green-500 text-center mt-4">
                  Message sent successfully!
                </p>
              )}
              {submissionStatus === "error" && (
                <p className="text-red-500 text-center mt-4">{errorMessage}</p>
              )}
            </form>
          </div>

          {/* Right Section: Contact Details and Social Media */}
          <div className="md:w-1/2 p-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md md:bg-transparent md:shadow-none">
            <h3 className="text-2xl font-semibold mb-6">Contact Details</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit taras
              tellus neul sarame tamat lae macorper del dierio denta low luco.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Address */}
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <span className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                  <svg
                    className="size-6 text-gray-600 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Jl. Raya Kuta No. 121
                  </p>
                </div>
              </div>
              {/* Mobile */}
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <span className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                  <svg
                    className="size-6 text-gray-600 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75A2.25 2.25 0 0 0 15.75 1.5H13.5m-3 0V3.75m3-2.25V3.75M12 18.75h.008v.008H12v-.008Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold">Mobile</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    (+021) 789 345
                  </p>
                </div>
              </div>
              {/* Availability */}
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <span className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                  <svg
                    className="size-6 text-gray-600 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold">Availability</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Daily 09 am - 05 pm
                  </p>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <span className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                  <svg
                    className="size-6 text-gray-600 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.75 9v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.5H14.25m-1.5 0-.426.852M12 18.75h.008v.008H12v-.008Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 21.75c0 1.242.41 2.373 1.1 3.294a.75.75 0 1 0 1.056-1.118c-.463-.585-.756-1.32-.756-2.176Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.25 12H4.5m-.75 0h-3m3 0H6.25m-2.25 0a9 9 0 1 1 18 0 9 9 0 0 1-18 0Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    admin@support.com
                  </p>
                </div>
              </div>
            </div>
            {/* Social Media (using placeholder icons) */}
            <div className="mb-8">
              <p className="font-semibold text-gray-600 dark:text-gray-300 mb-4">
                Social Media:
              </p>
              <div className="flex gap-4">
                {/* Facebook */}
                <a
                  aria-label="Facebook"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                  href="https://example.com/"
                >
                  <svg
                    fill="currentColor"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.27 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                {/* Twitter/X */}
                <a
                  aria-label="Twitter"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors"
                  href="https://example.com/"
                >
                  <svg
                    fill="currentColor"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.407 0-6.17 2.762-6.17 6.169 0 .484.055.959.152 1.411-5.138-.258-9.69-2.727-12.742-6.463-.523.9-1.314 1.713-2.316 2.298-.813-.173-1.67-.528-2.433-.679v.079c0 2.983 2.127 5.467 4.954 6.046-.64.174-1.32.253-2.01.253-.495 0-.974-.059-1.442-.139.792 2.479 3.067 4.29 5.786 4.349-2.074 1.625-4.672 2.593-7.502 2.593-.485 0-.965-.029-1.439-.084 2.695 1.737 5.895 2.748 9.351 2.748 11.218 0 17.309-9.293 17.309-17.311 0-.267-.008-.53-.02-.795z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  aria-label="LinkedIn"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-700 transition-colors"
                  href="https://example.com/"
                >
                  <svg
                    fill="currentColor"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.535-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.529v6.706z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  aria-label="Instagram"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors"
                  href="https://example.com/"
                >
                  <svg
                    fill="currentColor"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.07 4.85-1.488 3.228-3.007 4.77-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.85-.07-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.07-4.85 1.488-3.227 3.009-4.77 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
// The `register` function is provided by react-hook-form's useForm.
// In your code, you should import it from useForm and not implement it manually.
// Remove this placeholder implementation and instead destructure it from useForm above:

// Example (already present in your code):
// const { control, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, register } = useForm<ContactFormInputs>({...});

// So you do NOT need this function at all. Just ensure `register` is destructured from useForm as above.
