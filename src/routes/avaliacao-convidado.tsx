import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/hpt/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/avaliacao-convidado")({
  head: () => ({
    meta: [
      { title: "Avaliação do Convidado | Sistema HPT" },
      {
        name: "description",
        content:
          "Questionário de avaliação do convidado especial da oficina Libras no Comércio.",
      },
    ],
  }),
  component: GuestEvaluationPage,
});

const EXPERIENCE = ["Excelente", "Muito boa", "Boa", "Regular", "Precisa melhorar"];
const WELCOMING = ["Sim, totalmente", "Sim, em grande parte", "Parcialmente", "Não"];
const INTEREST = ["Muito alto", "Alto", "Médio", "Baixo"];
const RESPECT = ["Sim, todos", "A maioria", "Alguns", "Poucos"];
const CLOSER = ["Sim, muito", "Sim", "Parcialmente", "Não"];
const METHODOLOGY = ["Excelente", "Muito boa", "Boa", "Regular", "Precisa melhorar"];
const AGAIN = ["Sim, com certeza", "Sim", "Talvez", "Não"];
const YES_NO = ["Sim", "Não"];

type FormState = {
  guest_name: string;
  class_code: string;
  experience_rating: string;
  welcoming: string;
  students_interest: string;
  respect_shown: string;
  positive_point: string;
  could_be_different: string;
  brought_communities_closer: string;
  methodology_rating: string;
  would_participate_again: string;
  message_to_students: string;
  testimonial_consent: string;
  consent: boolean;
};

const initial: FormState = {
  guest_name: "Kleberson",
  class_code: "HPCT01",
  experience_rating: "",
  welcoming: "",
  students_interest: "",
  respect_shown: "",
  positive_point: "",
  could_be_different: "",
  brought_communities_closer: "",
  methodology_rating: "",
  would_participate_again: "",
  message_to_students: "",
  testimonial_consent: "",
  consent: false,
};

function GuestEvaluationPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [locked, setLocked] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    (async () => {
      const { count } = await supabase
        .from("guest_evaluation_responses")
        .select("id", { count: "exact", head: true });
      if (alive) setLocked((count ?? 0) > 0);
    })();
    return () => {
      alive = false;
    };
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent) {
      toast.error("É necessário autorizar o envio para continuar.");
      return;
    }
    const required = [
      form.experience_rating,
      form.welcoming,
      form.students_interest,
      form.respect_shown,
      form.brought_communities_closer,
      form.methodology_rating,
      form.would_participate_again,
      form.testimonial_consent,
    ];
    if (required.some((v) => !v)) {
      toast.error("Por favor, responda todas as perguntas de seleção.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase
      .from("guest_evaluation_responses")
      .insert({
        guest_name: form.guest_name.trim() || "Kleberson",
        class_code: form.class_code.trim().toUpperCase(),
        experience_rating: form.experience_rating,
        welcoming: form.welcoming,
        students_interest: form.students_interest,
        respect_shown: form.respect_shown,
        positive_point: form.positive_point,
        could_be_different: form.could_be_different.trim() || null,
        brought_communities_closer: form.brought_communities_closer,
        methodology_rating: form.methodology_rating,
        would_participate_again: form.would_participate_again,
        message_to_students: form.message_to_students,
        testimonial_consent: form.testimonial_consent,
        consent: form.consent,
      });
    setSubmitting(false);
    if (error) {
      console.error(error);
      toast.error("Não foi possível enviar. Tente novamente.");
      return;
    }
    navigate({ to: "/obrigado" });
  }

  return (
    <PageShell>
      <Toaster richColors position="top-center" />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-border bg-surface shadow-sm">
          <div className="rounded-t-3xl bg-primary px-6 py-6 text-primary-foreground sm:px-8">
            <h1 className="text-xl font-bold sm:text-2xl">
              Questionário de Avaliação do Convidado
            </h1>
            <p className="mt-2 text-sm text-primary-foreground/85">
              Oficina: Libras no Comércio – Comunicação sem Barreiras
            </p>
            <p className="mt-1 text-sm text-primary-foreground/85">
              Participação Especial: Kleberson
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6 p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Nome do convidado" required>
                <Input value={form.guest_name} onChange={(v) => update("guest_name", v)} required />
              </Field>
              <Field label="Turma" required>
                <input
                  type="text"
                  value={form.class_code}
                  readOnly
                  aria-readonly="true"
                  tabIndex={-1}
                  className="w-full cursor-not-allowed rounded-lg border border-input bg-surface-muted px-3 py-2.5 text-sm font-semibold text-foreground outline-none"
                />
              </Field>
            </div>

            <Field label="1. Como você avalia sua experiência participando da oficina?" required>
              <Radio name="experience_rating" value={form.experience_rating} onChange={(v) => update("experience_rating", v)} options={EXPERIENCE} />
            </Field>

            <Field label="2. Você se sentiu acolhido(a) pelos participantes?" required>
              <Radio name="welcoming" value={form.welcoming} onChange={(v) => update("welcoming", v)} options={WELCOMING} />
            </Field>

            <Field label="3. Como você percebeu o interesse dos alunos em aprender Libras?" required>
              <Radio name="students_interest" value={form.students_interest} onChange={(v) => update("students_interest", v)} options={INTEREST} />
            </Field>

            <Field label="4. Durante a interação, os alunos demonstraram respeito pela cultura e pela comunidade surda?" required>
              <Radio name="respect_shown" value={form.respect_shown} onChange={(v) => update("respect_shown", v)} options={RESPECT} />
            </Field>

            <Field label="5. Na sua opinião, qual foi o ponto mais positivo da atividade?" required>
              <Textarea value={form.positive_point} onChange={(v) => update("positive_point", v)} required />
            </Field>

            <Field label="6. Houve algum momento em que você acredita que os participantes poderiam ter agido de forma diferente?">
              <Textarea value={form.could_be_different} onChange={(v) => update("could_be_different", v)} />
            </Field>

            <Field label="7. Você acredita que essa experiência contribuiu para aproximar pessoas ouvintes da comunidade surda?" required>
              <Radio name="brought_communities_closer" value={form.brought_communities_closer} onChange={(v) => update("brought_communities_closer", v)} options={CLOSER} />
            </Field>

            <Field label="8. Como você avalia a metodologia utilizada pelo instrutor Heberton Pinheiro para promover essa interação?" required>
              <Radio name="methodology_rating" value={form.methodology_rating} onChange={(v) => update("methodology_rating", v)} options={METHODOLOGY} />
            </Field>

            <Field label="9. Você participaria novamente de atividades como esta?" required>
              <Radio name="would_participate_again" value={form.would_participate_again} onChange={(v) => update("would_participate_again", v)} options={AGAIN} />
            </Field>

            <Field label="10. Que mensagem você gostaria de deixar para os alunos desta turma?" required>
              <Textarea value={form.message_to_students} onChange={(v) => update("message_to_students", v)} required />
            </Field>

            <Field label="Você autoriza a utilização do seu depoimento (texto ou vídeo) para divulgação institucional da Heberton Pinheiro Consultoria e Treinamento?" required>
              <Radio name="testimonial_consent" value={form.testimonial_consent} onChange={(v) => update("testimonial_consent", v)} options={YES_NO} />
            </Field>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface-muted p-4 text-sm">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
                required
              />
              <span className="text-foreground">
                Confirmo o envio das minhas respostas para a Heberton Pinheiro Consultoria e Treinamento.
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-deep disabled:opacity-60 min-h-[52px]"
            >
              {submitting ? "Enviando..." : "Enviar Avaliação"}
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ value, onChange, required }: { value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full rounded-lg border border-input bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
    />
  );
}

function Textarea({ value, onChange, required }: { value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      rows={3}
      className="w-full resize-y rounded-lg border border-input bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
    />
  );
}

function Radio({ name, value, onChange, options }: { name: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="space-y-2">
      {options.map((o) => (
        <label
          key={o}
          className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
            value === o ? "border-primary bg-primary/5 text-foreground" : "border-border bg-surface hover:border-primary/40"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={o}
            checked={value === o}
            onChange={() => onChange(o)}
            className="h-4 w-4 accent-primary"
            required
          />
          <span>{o}</span>
        </label>
      ))}
    </div>
  );
}
