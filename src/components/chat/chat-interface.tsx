import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Paperclip,
  Globe,
  BookOpen,
  Sparkles,
  FileText,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Volume2,
  Calendar,
  Receipt,
  Rocket,
  ShieldCheck,
  ChevronDown,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Source = { name: string; page: number; excerpt: string };
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

const suggestions = [
  { icon: Calendar, text: "Summarize Q3 product roadmap" },
  { icon: Receipt, text: "Find our refund policy" },
  { icon: Rocket, text: "Explain our deployment process" },
  { icon: ShieldCheck, text: "What's our PTO policy?" },
];

const sampleAnswer =
  "Our standard deployment process follows a three-stage promotion model:\n\n" +
  "1. **Preview** — every pull request gets an isolated preview environment built automatically.\n" +
  "2. **Staging** — merging to `main` deploys to staging where end-to-end tests run.\n" +
  "3. **Production** — promotion to production requires approval from a code owner and passes our progressive rollout (canary 10% → 50% → 100%).\n\n" +
  "All deploys are tracked in the deploy dashboard and automatically rolled back if error rates exceed 0.5%.";

const sampleSources: Source[] = [
  {
    name: "Engineering-Handbook.pdf",
    page: 24,
    excerpt:
      "Production deploys follow a canary-first rollout. We start at 10% of traffic, monitor SLOs for 10 minutes, then proceed to 50% and finally 100%.",
  },
  {
    name: "Deploy-Runbook.md",
    page: 4,
    excerpt:
      "Every PR triggers a preview environment via the deploy bot. Merging to main automatically deploys to staging.",
  },
  {
    name: "SRE-Playbook.pdf",
    page: 11,
    excerpt:
      "Automatic rollback is triggered when the error rate exceeds 0.5% over a 5 minute window during a canary stage.",
  },
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [useKB, setUseKB] = useState(true);
  const [useWeb, setUseWeb] = useState(false);
  const [openSource, setOpenSource] = useState<Source | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [input]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamedText]);

  const submit = (text: string) => {
    if (!text.trim() || streaming) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStreaming(true);
    setStreamedText("");

    const tokens = sampleAnswer.split(/(\s+)/);
    let i = 0;
    const interval = setInterval(() => {
      if (i >= tokens.length) {
        clearInterval(interval);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: sampleAnswer,
            sources: sampleSources,
          },
        ]);
        setStreamedText("");
        setStreaming(false);
        return;
      }
      setStreamedText((s) => s + tokens[i]);
      i++;
    }, 18);
  };

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {messages.length === 0 && !streaming ? (
          <EmptyState onPick={(t) => submit(t)} />
        ) : (
          <div className="mx-auto max-w-3xl px-4 py-8">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} onSourceClick={setOpenSource} />
            ))}
            {streaming && (
              <div className="mb-8 flex gap-4">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <Markdown text={streamedText} />
                  <span className="ml-0.5 inline-block h-[14px] w-[2px] -translate-y-[-2px] animate-blink bg-foreground align-middle" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="shrink-0 px-4 pb-4 pt-2">
        <div className="mx-auto max-w-3xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="rounded-2xl border border-border bg-surface p-2 shadow-sm transition-colors focus-within:border-foreground/30"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit(input);
                }
              }}
              rows={1}
              placeholder="Ask Vault anything about your knowledge base…"
              className="block max-h-[200px] w-full resize-none border-0 bg-transparent px-2 py-2 text-[14.5px] outline-none placeholder:text-muted-foreground"
            />
            <div className="flex items-center justify-between gap-2 px-1 pt-1">
              <div className="flex items-center gap-1">
                <IconBtn aria-label="Attach file"><Paperclip className="h-4 w-4" /></IconBtn>
                <ToggleChip active={useWeb} onClick={() => setUseWeb((v) => !v)} icon={Globe} label="Web" />
                <ToggleChip active={useKB} onClick={() => setUseKB((v) => !v)} icon={BookOpen} label="Knowledge base" />
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-[12px] text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  Vault Standard <ChevronDown className="h-3 w-3" />
                </button>
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || streaming}
                  className="h-8 w-8 rounded-full"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Vault can make mistakes. Verify with sources.
          </p>
        </div>
      </div>

      {openSource && (
        <SourceDrawer source={openSource} onClose={() => setOpenSource(null)} />
      )}
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-4 py-12">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background">
        <Sparkles className="h-5 w-5" />
      </div>
      <h1 className="text-[26px] font-semibold tracking-tight">How can I help you today?</h1>
      <p className="mt-2 text-[14px] text-muted-foreground">
        Ask anything — answers come grounded in your company's documents.
      </p>
      <div className="mt-10 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
        {suggestions.map((s) => (
          <button
            key={s.text}
            onClick={() => onPick(s.text)}
            className="group flex items-start gap-3 rounded-xl border border-border bg-surface p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm"
          >
            <s.icon className="mt-0.5 h-4 w-4 text-muted-foreground group-hover:text-brand" />
            <div className="min-w-0">
              <div className="text-[13.5px] font-medium leading-snug">{s.text}</div>
              <div className="text-[12px] text-muted-foreground">Try this prompt</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  onSourceClick,
}: {
  message: Message;
  onSourceClick: (s: Source) => void;
}) {
  if (message.role === "user") {
    return (
      <div className="mb-8 flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-muted px-4 py-2.5 text-[14px]">
          {message.content}
        </div>
      </div>
    );
  }
  return (
    <div className="mb-8 flex gap-4">
      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
        <Sparkles className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <Markdown text={message.content} />
        {message.sources && (
          <>
            <div className="mt-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Sources
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {message.sources.map((s, i) => (
                <button
                  key={i}
                  onClick={() => onSourceClick(s)}
                  className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-left text-[12px] transition-colors hover:border-foreground/20 hover:bg-muted"
                >
                  <FileText className="h-3.5 w-3.5 text-brand" />
                  <span className="font-medium">{s.name}</span>
                  <span className="text-muted-foreground">· p.{s.page}</span>
                </button>
              ))}
            </div>
          </>
        )}
        <div className="mt-3 flex items-center gap-0.5 text-muted-foreground">
          <IconBtn aria-label="Copy"><Copy className="h-3.5 w-3.5" /></IconBtn>
          <IconBtn aria-label="Good response"><ThumbsUp className="h-3.5 w-3.5" /></IconBtn>
          <IconBtn aria-label="Bad response"><ThumbsDown className="h-3.5 w-3.5" /></IconBtn>
          <IconBtn aria-label="Regenerate"><RotateCcw className="h-3.5 w-3.5" /></IconBtn>
          <IconBtn aria-label="Read aloud"><Volume2 className="h-3.5 w-3.5" /></IconBtn>
        </div>
      </div>
    </div>
  );
}

function Markdown({ text }: { text: string }) {
  // lightweight markdown for **bold**, `code`, paragraphs, and ordered lists
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let listBuf: string[] = [];
  const flushList = (key: string) => {
    if (listBuf.length) {
      blocks.push(
        <ol key={key} className="my-2 ml-5 list-decimal space-y-1.5 text-[14.5px]">
          {listBuf.map((li, i) => (
            <li key={i}><InlineMd text={li.replace(/^\d+\.\s*/, "")} /></li>
          ))}
        </ol>,
      );
      listBuf = [];
    }
  };
  lines.forEach((line, i) => {
    if (/^\d+\.\s/.test(line)) {
      listBuf.push(line);
    } else if (line.trim() === "") {
      flushList(`l-${i}`);
    } else {
      flushList(`l-${i}`);
      blocks.push(
        <p key={`p-${i}`} className="my-1.5 text-[14.5px] leading-relaxed">
          <InlineMd text={line} />
        </p>,
      );
    }
  });
  flushList("end");
  return <div className="text-foreground">{blocks}</div>;
}

function InlineMd({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) {
          return <strong key={i} className="font-semibold">{p.slice(2, -2)}</strong>;
        }
        if (p.startsWith("`") && p.endsWith("`")) {
          return (
            <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[12.5px]">
              {p.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

function IconBtn({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        props.className,
      )}
    >
      {children}
    </button>
  );
}

function ToggleChip({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] transition-colors",
        active
          ? "bg-brand-soft text-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
      {active && <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-brand" />}
    </button>
  );
}

function SourceDrawer({ source, onClose }: { source: Source; onClose: () => void }) {
  return (
    <>
      <div className="absolute inset-0 z-40 bg-black/20 backdrop-blur-[1px]" onClick={onClose} />
      <aside className="absolute right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-xl animate-fade-up">
        <div className="flex items-start justify-between border-b border-border p-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand" />
              <span className="truncate text-[14px] font-medium">{source.name}</span>
            </div>
            <div className="mt-1 text-[12px] text-muted-foreground">Page {source.page}</div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Retrieved chunk
          </div>
          <div className="rounded-lg border border-border bg-background p-4 text-[13.5px] leading-relaxed">
            {source.excerpt}
          </div>
          <div className="mt-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Surrounding context
          </div>
          <div className="mt-2 space-y-2 text-[13px] leading-relaxed text-muted-foreground">
            <p>…the team uses a progressive rollout for all production deployments.</p>
            <p className="text-foreground">{source.excerpt}</p>
            <p>The deploy bot then watches metrics in Datadog and auto-promotes after the soak period…</p>
          </div>
        </div>
        <div className="border-t border-border p-4">
          <Button variant="outline" className="w-full">Open full document →</Button>
        </div>
      </aside>
    </>
  );
}