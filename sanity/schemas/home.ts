import { defineField, defineType } from "sanity"

export default defineType({
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    defineField({
      name: "featuredProjects",
      title: "Featured Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      description:
        "The featured-work cards, in display order — drag to reorder. Every other project lands in the Other work table, newest first.",
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home" }
    },
  },
})
