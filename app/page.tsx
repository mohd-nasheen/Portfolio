import { AboutBentoGrid } from "@/components/bento-grid";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { FloatingNavbar } from "@/components/floating-navbar";
import { HeroSection } from "@/components/hero-section";
import { LenisProvider } from "@/components/lenis-provider";
import { ProjectCard, type ProjectItem } from "@/components/project-card";
import { ScrollProgress } from "@/components/scroll-progress";
import { SectionWrapper } from "@/components/section-wrapper";
import { AnimatedBackground } from "@/components/animated-background";
import { AnimatedCursor } from "@/components/animated-cursor";

const projects: ProjectItem[] = [
  {
    label: "Case Study",
    title: "API-Led Onboarding Acceleration",
    impact: "Reduced enterprise onboarding from 21 days to 6 days.",
    summary:
      "Designed integration runbooks, debug tooling, and reusable API validation scripts that eliminated repeated implementation friction.",
    tags: ["REST APIs", "OAuth", "Postman", "Implementation", "Automation"],
    accent: "from-cyan-400/30 via-blue-500/20 to-transparent"
  },
  {
    label: "Case Study",
    title: "Support-to-Product Signal Pipeline",
    impact: "Lifted issue-to-fix cycle time by 34% across high-volume accounts.",
    summary:
      "Created a structured feedback pipeline between support, engineering, and product to prioritize customer pain with technical context.",
    tags: ["Product Ops", "Linear", "SLA Triage", "Root Cause Analysis"],
    accent: "from-violet-400/30 via-fuchsia-500/15 to-transparent"
  },
  {
    label: "Case Study",
    title: "AI-Powered Troubleshooting Assistant",
    impact: "Cut repetitive L1 investigation effort by 40% for recurring incidents.",
    summary:
      "Prototyped an internal retrieval assistant that mapped logs, playbooks, and known fixes into guided triage decisions for faster escalation.",
    tags: ["AI Workflows", "Knowledge Ops", "Support Engineering", "Prompt Design"],
    accent: "from-emerald-400/30 via-teal-500/20 to-transparent"
  },
  {
    label: "Personal Project",
    title: "Arsh Group Digital Experience",
    impact: "Designed and shipped a motion-first interactive web experience.",
    summary:
      "Built a premium responsive web platform focused on modern UI systems, smooth interactions, immersive frontend experiences, and scalable component architecture.",
    tags: ["NEXT.JS", "TAILWIND", "FRAMER MOTION", "UI SYSTEMS", "RESPONSIVE DESIGN"],
    accent: "from-sky-400/28 via-cyan-500/20 to-transparent",
    link: "https://github.com/mohd-nasheen/arshgroup-website"
  },
  {
    label: "In Development",
    title: "Stealth AI Outfit Platform",
    impact: "Exploring AI-assisted workflow intelligence for modern digital operations.",
    summary:
      "Building an experimental platform focused on intelligent outfit generation, workflow automation, personalization systems, and AI-assisted user experiences.",
    tags: ["AI SYSTEMS", "AUTOMATION", "PERSONALIZATION", "LLM", "STEALTH MODE"],
    accent: "from-indigo-400/26 via-violet-500/18 to-transparent",
    privateStatus: "Private Build"
  }
];

export default function HomePage() {
  return (
    <LenisProvider>
      <AnimatedBackground />
      <AnimatedCursor />
      <ScrollProgress />
      <FloatingNavbar />
      <main id="home" className="relative z-10 pb-24">
        <HeroSection />

        <SectionWrapper
          id="about"
          label="About"
          title="Engineering rigor with customer empathy."
          intro="I translate ambiguous customer problems into reliable workflows, clear implementation paths, and measurable product outcomes."
          showPortrait
        >
          <AboutBentoGrid />
        </SectionWrapper>

        <SectionWrapper
          id="work"
          label="Selected Work"
          title="Case studies shaped by systems thinking."
          intro="A cross-section of integration, support, and product execution work where technical clarity changed customer outcomes."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
          <div className="mt-6 grid gap-6 lg:mx-auto lg:max-w-4xl lg:grid-cols-2">
            {projects.slice(3).map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </SectionWrapper>

        <ContactSection />
      </main>
      <Footer />
    </LenisProvider>
  );
}
