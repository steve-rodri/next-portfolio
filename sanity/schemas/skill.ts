import { defineField, defineType } from "sanity"

const isCapability = (parent: unknown) =>
  (parent as { kind?: string } | undefined)?.kind === "capability"

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      description:
        "A technology is something you install (React Native, Postgres). A capability is something you can do (Geospatial, Observability).",
      initialValue: "technology",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Technology", value: "technology" },
          { title: "Capability", value: "capability" },
        ],
      },
    }),
    defineField({
      name: "detail",
      title: "Detail",
      type: "string",
      description: "One short supporting phrase. Capabilities only.",
      hidden: ({ parent }) => !isCapability(parent),
    }),
    defineField({
      name: "url",
      title: "Link",
      type: "url",
      description:
        "Official site or docs. Turns the pill into a link. Technologies only.",
      hidden: ({ parent }) => isCapability(parent),
    }),
    defineField({
      name: "featured",
      title: "Show on the home page",
      type: "boolean",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "level",
      title: "Proficiency Level",
      type: "string",
      options: {
        list: ["Beginner", "Intermediate", "Advanced", "Expert"],
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Drives the Stack row, and the ordering of capabilities.",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Languages", value: "Languages" },
          { title: "Mobile", value: "Mobile" },
          { title: "Frontend", value: "Frontend" },
          { title: "Backend", value: "Backend" },
          { title: "Ship & verify", value: "Ship & verify" },
          { title: "Tools", value: "Tools" },
          { title: "Design", value: "Design" },
          { title: "Other", value: "Other" },
        ],
      },
    }),
  ],
  preview: {
    select: { title: "name", category: "category", kind: "kind" },
    prepare({ title, category, kind }) {
      return { title, subtitle: `${kind ?? "technology"} · ${category}` }
    },
  },
})
