import AboutSection from "@/components/about-section"
import CapabilitiesSection from "@/components/capabilities-section"
import ContactBand from "@/components/contact-band"
import FeaturedWork from "@/components/featured-work"
import Intro from "@/components/intro"
import OtherWork from "@/components/other-work"
import Rail from "@/components/rail"
import StackSection from "@/components/stack-section"
import { buildCapabilities } from "@/lib/capabilities"
import {
  getExperiences,
  getFeaturedProjects,
  getPersonalInfo,
  getProjects,
  getSkills,
} from "@/lib/queries"
import type { PersonalInfo } from "@/types/portfolio"

export const revalidate = 60

/** Without a personalInfo document there is no rail, so the page is one column. */
function layoutClass(personalInfo: PersonalInfo | null) {
  if (!personalInfo) return "min-h-screen"
  return "grid min-h-screen grid-cols-[324px_1fr] narrow:block"
}

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
  const capabilityCount = buildCapabilities(skills).length

  return (
    <div className={layoutClass(personalInfo)}>
      {personalInfo && (
        <Rail
          personalInfo={personalInfo}
          experiences={experiences}
          featuredCount={featured.length}
          capabilityCount={capabilityCount}
          otherCount={other.length}
        />
      )}
      <main id="content" className="flex min-w-0 flex-col">
        {personalInfo && <Intro bio={personalInfo.bio} />}
        <FeaturedWork projects={featured} />
        <OtherWork projects={other} />
        <CapabilitiesSection skills={skills} />
        <StackSection skills={skills} />
        {personalInfo && <AboutSection personalInfo={personalInfo} />}
        {personalInfo && <ContactBand personalInfo={personalInfo} />}
      </main>
    </div>
  )
}
