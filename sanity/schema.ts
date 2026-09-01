import type { SchemaTypeDefinition } from "sanity"
import home from "./schemas/home"
import personalInfo from "./schemas/personalInfo"
import skill from "./schemas/skill"
import experience from "./schemas/experience"
import education from "./schemas/education"
import project from "./schemas/project"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [home, personalInfo, skill, experience, education, project],
}
