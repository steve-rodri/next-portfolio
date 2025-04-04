import { fetchSanity } from "./sanity"
import type {
  PersonalInfo,
  Skill,
  Experience,
  Education,
  Project,
} from "@/types/sanity"

// Default fallback data
const defaultPersonalInfo: PersonalInfo = {
  _id: "default",
  name: "John Doe",
  role: "Software Developer",
  bio: "A passionate software developer with experience in web development.",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  profileImage: {
    _type: "image",
    asset: {
      _ref: "",
      _type: "reference",
    },
  },
  socialLinks: [
    { platform: "github", url: "https://github.com" },
    { platform: "linkedin", url: "https://linkedin.com" },
    { platform: "twitter", url: "https://twitter.com" },
  ],
}

const defaultSkills: Skill[] = [
  {
    _id: "frontend",
    category: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  },
  {
    _id: "backend",
    category: "Backend",
    items: ["Node.js", "Express", "MongoDB", "SQL"],
  },
  {
    _id: "tools",
    category: "Tools",
    items: ["Git", "GitHub", "VS Code", "Figma"],
  },
]

const defaultExperiences: Experience[] = [
  {
    _id: "exp1",
    title: "Software Developer",
    company: "Tech Company",
    period: "2020 - Present",
    description: "Developing web applications using modern technologies.",
    order: 1,
  },
]

const defaultEducation: Education[] = [
  {
    _id: "edu1",
    degree: "Computer Science Degree",
    institution: "University",
    period: "2016 - 2020",
    description: "Studied computer science and software engineering.",
    order: 1,
  },
]

const defaultProjects: Project[] = [
  {
    _id: "proj1",
    title: "Portfolio Website",
    description:
      "A personal portfolio website built with Next.js and Tailwind CSS.",
    image: {
      _type: "image",
      asset: {
        _ref: "",
        _type: "reference",
      },
    },
    tags: ["Next.js", "React", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    order: 1,
  },
]

export async function getPersonalInfo(): Promise<PersonalInfo> {
  try {
    const data = await fetchSanity<PersonalInfo>(`
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
    `)

    return data || defaultPersonalInfo
  } catch (error) {
    console.error("Error fetching personal info:", error)
    return defaultPersonalInfo
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const data = await fetchSanity<Skill[]>(`
      *[_type == "skill"] {
        _id,
        category,
        items
      }
    `)

    return data && data.length > 0 ? data : defaultSkills
  } catch (error) {
    console.error("Error fetching skills:", error)
    return defaultSkills
  }
}

export async function getExperiences(): Promise<Experience[]> {
  try {
    const data = await fetchSanity<Experience[]>(`
      *[_type == "experience"] | order(order asc) {
        _id,
        title,
        company,
        period,
        description,
        order
      }
    `)

    return data && data.length > 0 ? data : defaultExperiences
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return defaultExperiences
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    const data = await fetchSanity<Education[]>(`
      *[_type == "education"] | order(order asc) {
        _id,
        degree,
        institution,
        period,
        description,
        order
      }
    `)

    return data && data.length > 0 ? data : defaultEducation
  } catch (error) {
    console.error("Error fetching education:", error)
    return defaultEducation
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await fetchSanity<Project[]>(`
      *[_type == "project"] | order(order asc) {
        _id,
        title,
        description,
        image,
        tags,
        githubUrl,
        liveUrl,
        featured,
        order
      }
    `)

    return data && data.length > 0 ? data : defaultProjects
  } catch (error) {
    console.error("Error fetching projects:", error)
    return defaultProjects
  }
}
