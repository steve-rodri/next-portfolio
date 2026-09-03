import { defineField, defineType, type Reference } from "sanity"
import { detailFields } from "./project-detail-fields"

type ProjectDraft = { technologies?: Reference[] }

/** Key technologies come from Technologies Used, so the detail page's stack stays the superset. */
function subsetOfTechnologies(
  value: Reference[] | undefined,
  context: { document?: unknown },
) {
  const draft = context.document as ProjectDraft | undefined
  const all = new Set((draft?.technologies ?? []).map((ref) => ref._ref))
  const missing = (value ?? []).filter((ref) => ref._ref && !all.has(ref._ref))
  if (!missing.length) return true
  return "Every key technology must also be listed under Technologies Used"
}

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
      name: "kind",
      title: "Kind",
      type: "string",
      description:
        "Groups the row in the Other work table. Leave it empty to list the project without a group.",
      options: {
        list: [
          { title: "Paid work", value: "paid" },
          { title: "Side project", value: "side" },
          { title: "Tool", value: "tool" },
          { title: "Take-home", value: "takehome" },
          { title: "Coursework", value: "coursework" },
        ],
        layout: "radio",
      },
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
      name: "keyTechnologies",
      title: "Key technologies",
      type: "array",
      description:
        "The pills on the featured card, in this order (drag to reorder). The detail page shows everything in Technologies Used in its stack instead. Until this has entries, the card shows the full list.",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
      validation: (Rule) => Rule.unique().custom(subsetOfTechnologies),
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
      description:
        'Mono note beside the title on featured cards, e.g. "ios & android · current"',
    }),
    defineField({
      name: "highlight",
      title: "Highlight Line",
      type: "string",
      description:
        'Mono stat line on featured cards, e.g. "4,500+ riders in 3 months · 19 releases"',
    }),
    ...detailFields,
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
