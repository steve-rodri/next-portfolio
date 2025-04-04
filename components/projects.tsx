"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import type { Project } from "@/types/sanity"
import { urlFor } from "@/lib/sanity"
import Image from "next/image"
import { PortableText, PortableTextBlock } from "next-sanity"

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects = [] }: ProjectsProps) {
  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-16 md:py-24">
        <div className="container px-4 md:px-6 flex items-center justify-center">
          <p>No projects found. Add some projects in Sanity Studio.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            My Projects
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Here are some of the projects I've worked on. Each project
            represents different skills and technologies.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            console.log(project.description)
            return (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    {project.image?.asset?._ref ? (
                      <Image
                        src={
                          urlFor(project.image).width(500).height(300).url() ||
                          "/placeholder.svg"
                        }
                        alt={project.image.alt || project.title}
                        width={500}
                        height={300}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <img
                        src="/placeholder.svg?height=300&width=500"
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>
                      <PortableText
                        value={
                          project.description as unknown as PortableTextBlock
                        }
                      />
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={project.githubUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link
                        href={project.liveUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
