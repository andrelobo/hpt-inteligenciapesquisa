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

const PIE_COLORS = ["#1e3a8a", "#3b82f6", "#93c5fd", "#60a5fa", "#1d4ed8"];

function AdminPage() {
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [companyFilter, setCompanyFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const fetchRows = useServerFn(getSurveyResponses);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetchRows({ data: { password } });
      setRows((res.rows ?? []) as Row[]);
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
    <Dashboard
      rows={rows}
      companyFilter={companyFilter}
      setCompanyFilter={setCompanyFilter}
      classFilter={classFilter}
      setClassFilter={setClassFilter}
    />
  );
}

function Dashboard({
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

  const perClass = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of filtered) {
      map.set(r.class_code, (map.get(r.class_code) ?? 0) + 1);
    }
    return Array.from(map, ([code, count]) => ({ code, count })).sort(
      (a, b) => b.count - a.count,
    );
  }, [filtered]);

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
    const escape = (v: unknown) => {
      const s = v === null || v === undefined ? "" : String(v);
      if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
      return s;
    };
    const lines = [headers.join(",")];
    for (const r of filtered) {
      const record = r as unknown as Record<string, unknown>;
      lines.push(headers.map((h) => escape(record[h])).join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `respostas-hpt-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <PageShell>
      <Toaster richColors position="top-center" />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Painel HPT
            </h1>
            <p className="text-sm text-muted-foreground">
              Diagnóstico Inicial da Turma · Pesquisa Pré-Curso
            </p>
          </div>
          <div className="grid w-full gap-2 sm:w-auto sm:grid-cols-[auto_auto_auto]">
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
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Kpi label="Total de respostas" value={String(total)} />
          <Kpi label="Média de segurança inicial" value={String(avgScore)} suffix="/10" />
          <Kpi label="Sem contato prévio com Libras" value={`${pctNoContact}%`} />
          <Kpi label="Já atendeu pessoa surda" value={`${pctAttendedDeaf}%`} />
          <Kpi label="Interesse em cursos futuros" value={`${pctFutureInterest}%`} />
        </section>

        <Card title="Respostas por turma">
          {perClass.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sem respostas ainda.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {perClass.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setClassFilter(classFilter === c.code ? "" : c.code)}
                  className={`rounded-xl border px-3 py-2 text-left transition ${
                    classFilter === c.code
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface-muted text-foreground hover:border-primary/40"
                  }`}
                >
                  <div className="text-xs font-medium uppercase tracking-wide opacity-80">
                    Turma
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold">{c.code}</span>
                    <span className="text-sm opacity-80">· {c.count}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </Card>

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
            <table className="w-full min-w-[1600px] border-collapse text-left text-sm">
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
                  <Th>Expectativa de aprendizado</Th>
                  <Th>O que tornaria útil</Th>
                  <Th>Cursos futuros</Th>
                  <Th>Consentimento</Th>
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
                    <Td className="max-w-[240px] whitespace-pre-wrap">{r.usefulness_expectation}</Td>
                    <Td>{r.future_courses_interest}</Td>
                    <Td>{r.consent ? "Sim" : "Não"}</Td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={16} className="py-6 text-center text-sm text-muted-foreground">
                      Nenhuma resposta encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageShell>
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
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}
