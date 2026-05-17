import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="section-shell relative z-10 pb-8 text-xs theme-muted">
      <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-5 theme-border">
        <p>© {new Date().getFullYear()} Nash. Crafted for support engineering role.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/mohd-nasheen"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-[var(--text-primary)]"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/mohamednasheen/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-[var(--text-primary)]"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="mailto:nasheenmohammed15@gmail.com"
            aria-label="Email"
            className="transition-colors hover:text-[var(--text-primary)]"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
