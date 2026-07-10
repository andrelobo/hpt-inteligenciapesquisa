import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PageShell } from "@/components/hpt/Layout";
import { getSurveyResponses } from "@/lib/admin.functions";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Painel HPT | Diagnóstico Inicial da Turma" }],
  }),
  component: AdminPage,
});

type Row = {
  id: string;
  full_name: string;
  company: string;
  class_code: string;
  role: string;
  whatsapp: string;
  email: string | null;
  instagram: string | null;
  facebook: string | null;
  previous_libras_contact: string;
  has_attended_deaf_person: string;
  initial_confidence_score: number;
  biggest_difficulty: string;
  usage_context: string;
  learning_expectation: string;
  usefulness_expectation: string;
  future_courses_interest: string;
  consent: boolean;
  created_at: string;
};

type PostClassRow = {
  id: string;
  created_at: string;
  class_code: string;
  class_number: number;
  full_name: string;
  whatsapp: string;
  instructor: string;
  workshop: string;
  application_date: string;
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
  suggestion: string | null;
  consent: boolean;
};

type GuestRow = {
  id: string;
  created_at: string;
  guest_name: string;
  class_code: string;
  workshop: string;
  instructor: string;
  application_date: string;
  experience_rating: string;
  welcoming: string;
  students_interest: string;
  respect_shown: string;
  positive_point: string;
  could_be_different: string | null;
  brought_communities_closer: string;
  methodology_rating: string;
  would_participate_again: string;
  message_to_students: string;
  testimonial_consent: string;
  consent: boolean;
};

type PostClass4Row = {
  id: string;
  created_at: string;
  class_code: string;
  class_number: number;
  full_name: string;
  whatsapp: string;
  instructor: string;
  workshop: string;
  application_date: string;
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
  suggestion: string | null;
  consent: boolean;
};

type PostClass3Row = {
  id: string;
  created_at: string;
  class_code: string;
  class_number: number;
  full_name: string;
  whatsapp: string;
  instructor: string;
  workshop: string;
  application_date: string;
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
  suggestion: string | null;
  evolution_perception: string;
  consent: boolean;
};

const PIE_COLORS = ["#1e3a8a", "#3b82f6", "#93c5fd", "#60a5fa", "#1d4ed8"];

type TabKey = "pre" | "post1" | "post2" | "post3" | "post4" | "guest";

