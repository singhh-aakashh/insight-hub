import { useState } from "react";
import { AppSidebar, SidebarToggle } from "./app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppShell({
  children,
  header,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <AppSidebar open={open} onToggle={() => setOpen((o) => !o)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 shrink-0 items-center justify-between border-b border-border px-3">
          <div className="flex items-center gap-2">
            <SidebarToggle open={open} onToggle={() => setOpen((o) => !o)} />
            {header}
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}