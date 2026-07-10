CREATE TABLE public.student_post_class_5_responses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  whatsapp text NOT NULL,
  class_code text NOT NULL DEFAULT 'HPCT01',
  class_number integer NOT NULL DEFAULT 5,
  instructor text NOT NULL DEFAULT 'Heberton Pinheiro',
  workshop text NOT NULL DEFAULT 'Libras no Comércio – Comunicação sem Barreiras',
  application_date date NOT NULL DEFAULT ((now() AT TIME ZONE 'America/Sao_Paulo')::date),

  -- Part I – Cultura Surda e Inclusão
  q1_why_learn_culture text NOT NULL,
  q2_libras_is text NOT NULL,
  q3_communicational_accessibility text NOT NULL,
  q4_two_barriers text NOT NULL,
  q5_inclusive_environment text NOT NULL,

  -- Part II – Comunicação no Comércio
  q6_first_contact_attitude text NOT NULL,
  q7_facial_expressions_importance text NOT NULL,
  q8_eye_contact_importance text NOT NULL,
  q9_learning_depends_on text NOT NULL,
  q10_what_caught_attention text NOT NULL,

  -- Part III – Situações Práticas
  q11_how_to_start_service text NOT NULL,
  q12_forgot_a_signal text NOT NULL,
  q13_colleague_fearful text NOT NULL,
  q14_libras_improves_service text NOT NULL,
  q15_apply_in_workplace text NOT NULL,

  -- Part IV – Autoavaliação
  q16_self_assessment text NOT NULL,
  q17_most_important_content text NOT NULL,
  q18_best_activity text NOT NULL,
  q19_feel_prepared text NOT NULL,
  q19_explanation text NOT NULL,
  q20_suggestion text NOT NULL,

  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.student_post_class_5_responses TO anon, authenticated;
GRANT ALL ON public.student_post_class_5_responses TO service_role;

ALTER TABLE public.student_post_class_5_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a post-class 5 response"
  ON public.student_post_class_5_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view post-class 5 responses"
  ON public.student_post_class_5_responses
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE OR REPLACE FUNCTION public.check_post_class_5_unique_response()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  normalized_whatsapp text;
  existing_count integer;
BEGIN
  normalized_whatsapp := regexp_replace(NEW.whatsapp, '\D', '', 'g');
  SELECT count(*) INTO existing_count
  FROM public.student_post_class_5_responses
  WHERE regexp_replace(whatsapp, '\D', '', 'g') = normalized_whatsapp
    AND class_code = NEW.class_code;
  IF existing_count > 0 THEN
    RAISE EXCEPTION 'Este WhatsApp já respondeu o questionário desta aula.' USING ERRCODE = '23505';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER check_post_class_5_unique_before_insert
  BEFORE INSERT ON public.student_post_class_5_responses
  FOR EACH ROW EXECUTE FUNCTION public.check_post_class_5_unique_response();

REVOKE EXECUTE ON FUNCTION public.check_post_class_5_unique_response() FROM PUBLIC, anon, authenticated;
