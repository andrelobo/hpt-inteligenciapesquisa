import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/hpt/Layout";
import { supabaseNew } from "@/lib/supabase-new";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/pesquisa-aula-5")({
  head: () => ({
    meta: [
      { title: "Questionário Pós-Aula 5 | Sistema HPT" },
      {
        name: "description",
        content:
          "Avaliação da Aula 5 da oficina Libras no Comércio – Cultura Surda e Inclusão.",
      },
    ],
  }),
  component: PosAula5Page,
});

const Q1_OPTIONS = [
  "Porque facilita a memorização dos sinais.",
  "Porque ajuda a compreender a identidade, a comunicação e as necessidades da pessoa surda.",
  "Porque substitui a prática da Libras.",
  "Porque é uma exigência legal.",
];

const Q2_OPTIONS = [
  "Uma linguagem de gestos.",
  "Uma língua reconhecida por lei, com gramática própria.",
  "Um conjunto de mímicas.",
  "Igual em todos os países.",
];

const Q6_OPTIONS = [
  "Falar mais alto.",
  "Demonstrar respeito, manter contato visual e buscar uma comunicação acessível.",
  "Pedir que outra pessoa atenda.",
  "Ignorar o cliente.",
];

const Q9_OPTIONS = [
  "Decoração dos sinais.",
  "Prática constante.",
  "Apenas leitura.",
  "Apenas assistir vídeos.",
];

const Q16_OPTIONS = [
  "Excelente",
  "Boa",
  "Regular",
  "Preciso praticar mais",
];

const Q19_OPTIONS = [
  "Sim",
  "Parcialmente",
  "Ainda não",
];

type FormState = {
  full_name: string;
  whatsapp: string;
  class_code: string;
  q1_why_learn_culture: string;
  q2_libras_is: string;
  q3_communicational_accessibility: string;
  q4_two_barriers: string;
  q5_inclusive_environment: string;
  q6_first_contact_attitude: string;
  q7_facial_expressions_importance: string;
  q8_eye_contact_importance: string;
  q9_learning_depends_on: string;
  q10_what_caught_attention: string;
  q11_how_to_start_service: string;
  q12_forgot_a_signal: string;
  q13_colleague_fearful: string;
  q14_libras_improves_service: string;
  q15_apply_in_workplace: string;
  q16_self_assessment: string;
  q17_most_important_content: string;
  q18_best_activity: string;
  q19_feel_prepared: string;
  q19_explanation: string;
  q20_suggestion: string;
};

const initial: FormState = {
  full_name: "",
  whatsapp: "",
  class_code: "HPCT01",
  q1_why_learn_culture: "",
  q2_libras_is: "",
  q3_communicational_accessibility: "",
  q4_two_barriers: "",
  q5_inclusive_environment: "",
  q6_first_contact_attitude: "",
  q7_facial_expressions_importance: "",
  q8_eye_contact_importance: "",
  q9_learning_depends_on: "",
  q10_what_caught_attention: "",
  q11_how_to_start_service: "",
  q12_forgot_a_signal: "",
  q13_colleague_fearful: "",
  q14_libras_improves_service: "",
  q15_apply_in_workplace: "",
  q16_self_assessment: "",
  q17_most_important_content: "",
  q18_best_activity: "",
  q19_feel_prepared: "",
  q19_explanation: "",
  q20_suggestion: "",
};

