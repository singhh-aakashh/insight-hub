import { cn } from "@/lib/utils";

export function VaultLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z" />
          <path d="M9 12h6M12 9v6" />
        </svg>
      </div>
      <span className="text-[15px] font-semibold tracking-tight">Vault</span>
    </div>
  );
}