function AdminPage() {
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [postRows, setPostRows] = useState<PostClassRow[]>([]);
  const [post3Rows, setPost3Rows] = useState<PostClass3Row[]>([]);
  const [post4Rows, setPost4Rows] = useState<PostClass4Row[]>([]);
  const [guestRows, setGuestRows] = useState<GuestRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [companyFilter, setCompanyFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [tab, setTab] = useState<TabKey>("pre");
  const fetchRows = useServerFn(getSurveyResponses);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetchRows({ data: { password } });
      setRows((res.rows ?? []) as Row[]);
      setPostRows((res.postClassRows ?? []) as PostClassRow[]);
      setPost3Rows((res.postClass3Rows ?? []) as PostClass3Row[]);
      setPost4Rows((res.postClass4Rows ?? []) as PostClass4Row[]);
      setGuestRows((res.guestRows ?? []) as GuestRow[]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao entrar.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  if (!rows) {
    return (
      <PageShell>
        <Toaster richColors position="top-center" />
        <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-20">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h1 className="text-xl font-bold text-foreground">Painel HPT</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Informe a senha administrativa para visualizar as respostas.
            </p>
            <form onSubmit={login} className="mt-6 space-y-3">
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full rounded-lg border border-input bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                disabled={loading || !password}
                className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-deep disabled:opacity-60"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Toaster richColors position="top-center" />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        <header>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Painel HPT
          </h1>
          <p className="text-sm text-muted-foreground">
            Resultados dos questionários da oficina
          </p>
        </header>

        <nav className="flex flex-wrap gap-2 border-b border-border">
          <TabBtn active={tab === "pre"} onClick={() => setTab("pre")}>
            Pré-Curso ({rows.length})
          </TabBtn>
          <TabBtn active={tab === "post1"} onClick={() => setTab("post1")}>
            Pós-Aula 1 ({postRows.filter((r) => r.class_number === 1).length})
          </TabBtn>
          <TabBtn active={tab === "post2"} onClick={() => setTab("post2")}>
            Pós-Aula 2 ({postRows.filter((r) => r.class_number === 2).length})
          </TabBtn>
          <TabBtn active={tab === "post3"} onClick={() => setTab("post3")}>
            Pós-Aula 3 ({post3Rows.length})
          </TabBtn>
          <TabBtn active={tab === "post4"} onClick={() => setTab("post4")}>
            Pós-Aula 4 ({post4Rows.length})
          </TabBtn>
          <TabBtn active={tab === "guest"} onClick={() => setTab("guest")}>
            Avaliação do Convidado ({guestRows.length})
          </TabBtn>
        </nav>

        {tab === "pre" && (
          <PreCourseDashboard
            rows={rows}
            companyFilter={companyFilter}
            setCompanyFilter={setCompanyFilter}
            classFilter={classFilter}
            setClassFilter={setClassFilter}
          />
        )}

        {tab === "post1" && (
          <PostClassPanel
            rows={postRows.filter((r) => r.class_number === 1)}
            title="Pós-Aula 1"
          />
        )}

        {tab === "post2" && (
          <PostClassPanel
            rows={postRows.filter((r) => r.class_number === 2)}
            title="Pós-Aula 2"
          />
        )}

        {tab === "post3" && <PostClass3Panel rows={post3Rows} />}

        {tab === "post4" && <PostClass4Panel rows={post4Rows} />}

        {tab === "guest" && <GuestPanel rows={guestRows} />}
      </div>
    </PageShell>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`-mb-px rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
        active
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function downloadCSV(filename: string, headers: string[], data: Record<string, unknown>[]) {
  const escape = (v: unknown) => {
    const s = v === null || v === undefined ? "" : String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const lines = [headers.join(",")];
  for (const r of data) lines.push(headers.map((h) => escape(r[h])).join(","));
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function PreCourseDashboard({
  rows,
  companyFilter,
  setCompanyFilter,
  classFilter,
  setClassFilter,
}: {
  rows: Row[];
  companyFilter: string;
  setCompanyFilter: (v: string) => void;
  classFilter: string;
  setClassFilter: (v: string) => void;
}) {
  const classOptions = useMemo(() => {
    const set = new Set<string>();
    for (const r of rows) if (r.class_code) set.add(r.class_code);
    return Array.from(set).sort();
  }, [rows]);

  const filtered = useMemo(() => {
    const q = companyFilter.trim().toLowerCase();
    const c = classFilter.trim();
    return rows.filter((r) => {
      if (c && r.class_code !== c) return false;
      if (q && !r.company.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, companyFilter, classFilter]);

  const total = filtered.length;
  const avgScore =
    total > 0
      ? (
          filtered.reduce((s, r) => s + r.initial_confidence_score, 0) / total
        ).toFixed(1)
      : "—";
  const pctNoContact =
    total > 0
      ? Math.round(
          (filtered.filter((r) => r.previous_libras_contact === "Nunca tive contato").length /
            total) *
            100,
        )
      : 0;
  const pctAttendedDeaf =
    total > 0
      ? Math.round(
          (filtered.filter((r) => r.has_attended_deaf_person === "Sim").length / total) * 100,
        )
      : 0;
  const pctFutureInterest =
    total > 0
      ? Math.round(
          (filtered.filter((r) => r.future_courses_interest === "Sim").length / total) * 100,
        )
      : 0;

  const scoreDist = useMemo(() => {
    const buckets = Array.from({ length: 11 }, (_, i) => ({ score: String(i), count: 0 }));
    for (const r of filtered) buckets[r.initial_confidence_score].count++;
    return buckets;
  }, [filtered]);

  const librasDist = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of filtered) {
      map.set(r.previous_libras_contact, (map.get(r.previous_libras_contact) ?? 0) + 1);
    }
    return Array.from(map, ([name, value]) => ({ name, value }));
  }, [filtered]);

  function exportCSV() {
    const headers = [
      "id",
      "created_at",
      "class_code",
      "full_name",
      "company",
      "role",
      "whatsapp",
      "email",
      "instagram",
      "facebook",
      "previous_libras_contact",
      "has_attended_deaf_person",
      "initial_confidence_score",
      "biggest_difficulty",
      "usage_context",
      "learning_expectation",
      "usefulness_expectation",
      "future_courses_interest",
      "consent",
    ];
    downloadCSV(
      `pre-curso-${new Date().toISOString().slice(0, 10)}.csv`,
      headers,
      filtered as unknown as Record<string, unknown>[],
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid w-full gap-2 sm:grid-cols-[auto_auto_auto] sm:justify-end">
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="w-full rounded-lg border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-44"
        >
          <option value="">Todas as turmas</option>
          {classOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          placeholder="Filtrar por empresa"
          className="w-full rounded-lg border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-60"
        />
        <button
          onClick={exportCSV}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-deep"
        >
          Exportar CSV
        </button>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Kpi label="Total de respostas" value={String(total)} />
        <Kpi label="Média de segurança inicial" value={String(avgScore)} suffix="/10" />
        <Kpi label="Sem contato prévio com Libras" value={`${pctNoContact}%`} />
        <Kpi label="Já atendeu pessoa surda" value={`${pctAttendedDeaf}%`} />
        <Kpi label="Interesse em cursos futuros" value={`${pctFutureInterest}%`} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Distribuição da nota de segurança inicial (0–10)">
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <BarChart data={scoreDist}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 90%)" />
                <XAxis dataKey="score" stroke="hsl(220 15% 40%)" fontSize={12} />
                <YAxis stroke="hsl(220 15% 40%)" fontSize={12} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Contato prévio com Libras">
          <div className="h-64 w-full">
            {librasDist.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={librasDist}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => `${entry.value}`}
                  >
                    {librasDist.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    wrapperStyle={{ fontSize: 11 }}
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Principais dificuldades relatadas">
          <TextList items={filtered.map((r) => r.biggest_difficulty).filter(Boolean)} />
        </Card>
        <Card title="Expectativas dos alunos">
          <TextList items={filtered.map((r) => r.learning_expectation).filter(Boolean)} />
        </Card>
      </section>

      <Card title={`Respostas (${filtered.length})`}>
        <div className="-mx-4 overflow-x-auto sm:mx-0">
          <table className="w-full min-w-[1800px] border-collapse text-left text-sm">
            <thead className="bg-surface-muted text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <Th>Data</Th>
                <Th>Turma</Th>
                <Th>Nome</Th>
                <Th>Empresa</Th>
                <Th>Cargo</Th>
                <Th>WhatsApp</Th>
                <Th>E-mail</Th>
                <Th>Contato Libras</Th>
                <Th>Atendeu surdo</Th>
                <Th>Segurança</Th>
                <Th>Uso previsto</Th>
                <Th>Maior dificuldade</Th>
                <Th>Expectativa</Th>
                <Th>Cursos futuros</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <Td>{new Date(r.created_at).toLocaleString("pt-BR")}</Td>
                  <Td className="font-semibold text-primary">{r.class_code}</Td>
                  <Td>{r.full_name}</Td>
                  <Td>{r.company}</Td>
                  <Td>{r.role}</Td>
                  <Td>{r.whatsapp}</Td>
                  <Td>{r.email ?? "—"}</Td>
                  <Td>{r.previous_libras_contact}</Td>
                  <Td>{r.has_attended_deaf_person}</Td>
                  <Td className="text-center font-semibold text-primary">
                    {r.initial_confidence_score}
                  </Td>
                  <Td>{r.usage_context}</Td>
                  <Td className="max-w-[240px] whitespace-pre-wrap">{r.biggest_difficulty}</Td>
                  <Td className="max-w-[240px] whitespace-pre-wrap">{r.learning_expectation}</Td>
                  <Td>{r.future_courses_interest}</Td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={14} className="py-6 text-center text-sm text-muted-foreground">
                    Nenhuma resposta encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ratingBreakdown<T>(rows: T[], key: keyof T) {
  const map = new Map<string, number>();
  for (const r of rows) {
    const v = String(r[key] ?? "").trim();
    if (!v) continue;
    map.set(v, (map.get(v) ?? 0) + 1);
  }
  return Array.from(map, ([name, value]) => ({ name, value })).sort(
    (a, b) => b.value - a.value,
  );
}

function PostClassPanel({ rows, title }: { rows: PostClassRow[]; title: string }) {
  const learning = useMemo(() => ratingBreakdown(rows, "learning_rating"), [rows]);
  const methodology = useMemo(() => ratingBreakdown(rows, "methodology_rating"), [rows]);
  const readiness = useMemo(() => ratingBreakdown(rows, "communication_readiness"), [rows]);
  const perception = useMemo(() => ratingBreakdown(rows, "perception_change"), [rows]);

  function exportCSV() {
    const headers = [
      "id",
      "created_at",
      "class_code",
      "class_number",
      "full_name",
      "whatsapp",
      "learning_rating",
      "parameters_importance",
      "most_important_parameter",
      "grammar_understanding",
      "guest_contribution",
      "guest_attention",
      "perception_change",
      "communication_readiness",
      "methodology_rating",
      "most_significant_content",
      "topic_to_deepen",
      "suggestion",
      "consent",
    ];
    downloadCSV(
      `${title.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}.csv`,
      headers,
      rows as unknown as Record<string, unknown>[],
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={exportCSV}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-deep"
        >
          Exportar CSV
        </button>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Total de respostas" value={String(rows.length)} />
        <Kpi
          label="% Preparados p/ comunicar"
          value={`${pct(rows, (r) => r.communication_readiness === "Sim")}%`}
        />
        <Kpi
          label="% Percepção mudou bastante"
          value={`${pct(rows, (r) => r.perception_change === "Sim, mudou bastante")}%`}
        />
        <Kpi
          label="% Aprendizado Excelente/Muito bom"
          value={`${pct(rows, (r) => r.learning_rating === "Excelente" || r.learning_rating === "Muito bom")}%`}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Avaliação do aprendizado">
          <RatingBars data={learning} />
        </Card>
        <Card title="Avaliação da metodologia">
          <RatingBars data={methodology} />
        </Card>
        <Card title="Preparação para comunicar-se">
          <RatingBars data={readiness} />
        </Card>
        <Card title="Mudança de percepção sobre a comunidade surda">
          <RatingBars data={perception} />
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Conteúdo mais significativo">
          <TextList items={rows.map((r) => r.most_significant_content).filter(Boolean)} />
        </Card>
        <Card title="Temas a aprofundar">
          <TextList items={rows.map((r) => r.topic_to_deepen).filter(Boolean)} />
        </Card>
        <Card title="O que chamou atenção no convidado">
          <TextList items={rows.map((r) => r.guest_attention).filter(Boolean)} />
        </Card>
        <Card title="Sugestões">
          <TextList items={rows.map((r) => r.suggestion ?? "").filter(Boolean)} />
        </Card>
      </section>

      <Card title={`Respostas (${rows.length})`}>
        <div className="-mx-4 overflow-x-auto sm:mx-0">
          <table className="w-full min-w-[1600px] border-collapse text-left text-sm">
            <thead className="bg-surface-muted text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <Th>Data</Th>
                <Th>Turma</Th>
                <Th>Nome</Th>
                <Th>WhatsApp</Th>
                <Th>Aprendizado</Th>
                <Th>Metodologia</Th>
                <Th>Preparação</Th>
                <Th>Percepção</Th>
                <Th>Parâmetro + importante</Th>
                <Th>Contrib. convidado</Th>
                <Th>Conteúdo significativo</Th>
                <Th>Tema a aprofundar</Th>
                <Th>Sugestão</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <Td>{new Date(r.created_at).toLocaleString("pt-BR")}</Td>
                  <Td className="font-semibold text-primary">{r.class_code}</Td>
                  <Td>{r.full_name}</Td>
                  <Td>{r.whatsapp}</Td>
                  <Td>{r.learning_rating}</Td>
                  <Td>{r.methodology_rating}</Td>
                  <Td>{r.communication_readiness}</Td>
                  <Td>{r.perception_change}</Td>
                  <Td>{r.most_important_parameter}</Td>
                  <Td>{r.guest_contribution}</Td>
                  <Td className="max-w-[240px] whitespace-pre-wrap">{r.most_significant_content}</Td>
                  <Td className="max-w-[240px] whitespace-pre-wrap">{r.topic_to_deepen}</Td>
                  <Td className="max-w-[240px] whitespace-pre-wrap">{r.suggestion ?? "—"}</Td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={13} className="py-6 text-center text-sm text-muted-foreground">
                    Nenhuma resposta ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function PostClass3Panel({ rows }: { rows: PostClass3Row[] }) {
  const learning = useMemo(() => ratingBreakdown(rows, "learning_rating"), [rows]);
  const methodology = useMemo(() => ratingBreakdown(rows, "methodology_rating"), [rows]);
  const parameters = useMemo(() => ratingBreakdown(rows, "parameters_comprehension"), [rows]);
  const handtalkPresentation = useMemo(
    () => ratingBreakdown(rows, "handtalk_presentation_rating"),
    [rows],
  );
  const handtalkUsage = useMemo(() => ratingBreakdown(rows, "handtalk_usage_success"), [rows]);
  const continueUsing = useMemo(() => ratingBreakdown(rows, "continue_using_handtalk"), [rows]);
  const evolution = useMemo(() => ratingBreakdown(rows, "evolution_perception"), [rows]);
  const readiness = useMemo(() => ratingBreakdown(rows, "autonomous_research_readiness"), [rows]);

  function exportCSV() {
    const headers = [
      "id",
      "created_at",
      "class_code",
      "class_number",
      "full_name",
      "whatsapp",
      "learning_rating",
      "parameters_comprehension",
      "objects_activity_contribution",
      "knew_handtalk",
      "handtalk_presentation_rating",
      "handtalk_usefulness",
      "handtalk_usage_success",
      "autonomous_research_readiness",
      "methodology_rating",
      "main_learning",
      "handtalk_attention",
      "continue_using_handtalk",
      "topic_to_learn",
      "suggestion",
      "evolution_perception",
      "consent",
    ];
    downloadCSV(
      `pos-aula-3-${new Date().toISOString().slice(0, 10)}.csv`,
      headers,
      rows as unknown as Record<string, unknown>[],
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={exportCSV}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-deep"
        >
          Exportar CSV
        </button>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Total de respostas" value={String(rows.length)} />
        <Kpi
          label="% Já conheciam Hand Talk"
          value={`${pct(rows, (r) => r.knew_handtalk === "Sim")}%`}
        />
        <Kpi
          label="% Preparados p/ pesquisa autônoma"
          value={`${pct(rows, (r) => r.autonomous_research_readiness === "Sim")}%`}
        />
        <Kpi
          label="% Evolução (Bem/Muito)"
          value={`${pct(rows, (r) => r.evolution_perception === "Evoluí muito" || r.evolution_perception === "Evoluí bem")}%`}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Avaliação do aprendizado">
          <RatingBars data={learning} />
        </Card>
        <Card title="Compreensão dos 5 parâmetros">
          <RatingBars data={parameters} />
        </Card>
        <Card title="Apresentação do Hand Talk">
          <RatingBars data={handtalkPresentation} />
        </Card>
        <Card title="Uso do Hand Talk na aula">
          <RatingBars data={handtalkUsage} />
        </Card>
        <Card title="Metodologia do instrutor">
          <RatingBars data={methodology} />
        </Card>
        <Card title="Preparo para pesquisa autônoma">
          <RatingBars data={readiness} />
        </Card>
        <Card title="Pretende continuar usando o Hand Talk">
          <RatingBars data={continueUsing} />
        </Card>
        <Card title="Percepção de evolução no curso (longitudinal)">
          <RatingBars data={evolution} />
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Principal aprendizado">
          <TextList items={rows.map((r) => r.main_learning).filter(Boolean)} />
        </Card>
        <Card title="O que chamou atenção no Hand Talk">
          <TextList items={rows.map((r) => r.handtalk_attention).filter(Boolean)} />
        </Card>
        <Card title="Sinais/temas desejados nas próximas aulas">
          <TextList items={rows.map((r) => r.topic_to_learn).filter(Boolean)} />
        </Card>
        <Card title="Sugestões e comentários">
          <TextList items={rows.map((r) => r.suggestion ?? "").filter(Boolean)} />
        </Card>
      </section>

      <Card title={`Respostas (${rows.length})`}>
        <div className="-mx-4 overflow-x-auto sm:mx-0">
          <table className="w-full min-w-[1700px] border-collapse text-left text-sm">
            <thead className="bg-surface-muted text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <Th>Data</Th>
                <Th>Turma</Th>
                <Th>Nome</Th>
                <Th>WhatsApp</Th>
                <Th>Aprendizado</Th>
                <Th>Parâmetros</Th>
                <Th>Atividade objetos</Th>
                <Th>Conhecia Hand Talk</Th>
                <Th>Apresentação app</Th>
                <Th>Uso do app</Th>
                <Th>Utilidade</Th>
                <Th>Metodologia</Th>
                <Th>Evolução</Th>
                <Th>Principal aprendizado</Th>
                <Th>Tema desejado</Th>
                <Th>Sugestão</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <Td>{new Date(r.created_at).toLocaleString("pt-BR")}</Td>
                  <Td className="font-semibold text-primary">{r.class_code}</Td>
                  <Td>{r.full_name}</Td>
                  <Td>{r.whatsapp}</Td>
                  <Td>{r.learning_rating}</Td>
                  <Td>{r.parameters_comprehension}</Td>
                  <Td>{r.objects_activity_contribution}</Td>
                  <Td>{r.knew_handtalk}</Td>
                  <Td>{r.handtalk_presentation_rating}</Td>
                  <Td>{r.handtalk_usage_success}</Td>
                  <Td>{r.handtalk_usefulness}</Td>
                  <Td>{r.methodology_rating}</Td>
                  <Td className="font-semibold">{r.evolution_perception}</Td>
                  <Td className="max-w-[240px] whitespace-pre-wrap">{r.main_learning}</Td>
                  <Td className="max-w-[240px] whitespace-pre-wrap">{r.topic_to_learn}</Td>
                  <Td className="max-w-[240px] whitespace-pre-wrap">{r.suggestion ?? "—"}</Td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={16} className="py-6 text-center text-sm text-muted-foreground">
                    Nenhuma resposta ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}



function PostClass4Panel({ rows }: { rows: PostClass4Row[] }) {
  const q1 = useMemo(() => ratingBreakdown(rows, "q1_activity_objective"), [rows]);
  const q2 = useMemo(() => ratingBreakdown(rows, "q2_learning_depends_on"), [rows]);
  const q3 = useMemo(() => ratingBreakdown(rows, "q3_instructor_action"), [rows]);
  const q4 = useMemo(() => ratingBreakdown(rows, "q4_pairs_objective"), [rows]);
  const q5 = useMemo(() => ratingBreakdown(rows, "q5_students_alternated"), [rows]);
  const q6 = useMemo(() => ratingBreakdown(rows, "q6_error_treated_as"), [rows]);
  const q7 = useMemo(() => ratingBreakdown(rows, "q7_indispensable_element"), [rows]);
  const q8 = useMemo(() => ratingBreakdown(rows, "q8_collective_reflection"), [rows]);
  const q9 = useMemo(() => ratingBreakdown(rows, "q9_evaluation_result"), [rows]);
  const q10 = useMemo(() => ratingBreakdown(rows, "q10_workshop_objective"), [rows]);

  const correctAnswers: Record<string, string> = {
    q1_activity_objective: "Avaliar o aprendizado acumulado",
    q2_learning_depends_on: "Prática constante",
    q3_instructor_action: "Mostrou e sinalizou o diálogo duas vezes",
    q4_pairs_objective: "Simular situações reais de comunicação",
    q5_students_alternated: "Papéis A e B",
    q6_error_treated_as: "Algo natural do processo de aprendizagem",
    q7_indispensable_element: "Expressões faciais e contexto",
    q8_collective_reflection: "A repetição fortalece a aprendizagem",
    q9_evaluation_result: "A turma apresentou bom aproveitamento",
    q10_workshop_objective: "Promover comunicação inclusiva",
  };

  const totalCorrect = useMemo(() => {
    return rows.map((r) => {
      let correct = 0;
      if (r.q1_activity_objective === correctAnswers.q1_activity_objective) correct++;
      if (r.q2_learning_depends_on === correctAnswers.q2_learning_depends_on) correct++;
      if (r.q3_instructor_action === correctAnswers.q3_instructor_action) correct++;
      if (r.q4_pairs_objective === correctAnswers.q4_pairs_objective) correct++;
      if (r.q5_students_alternated === correctAnswers.q5_students_alternated) correct++;
      if (r.q6_error_treated_as === correctAnswers.q6_error_treated_as) correct++;
      if (r.q7_indispensable_element === correctAnswers.q7_indispensable_element) correct++;
      if (r.q8_collective_reflection === correctAnswers.q8_collective_reflection) correct++;
      if (r.q9_evaluation_result === correctAnswers.q9_evaluation_result) correct++;
      if (r.q10_workshop_objective === correctAnswers.q10_workshop_objective) correct++;
      return correct;
    });
  }, [rows]);

  const avgHits = rows.length > 0
    ? (totalCorrect.reduce((a, b) => a + b, 0) / rows.length).toFixed(1)
    : "—";

  function exportCSV() {
    const headers = [
      "id",
      "created_at",
      "class_code",
      "class_number",
      "full_name",
      "whatsapp",
      "q1_activity_objective",
      "q2_learning_depends_on",
      "q3_instructor_action",
      "q4_pairs_objective",
      "q5_students_alternated",
      "q6_error_treated_as",
      "q7_indispensable_element",
      "q8_collective_reflection",
      "q9_evaluation_result",
      "q10_workshop_objective",
      "suggestion",
      "consent",
    ];
    downloadCSV(
      `pos-aula-4-${new Date().toISOString().slice(0, 10)}.csv`,
      headers,
      rows as unknown as Record<string, unknown>[],
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={exportCSV}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-deep"
        >
          Exportar CSV
        </button>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Total de respostas" value={String(rows.length)} />
        <Kpi label="Média de acertos" value={String(avgHits)} suffix="/10" />
        <Kpi
          label="% Aproveitamento ≥ 70%"
          value={`${pct(totalCorrect, (c) => c >= 7)}%`}
        />
        <Kpi
          label="% Aproveitamento ≥ 90%"
          value={`${pct(totalCorrect, (c) => c >= 9)}%`}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="1. Principal objetivo da datilologia">
          <RatingBars data={q1} />
        </Card>
        <Card title="2. Aprender Libras depende de">
          <RatingBars data={q2} />
        </Card>
        <Card title="3. Ação do instrutor antes dos diálogos">
          <RatingBars data={q3} />
        </Card>
        <Card title="4. Objetivo da prática em duplas">
          <RatingBars data={q4} />
        </Card>
        <Card title="5. Alunos alternaram">
          <RatingBars data={q5} />
        </Card>
        <Card title="6. Erro tratado como">
          <RatingBars data={q6} />
        </Card>
        <Card title="7. Elemento indispensável na sinalização">
          <RatingBars data={q7} />
        </Card>
        <Card title="8. Reflexão coletiva destacou">
          <RatingBars data={q8} />
        </Card>
        <Card title="9. Resultado da avaliação">
          <RatingBars data={q9} />
        </Card>
        <Card title="10. Objetivo da oficina">
          <RatingBars data={q10} />
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Sugestões e comentários">
          <TextList items={rows.map((r) => r.suggestion ?? "").filter(Boolean)} />
        </Card>
      </section>

      <Card title={`Respostas (${rows.length})`}>
        <div className="-mx-4 overflow-x-auto sm:mx-0">
          <table className="w-full min-w-[1600px] border-collapse text-left text-sm">
            <thead className="bg-surface-muted text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <Th>Data</Th>
                <Th>Turma</Th>
                <Th>Nome</Th>
                <Th>WhatsApp</Th>
                <Th>Q1</Th>
                <Th>Q2</Th>
                <Th>Q3</Th>
                <Th>Q4</Th>
                <Th>Q5</Th>
                <Th>Q6</Th>
                <Th>Q7</Th>
                <Th>Q8</Th>
                <Th>Q9</Th>
                <Th>Q10</Th>
                <Th>Acertos</Th>
                <Th>Sugestão</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <Td>{new Date(r.created_at).toLocaleString("pt-BR")}</Td>
                  <Td className="font-semibold text-primary">{r.class_code}</Td>
                  <Td>{r.full_name}</Td>
                  <Td>{r.whatsapp}</Td>
                  <Td>{r.q1_activity_objective}</Td>
                  <Td>{r.q2_learning_depends_on}</Td>
                  <Td>{r.q3_instructor_action}</Td>
                  <Td>{r.q4_pairs_objective}</Td>
                  <Td>{r.q5_students_alternated}</Td>
                  <Td>{r.q6_error_treated_as}</Td>
                  <Td>{r.q7_indispensable_element}</Td>
                  <Td>{r.q8_collective_reflection}</Td>
                  <Td>{r.q9_evaluation_result}</Td>
                  <Td>{r.q10_workshop_objective}</Td>
                  <Td className="text-center font-bold text-primary">
                    {totalCorrect[i]}/10
                  </Td>
                  <Td className="max-w-[200px] whitespace-pre-wrap">{r.suggestion ?? "—"}</Td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={16} className="py-6 text-center text-sm text-muted-foreground">
                    Nenhuma resposta ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function GuestPanel({ rows }: { rows: GuestRow[] }) {
  const experience = useMemo(() => ratingBreakdown(rows, "experience_rating"), [rows]);
  const methodology = useMemo(() => ratingBreakdown(rows, "methodology_rating"), [rows]);

  function exportCSV() {
    const headers = [
      "id",
      "created_at",
      "guest_name",
      "class_code",
      "workshop",
      "instructor",
      "experience_rating",
      "welcoming",
      "students_interest",
      "respect_shown",
      "positive_point",
      "could_be_different",
      "brought_communities_closer",
      "methodology_rating",
      "would_participate_again",
      "message_to_students",
      "testimonial_consent",
      "consent",
    ];
    downloadCSV(
      `avaliacao-convidado-${new Date().toISOString().slice(0, 10)}.csv`,
      headers,
      rows as unknown as Record<string, unknown>[],
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={exportCSV}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-deep"
        >
          Exportar CSV
        </button>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Kpi label="Total de avaliações" value={String(rows.length)} />
        <Kpi
          label="% Participaria novamente"
          value={`${pct(rows, (r) => r.would_participate_again.toLowerCase().startsWith("sim"))}%`}
        />
        <Kpi
          label="% Aproximou comunidades"
          value={`${pct(rows, (r) => r.brought_communities_closer.toLowerCase().startsWith("sim"))}%`}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Experiência geral">
          <RatingBars data={experience} />
        </Card>
        <Card title="Avaliação da metodologia">
          <RatingBars data={methodology} />
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Ponto positivo destacado">
          <TextList items={rows.map((r) => r.positive_point).filter(Boolean)} />
        </Card>
        <Card title="O que poderia ser diferente">
          <TextList items={rows.map((r) => r.could_be_different ?? "").filter(Boolean)} />
        </Card>
        <Card title="Mensagem aos alunos">
          <TextList items={rows.map((r) => r.message_to_students).filter(Boolean)} />
        </Card>
      </section>

      <Card title={`Respostas (${rows.length})`}>
        <div className="-mx-4 overflow-x-auto sm:mx-0">
          <table className="w-full min-w-[1400px] border-collapse text-left text-sm">
            <thead className="bg-surface-muted text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <Th>Data</Th>
                <Th>Convidado</Th>
                <Th>Turma</Th>
                <Th>Experiência</Th>
                <Th>Acolhimento</Th>
                <Th>Interesse dos alunos</Th>
                <Th>Respeito</Th>
                <Th>Aproximou</Th>
                <Th>Metodologia</Th>
                <Th>Participaria de novo</Th>
                <Th>Depoimento autorizado</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <Td>{new Date(r.created_at).toLocaleString("pt-BR")}</Td>
                  <Td>{r.guest_name}</Td>
                  <Td className="font-semibold text-primary">{r.class_code}</Td>
                  <Td>{r.experience_rating}</Td>
                  <Td>{r.welcoming}</Td>
                  <Td>{r.students_interest}</Td>
                  <Td>{r.respect_shown}</Td>
                  <Td>{r.brought_communities_closer}</Td>
                  <Td>{r.methodology_rating}</Td>
                  <Td>{r.would_participate_again}</Td>
                  <Td>{r.testimonial_consent}</Td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={11} className="py-6 text-center text-sm text-muted-foreground">
                    Nenhuma resposta ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function pct<T>(rows: T[], predicate: (r: T) => boolean) {
  if (rows.length === 0) return 0;
  return Math.round((rows.filter(predicate).length / rows.length) * 100);
}

function RatingBars({ data }: { data: { name: string; value: number }[] }) {
  if (data.length === 0) return <EmptyChart />;
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 90%)" />
          <XAxis type="number" stroke="hsl(220 15% 40%)" fontSize={12} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="name"
            stroke="hsl(220 15% 40%)"
            fontSize={11}
            width={140}
          />
          <Tooltip />
          <Bar dataKey="value" fill="var(--color-primary)" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function Kpi({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-extrabold text-primary sm:text-3xl">{value}</span>
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <h3 className="mb-3 text-sm font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}

function TextList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Sem respostas ainda.</p>;
  }
  return (
    <ul className="max-h-64 space-y-2 overflow-y-auto pr-1">
      {items.map((t, i) => (
        <li
          key={i}
          className="rounded-lg border border-border bg-surface-muted px-3 py-2 text-sm text-foreground"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function EmptyChart() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
      Sem dados ainda.
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 font-semibold">{children}</th>;
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}