function PosAula5Page() {
  const [form, setForm] = useState<FormState>(initial);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const required = [
      form.q1_why_learn_culture,
      form.q2_libras_is,
      form.q3_communicational_accessibility,
      form.q4_two_barriers,
      form.q5_inclusive_environment,
      form.q6_first_contact_attitude,
      form.q7_facial_expressions_importance,
      form.q8_eye_contact_importance,
      form.q9_learning_depends_on,
      form.q10_what_caught_attention,
      form.q11_how_to_start_service,
      form.q12_forgot_a_signal,
      form.q13_colleague_fearful,
      form.q14_libras_improves_service,
      form.q15_apply_in_workplace,
      form.q16_self_assessment,
      form.q17_most_important_content,
      form.q18_best_activity,
      form.q19_feel_prepared,
      form.q19_explanation,
      form.q20_suggestion,
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
      .from("student_post_class_5_responses")
      .insert({
        full_name: form.full_name,
        whatsapp: form.whatsapp,
        class_code: form.class_code.trim().toUpperCase(),
        class_number: 5,
        q1_why_learn_culture: form.q1_why_learn_culture,
        q2_libras_is: form.q2_libras_is,
        q3_communicational_accessibility: form.q3_communicational_accessibility,
        q4_two_barriers: form.q4_two_barriers,
        q5_inclusive_environment: form.q5_inclusive_environment,
        q6_first_contact_attitude: form.q6_first_contact_attitude,
        q7_facial_expressions_importance: form.q7_facial_expressions_importance,
        q8_eye_contact_importance: form.q8_eye_contact_importance,
        q9_learning_depends_on: form.q9_learning_depends_on,
        q10_what_caught_attention: form.q10_what_caught_attention,
        q11_how_to_start_service: form.q11_how_to_start_service,
        q12_forgot_a_signal: form.q12_forgot_a_signal,
        q13_colleague_fearful: form.q13_colleague_fearful,
        q14_libras_improves_service: form.q14_libras_improves_service,
        q15_apply_in_workplace: form.q15_apply_in_workplace,
        q16_self_assessment: form.q16_self_assessment,
        q17_most_important_content: form.q17_most_important_content,
        q18_best_activity: form.q18_best_activity,
        q19_feel_prepared: form.q19_feel_prepared,
        q19_explanation: form.q19_explanation,
        q20_suggestion: form.q20_suggestion,
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
              Questionário Pós-Aula 5
            </h1>
            <p className="mt-2 text-sm text-primary-foreground/85">
              Oficina: Libras no Comércio – Comunicação sem Barreiras
            </p>
            <p className="mt-1 text-sm text-primary-foreground/85">
              Tema: Cultura Surda e Inclusão
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

            <SectionTitle>Parte I – Cultura Surda e Inclusão</SectionTitle>

            <Field
              label='1. Por que conhecer a cultura surda é importante antes de aprender Libras?'
              required
            >
              <Radio
                name="q1_why_learn_culture"
                value={form.q1_why_learn_culture}
                onChange={(v) => update("q1_why_learn_culture", v)}
                options={Q1_OPTIONS}
              />
            </Field>

            <Field label="2. A Libras é:" required>
              <Radio
                name="q2_libras_is"
                value={form.q2_libras_is}
                onChange={(v) => update("q2_libras_is", v)}
                options={Q2_OPTIONS}
              />
            </Field>

            <Field label="3. O que significa acessibilidade comunicacional?" required>
              <Textarea
                value={form.q3_communicational_accessibility}
                onChange={(v) => update("q3_communicational_accessibility", v)}
                required
              />
            </Field>

            <Field label="4. Cite duas barreiras enfrentadas por pessoas surdas no atendimento comercial." required>
              <Textarea
                value={form.q4_two_barriers}
                onChange={(v) => update("q4_two_barriers", v)}
                required
              />
            </Field>

            <Field label="5. Como um profissional pode contribuir para um ambiente mais inclusivo?" required>
              <Textarea
                value={form.q5_inclusive_environment}
                onChange={(v) => update("q5_inclusive_environment", v)}
                required
              />
            </Field>

            <SectionTitle>Parte II – Comunicação no Comércio</SectionTitle>

            <Field
              label='6. Ao atender uma pessoa surda pela primeira vez, qual deve ser sua postura?'
              required
            >
              <Radio
                name="q6_first_contact_attitude"
                value={form.q6_first_contact_attitude}
                onChange={(v) => update("q6_first_contact_attitude", v)}
                options={Q6_OPTIONS}
              />
            </Field>

            <Field label="7. Por que as expressões faciais são importantes na Libras?" required>
              <Textarea
                value={form.q7_facial_expressions_importance}
                onChange={(v) => update("q7_facial_expressions_importance", v)}
                required
              />
            </Field>

            <Field label="8. Qual é a importância do contato visual durante a comunicação?" required>
              <Textarea
                value={form.q8_eye_contact_importance}
                onChange={(v) => update("q8_eye_contact_importance", v)}
                required
              />
            </Field>

            <Field label="9. O aprendizado da Libras depende principalmente de:" required>
              <Radio
                name="q9_learning_depends_on"
                value={form.q9_learning_depends_on}
                onChange={(v) => update("q9_learning_depends_on", v)}
                options={Q9_OPTIONS}
              />
            </Field>

            <Field label="10. O que mais chamou sua atenção durante as aulas desta semana?" required>
              <Textarea
                value={form.q10_what_caught_attention}
                onChange={(v) => update("q10_what_caught_attention", v)}
                required
              />
            </Field>

            <SectionTitle>Parte III – Situações Práticas</SectionTitle>

            <Field
              label="11. Um cliente surdo entra na empresa para solicitar informações sobre um produto. Como você iniciaria esse atendimento?"
              required
            >
              <Textarea
                value={form.q11_how_to_start_service}
                onChange={(v) => update("q11_how_to_start_service", v)}
                required
              />
            </Field>

            <Field label="12. Durante a conversa você esquece um sinal. Como deve agir?" required>
              <Textarea
                value={form.q12_forgot_a_signal}
                onChange={(v) => update("q12_forgot_a_signal", v)}
                required
              />
            </Field>

            <Field
              label="13. Um colega demonstra receio de atender uma pessoa surda. Que orientação você daria?"
              required
            >
              <Textarea
                value={form.q13_colleague_fearful}
                onChange={(v) => update("q13_colleague_fearful", v)}
                required
              />
            </Field>

            <Field
              label="14. Como você acredita que a Libras pode melhorar o atendimento ao cliente?"
              required
            >
              <Textarea
                value={form.q14_libras_improves_service}
                onChange={(v) => update("q14_libras_improves_service", v)}
                required
              />
            </Field>

            <Field
              label="15. Cite uma situação do seu ambiente de trabalho em que poderá aplicar os conhecimentos adquiridos nesta oficina."
              required
            >
              <Textarea
                value={form.q15_apply_in_workplace}
                onChange={(v) => update("q15_apply_in_workplace", v)}
                required
              />
            </Field>

            <SectionTitle>Parte IV – Autoavaliação</SectionTitle>

            <Field label="16. Como você avalia sua evolução nesta primeira semana?" required>
              <Radio
                name="q16_self_assessment"
                value={form.q16_self_assessment}
                onChange={(v) => update("q16_self_assessment", v)}
                options={Q16_OPTIONS}
              />
            </Field>

            <Field label="17. Qual conteúdo foi mais importante para você?" required>
              <Textarea
                value={form.q17_most_important_content}
                onChange={(v) => update("q17_most_important_content", v)}
                required
              />
            </Field>

            <Field label="18. Qual atividade facilitou mais o seu aprendizado?" required>
              <Textarea
                value={form.q18_best_activity}
                onChange={(v) => update("q18_best_activity", v)}
                required
              />
            </Field>

            <Field
              label="19. Você se sente mais preparado para atender uma pessoa surda?"
              required
            >
              <Radio
                name="q19_feel_prepared"
                value={form.q19_feel_prepared}
                onChange={(v) => {
                  update("q19_feel_prepared", v);
                }}
                options={Q19_OPTIONS}
              />
              <div className="mt-3">
                <Textarea
                  value={form.q19_explanation}
                  onChange={(v) => update("q19_explanation", v)}
                  placeholder="Explique sua resposta."
                  required
                />
              </div>
            </Field>

            <Field
              label="20. Deixe uma sugestão para melhorar as próximas aulas."
              required
            >
              <Textarea
                value={form.q20_suggestion}
                onChange={(v) => update("q20_suggestion", v)}
                required
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-deep disabled:opacity-60 min-h-[52px]"
            >
              {submitting ? "Enviando..." : "Enviar Questionário Pós-Aula 5"}
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-border pb-2 text-lg font-bold text-foreground">
      {children}
    </h2>
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
  placeholder,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      rows={4}
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
