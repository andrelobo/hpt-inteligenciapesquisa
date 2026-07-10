import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/hpt/Layout";
import { supabaseNew } from "@/lib/supabase-new";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/pesquisa-aula-4")({
  head: () => ({
    meta: [
      { title: "Questionário Pós-Aula 4 | Sistema HPT" },
      {
        name: "description",
        content:
          "Avaliação da Aula 4 da oficina Libras no Comércio – datilologia e prática de diálogos.",
      },
    ],
  }),
  component: PosAula4Page,
});

const Q1_OPTIONS = [
  "Decorar o alfabeto",
  "Avaliar o aprendizado acumulado",
  "Ensinar novos sinais",
  "Fazer uma competição entre os alunos",
];

const Q2_OPTIONS = [
  "Memorização",
  "Leitura",
  "Prática constante",
  "Assistir vídeos",
];

const Q3_OPTIONS = [
  "Distribuiu apostilas",
  "Mostrou e sinalizou o diálogo duas vezes",
  "Aplicou uma prova escrita",
  "Pediu que pesquisassem na internet",
];

const Q4_OPTIONS = [
  "Avaliar velocidade",
  "Simular situações reais de comunicação",
  "Decorar frases",
  "Fazer competição",
];

const Q5_OPTIONS = [
  "Professor e aluno",
  "Papéis A e B",
  "Turmas",
  "Salas",
];

const Q6_OPTIONS = [
  "Falta grave",
  "Algo natural do processo de aprendizagem",
  "Motivo para reprovação",
  "Falta de dedicação",
];

const Q7_OPTIONS = [
  "Apenas as mãos",
  "Apenas os braços",
  "Expressões faciais e contexto",
  "Apenas velocidade",
];

const Q8_OPTIONS = [
  "Libras é aprendida apenas em sala",
  "A repetição fortalece a aprendizagem",
  "Apenas pessoas surdas podem aprender",
  "A teoria é suficiente",
];

const Q9_OPTIONS = [
  "A maioria teve baixo rendimento",
  "A turma apresentou bom aproveitamento",
  "Ninguém conseguiu realizar os exercícios",
  "O conteúdo precisou ser reiniciado",
];

const Q10_OPTIONS = [
  "Ensinar apenas sinais isolados",
  "Promover comunicação inclusiva",
  "Ensinar português",
  "Ensinar informática",
];

type FormState = {
  full_name: string;
  whatsapp: string;
  class_code: string;
  q1_activity_objective: string;
  q2_learning_depends_on: string;
  q3_instructor_action: string;
  q4_pairs_objective: string;
  q5_students_alternated: string;
  q6_error_treated_as: string;
  q7_indispensable_element: string;
  q8_collective_reflection: string;
  q9_evaluation_result: string;
  q10_workshop_objective: string;
  suggestion: string;
  consent: boolean;
};

const initial: FormState = {
  full_name: "",
  whatsapp: "",
  class_code: "HPCT01",
  q1_activity_objective: "",
  q2_learning_depends_on: "",
  q3_instructor_action: "",
  q4_pairs_objective: "",
  q5_students_alternated: "",
  q6_error_treated_as: "",
  q7_indispensable_element: "",
  q8_collective_reflection: "",
  q9_evaluation_result: "",
  q10_workshop_objective: "",
  suggestion: "",
  consent: false,
};

