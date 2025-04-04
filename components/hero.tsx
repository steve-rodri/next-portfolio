"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { urlFor } from "@/lib/sanity"
import type { PersonalInfoQueryResult } from "@/types/sanity"
import Image from "next/image"

interface HeroProps {
  personalInfo: PersonalInfoQueryResult
}

export default function Hero({ personalInfo }: HeroProps) {
  // Ensure personalInfo is defined
  if (!personalInfo) {
    return (
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container px-4 md:px-6 flex items-center justify-center">
          <p>Loading personal information...</p>
        </div>
      </section>
    )
  }

  const { name, role, profileImage, socialLinks = [] } = personalInfo

  // Helper function to get social link by platform
  const getSocialLink = (platform: string) => {
    return (
      socialLinks?.find(
        (link) => link.platform?.toLowerCase() === platform.toLowerCase(),
      )?.url || "#"
    )
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Hi, I'm <span className="text-primary">{name}</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {role}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="#projects">View My Work</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <Link
                href={getSocialLink("github")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link
                href={getSocialLink("linkedin")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link
                href={getSocialLink("twitter")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative aspect-square overflow-hidden rounded-full border-4 border-primary/20 w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
              {profileImage?.asset?._ref ? (
                <Image
                  src={urlFor(profileImage).url() || "/placeholder.svg"}
                  alt={profileImage.alt || name}
                  fill
                  className="object-cover"
                />
              ) : (
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt={name}
                  className="object-cover"
                />
              )}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Link href="#about">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowDown className="h-6 w-6" />
              <span className="sr-only">Scroll down</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
