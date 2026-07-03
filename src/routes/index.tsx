import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/hpt/Layout";
import hptLogo from "@/assets/hpt-logo.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Inteligência Pedagógica
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
                Sistema de Pesquisas <span className="text-primary">HPT</span>
              </h1>
              <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
                Coleta inteligente de dados pedagógicos para entender o perfil dos alunos,
                medir expectativas e melhorar cada nova turma.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/pesquisa"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-deep"
                >
                  Responder Pesquisa Pré-Curso
                </Link>
                <Link
                  to="/admin"
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
                >
                  Acessar Painel Administrativo
                </Link>
              </div>
            </div>
            <div className="relative mx-auto flex items-center justify-center">
              <div className="rounded-3xl bg-primary p-6 shadow-xl sm:p-10">
                <img
                  src={hptLogo.url}
                  alt="Heberton Pinheiro Treinamentos"
                  className="h-40 w-40 sm:h-56 sm:w-56"
                />
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Diagnóstico inicial",
                text: "Conheça o ponto de partida da turma em segurança e conhecimento prévio de Libras.",
              },
              {
                title: "Perfil dos alunos",
                text: "Entenda contexto profissional, expectativas e principais dificuldades relatadas.",
              },
              {
                title: "Aulas mais eficazes",
                text: "Use dados reais para preparar treinamentos práticos, inclusivos e conectados.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <div className="text-sm font-semibold text-primary">{c.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
