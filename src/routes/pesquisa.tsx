import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/hpt/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/pesquisa")({
  head: () => ({
    meta: [
      { title: "Pesquisa Pré-Curso | Sistema HPT" },
      {
        name: "description",
        content:
          "Diagnóstico inicial do aluno para a Heberton Pinheiro Treinamentos.",
      },
    ],
  }),
  component: PesquisaPage,
});

const LIBRAS_CONTACT = [
  "Nunca tive contato",
  "Já vi algumas coisas, mas não sei sinalizar",
  "Tenho conhecimento básico",
  "Tenho conhecimento intermediário",
  "Já uso Libras em algumas situações",
];

const DEAF_CONTACT = ["Sim", "Não", "Não tenho certeza"];

const USAGE_CONTEXTS = [
  "Atendimento ao cliente",
  "Recepção",
  "Vendas",
  "Ambiente escolar",
  "Ambiente de saúde",
  "Atendimento em serviço público",
  "Comunicação com colegas de trabalho",
  "Outra situação",
];

const FUTURE_INTEREST = ["Sim", "Talvez", "Não no momento"];

type FormState = {
  full_name: string;
  company: string;
  class_code: string;
  role: string;
  whatsapp: string;
  email: string;
  previous_libras_contact: string;
  has_attended_deaf_person: string;
  initial_confidence_score: number;
  biggest_difficulty: string;
  usage_context: string;
  learning_expectation: string;
  usefulness_expectation: string;
  future_courses_interest: string;
  consent: boolean;
};

const initial: FormState = {
  full_name: "",
  company: "",
  class_code: "",
  role: "",
  whatsapp: "",
  email: "",
  previous_libras_contact: "",
  has_attended_deaf_person: "",
  initial_confidence_score: 5,
  biggest_difficulty: "",
  usage_context: "",
  learning_expectation: "",
  usefulness_expectation: "",
  future_courses_interest: "",
  consent: false,
};

function PesquisaPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent) {
      toast.error("É necessário autorizar o uso das respostas para enviar.");
      return;
    }
    if (
      !form.previous_libras_contact ||
      !form.has_attended_deaf_person ||
      !form.usage_context ||
      !form.future_courses_interest
    ) {
      toast.error("Por favor, responda todas as perguntas de seleção.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase
      .from("student_pre_course_survey_responses")
      .insert({
        ...form,
        email: form.email.trim() || null,
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
              Pesquisa Pré-Curso | Diagnóstico Inicial do Aluno
            </h1>
            <p className="mt-2 text-sm text-primary-foreground/85">
              Esta pesquisa tem como objetivo conhecer melhor o perfil da turma, suas
              expectativas e seu nível inicial de segurança para participar do treinamento.
              Suas respostas ajudarão a Heberton Pinheiro Treinamentos a preparar uma
              experiência mais prática, inclusiva e alinhada à realidade dos alunos.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6 p-6 sm:p-8">
            <Field label="Nome completo" required>
              <Input
                value={form.full_name}
                onChange={(v) => update("full_name", v)}
                required
              />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Empresa ou instituição" required>
                <Input
                  value={form.company}
                  onChange={(v) => update("company", v)}
                  required
                />
              </Field>
              <Field label="Cargo ou função" required>
                <Input
                  value={form.role}
                  onChange={(v) => update("role", v)}
                  required
                />
              </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="WhatsApp" required>
                <Input
                  value={form.whatsapp}
                  onChange={(v) => update("whatsapp", v)}
                  placeholder="(00) 00000-0000"
                  required
                />
              </Field>
              <Field label="E-mail (opcional)">
                <Input
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  placeholder="seuemail@exemplo.com"
                />
              </Field>
            </div>

            <Field label="Você já teve contato com Libras antes?" required>
              <Select
                value={form.previous_libras_contact}
                onChange={(v) => update("previous_libras_contact", v)}
                options={LIBRAS_CONTACT}
              />
            </Field>

            <Field
              label="Você já atendeu ou conviveu com uma pessoa surda no ambiente de trabalho?"
              required
            >
              <Select
                value={form.has_attended_deaf_person}
                onChange={(v) => update("has_attended_deaf_person", v)}
                options={DEAF_CONTACT}
              />
            </Field>

            <Field
              label="Em uma escala de 0 a 10, quanto você se sente preparado hoje para se comunicar com uma pessoa surda?"
              required
            >
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={form.initial_confidence_score}
                  onChange={(e) =>
                    update("initial_confidence_score", Number(e.target.value))
                  }
                  className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-accent accent-primary"
                />
                <span className="inline-flex h-10 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-base font-bold text-primary-foreground">
                  {form.initial_confidence_score}
                </span>
              </div>
              <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                <span>0 · Nada preparado</span>
                <span>10 · Totalmente preparado</span>
              </div>
            </Field>

            <Field
              label="Qual sua maior dificuldade ou insegurança em relação à comunicação com pessoas surdas?"
              required
            >
              <Textarea
                value={form.biggest_difficulty}
                onChange={(v) => update("biggest_difficulty", v)}
                required
              />
            </Field>

            <Field label="Em qual situação você mais imagina usar Libras?" required>
              <Select
                value={form.usage_context}
                onChange={(v) => update("usage_context", v)}
                options={USAGE_CONTEXTS}
              />
            </Field>

            <Field label="O que você espera aprender neste curso?" required>
              <Textarea
                value={form.learning_expectation}
                onChange={(v) => update("learning_expectation", v)}
                required
              />
            </Field>

            <Field
              label="O que faria este curso ser realmente útil para sua rotina profissional?"
              required
            >
              <Textarea
                value={form.usefulness_expectation}
                onChange={(v) => update("usefulness_expectation", v)}
                required
              />
            </Field>

            <Field
              label="Você tem interesse em participar de cursos futuros ou módulos avançados?"
              required
            >
              <Select
                value={form.future_courses_interest}
                onChange={(v) => update("future_courses_interest", v)}
                options={FUTURE_INTEREST}
              />
            </Field>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface-muted p-4 text-sm">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
                required
              />
              <span className="text-foreground">
                Autorizo o uso das minhas respostas de forma agrupada e sem identificação
                individual para fins de melhoria pedagógica, relatórios e planejamento de
                novas turmas.
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-deep disabled:opacity-60"
            >
              {submitting ? "Enviando..." : "Enviar Diagnóstico Inicial"}
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-lg border border-input bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
    />
  );
}

function Textarea({
  value,
  onChange,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
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

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="w-full rounded-lg border border-input bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
    >
      <option value="" disabled>
        Selecione uma opção
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
