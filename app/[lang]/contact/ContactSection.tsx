import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

import ContactForm from "./ContactForm";

import HeadingAtom from "@/components/atoms/HeadingAtom";

export interface ContactSectionProps {
  heading: string;
  subheading: string;
  address: string;
  availability: string;
  phone: string;
  email: string;
}

const ContactInfoCard = ({
  icon: Icon,
  title,
  content,
}: {
  icon: any;
  title: string;
  content: string;
}) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-brand-primary/30 transition-colors backdrop-blur-sm">
    <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary shrink-0">
      <Icon size={24} />
    </div>
    <div>
      <h5 className="font-bold text-gray-900 dark:text-white mb-1 text-base">
        {title}
      </h5>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
        {content}
      </p>
    </div>
  </div>
);

const SocialLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) => (
  <a
    aria-label={label}
    className="p-3 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-brand-primary hover:text-white transition-all duration-300 transform hover:scale-110"
    href={href}
    rel="noopener noreferrer"
    target="_blank"
  >
    <Icon size={20} />
  </a>
);

export default function ContactSection({
  heading,
  subheading,
  address,
  availability,
  phone,
  email,
}: ContactSectionProps) {
  return (
    <section className="relative py-12 md:py-24 overflow-hidden bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
          <HeadingAtom
            align="center"
            className="uppercase tracking-widest mb-4"
            size="lg"
            title={heading}
          />
          <p className="text-xl md:text-2xl text-brand-primary font-medium">
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Info (Sticky) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            {/* Info Cards */}
            <div className="space-y-4">
              <HeadingAtom
                as="h3"
                className="flex items-center gap-2 mb-6"
                size="sm"
                title="Let's Connect"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <ContactInfoCard
                  content={address}
                  icon={MapPin}
                  title="Visit Us"
                />
                <ContactInfoCard content={phone} icon={Phone} title="Call Us" />
                <ContactInfoCard content={email} icon={Mail} title="Email Us" />
                <ContactInfoCard
                  content={availability}
                  icon={Clock}
                  title="Availability"
                />
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="font-semibold text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-4">
                Follow our journey
              </p>
              <div className="flex gap-3">
                <SocialLink
                  href="https://et.linkedin.com/company/aligoo"
                  icon={Linkedin}
                  label="LinkedIn"
                />
                <SocialLink href="#" icon={Twitter} label="Twitter" />
                <SocialLink
                  href="https://www.facebook.com/aligoodigitalagency"
                  icon={Facebook}
                  label="Facebook"
                />
                <SocialLink href="#" icon={Instagram} label="Instagram" />
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 h-fit">
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-brand-primary/5">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Send us a Message
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill out the form below and we’ll get back to you shortly.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
