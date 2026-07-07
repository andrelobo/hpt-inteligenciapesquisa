import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import hptLogo from "@/assets/hpt-logo.asset.json";

export function HptHeader() {
  return (
    <header className="border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src={hptLogo.url}
            alt="Heberton Pinheiro Consultoria e Treinamento"
            className="h-10 w-10 shrink-0 rounded-md bg-primary-deep object-contain p-1"
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-semibold tracking-wide sm:text-base">
              HPCT
            </div>
            <div className="truncate text-[11px] font-medium text-primary-foreground/70 sm:text-xs">
              Heberton Pinheiro Consultoria e Treinamento
            </div>
          </div>
        </Link>
        <nav className="hidden shrink-0 items-center gap-1 text-sm font-medium sm:flex">
          <Link
            to="/"
            className="rounded-md px-3 py-1.5 text-primary-foreground/80 transition hover:bg-primary-deep hover:text-primary-foreground"
          >
            Início
          </Link>
          <Link
            to="/pesquisa"
            className="rounded-md px-3 py-1.5 text-primary-foreground/80 transition hover:bg-primary-deep hover:text-primary-foreground"
          >
            Pesquisa
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function HptFooter() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Heberton Pinheiro Treinamentos · Inteligência Pedagógica para Treinamentos Inclusivos
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HptHeader />
      <main className="flex-1">{children}</main>
      <HptFooter />
    </div>
  );
}
