"use client";
import { useContactForm } from "./useContactForm";
import { Textarea, Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";

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
  { code: "+33", name: "France", flag: "🇫", fullLabel: "France (+33)" },
  { code: "+81", name: "Japan", flag: "🇯", fullLabel: "Japan (+81)" },
].map((country, index) => ({
  ...country,
  displayKey: `${country.code}-${index}`,
}));

const serviceEnquiryOptions = [
  { key: "facebook_ad", label: "Facebook Ad" },
  { key: "web_design", label: "Web Design" },
  { key: "TikTok Ad", label: "Tiktok Ad" },
  { key: "SEO", label: "Search Engine Optimization" },
  { key: "digital-strategy", label: "Digital Marketing (all-in-one)" },
  { key: "Graphic-Design", label: "Graphic Design" },
  { key: "Funnel-Mapping", label: "Funnel Mapping" },
  { key: "Content-marketing", label: "Content-marketing" },
  { key: "others", label: "Others" },
];

const communicationOptions = [
  { key: "whatsapp", label: "WhatsApp" },
  { key: "telegram", label: "Telegram" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Direct Phone Call" },
];

export default function ContactForm() {
  const {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    register,
    setValue,
    onSubmit,
    selectedCountryDisplayKey,
    selectedServiceEnquiryKey,
    selectedPreferredCommunicationKey,
  } = useContactForm();

  // Helper to get the country code for submission
  const getSelectedCountryCode = (displayKey: string | undefined) => {
    const found = countriesData.find((item) => item.displayKey === displayKey);

    return found?.code || "";
  };

  return (
    <form
      className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6"
      onSubmit={handleSubmit((data) => {
        // Map displayKey to code before submit
        const countryCode = getSelectedCountryCode(data.countryCode);

        onSubmit({ ...data, countryCode });
      })}
    >
      <Input
        {...register("fullName")}
        isClearable
        className="w-full"
        color={errors.fullName ? "danger" : "primary"}
        errorMessage={errors.fullName?.message}
        placeholder="Full Name"
        variant="bordered"
      />
      <div className="relative flex items-center w-full">
        <Select
          aria-label="Country Code"
          className="w-16 xs:w-20 sm:w-24 md:w-32 z-10 mr-0.5 xs:mr-1"
          color={errors.countryCode ? "danger" : "primary"}
          errorMessage={errors.countryCode?.message}
          items={countriesData}
          placeholder=""
          selectedKeys={
            selectedCountryDisplayKey ? [selectedCountryDisplayKey] : []
          }
          variant="bordered"
          renderValue={(items) => {
            const selectedItem = items.at(0)?.data as (typeof countriesData)[0];

            if (!selectedItem) {
              return <span className="text-gray-400">Select...</span>;
            }

            return <span>{selectedItem.code}</span>;
          }}
          onSelectionChange={(keys) => {
            const selectedDisplayKey = String(Array.from(keys).at(0) || "");

            setValue("countryCode", selectedDisplayKey, {
              shouldValidate: true,
            });
          }}
        >
          {(country) => (
            <SelectItem
              key={country.displayKey}
              startContent={<span className="text-xl">{country.flag}</span>}
              textValue={country.fullLabel}
            >
              {country.fullLabel}
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
      <div className="grid grid-cols-1 gap-2 xs:gap-3 sm:gap-4 md:gap-4 md:grid-cols-2">
        <Input
          {...register("companyName")}
          isClearable
          color={errors.companyName ? "danger" : "primary"}
          errorMessage={errors.companyName?.message}
          placeholder="Company Name (Optional)"
          variant="bordered"
        />
        <Select
          aria-label="Service Enquiry"
          color={errors.serviceEnquiry ? "danger" : "primary"}
          errorMessage={errors.serviceEnquiry?.message}
          items={serviceEnquiryOptions}
          placeholder="Select a Service"
          variant="bordered"
          selectedKeys={
            selectedServiceEnquiryKey ? [selectedServiceEnquiryKey] : []
          }
          onSelectionChange={(keys) => {
            const selectedKey = String(Array.from(keys).at(0) || "");

            setValue("serviceEnquiry", selectedKey, { shouldValidate: true });
          }}
        >
          {(option) => (
            <SelectItem key={option.key} textValue={option.label}>
              {option.label}
            </SelectItem>
          )}
        </Select>
      </div>
      <Select
        aria-label="Preferred Communication"
        color={errors.preferredCommunication ? "danger" : "primary"}
        errorMessage={errors.preferredCommunication?.message}
        items={communicationOptions}
        placeholder="Preferred method of communication"
        selectedKeys={
          selectedPreferredCommunicationKey
            ? [selectedPreferredCommunicationKey]
            : []
        }
        variant="bordered"
        onSelectionChange={(keys) => {
          const selectedKey = String(Array.from(keys).at(0) || "");

          setValue(
            "preferredCommunication",
            selectedKey as "whatsapp" | "telegram" | "email" | "phone",
            { shouldValidate: true },
          );
        }}
      >
        {(option) => (
          <SelectItem key={option.key} textValue={option.label}>
            {option.label}
          </SelectItem>
        )}
      </Select>
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
    </form>
  );
}
