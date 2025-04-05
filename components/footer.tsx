import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import type { PersonalInfoQueryResult } from "@/types/sanity"

interface FooterProps {
  personalInfo: PersonalInfoQueryResult
}

export default function Footer({ personalInfo }: FooterProps) {
  // Ensure personalInfo is defined
  if (!personalInfo) {
    return (
      <footer className="border-t py-6 md:py-0">
        <div className="container flex items-center justify-center h-24">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    )
  }

  // Helper function to get social link by platform
  const getSocialLink = (platform: string) => {
    return (
      personalInfo.socialLinks?.find(
        (link) => link.platform?.toLowerCase() === platform.toLowerCase(),
      )?.url || "#"
    )
  }

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} {personalInfo.name}. All rights
          reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={getSocialLink("github")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href={getSocialLink("linkedin")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          {/* <Link */}
          {/*   href={getSocialLink("twitter")} */}
          {/*   target="_blank" */}
          {/*   rel="noopener noreferrer" */}
          {/* > */}
          {/*   <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" /> */}
          {/*   <span className="sr-only">Twitter</span> */}
          {/* </Link> */}
          {/* <Link href={`mailto:${personalInfo.email}`}> */}
          {/*   <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" /> */}
          {/*   <span className="sr-only">Email</span> */}
          {/* </Link> */}
        </div>
      </div>
    </footer>
  )
}
