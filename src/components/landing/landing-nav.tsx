import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { VaultLogo } from "@/components/brand";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = ["Product", "Use cases", "Security", "Pricing", "Docs"];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-200",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link to="/">
          <VaultLogo />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((n) => (
            <a
              key={n}
              href="#"
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {n}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-[13px]">
            Sign in
          </Button>
          <Link to="/chat">
            <Button size="sm" className="text-[13px]">Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}