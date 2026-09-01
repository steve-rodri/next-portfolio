import { defineConfig } from "sanity"
import { visionTool } from "@sanity/vision"
import { media } from "sanity-plugin-media"
import { structureTool, type StructureResolver } from "sanity/structure"
import { schema } from "./sanity/schema"

// Home is a singleton: one pinned document instead of a list.
const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home")
        .id("home")
        .child(S.document().schemaType("home").documentId("home")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "home",
      ),
    ])

export default defineConfig({
  name: "default",
  title: "Portfolio CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [structureTool({ structure }), visionTool(), media()],

  schema,

  basePath: "/studio",
})
