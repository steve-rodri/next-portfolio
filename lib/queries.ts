import {
  EducationQueryResult,
  ExperiencesQueryResult,
  SkillsQueryResult,
} from "@/types/sanity"
import { PersonalInfo, ProjectDetail, ProjectListItem } from "@/types/portfolio"
import { fetchSanity } from "./sanity"
import groq from "groq"
import {
  defaultEducation,
  defaultExperiences,
  defaultPersonalInfo,
  defaultProjects,
} from "./defaults"

export const personalInfoQuery = groq`
  *[_type == "personalInfo"][0] {
    _id,
    name,
    role,
    bio,
    about,
    email,
    phone,
    location,
    profileImage,
    socialLinks[] {
      platform,
      url
    }
  }
`

export async function getPersonalInfo(): Promise<PersonalInfo> {
  try {
    const data = await fetchSanity<PersonalInfo | null>(personalInfoQuery)
    if (!data) return defaultPersonalInfo
    return data
  } catch (error) {
    console.error("Error fetching personal info:", error)
    return defaultPersonalInfo
  }
}

// Skills
export const skillsQuery = groq`
  *[_type == "skill"] {
    _id,
    name,
    featured,
    level,
    category
  }
  | order(category asc, featured desc, name asc)
`

export async function getSkills() {
  try {
    const data = await fetchSanity<SkillsQueryResult>(skillsQuery)
    if (!data) return []
    return data
  } catch (error) {
    console.error("Error fetching skills:", error)
    return [] // Or a default value
  }
}

// Experiences
export const experiencesQuery = groq`
  *[_type == "experience"] | order(order asc) {
    _id,
    title,
    company,
    period,
    description,
    order
  }
`

export async function getExperiences() {
  try {
    const data = await fetchSanity<ExperiencesQueryResult>(experiencesQuery)
    if (!data) return []
    return data
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return defaultExperiences
  }
}

// Education
export const educationQuery = groq`
  *[_type == "education"] | order(order asc) {
    _id,
    degree,
    institution,
    period,
    description,
    order
  }
`

export async function getEducation() {
  try {
    const data = await fetchSanity<EducationQueryResult>(educationQuery)
    if (!data) return defaultEducation
    return data
  } catch (error) {
    console.error("Error fetching education:", error)
    return defaultEducation
  }
}

// Projects
export const projectsQuery = groq`
  *[_type == "project"] | order(startDate desc) {
    _id,
    title,
    slug,
    summary,
    description,
    image,
    technologies[]->{
      _id,
      name,
      category,
      featured
    },
    githubUrl,
    liveUrl,
    featured,
    meta,
    highlight,
    "hasDetail": count(sections) > 0,
    "order": order
  }
`

export async function getProjects() {
  try {
    const data = await fetchSanity<ProjectListItem[]>(projectsQuery)
    if (!data) return defaultProjects
    return data
  } catch (error) {
    console.error("Error fetching projects:", error)
    return defaultProjects
  }
}

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    image,
    technologies[]->{
      _id,
      name,
      featured
    },
    githubUrl,
    liveUrl,
    metaLine,
    stats[] { _key, value, label },
    sections[] { _key, heading, body },
    screenshots[] { _key, caption, image }
  }
`

export async function getProjectBySlug(slug: string) {
  try {
    return await fetchSanity<ProjectDetail | null>(projectBySlugQuery, { slug })
  } catch (error) {
    console.error("Error fetching project:", error)
    return null
  }
}