function PosAula4Page() {
  const [form, setForm] = useState<FormState>(initial);
  const [honeypot, setHoneypot] = useState("");
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
    const required = [
      form.q1_activity_objective,
      form.q2_learning_depends_on,
      form.q3_instructor_action,
      form.q4_pairs_objective,
      form.q5_students_alternated,
      form.q6_error_treated_as,
      form.q7_indispensable_element,
      form.q8_collective_reflection,
      form.q9_evaluation_result,
      form.q10_workshop_objective,
    ];
    if (required.some((v) => !v)) {
      toast.error("Por favor, responda todas as perguntas.");
      return;
    }
    setSubmitting(true);
    if (honeypot.trim() !== "") {
      setTimeout(() => {
        setSubmitting(false);
        navigate({ to: "/obrigado" });
      }, 400);
      return;
    }
    const { error } = await supabaseNew
      .from("student_post_class_4_responses")
      .insert({
        full_name: form.full_name,
        whatsapp: form.whatsapp,
        class_code: form.class_code.trim().toUpperCase(),
        class_number: 4,
        q1_activity_objective: form.q1_activity_objective,
        q2_learning_depends_on: form.q2_learning_depends_on,
        q3_instructor_action: form.q3_instructor_action,
        q4_pairs_objective: form.q4_pairs_objective,
        q5_students_alternated: form.q5_students_alternated,
        q6_error_treated_as: form.q6_error_treated_as,
        q7_indispensable_element: form.q7_indispensable_element,
        q8_collective_reflection: form.q8_collective_reflection,
        q9_evaluation_result: form.q9_evaluation_result,
        q10_workshop_objective: form.q10_workshop_objective,
        suggestion: form.suggestion.trim() || null,
        consent: form.consent,
      });
    setSubmitting(false);
    if (error) {
      console.error(error);
      if (error.code === "23505") {
        toast.error("Este WhatsApp já respondeu o questionário desta aula.");
      } else {
        toast.error("Não foi possível enviar. Tente novamente.");
      }
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
              Questionário Pós-Aula 4
            </h1>
            <p className="mt-2 text-sm text-primary-foreground/85">
              Oficina: Libras no Comércio – Comunicação sem Barreiras
            </p>
            <p className="mt-1 text-sm text-primary-foreground/85">
              Tema da aula: Datilologia e prática de diálogos.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6 p-6 sm:p-8">
            <Field label="Nome do participante" required>
              <Input value={form.full_name} onChange={(v) => update("full_name", v)} required />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="WhatsApp" required>
                <Input
                  value={form.whatsapp}
                  onChange={(v) => update("whatsapp", v)}
                  placeholder="(00) 00000-0000"
                  required
                />
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

            <input
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />

            <Field
              label="1. Qual foi o principal objetivo da atividade de datilologia realizada no início da aula?"
              required
            >
              <Radio
                name="q1_activity_objective"
                value={form.q1_activity_objective}
                onChange={(v) => update("q1_activity_objective", v)}
                options={Q1_OPTIONS}
              />
            </Field>

            <Field
              label="2. Segundo a aula, aprender Libras depende principalmente de:"
              required
            >
              <Radio
                name="q2_learning_depends_on"
                value={form.q2_learning_depends_on}
                onChange={(v) => update("q2_learning_depends_on", v)}
                options={Q2_OPTIONS}
              />
            </Field>

            <Field
              label="3. Antes dos alunos realizarem os diálogos, o instrutor:"
              required
            >
              <Radio
                name="q3_instructor_action"
                value={form.q3_instructor_action}
                onChange={(v) => update("q3_instructor_action", v)}
                options={Q3_OPTIONS}
              />
            </Field>

            <Field
              label="4. A prática em duplas teve como objetivo principal:"
              required
            >
              <Radio
                name="q4_pairs_objective"
                value={form.q4_pairs_objective}
                onChange={(v) => update("q4_pairs_objective", v)}
                options={Q4_OPTIONS}
              />
            </Field>

            <Field
              label="5. Durante a atividade, os alunos alternaram:"
              required
            >
              <Radio
                name="q5_students_alternated"
                value={form.q5_students_alternated}
                onChange={(v) => update("q5_students_alternated", v)}
                options={Q5_OPTIONS}
              />
            </Field>

            <Field
              label="6. O erro durante o aprendizado da Libras foi tratado como:"
              required
            >
              <Radio
                name="q6_error_treated_as"
                value={form.q6_error_treated_as}
                onChange={(v) => update("q6_error_treated_as", v)}
                options={Q6_OPTIONS}
              />
            </Field>

            <Field
              label="7. Qual elemento é indispensável durante a sinalização?"
              required
            >
              <Radio
                name="q7_indispensable_element"
                value={form.q7_indispensable_element}
                onChange={(v) => update("q7_indispensable_element", v)}
                options={Q7_OPTIONS}
              />
            </Field>

            <Field
              label="8. A reflexão coletiva destacou que:"
              required
            >
              <Radio
                name="q8_collective_reflection"
                value={form.q8_collective_reflection}
                onChange={(v) => update("q8_collective_reflection", v)}
                options={Q8_OPTIONS}
              />
            </Field>

            <Field
              label="9. O resultado da avaliação mostrou que:"
              required
            >
              <Radio
                name="q9_evaluation_result"
                value={form.q9_evaluation_result}
                onChange={(v) => update("q9_evaluation_result", v)}
                options={Q9_OPTIONS}
              />
            </Field>

            <Field
              label="10. O objetivo da oficina é:"
              required
            >
              <Radio
                name="q10_workshop_objective"
                value={form.q10_workshop_objective}
                onChange={(v) => update("q10_workshop_objective", v)}
                options={Q10_OPTIONS}
              />
            </Field>

            <Field label="11. Deixe uma sugestão ou comentário sobre a aula de hoje.">
              <Textarea
                value={form.suggestion}
                onChange={(v) => update("suggestion", v)}
              />
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
                Autorizo o uso das minhas respostas de forma agrupada e sem
                identificação individual para fins de melhoria pedagógica e
                relatórios da Heberton Pinheiro Consultoria e Treinamento.
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-deep disabled:opacity-60 min-h-[52px]"
            >
              {submitting ? "Enviando..." : "Enviar Questionário Pós-Aula 4"}
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

function Radio({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="space-y-2">
      {options.map((o) => (
        <label
          key={o}
          className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
            value === o
              ? "border-primary bg-primary/5 text-foreground"
              : "border-border bg-surface hover:border-primary/40"
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
