import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/hpt/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/pesquisa-aula-3")({
  head: () => ({
    meta: [
      { title: "Questionário Pós-Aula 3 | Sistema HPT" },
      {
        name: "description",
        content:
          "Avaliação da Aula 3 da oficina Libras no Comércio – revisão dos 5 parâmetros e uso do Hand Talk.",
      },
    ],
  }),
  component: PosAula3Page,
});

const LEARNING_RATING = [
  "Excelente",
  "Muito bom",
  "Bom",
  "Regular",
  "Preciso revisar o conteúdo",
];

const PARAMETERS_COMPREHENSION = [
  "Compreendi totalmente",
  "Compreendi a maior parte",
  "Ainda tenho algumas dúvidas",
  "Ainda tenho muitas dúvidas",
];

const OBJECTS_ACTIVITY = [
  "Contribuiu muito",
  "Contribuiu",
  "Contribuiu parcialmente",
  "Não contribuiu",
];

const YES_NO = ["Sim", "Não"];

const HANDTALK_PRESENTATION = [
  "Excelente",
  "Muito boa",
  "Boa",
  "Regular",
  "Ruim",
];

const HANDTALK_USEFULNESS = [
  "Sim, será muito útil",
  "Sim",
  "Talvez",
  "Não",
];

const HANDTALK_USAGE = [
  "Sim, sem dificuldades",
  "Sim, com algumas dificuldades",
  "Parcialmente",
  "Não consegui utilizar",
];

const READINESS = ["Sim", "Parcialmente", "Ainda não"];

const METHODOLOGY_RATING = [
  "Excelente",
  "Muito boa",
  "Boa",
  "Regular",
  "Precisa melhorar",
];

const CONTINUE_USING = [
  "Sim, diariamente",
  "Sim, algumas vezes por semana",
  "Ocasionalmente",
  "Ainda não sei",
];

const EVOLUTION = [
  "Evoluí muito",
  "Evoluí bem",
  "Evoluí um pouco",
  "Ainda percebo pouca evolução",
];

type FormState = {
  full_name: string;
  whatsapp: string;
  class_code: string;
  learning_rating: string;
  parameters_comprehension: string;
  objects_activity_contribution: string;
  knew_handtalk: string;
  handtalk_presentation_rating: string;
  handtalk_usefulness: string;
  handtalk_usage_success: string;
  autonomous_research_readiness: string;
  methodology_rating: string;
  main_learning: string;
  handtalk_attention: string;
  continue_using_handtalk: string;
  topic_to_learn: string;
  suggestion: string;
  evolution_perception: string;
  consent: boolean;
};

const initial: FormState = {
  full_name: "",
  whatsapp: "",
  class_code: "HPCT01",
  learning_rating: "",
  parameters_comprehension: "",
  objects_activity_contribution: "",
  knew_handtalk: "",
  handtalk_presentation_rating: "",
  handtalk_usefulness: "",
  handtalk_usage_success: "",
  autonomous_research_readiness: "",
  methodology_rating: "",
  main_learning: "",
  handtalk_attention: "",
  continue_using_handtalk: "",
  topic_to_learn: "",
  suggestion: "",
  evolution_perception: "",
  consent: false,
};

