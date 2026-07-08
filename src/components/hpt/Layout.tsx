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
      <div className="mx-auto max-w-6xl px-4 py-8 text-center sm:px-6">
        <div className="font-heading text-sm font-semibold tracking-wide text-primary">
          HPCT Insight
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          Sistema Inteligente de Pesquisas, Avaliações e Indicadores
        </div>
        <div className="mt-3 text-[11px] text-muted-foreground">
          Desenvolvido por <span className="font-medium text-foreground">Heberton Pinheiro Consultoria e Treinamento</span>
        </div>
        <div className="mt-2 text-[10px] text-muted-foreground/70">
          © {new Date().getFullYear()} HPCT · Todos os direitos reservados
        </div>
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
