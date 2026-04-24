import { Link, useLocation } from "@tanstack/react-router";
import {
  MessageSquarePlus,
  Search,
  FileText,
  Settings,
  ChevronDown,
  MoreHorizontal,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VaultLogo } from "@/components/brand";

type ChatItem = { id: string; title: string; group: "Today" | "Previous 7 days" | "Older" };

const sampleChats: ChatItem[] = [
  { id: "1", title: "Q3 product roadmap summary", group: "Today" },
  { id: "2", title: "Refund policy for EU customers", group: "Today" },
  { id: "3", title: "Deployment process overview", group: "Today" },
  { id: "4", title: "PTO accrual rules", group: "Previous 7 days" },
  { id: "5", title: "Onboarding checklist for engineers", group: "Previous 7 days" },
  { id: "6", title: "Vendor security questionnaire", group: "Previous 7 days" },
  { id: "7", title: "2024 brand guidelines", group: "Older" },
  { id: "8", title: "API rate limit policy", group: "Older" },
];

export function AppSidebar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const location = useLocation();
  const groups = ["Today", "Previous 7 days", "Older"] as const;

  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200",
        open ? "w-[260px]" : "w-0 overflow-hidden",
      )}
    >
      <div className="flex items-center justify-between px-3 py-3">
        <Link to="/" className="flex items-center gap-2 px-1">
          <VaultLogo />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          aria-label="Collapse sidebar"
          className="h-8 w-8"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="px-3 pb-2">
        <Link to="/chat">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-sidebar-border bg-transparent text-sm font-medium hover:bg-sidebar-accent"
          >
            <MessageSquarePlus className="h-4 w-4" />
            New chat
          </Button>
        </Link>
      </div>

      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search chats…"
            className="h-8 border-sidebar-border bg-transparent pl-8 text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-2">
        {groups.map((g) => (
          <div key={g} className="mb-3">
            <div className="px-2 pb-1 pt-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {g}
            </div>
            <ul className="space-y-0.5">
              {sampleChats
                .filter((c) => c.group === g)
                .map((c) => {
                  const active = location.pathname === "/chat" && c.id === "1";
                  return (
                    <li key={c.id}>
                      <button
                        className={cn(
                          "group flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[13px] transition-colors",
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "hover:bg-sidebar-accent/60",
                        )}
                      >
                        <span className="truncate">{c.title}</span>
                        <MoreHorizontal className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100" />
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-2">
        <Link
          to="/documents"
          className={cn(
            "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] transition-colors",
            location.pathname === "/documents"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "hover:bg-sidebar-accent/60",
          )}
        >
          <FileText className="h-4 w-4" />
          Documents
        </Link>
        <button className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left transition-colors hover:bg-sidebar-accent/60">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-brand-foreground text-xs font-semibold">
              AS
            </div>
            <div className="text-left">
              <div className="text-[13px] font-medium leading-tight">Alex Stone</div>
              <div className="text-[11px] text-muted-foreground leading-tight">Acme Corp</div>
            </div>
          </div>
          <Settings className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </aside>
  );
}

export function SidebarToggle({
  open,
  onToggle,
  className,
}: {
  open: boolean;
  onToggle: () => void;
  className?: string;
}) {
  if (open) return null;
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      aria-label="Open sidebar"
      className={cn("h-8 w-8", className)}
    >
      <PanelLeft className="h-4 w-4" />
    </Button>
  );
}

export { ChevronDown };