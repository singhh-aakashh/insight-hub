import { FileText, Sparkles } from "lucide-react";

export function HeroMock() {
  return (
    <div className="relative mx-auto mt-14 max-w-3xl">
      <div
        aria-hidden
        className="absolute inset-x-10 -top-10 h-40 rounded-full bg-brand/20 blur-3xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="ml-3 text-[11px] text-muted-foreground">Vault — chat</span>
        </div>
        <div className="space-y-5 p-6 text-left">
          <div className="flex justify-end">
            <div className="rounded-2xl rounded-br-sm bg-muted px-4 py-2.5 text-[13.5px]">
              What's our refund policy for EU customers?
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="space-y-3">
              <p className="text-[13.5px] leading-relaxed text-foreground">
                EU customers can request a full refund within{" "}
                <span className="font-medium">14 days</span> of purchase under our
                standard distance-selling policy. Refunds are processed within 5 business
                days to the original payment method.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { name: "EU-Refund-Policy.pdf", page: 3 },
                  { name: "Terms-of-Service.md", page: 12 },
                ].map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-[11px]"
                  >
                    <FileText className="h-3 w-3 text-brand" />
                    <span className="font-medium">{s.name}</span>
                    <span className="text-muted-foreground">· p.{s.page}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}