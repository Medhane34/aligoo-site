export const CONTACT_SECTION_QUERY = `
  *[_type == "contactSection"][0]{
    heading_en,
    heading_am,
    subheading_en,
    subheading_am,
    address_en,
    address_am,
    availability_en,
    availability_am,
    phone,
    email
  }
`;
