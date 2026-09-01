import { defineField, defineType } from "sanity"

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fieldsets: [
    {
      name: "detail",
      title: "Detail page",
      description:
        "Content for /work/<slug>. The page is linked from the featured card once Sections has content.",
      options: { collapsible: true, collapsed: true },
    },
  ],
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
      name: "liveLabel",
      title: "Live Link Label",
      type: "string",
      options: {
        list: ["View Site", "View App"],
        layout: "radio",
      },
      description:
        'Label for the live link on featured cards and the detail page. Defaults to "View Site".',
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      description: "The date the project was started",
    }),
    defineField({
      name: "meta",
      title: "Meta Annotation",
      type: "string",
      description: 'Mono note beside the title on featured cards, e.g. "ios & android · current"',
    }),
    defineField({
      name: "highlight",
      title: "Highlight Line",
      type: "string",
      description: 'Mono stat line on featured cards, e.g. "4,500+ riders in 3 months · 19 releases"',
    }),
    defineField({
      name: "metaLine",
      title: "Meta Line",
      type: "string",
      fieldset: "detail",
      description: 'Mono annotation under the title, e.g. "role: mobile engineer, one of two · 2025–now"',
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      fieldset: "detail",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      fieldset: "detail",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: [{ type: "block" }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "screenshots",
      title: "Screenshots",
      type: "array",
      fieldset: "detail",
      description:
        "Only entries with an image are shown; the section stays hidden until at least one has an image. Portrait images render as 9:16 phone tiles, landscape as 16:9 tiles.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "caption", title: "Caption", type: "string" }),
            defineField({ name: "image", title: "Image", type: "image" }),
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Start Date",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "summary",
      media: "image",
    },
  },
})
