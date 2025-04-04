import { defineField, defineType } from "sanity"

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Frontend", value: "Frontend" },
          { title: "Backend", value: "Backend" },
          { title: "Tools", value: "Tools" },
          { title: "Design", value: "Design" },
          { title: "Other", value: "Other" },
        ],
      },
    }),
    defineField({
      name: "items",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "category",
      subtitle: "items",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: Array.isArray(subtitle) ? subtitle.join(", ") : "",
      }
    },
  },
})
