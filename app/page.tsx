import AboutSection from "@/components/about-section"
import ContactBand from "@/components/contact-band"
import FeaturedWork from "@/components/featured-work"
import OtherWork from "@/components/other-work"
import Rail from "@/components/rail"
import StackSection from "@/components/stack-section"
import {
  getExperiences,
  getFeaturedProjects,
  getPersonalInfo,
  getProjects,
  getSkills,
} from "@/lib/queries"

export const dynamic = "force-dynamic"

export default async function Home() {
  const [personalInfo, skills, experiences, projects, featured] =
    await Promise.all([
      getPersonalInfo(),
      getSkills(),
      getExperiences(),
      getProjects(),
      getFeaturedProjects(),
    ])

  const featuredIds = new Set(featured.map((project) => project._id))
  const other = projects.filter((project) => !featuredIds.has(project._id))

  return (
    <div className="grid min-h-screen grid-cols-[324px_1fr] narrow:block">
      <Rail
        personalInfo={personalInfo}
        experiences={experiences}
        featuredCount={featured.length}
        capabilityCount={capabilityCount}
        otherCount={other.length}
      />
      <main id="content" className="flex min-w-0 flex-col">
        <FeaturedWork projects={featured} />
        <OtherWork projects={other} />
        <CapabilitiesSection skills={skills} />
        <StackSection skills={skills} />
        <AboutSection personalInfo={personalInfo} />
        <ContactBand personalInfo={personalInfo} />
      </main>
    </div>
  )
}
