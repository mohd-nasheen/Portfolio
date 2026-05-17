"use client";

import { motion } from "framer-motion";
import { AboutCard } from "@/components/about-card";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04
    }
  }
};

export function AboutBentoGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      className="grid auto-rows-[minmax(170px,auto)] gap-4 sm:gap-5 lg:grid-cols-6"
    >
      <AboutCard
        title="Role Focus"
        description="Technical support, implementation, and solutions execution across high-touch SaaS environments."
        highlights={["Customer Systems", "Implementation", "Incident Intelligence"]}
        className="lg:col-span-3"
      />
      <AboutCard
        title="Tech + Platform Lens"
        description="Comfortable moving between APIs, observability traces, delivery workflows, and automation systems."
        highlights={["APIs", "Observability", "Automation", "AI Workflows"]}
        className="lg:col-span-3"
      />
      <AboutCard
        title="Workflow DNA"
        description="Diagnose quickly, communicate clearly, de-risk implementation paths, and close loops with product feedback."
        highlights={["Triage", "Root Cause", "Playbooks", "Delivery"]}
        className="lg:col-span-2"
      />
      <AboutCard
        title="AI + SaaS Enablement"
        description="Applying AI copilots to accelerate runbook generation, repetitive support actions, and decision speed."
        highlights={["AI Workflows", "Automation", "Knowledge Ops"]}
        className="lg:col-span-2"
      />
      <AboutCard
        title="Execution Strengths"
        description="Cross-functional partner who can speak customer impact, architecture constraints, and roadmap implications."
        highlights={["Customer Impact", "System Thinking", "Technical Writing"]}
        className="lg:col-span-2"
      />
    </motion.div>
  );
}
