import { createFileRoute } from "@tanstack/react-router";
import { LockedSurvey } from "./pesquisa-pos-curso";

export const Route = createFileRoute("/pesquisa-institucional")({
  head: () => ({
    meta: [{ title: "Pesquisa Institucional | Sistema HPT" }],
  }),
  component: InstitucionalPage,
});

function InstitucionalPage() {
  return (
    <LockedSurvey
      title="Pesquisa Institucional | Avaliação da Empresa Contratante"
      subtitle="Será liberada após o encerramento do treinamento"
      intro="Esta pesquisa é respondida pela empresa ou instituição contratante. O objetivo é avaliar o impacto do treinamento no ambiente organizacional, o alinhamento com os objetivos institucionais e o interesse em novas parcerias com a Heberton Pinheiro Treinamentos."
      previewTopics={[
        "Nome da empresa/instituição e responsável pela resposta",
        "Cargo e área de atuação do respondente",
        "Objetivo institucional ao contratar o treinamento",
        "Alinhamento do curso com as expectativas da empresa",
        "Impacto percebido nos colaboradores após o curso",
        "Aplicabilidade prática do conteúdo no ambiente de trabalho",
        "Qualidade da comunicação e do atendimento da HPT",
        "Pontos fortes identificados no treinamento",
        "Sugestões de melhoria ou novos temas de interesse",
        "Interesse em novas turmas, módulos avançados ou parcerias contínuas",
        "NPS institucional — recomendação da HPT para outras empresas",
      ]}
    />
  );
}
