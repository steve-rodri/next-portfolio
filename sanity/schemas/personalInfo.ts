import { defineField, defineType } from "sanity"

export default defineType({
  name: "personalInfo",
  title: "Personal Information",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Professional Role",
      type: "string",
      description: 'Plain job title, e.g. "Senior Full Stack Software Engineer"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description:
        "Display line under the name in the rail. Falls back to Professional Role when empty.",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "about",
      title: "About",
      type: "array",
      of: [{ type: "block" }],
      description: "Longer copy for the About section. Falls back to Bio when empty.",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
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
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "GitHub", value: "github" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Twitter", value: "twitter" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Other", value: "other" },
                ],
              },
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "profileImage",
    },
  },
})
