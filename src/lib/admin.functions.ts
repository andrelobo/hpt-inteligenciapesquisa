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

    const [preCourse, postClass, postClass3, postClass4, guest] = await Promise.all([
      supabaseAdmin
        .from("student_pre_course_survey_responses")
        .select("*")
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("student_post_class_responses")
        .select("*")
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("student_post_class_3_responses")
        .select("*")
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("student_post_class_4_responses")
        .select("*")
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("guest_evaluation_responses")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    if (preCourse.error) throw new Error(preCourse.error.message);
    if (postClass.error) throw new Error(postClass.error.message);
    if (postClass3.error) throw new Error(postClass3.error.message);
    if (guest.error) throw new Error(guest.error.message);
    if (postClass4.error) throw new Error(postClass4.error.message);

    return {
      rows: preCourse.data ?? [],
      postClassRows: postClass.data ?? [],
      postClass3Rows: postClass3.data ?? [],
      postClass4Rows: postClass4.data ?? [],
      guestRows: guest.data ?? [],
    };
  });
