import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

// Check if environment variables are defined
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

// Log warning if environment variables are missing
if (!projectId) {
  console.warn(
    "Sanity Project ID is missing. Check your environment variables.",
  )
}

export const client = createClient({
  projectId: projectId || "",
  dataset,
  apiVersion: "2025-04-03", // Use the latest API version
  useCdn: process.env.NODE_ENV === "production", // Use CDN in production
  // Don't throw errors for missing environment variables
  ignoreBrowserTokenWarning: true,
})

// Helper function to build image URLs
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  if (!source || !source.asset) {
    return {
      url: () => "/placeholder.svg?height=400&width=400",
    }
  }
  return builder.image(source)
}

// Typed fetch function for Sanity data
export async function fetchSanity<T>(
  query: string,
  params: Record<string, any> = {},
): Promise<T> {
  try {
    if (!projectId) {
      throw new Error("Sanity Project ID is missing")
    }
    return await client.fetch<T>(query, params)
  } catch (error) {
    console.error("Error fetching from Sanity:", error)
    throw error
  }
}