function PosAula3Page() {
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
      form.parameters_comprehension,
      form.objects_activity_contribution,
      form.knew_handtalk,
      form.handtalk_presentation_rating,
      form.handtalk_usefulness,
      form.handtalk_usage_success,
      form.autonomous_research_readiness,
      form.methodology_rating,
      form.continue_using_handtalk,
      form.evolution_perception,
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
      .from("student_post_class_3_responses")
      .insert({
        full_name: form.full_name,
        whatsapp: form.whatsapp,
        class_code: form.class_code.trim().toUpperCase(),
        class_number: 3,
        learning_rating: form.learning_rating,
        parameters_comprehension: form.parameters_comprehension,
        objects_activity_contribution: form.objects_activity_contribution,
        knew_handtalk: form.knew_handtalk,
        handtalk_presentation_rating: form.handtalk_presentation_rating,
        handtalk_usefulness: form.handtalk_usefulness,
        handtalk_usage_success: form.handtalk_usage_success,
        autonomous_research_readiness: form.autonomous_research_readiness,
        methodology_rating: form.methodology_rating,
        main_learning: form.main_learning,
        handtalk_attention: form.handtalk_attention,
        continue_using_handtalk: form.continue_using_handtalk,
        topic_to_learn: form.topic_to_learn,
        suggestion: form.suggestion.trim() || null,
        evolution_perception: form.evolution_perception,
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
              Questionário Pós-Aula 3
            </h1>
            <p className="mt-2 text-sm text-primary-foreground/85">
              Oficina: Libras no Comércio – Comunicação sem Barreiras
            </p>
            <p className="mt-1 text-sm text-primary-foreground/85">
              Tema da aula: Revisão dos 5 parâmetros da Libras e uso do aplicativo Hand Talk.
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

            <Field label="1. Como você avalia seu aprendizado nesta aula?" required>
              <Radio
                name="learning_rating"
                value={form.learning_rating}
                onChange={(v) => update("learning_rating", v)}
                options={LEARNING_RATING}
              />
            </Field>

            <Field
              label="2. Após a revisão realizada hoje, como você avalia sua compreensão sobre os cinco parâmetros da Libras?"
              required
            >
              <Radio
                name="parameters_comprehension"
                value={form.parameters_comprehension}
                onChange={(v) => update("parameters_comprehension", v)}
                options={PARAMETERS_COMPREHENSION}
              />
            </Field>

            <Field
              label="3. A atividade de relacionar objetos do cotidiano com seus respectivos sinais contribuiu para seu aprendizado?"
              required
            >
              <Radio
                name="objects_activity_contribution"
                value={form.objects_activity_contribution}
                onChange={(v) => update("objects_activity_contribution", v)}
                options={OBJECTS_ACTIVITY}
              />
            </Field>

            <Field label="4. Você já conhecia o aplicativo Hand Talk antes desta aula?" required>
              <Radio
                name="knew_handtalk"
                value={form.knew_handtalk}
                onChange={(v) => update("knew_handtalk", v)}
                options={YES_NO}
              />
            </Field>

            <Field
              label="5. Como você avalia a apresentação do aplicativo Hand Talk durante a aula?"
              required
            >
              <Radio
                name="handtalk_presentation_rating"
                value={form.handtalk_presentation_rating}
                onChange={(v) => update("handtalk_presentation_rating", v)}
                options={HANDTALK_PRESENTATION}
              />
            </Field>

            <Field
              label="6. Após utilizar o aplicativo, você acredita que ele poderá auxiliar seus estudos em Libras?"
              required
            >
              <Radio
                name="handtalk_usefulness"
                value={form.handtalk_usefulness}
                onChange={(v) => update("handtalk_usefulness", v)}
                options={HANDTALK_USEFULNESS}
              />
            </Field>

            <Field label="7. Você conseguiu utilizar o aplicativo durante a aula?" required>
              <Radio
                name="handtalk_usage_success"
                value={form.handtalk_usage_success}
                onChange={(v) => update("handtalk_usage_success", v)}
                options={HANDTALK_USAGE}
              />
            </Field>

            <Field
              label="8. Após esta aula, você se sente mais preparado(a) para pesquisar sinais de forma autônoma?"
              required
            >
              <Radio
                name="autonomous_research_readiness"
                value={form.autonomous_research_readiness}
                onChange={(v) => update("autonomous_research_readiness", v)}
                options={READINESS}
              />
            </Field>

            <Field
              label="9. Como você avalia a metodologia utilizada pelo instrutor Heberton Pinheiro nesta aula?"
              required
            >
              <Radio
                name="methodology_rating"
                value={form.methodology_rating}
                onChange={(v) => update("methodology_rating", v)}
                options={METHODOLOGY_RATING}
              />
            </Field>

            <Field label="10. Qual foi o principal aprendizado que você leva desta aula?" required>
              <Textarea
                value={form.main_learning}
                onChange={(v) => update("main_learning", v)}
                required
              />
            </Field>

            <Field
              label="11. O que mais chamou sua atenção durante a utilização do aplicativo Hand Talk?"
              required
            >
              <Textarea
                value={form.handtalk_attention}
                onChange={(v) => update("handtalk_attention", v)}
                required
              />
            </Field>

            <Field
              label="12. Você pretende continuar utilizando o Hand Talk para complementar seus estudos?"
              required
            >
              <Radio
                name="continue_using_handtalk"
                value={form.continue_using_handtalk}
                onChange={(v) => update("continue_using_handtalk", v)}
                options={CONTINUE_USING}
              />
            </Field>

            <Field
              label="13. Existe algum sinal ou tema que você gostaria de aprender nas próximas aulas?"
              required
            >
              <Textarea
                value={form.topic_to_learn}
                onChange={(v) => update("topic_to_learn", v)}
                required
              />
            </Field>

            <Field label="14. Deixe uma sugestão ou comentário sobre a aula de hoje.">
              <Textarea
                value={form.suggestion}
                onChange={(v) => update("suggestion", v)}
              />
            </Field>

            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <Field
                label="Comparando com a primeira aula, como você avalia sua evolução no aprendizado da Libras até este momento?"
                required
              >
                <Radio
                  name="evolution_perception"
                  value={form.evolution_perception}
                  onChange={(v) => update("evolution_perception", v)}
                  options={EVOLUTION}
                />
              </Field>
            </div>

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
              {submitting ? "Enviando..." : "Enviar Questionário Pós-Aula 3"}
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
