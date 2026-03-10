import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactSection",
  title: "Contact Section",
  type: "document",
  fieldsets: [
    { name: "en", title: "English", options: { collapsible: true, collapsed: false } },
    { name: "am", title: "Amharic", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // Headings (translatable)
    defineField({ name: "heading_en", title: "Heading (English)", type: "string", fieldset: "en", validation: (Rule) => Rule.required() }),
    defineField({ name: "heading_am", title: "Heading (Amharic)", type: "string", fieldset: "am",  }),
    defineField({ name: "subheading_en", title: "Subheading (English)", type: "string", fieldset: "en", validation: (Rule) => Rule.required() }),
    defineField({ name: "subheading_am", title: "Subheading (Amharic)", type: "string", fieldset: "am",  }),

    // Right column contact details (translatable)
    defineField({ name: "address_en", title: "Address (English)", type: "string", fieldset: "en", validation: (Rule) => Rule.required() }),
    defineField({ name: "address_am", title: "Address (Amharic)", type: "string", fieldset: "am",  }),
    defineField({ name: "availability_en", title: "Availability (English)", type: "string", fieldset: "en", validation: (Rule) => Rule.required() }),
    defineField({ name: "availability_am", title: "Availability (Amharic)", type: "string", fieldset: "am",  }),

    // Shared fields (not translated)
    defineField({ name: "phone", title: "Phone", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "email", title: "Email", type: "string", validation: (Rule) => Rule.required() }),
    // Add more fields as needed (e.g., social links)
  ],
});
