import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";
import { DocumentsPage } from "@/components/documents/documents-page";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — Vault" },
      { name: "description", content: "Upload and manage the documents that power your knowledge base." },
      { property: "og:title", content: "Documents — Vault" },
      { property: "og:description", content: "Upload and manage the documents that power your knowledge base." },
    ],
  }),
  component: DocsPage,
});

function DocsPage() {
  return (
    <AppShell>
      <DocumentsPage />
    </AppShell>
  );
}