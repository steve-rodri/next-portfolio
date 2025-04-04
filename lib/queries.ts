import {
  EducationQueryResult,
  ExperiencesQueryResult,
  PersonalInfoQueryResult,
  ProjectsQueryResult,
  SkillsQueryResult,
} from "@/types/sanity"
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

export async function getPersonalInfo() {
  try {
    const data = await fetchSanity<PersonalInfoQueryResult>(personalInfoQuery)
    if (!data) throw new Error("No Data")
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
    if (!data) throw new Error("No Data")
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
    if (!data) throw new Error("No Data")
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
    if (!data) throw new Error("No Data")
    return data
  } catch (error) {
    console.error("Error fetching education:", error)
    return defaultEducation
  }
}

// Projects
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    summary,
    description,
    image,
    technologies[]->{
      _id,
      name,
      category
    },
    githubUrl,
    liveUrl,
    featured,
    "order": order
  }
`

export async function getProjects() {
  try {
    const data = await fetchSanity<ProjectsQueryResult>(projectsQuery)
    if (!data) throw new Error("No Data")
    return data
  } catch (error) {
    console.error("Error fetching projects:", error)
    return defaultProjects
  }
}
