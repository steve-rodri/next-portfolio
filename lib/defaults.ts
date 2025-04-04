// Default fallback data
import {
  EducationQueryResult,
  ExperiencesQueryResult,
  PersonalInfoQueryResult,
  ProjectsQueryResult,
} from "@/types/sanity"

export const defaultPersonalInfo: PersonalInfoQueryResult = {
  _id: "default",
  name: "Steve Rodriguez",
  role: "Software Developer",
  bio: "A passionate software developer with experience in web and mobile development.",
  email: "steve.rodri91@gmail.com",
  phone: "+1 (516) 661-7679",
  location: "SE Asia",
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

export const defaultExperiences: ExperiencesQueryResult = [
  {
    _id: "exp1",
    title: "Software Developer",
    company: "Tech Company",
    period: "2020 - Present",
    description: "Developing web applications using modern technologies.",
    order: 1,
  },
]

export const defaultEducation: EducationQueryResult = [
  {
    _id: "edu1",
    degree: "Computer Science Degree",
    institution: "University",
    period: "2016 - 2020",
    description: "Studied computer science and software engineering.",
    order: 1,
  },
]

export const defaultProjects: ProjectsQueryResult = [
  {
    _id: "proj1",
    title: "Portfolio Website",
    summary: null,
    slug: null,
    description: [
      {
        _type: "block",
        _key: "default1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "default1span1",
            text: "A personal portfolio website built with Next.js and Tailwind CSS.",
            marks: [],
          },
        ],
      },
    ],
    image: {
      _type: "image",
      asset: {
        _ref: "",
        _type: "reference",
      },
    },
    technologies: [
      { _id: "1", name: "Next.js", category: "Frontend" },
      { _id: "2", name: "React", category: "Frontend" },
      { _id: "3", name: "Tailwind CSS", category: "Frontend" },
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    order: 1,
  },
]
