import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getSurveyResponses = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ password: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      throw new Error("Painel administrativo não configurado.");
    }
    if (data.password !== adminPassword) {
      throw new Error("Senha incorreta.");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("student_pre_course_survey_responses")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { rows: rows ?? [] };
  });
