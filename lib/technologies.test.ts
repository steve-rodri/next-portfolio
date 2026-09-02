import { describe, expect, it } from "bun:test"
import { cardTechnologies, sortTechnologies } from "./technologies"

const react = { name: "React", featured: true }
const zod = { name: "Zod", featured: true }
const faker = { name: "Faker", featured: false }
const axios = { name: "Axios", featured: true }

describe("sortTechnologies", () => {
  it("puts featured first, then alphabetical", () => {
    const names = sortTechnologies([zod, faker, react, axios]).map(
      (t) => t.name,
    )
    expect(names).toEqual(["Axios", "React", "Zod", "Faker"])
  })

  it("handles a missing list", () => {
    expect(sortTechnologies(null)).toEqual([])
  })
})

describe("cardTechnologies", () => {
  it("returns the curated key list in its own order", () => {
    const project = {
      technologies: [react, zod],
      keyTechnologies: [zod, react],
    }
    expect(cardTechnologies(project)).toEqual([zod, react])
  })

  it("falls back to the sorted full list when nothing is curated", () => {
    const technologies = [zod, react]
    expect(cardTechnologies({ technologies, keyTechnologies: null })).toEqual([
      react,
      zod,
    ])
    expect(cardTechnologies({ technologies, keyTechnologies: [] })).toEqual([
      react,
      zod,
    ])
  })
})
