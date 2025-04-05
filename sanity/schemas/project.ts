import { defineField, defineType } from "sanity"

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "liveUrl",
      title: "Live Demo URL",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description: "Mark this project as featured",
      initialValue: false,
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      description: "The date the project was started",
    }),
  ],
  orderings: [
    {
      title: "Start Date",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
    {
      title: "Featured First",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "startDate", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      summary: "summary",
      media: "image",
      featured: "featured",
    },
    prepare({ title, summary, media, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle: summary,
        media,
      }
    },
  },
})
