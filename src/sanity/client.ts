import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "mcpko9lw",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});