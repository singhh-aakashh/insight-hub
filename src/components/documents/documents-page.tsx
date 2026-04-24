import { useState } from "react";
import {
  Upload,
  FileText,
  FileType2,
  Search,
  MoreHorizontal,
  Filter,
  LayoutGrid,
  List,
  CheckCircle2,
  Loader2,
  AlertCircle,
  X,
  Globe,
  Cloud,
  Trash2,
  RotateCcw,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type DocStatus = "ready" | "processing" | "failed";
type Doc = {
  id: string;
  name: string;
  type: string;
  status: DocStatus;
  chunks: number;
  uploader: string;
  initials: string;
  date: string;
  tag: string;
};

const sampleDocs: Doc[] = [
  { id: "1", name: "Engineering Handbook.pdf", type: "PDF", status: "ready", chunks: 184, uploader: "Alex Stone", initials: "AS", date: "2 hours ago", tag: "Engineering" },
  { id: "2", name: "Q3 Product Roadmap.docx", type: "DOCX", status: "ready", chunks: 42, uploader: "Mira Chen", initials: "MC", date: "Yesterday", tag: "Product" },
  { id: "3", name: "EU Refund Policy.pdf", type: "PDF", status: "ready", chunks: 18, uploader: "Jamal Patel", initials: "JP", date: "3 days ago", tag: "Legal" },
  { id: "4", name: "Brand Guidelines 2024.pdf", type: "PDF", status: "processing", chunks: 0, uploader: "Sara Ortiz", initials: "SO", date: "Just now", tag: "Marketing" },
  { id: "5", name: "API Reference.md", type: "MD", status: "ready", chunks: 312, uploader: "Alex Stone", initials: "AS", date: "1 week ago", tag: "Engineering" },
  { id: "6", name: "Onboarding Checklist.docx", type: "DOCX", status: "ready", chunks: 24, uploader: "Lin Wei", initials: "LW", date: "2 weeks ago", tag: "HR" },
  { id: "7", name: "Vendor Security Q.pdf", type: "PDF", status: "failed", chunks: 0, uploader: "Jamal Patel", initials: "JP", date: "2 weeks ago", tag: "Security" },
  { id: "8", name: "SRE Playbook.pdf", type: "PDF", status: "ready", chunks: 96, uploader: "Mira Chen", initials: "MC", date: "1 month ago", tag: "Engineering" },
];

const stats = [
  { label: "Documents", value: "248" },
  { label: "Chunks indexed", value: "12,847" },
  { label: "Storage used", value: "1.2 GB", sub: "of 10 GB", progress: 12 },
  { label: "Last sync", value: "2 min ago" },
];

export function DocumentsPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [dragOver, setDragOver] = useState(false);
  const [openDoc, setOpenDoc] = useState<Doc | null>(null);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-[24px] font-semibold tracking-tight">Knowledge Base</h1>
              <p className="mt-1 text-[14px] text-muted-foreground">
                Upload documents to make them searchable across your workspace.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Button size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload documents
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-surface p-4">
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-[22px] font-semibold tracking-tight">{s.value}</span>
                  {s.sub && <span className="text-[12px] text-muted-foreground">{s.sub}</span>}
                </div>
                {s.progress !== undefined && (
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-brand" style={{ width: `${s.progress}%` }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
            className={cn(
              "mt-6 rounded-2xl border-2 border-dashed p-10 text-center transition-colors",
              dragOver
                ? "border-brand bg-brand-soft/40"
                : "border-border bg-surface hover:border-foreground/20",
            )}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <Upload className="h-5 w-5 text-foreground" />
            </div>
            <div className="mt-4 text-[15px] font-medium">Drop files here or click to browse</div>
            <div className="mt-1 text-[12.5px] text-muted-foreground">
              PDF, DOCX, MD, TXT, HTML — max 50MB per file
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <IntegrationBtn icon={Cloud} label="Google Drive" />
              <IntegrationBtn icon={FileType2} label="Notion" />
              <IntegrationBtn icon={FileText} label="Confluence" />
              <IntegrationBtn icon={Globe} label="Connect a website" />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search documents…" className="h-9 pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 text-[12.5px]">
                <Filter className="h-3.5 w-3.5" /> Type
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-[12.5px]">
                <Filter className="h-3.5 w-3.5" /> Status
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-[12.5px]">
                <Filter className="h-3.5 w-3.5" /> Date
              </Button>
              <div className="ml-1 flex rounded-md border border-border">
                <button className="flex h-8 w-8 items-center justify-center rounded-l-md bg-muted text-foreground">
                  <List className="h-3.5 w-3.5" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-r-md text-muted-foreground hover:text-foreground">
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <th className="w-10 py-3 pl-4"></th>
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4">Chunks</th>
                  <th className="py-3 pr-4">Uploaded by</th>
                  <th className="py-3 pr-4">Date</th>
                  <th className="w-10 py-3 pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {sampleDocs.map((d) => (
                  <tr
                    key={d.id}
                    onClick={() => setOpenDoc(d)}
                    className="cursor-pointer border-b border-border last:border-0 transition-colors hover:bg-muted/50"
                  >
                    <td className="py-3 pl-4" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selected.has(d.id)}
                        onCheckedChange={() => toggle(d.id)}
                      />
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-[10px] font-semibold text-muted-foreground">
                          {d.type}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-[13.5px] font-medium">{d.name}</div>
                          <div className="mt-0.5 inline-flex items-center rounded-full bg-muted px-1.5 py-0.5 text-[10.5px] text-muted-foreground">
                            {d.tag}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4"><StatusBadge status={d.status} /></td>
                    <td className="py-3 pr-4 text-[13px] tabular-nums">{d.chunks || "—"}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-soft text-[10px] font-semibold text-foreground">
                          {d.initials}
                        </div>
                        <span className="text-[13px]">{d.uploader}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-[13px] text-muted-foreground">{d.date}</td>
                    <td className="py-3 pr-4" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected.size > 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 shadow-lg animate-fade-up">
            <span className="px-2 text-[13px] font-medium">{selected.size} selected</span>
            <Button variant="ghost" size="sm" className="gap-1.5 text-[12.5px]">
              <RotateCcw className="h-3.5 w-3.5" /> Re-index
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5 text-[12.5px]">
              <Download className="h-3.5 w-3.5" /> Download
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5 text-[12.5px] text-destructive hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSelected(new Set())}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {openDoc && <DocDrawer doc={openDoc} onClose={() => setOpenDoc(null)} />}
    </div>
  );
}

