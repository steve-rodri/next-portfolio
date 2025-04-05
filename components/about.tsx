"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type {
  PersonalInfoQueryResult,
  SkillsQueryResult,
  ExperiencesQueryResult,
  EducationQueryResult,
} from "@/types/sanity"
import { groupSkills } from "@/lib/groupSkills"
import { PortableText } from "next-sanity"

interface AboutProps {
  personalInfo: PersonalInfoQueryResult
  skills: SkillsQueryResult
  experiences: ExperiencesQueryResult
  education: EducationQueryResult
}

export default function About({
  personalInfo,
  skills = [],
  experiences = [],
  education = [],
}: AboutProps) {
  // Ensure personalInfo is defined
  if (!personalInfo) {
    return (
      <section id="about" className="py-16 md:py-24 bg-muted/40">
        <div className="container px-4 md:px-6 flex items-center justify-center">
          <p>Loading about information...</p>
        </div>
      </section>
    )
  }

  const skillGroups = groupSkills(skills)

  return (
    <section id="about" className="py-16 md:py-24 bg-muted/40">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            About Me
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            {personalInfo.bio}
          </p>
        </motion.div>

        <Tabs defaultValue="skills" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="mt-6">
            <motion.div
              className="grid gap-6 md:grid-cols-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {skillGroups.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">
                        {skillGroup.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items?.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="experience" className="mt-6 space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">{exp.company}</p>
                    <PortableText
                      value={exp.description}
                      components={{
                        list: {
                          bullet: ({ children }) => (
                            <ul
                              style={{
                                listStyleType: "disc",
                                marginLeft: "1.25rem",
                              }}
                            >
                              {children}
                            </ul>
                          ),
                        },
                        listItem: {
                          bullet: ({ children }) => <li>{children}</li>,
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="education" className="mt-6 space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="font-semibold text-lg">{edu.degree}</h3>
                      <span className="text-sm text-muted-foreground">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">
                      {edu.institution}
                    </p>
                    <p>{edu.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
