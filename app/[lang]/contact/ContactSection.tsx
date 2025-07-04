import { SectionHeading, AccentText } from "@/components/ui/typography";
import ContactForm from "./ContactForm";

export interface ContactSectionProps {
  heading: string;
  subheading: string;
  address: string;
  availability: string;
  phone: string;
  email: string;
}

export default function ContactSection({
  heading,
  subheading,
  address,
  availability,
  phone,
  email,
}: ContactSectionProps) {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="container mx-auto px-4 sm:px-6 md:px-4">
        <div className="mb-8 sm:mb-10 md:mb-12 text-center">
          <SectionHeading>{heading}</SectionHeading>
          <AccentText>{subheading}</AccentText>
        </div>
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 md:flex-row lg:gap-16">
          {/* Left: Contact Form (UI only) */}
          
          <div className="w-full p-4 sm:p-6 md:p-8 md:w-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-subheading font-semibold mb-4 sm:mb-5 md:mb-6">
              Get in Touch with Us
            </h3>
            <ContactForm />
          </div>
          {/* Right: Contact Details (dynamic, multilingual) */}
          <div className="w-full sm:p-6 md:p-8 md:w-1/2 p-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md md:bg-transparent md:shadow-none">
            <h3 className="text-heading font-semibold mb-6">Contact Details</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-body">
              if you wish to reach out to us directly, you can use the contact details below or connect with us on social media.
              </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 xs:gap-3 sm:gap-4 mt-3 xs:mt-4 sm:mt-5 md:mt-6">
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
                    {address}
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
                    {phone}
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
                    {availability}
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
{email}                  </p>
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
                  href="https://www.facebook.com/aligoodigitalagency"
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
                  href="https://et.linkedin.com/company/aligoo"
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
}
