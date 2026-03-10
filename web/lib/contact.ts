import { client } from "@/src/sanity/client";
import { CONTACT_SECTION_QUERY } from "@/sanity/queries/contact";

export type ContactSectionData = {
  heading_en: string;
  heading_am: string;
  subheading_en: string;
  subheading_am: string;
  address_en: string;
  address_am: string;
  availability_en: string;
  availability_am: string;
  phone: string;
  email: string;
};

export async function fetchContactSection(): Promise<ContactSectionData | null> {
  return await client.fetch(CONTACT_SECTION_QUERY);
}
