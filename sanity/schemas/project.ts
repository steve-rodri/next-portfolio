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
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Featured First",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "tags",
      media: "image",
      featured: "featured",
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle: Array.isArray(subtitle) ? subtitle.join(", ") : "",
        media,
      }
    },
  },
})
