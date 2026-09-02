import { defineField } from "sanity"

/** The "Detail page" fieldset: everything that only renders on /work/<slug>. */
export const detailFields = [
  defineField({
    name: "metaLine",
    title: "Meta Line",
    type: "string",
    fieldset: "detail",
    description:
      'Mono annotation under the title, e.g. "role: mobile engineer, one of two · 2025–now"',
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
]
