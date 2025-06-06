// src/components/SanityVisualEditing.tsx

import { VisualEditing } from "next-sanity";
import { useLiveMode } from '@sanity/react-loader'

import { DisableDraftMode } from "@/components/DisableDraftMode";
import { client } from "@/src/sanity/client"

const stegaClient = client.withConfig({stega: true})

export default function SanityVisualEditing() {
	useLiveMode({client: stegaClient})

  return (
    <>
      <VisualEditing />
      <DisableDraftMode />
    </>
  );
}