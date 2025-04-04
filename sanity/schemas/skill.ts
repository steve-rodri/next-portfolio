import { defineField, defineType } from "sanity"

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Skill Name",
      type: "string",
    }),

    defineField({
      name: "featured",
      title: "Featured Skill",
      type: "boolean",
      description: "Mark this skill as featured",
      initialValue: true,
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
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      }
    },
  },
})
