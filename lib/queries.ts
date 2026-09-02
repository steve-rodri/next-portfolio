import {
  EducationQueryResult,
  ExperiencesQueryResult,
  SkillsQueryResult,
} from "@/types/sanity"
import { PersonalInfo, ProjectDetail, ProjectListItem } from "@/types/portfolio"
import { fetchSanity } from "./sanity"
import groq from "groq"

export const personalInfoQuery = groq`
  *[_type == "personalInfo"][0] {
    _id,
    name,
    role,
    tagline,
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

export async function getPersonalInfo(): Promise<PersonalInfo | null> {
  try {
    return await fetchSanity<PersonalInfo | null>(personalInfoQuery)
  } catch (error) {
    console.error("Error fetching personal info:", error)
    return null
  }
}

// Skills
export const skillsQuery = groq`
  *[_type == "skill"] {
    _id,
    name,
    kind,
    detail,
    url,
    featured,
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
    return []
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
    return []
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
    if (!data) return []
    return data
  } catch (error) {
    console.error("Error fetching education:", error)
    return []
  }
}

// Projects: what a featured card or an Other work row needs, shared by the list and the Home singleton
const projectListFields = /* groq */ `
  _id,
  title,
  slug,
  summary,
  kind,
  description,
  image,
  technologies[]->{
    _id,
    name,
    category,
    featured,
    url
  },
  keyTechnologies[]->{
    _id,
    name,
    category,
    featured,
    url
  },
  githubUrl,
  liveUrl,
  liveLabel,
  meta,
  highlight,
  "hasDetail": count(sections) > 0
`

export const projectsQuery = groq`
  *[_type == "project"] | order(startDate desc) {
    ${projectListFields}
  }
`

export async function getProjects(): Promise<ProjectListItem[]> {
  try {
    const data = await fetchSanity<ProjectListItem[]>(projectsQuery)
    if (!data) return []
    return data
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

// The Home singleton holds the featured cards as a drag-ordered reference list
export const homeQuery = groq`
  *[_type == "home"][0] {
    featuredProjects[]->{
      ${projectListFields}
    }
  }
`

export async function getFeaturedProjects(): Promise<ProjectListItem[]> {
  try {
    const data = await fetchSanity<{
      featuredProjects: ProjectListItem[] | null
    } | null>(homeQuery)
    return data?.featuredProjects ?? []
  } catch (error) {
    console.error("Error fetching featured projects:", error)
    return []
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
      category,
      featured,
      url
    },
    keyTechnologies[]->{
      _id,
      name,
      featured,
      url
    },
    githubUrl,
    liveUrl,
    liveLabel,
    metaLine,
    stats[] { _key, value, label },
    sections[] { _key, heading, body },
    screenshots[] {
      _key,
      caption,
      image,
      "aspectRatio": image.asset->metadata.dimensions.aspectRatio
    }
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