function StatusBadge({ status }: { status: DocStatus }) {
  const cfg = {
    ready: { Icon: CheckCircle2, label: "Ready", cls: "text-success bg-success/10" },
    processing: { Icon: Loader2, label: "Processing", cls: "text-warning bg-warning/10 [&_svg]:animate-spin" },
    failed: { Icon: AlertCircle, label: "Failed", cls: "text-destructive bg-destructive/10" },
  }[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11.5px] font-medium", cfg.cls)}>
      <cfg.Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

function IntegrationBtn({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-[12.5px] text-foreground transition-colors hover:bg-muted">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      {label}
    </button>
  );
}

function DocDrawer({ doc, onClose }: { doc: Doc; onClose: () => void }) {
  return (
    <>
      <div className="absolute inset-0 z-40 bg-black/20 backdrop-blur-[1px]" onClick={onClose} />
      <aside className="absolute right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-xl animate-fade-up">
        <div className="flex items-start justify-between border-b border-border p-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-[10px] font-semibold text-muted-foreground">
                {doc.type}
              </div>
              <span className="truncate text-[14px] font-medium">{doc.name}</span>
            </div>
            <div className="mt-2"><StatusBadge status={doc.status} /></div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3">
            <Meta label="Size" value="2.4 MB" />
            <Meta label="Pages" value="48" />
            <Meta label="Chunks" value={String(doc.chunks)} />
            <Meta label="Embedding" value="text-embed-v3" />
          </div>
          <div className="mt-5">
            <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Tags</div>
            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-full bg-muted px-2 py-0.5 text-[12px]">{doc.tag}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[12px]">internal</span>
            </div>
          </div>
          <div className="mt-5">
            <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Preview</div>
            <div className="rounded-lg border border-border bg-background p-4 text-[13px] leading-relaxed text-muted-foreground">
              <p className="text-foreground">{doc.name.replace(/\.[^.]+$/, "")}</p>
              <p className="mt-2">
                This document covers internal procedures and reference material. Open the full
                document to see the complete content, or use Vault chat to query it directly.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 border-t border-border p-4">
          <Button variant="outline" size="sm" className="flex-1 gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Re-index
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-1.5">
            <Download className="h-3.5 w-3.5" /> Download
          </Button>
          <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </aside>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-[13.5px] font-medium">{value}</div>
    </div>
  );
}