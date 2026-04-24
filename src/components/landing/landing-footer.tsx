import { VaultLogo } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Github, Twitter, Linkedin } from "lucide-react";

const cols = [
  { title: "Product", links: ["Chat", "Documents", "Integrations", "Changelog"] },
  { title: "Company", links: ["About", "Customers", "Careers", "Contact"] },
  { title: "Resources", links: ["Docs", "Guides", "API", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <VaultLogo />
            <p className="mt-3 max-w-xs text-[13px] text-muted-foreground">
              The AI knowledge base for modern teams.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <div className="text-[12px] font-semibold uppercase tracking-wider text-foreground">
                {col.title}
              </div>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[13px] text-muted-foreground hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="text-[12px] text-muted-foreground">
            © {new Date().getFullYear()} Vault Labs, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <a href="#" className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
              <Linkedin className="h-4 w-4" />
            </a>
            <ThemeToggle className="ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}