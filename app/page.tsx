import AboutSection from "@/components/about-section"
import ContactBand from "@/components/contact-band"
import FeaturedWork from "@/components/featured-work"
import OtherWork from "@/components/other-work"
import Rail from "@/components/rail"
import StackSection from "@/components/stack-section"
import {
  getExperiences,
  getPersonalInfo,
  getProjects,
  getSkills,
} from "@/lib/queries"

export const dynamic = "force-dynamic"

export default async function Home() {
  const [personalInfo, skills, experiences, projects] = await Promise.all([
    getPersonalInfo(),
    getSkills(),
    getExperiences(),
    getProjects(),
  ])

  const featured = projects.filter((project) => project.featured)
  const other = projects.filter((project) => !project.featured)

  return (
    <div className="grid min-h-screen grid-cols-[324px_1fr] narrow:block">
      <Rail
        personalInfo={personalInfo}
        experiences={experiences}
        featuredCount={featured.length}
        otherCount={other.length}
      />
      <main className="flex min-w-0 flex-col">
        <FeaturedWork projects={featured} />
        <OtherWork projects={other} />
        <StackSection skills={skills} />
        <AboutSection personalInfo={personalInfo} />
        <ContactBand personalInfo={personalInfo} />
      </main>
    </div>
  )
}
