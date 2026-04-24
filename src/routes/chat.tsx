import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";
import { ChatInterface } from "@/components/chat/chat-interface";
import { ChevronDown, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat — Vault" },
      { name: "description", content: "Ask Vault anything — answers grounded in your company's documents." },
      { property: "og:title", content: "Chat — Vault" },
      { property: "og:description", content: "Ask Vault anything — answers grounded in your company's documents." },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  return (
    <AppShell
      header={
        <button className="flex items-center gap-1 rounded-md px-2 py-1 text-[13px] font-medium hover:bg-muted">
          New chat <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      }
    >
      <div className="relative h-full">
        <div className="absolute right-3 top-2 z-10">
          <Button variant="ghost" size="sm" className="gap-1.5 text-[12.5px]">
            <Share className="h-3.5 w-3.5" /> Share
          </Button>
        </div>
        <ChatInterface />
      </div>
    </AppShell>
  );
}