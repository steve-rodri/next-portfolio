export interface SanityImage {
  _type: "image"
  asset: {
    _ref: string
    _type: "reference"
  }
  alt?: string
}

export interface PersonalInfo {
  _id: string
  name: string
  role: string
  bio: string
  email: string
  phone: string
  location: string
  profileImage: SanityImage
  socialLinks: {
    platform: string
    url: string
  }[]
}

export interface Skill {
  _id: string
  category: string
  items: string[]
}

export interface Experience {
  _id: string
  title: string
  company: string
  period: string
  description: string
  order: number
}

export interface Education {
  _id: string
  degree: string
  institution: string
  period: string
  description: string
  order: number
}

export interface Project {
  _id: string
  title: string
  description: string
  image: SanityImage
  tags: string[]
  githubUrl: string
  liveUrl: string
  featured: boolean
  order: number
}
