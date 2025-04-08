import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import {
  getPersonalInfo,
  getSkills,
  getExperiences,
  getEducation,
  getProjects,
} from "@/lib/queries"

// --- TEMPORARILY ADD THIS LINE TO DISABLE CACHING ---
export const dynamic = "force-dynamic"

export default async function Home() {
  try {
    // Fetch data from Sanity with error handling
    const [personalInfo, skills, experiences, education, projects] =
      await Promise.all([
        getPersonalInfo(),
        getSkills(),
        getExperiences(),
        getEducation(),
        getProjects(),
      ])

    return (
      <main className="min-h-screen">
        <Hero personalInfo={personalInfo} />
        <About
          personalInfo={personalInfo}
          skills={skills}
          experiences={experiences}
          education={education}
        />
        <Projects projects={projects} />
        <Contact personalInfo={personalInfo} />
        <Footer personalInfo={personalInfo} />
      </main>
    )
  } catch (error) {
    console.error("Error loading portfolio data:", error)

    // Return a simple error state
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">
            Portfolio Data Loading Error
          </h1>
          <p className="mb-6">
            There was an error loading the portfolio data. This could be
            because:
          </p>
          <ul className="list-disc text-left max-w-md mx-auto mb-6">
            <li>The Sanity CMS connection is not properly configured</li>
            <li>The content has not been added to Sanity yet</li>
            <li>There was a network error connecting to Sanity</li>
          </ul>
          <p>Please check your Sanity configuration and try again.</p>
        </div>
      </main>
    )
  }
}
