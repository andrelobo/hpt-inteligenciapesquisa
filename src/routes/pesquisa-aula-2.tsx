import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/hpt/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/pesquisa-aula-2")({
  head: () => ({
    meta: [
      { title: "Questionário Pós-Aula 2 | Sistema HPT" },
      {
        name: "description",
        content:
          "Avaliação da Aula 2 da oficina Libras no Comércio – Comunicação sem Barreiras.",
      },
    ],
  }),
  component: PosAula2Page,
});

const LEARNING_RATING = [
  "Excelente",
  "Muito bom",
  "Bom",
  "Regular",
  "Preciso revisar o conteúdo",
];

const PARAMETERS_IMPORTANCE = [
  "Sim, completamente",
  "Sim, parcialmente",
  "Ainda tenho dúvidas",
  "Não consegui compreender",
];

const MOST_IMPORTANT_PARAMETER = [
  "Configuração de Mão",
  "Ponto de Articulação",
  "Movimento",
  "Orientação da Palma",
  "Expressões Não Manuais",
];

const YES_PARTIAL_DOUBT_NO = [
  "Sim",
  "Parcialmente",
  "Ainda tenho dúvidas",
  "Não compreendi",
];

const GUEST_CONTRIBUTION = ["Muito", "Bastante", "Pouco", "Não contribuiu"];

const PERCEPTION_CHANGE = [
  "Sim, mudou bastante",
  "Mudou um pouco",
  "Permaneceu a mesma",
];

const READINESS = ["Sim", "Parcialmente", "Ainda não"];

const METHODOLOGY_RATING = [
  "Excelente",
  "Muito boa",
  "Boa",
  "Regular",
  "Precisa melhorar",
];

type FormState = {
  full_name: string;
  whatsapp: string;
  class_code: string;
  learning_rating: string;
  parameters_importance: string;
  most_important_parameter: string;
  grammar_understanding: string;
  guest_contribution: string;
  guest_attention: string;
  perception_change: string;
  communication_readiness: string;
  methodology_rating: string;
  most_significant_content: string;
  topic_to_deepen: string;
  suggestion: string;
  consent: boolean;
};

const initial: FormState = {
  full_name: "",
  whatsapp: "",
  class_code: "HPCT01",
  learning_rating: "",
  parameters_importance: "",
  most_important_parameter: "",
  grammar_understanding: "",
  guest_contribution: "",
  guest_attention: "",
  perception_change: "",
  communication_readiness: "",
  methodology_rating: "",
  most_significant_content: "",
  topic_to_deepen: "",
  suggestion: "",
  consent: false,
};

function PosAula2Page() {
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
      form.learning_rating,
      form.parameters_importance,
      form.most_important_parameter,
      form.grammar_understanding,
      form.guest_contribution,
      form.perception_change,
      form.communication_readiness,
      form.methodology_rating,
    ];
    if (required.some((v) => !v)) {
      toast.error("Por favor, responda todas as perguntas de seleção.");
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
    const { error } = await supabase
      .from("student_post_class_responses")
      .insert({
        full_name: form.full_name,
        whatsapp: form.whatsapp,
        class_code: form.class_code.trim().toUpperCase(),
        class_number: 2,
        learning_rating: form.learning_rating,
        parameters_importance: form.parameters_importance,
        most_important_parameter: form.most_important_parameter,
        grammar_understanding: form.grammar_understanding,
        guest_contribution: form.guest_contribution,
        guest_attention: form.guest_attention,
        perception_change: form.perception_change,
        communication_readiness: form.communication_readiness,
        methodology_rating: form.methodology_rating,
        most_significant_content: form.most_significant_content,
        topic_to_deepen: form.topic_to_deepen,
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
              Questionário Pós-Aula 2
            </h1>
            <p className="mt-2 text-sm text-primary-foreground/85">
              Oficina: Libras no Comércio – Comunicação sem Barreiras
            </p>
            <p className="mt-1 text-sm text-primary-foreground/85">
              Tema da aula: Os 5 parâmetros da Libras e participação da pessoa surda.
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

            <Field label="1. Como você avalia seu aprendizado na aula de ontem?" required>
              <Radio
                name="learning_rating"
                value={form.learning_rating}
                onChange={(v) => update("learning_rating", v)}
                options={LEARNING_RATING}
              />
            </Field>

            <Field
              label="2. Após a aula, você consegue identificar a importância dos 5 parâmetros da Libras?"
              required
            >
              <Radio
                name="parameters_importance"
                value={form.parameters_importance}
                onChange={(v) => update("parameters_importance", v)}
                options={PARAMETERS_IMPORTANCE}
              />
            </Field>

            <Field
              label="3. Qual dos 5 parâmetros você considera mais importante para uma comunicação correta em Libras?"
              required
            >
              <Radio
                name="most_important_parameter"
                value={form.most_important_parameter}
                onChange={(v) => update("most_important_parameter", v)}
                options={MOST_IMPORTANT_PARAMETER}
              />
            </Field>

            <Field
              label="4. Você compreendeu por que conhecer a base gramatical da Libras é fundamental antes de aprender sinais isolados?"
              required
            >
              <Radio
                name="grammar_understanding"
                value={form.grammar_understanding}
                onChange={(v) => update("grammar_understanding", v)}
                options={YES_PARTIAL_DOUBT_NO}
              />
            </Field>

            <Field
              label="5. A participação do convidado Kleberson, pessoa surda, contribuiu para sua aprendizagem?"
              required
            >
              <Radio
                name="guest_contribution"
                value={form.guest_contribution}
                onChange={(v) => update("guest_contribution", v)}
                options={GUEST_CONTRIBUTION}
              />
            </Field>

            <Field label="6. O que mais chamou sua atenção durante a participação do Kleberson?" required>
              <Textarea
                value={form.guest_attention}
                onChange={(v) => update("guest_attention", v)}
                required
              />
            </Field>

            <Field
              label="7. Após essa experiência, sua percepção sobre a comunidade surda mudou?"
              required
            >
              <Radio
                name="perception_change"
                value={form.perception_change}
                onChange={(v) => update("perception_change", v)}
                options={PERCEPTION_CHANGE}
              />
            </Field>

            <Field
              label="8. Você se sente mais preparado(a) para iniciar uma comunicação respeitosa com uma pessoa surda?"
              required
            >
              <Radio
                name="communication_readiness"
                value={form.communication_readiness}
                onChange={(v) => update("communication_readiness", v)}
                options={READINESS}
              />
            </Field>

            <Field
              label="9. Como você avalia a metodologia utilizada pelo instrutor Heberton Pinheiro?"
              required
            >
              <Radio
                name="methodology_rating"
                value={form.methodology_rating}
                onChange={(v) => update("methodology_rating", v)}
                options={METHODOLOGY_RATING}
              />
            </Field>

            <Field label="10. Qual conteúdo da aula foi mais significativo para você?" required>
              <Textarea
                value={form.most_significant_content}
                onChange={(v) => update("most_significant_content", v)}
                required
              />
            </Field>

            <Field label="11. Que tema ou atividade você gostaria de aprofundar nas próximas aulas?" required>
              <Textarea
                value={form.topic_to_deepen}
                onChange={(v) => update("topic_to_deepen", v)}
                required
              />
            </Field>

            <Field label="12. Deixe uma mensagem ou sugestão para contribuir com a melhoria da oficina.">
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
              {submitting ? "Enviando..." : "Enviar Questionário Pós-Aula 2"}
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
