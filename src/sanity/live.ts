// src/sanity/live.ts

import { defineLive } from "next-sanity";

import { client } from "./client";
// src/sanity/live.ts

export const token = process.env.SANITY_API_READ_TOKEN;


export const { sanityFetch, SanityLive } = defineLive({
  client,
  browserToken: token,
  serverToken: token,
});