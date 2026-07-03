import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/hpt/Layout";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [{ title: "Obrigado! | Sistema HPT" }],
  }),
  component: ObrigadoPage,
});

function ObrigadoPage() {
  return (
    <PageShell>
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center sm:py-24">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-12 w-12" strokeWidth={2} />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Obrigado por responder!
        </h1>
        <p className="mt-4 max-w-lg text-base text-muted-foreground">
          Sua participação ajuda a Heberton Pinheiro Treinamentos a preparar uma turma mais
          prática, inclusiva e conectada com a realidade dos alunos.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-deep"
        >
          Voltar ao início
        </Link>
      </div>
    </PageShell>
  );
}
