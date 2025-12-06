"use client";
import { useContactForm } from "./useContactForm";
import InputAtom from "@/components/atoms/InputAtom";
import SelectAtom from "@/components/atoms/SelectAtom";
import TextareaAtom from "@/components/atoms/TextareaAtom"; // I need to create this!
import ButtonAtom from "@/components/atoms/ButtonAtom";
import { Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const countriesData = [
  { code: "+251", name: "Ethiopia", flag: "🇪🇹", fullLabel: "Ethiopia (+251)" },
  { code: "+1", name: "USA", flag: "🇺🇸", fullLabel: "USA (+1)" },
  { code: "+44", name: "UK", flag: "🇬🇧", fullLabel: "UK (+44)" },
  { code: "+1", name: "Canada", flag: "🇨🇦", fullLabel: "Canada (+1)" },
  { code: "+61", name: "Australia", flag: "🇦🇺", fullLabel: "Australia (+61)" },
  { code: "+49", name: "Germany", flag: "🇩🇪", fullLabel: "Germany (+49)" },
  { code: "+33", name: "France", flag: "🇫🇷", fullLabel: "France (+33)" },
  { code: "+81", name: "Japan", flag: "🇯🇵", fullLabel: "Japan (+81)" },
].map((country, index) => ({
  value: `${country.code}-${index}`,
  label: <span className="flex items-center gap-2 text-base"><span>{country.flag}</span> <span>{country.name}</span> <span className="text-white/50 text-xs">({country.code})</span></span>,
  displayLabel: country.code, // Show only code in the trigger
  code: country.code
}));

const serviceEnquiryOptions = [
  { value: "facebook_ad", label: "Facebook Ad" },
  { value: "web_design", label: "Web Design" },
  { value: "TikTok Ad", label: "Tiktok Ad" },
  { value: "SEO", label: "Search Engine Optimization" },
  { value: "digital-strategy", label: "Digital Marketing (all-in-one)" },
  { value: "Graphic-Design", label: "Graphic Design" },
  { value: "Funnel-Mapping", label: "Funnel Mapping" },
  { value: "Content-marketing", label: "Content-marketing" },
  { value: "others", label: "Others" },
];

const communicationOptions = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Direct Phone Call" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

export default function ContactForm() {
  const {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    register,
    onSubmit,
  } = useContactForm();

  // Helper code to map back the selected value to just the code (handled in onSubmit wrapper in component or hook)
  // The hook's onSubmit does: onSubmit({ ...data, countryCode }) where countryCode comes from getSelectedCountryCode
  // But our SelectAtom now returns the `value` (e.g. "+251-0").
  // Usage in hook was: `const countryCode = getSelectedCountryCode(data.countryCode);`
  // We can replicate that logic here inside the submit handler wrapper.

  const getSelectedCountryCode = (displayKey: string | undefined) => {
    const found = countriesData.find((item) => item.value === displayKey);
    return found?.code || "";
  };

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-4 md:space-y-5"
      onSubmit={handleSubmit((data) => {
        const countryCode = getSelectedCountryCode(data.countryCode);
        onSubmit({ ...data, countryCode });
      })}
    >
      <motion.div variants={itemVariants}>
        <InputAtom
          {...register("fullName")}
          placeholder="Full Name"
          error={errors.fullName?.message}
          size="lg"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="flex gap-3">
        <div className="w-28 sm:w-36 flex-shrink-0">
          <Controller
            control={control}
            name="countryCode"
            render={({ field }) => (
              <SelectAtom
                options={countriesData}
                value={field.value}
                onChange={field.onChange}
                placeholder="+000"
                error={errors.countryCode?.message}
                size="lg"
              // Custom styling to merge with input
              />
            )}
          />
        </div>
        <div className="grow">
          <InputAtom
            {...register("phoneNumber")}
            placeholder="Phone Number"
            error={errors.phoneNumber?.message}
            type="tel"
            size="lg"
          />
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputAtom
          {...register("companyName")}
          placeholder="Company Name (Optional)"
          error={errors.companyName?.message}
          size="lg"
        />
        <Controller
          control={control}
          name="serviceEnquiry"
          render={({ field }) => (
            <SelectAtom
              options={serviceEnquiryOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select a Service"
              error={errors.serviceEnquiry?.message}
              size="lg"
            />
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Controller
          control={control}
          name="preferredCommunication"
          render={({ field }) => (
            <SelectAtom
              options={communicationOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="Preferred Communication"
              error={errors.preferredCommunication?.message}
              size="lg"
            />
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextareaAtom
          {...register("message")}
          placeholder="Tell us about your project..."
          error={errors.message?.message}
          rows={5}
          size="lg"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="pt-2">
        <ButtonAtom
          variant="primary"
          size="xl"
          fullWidth
          isLoading={isSubmitting}
          type="submit"
          icon={<Send size={20} />}
          shimmer
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </ButtonAtom>
      </motion.div>
    </motion.form>
  );
}
