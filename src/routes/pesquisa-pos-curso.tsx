import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/hpt/Layout";
import { Lock } from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/pesquisa-pos-curso")({
  head: () => ({
    meta: [{ title: "Pesquisa Pós-Curso | Sistema HPT" }],
  }),
  component: PosCursoPage,
});

function PosCursoPage() {
  return (
    <LockedSurvey
      title="Pesquisa Pós-Curso | Avaliação da Experiência do Aluno"
      subtitle="Será liberada ao final do treinamento"
      intro="Após a conclusão do curso, esta pesquisa medirá o quanto o aluno evoluiu em segurança, o quanto o conteúdo foi aplicável à rotina profissional e o que pode ser aprimorado nas próximas turmas."
      previewTopics={[
        "Nota final de segurança para se comunicar com pessoas surdas (0 a 10)",
        "Evolução percebida em relação ao início do curso",
        "Clareza das explicações e da metodologia",
        "Aplicabilidade prática do conteúdo no trabalho",
        "Pontos fortes do treinamento",
        "Sugestões de melhoria",
        "NPS — recomendação do curso para colegas (0 a 10)",
        "Interesse em módulos avançados e novos cursos",
      ]}
    />
  );
}

export function LockedSurvey({
  title,
  subtitle,
  intro,
  previewTopics,
}: {
  title: string;
  subtitle: string;
  intro: string;
  previewTopics: string[];
}) {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-border bg-surface shadow-sm">
          <div className="rounded-t-3xl bg-primary px-6 py-6 text-primary-foreground sm:px-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-deep/60">
                <Lock className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold sm:text-xl">{title}</h1>
                <p className="text-xs font-medium text-primary-foreground/75 sm:text-sm">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="text-sm font-semibold text-primary">Pesquisa ainda não liberada</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Esta é uma pré-visualização dos temas que serão perguntados. As respostas só serão
                aceitas quando a Heberton Pinheiro Treinamentos abrir a pesquisa no momento
                adequado.
              </p>
            </div>

            <p className="text-sm text-foreground">{intro}</p>

            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Temas que serão abordados
              </h2>
              <ul className="mt-3 space-y-2">
                {previewTopics.map((t, i) => (
                  <li
                    key={i}
                    className="flex gap-3 rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm text-foreground"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <DisabledFooter />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function DisabledFooter(): ReactNode {
  return (
    <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        disabled
        className="cursor-not-allowed rounded-xl bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground"
      >
        Pesquisa fechada no momento
      </button>
      <Link
        to="/"
        className="text-sm font-medium text-primary hover:underline"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
