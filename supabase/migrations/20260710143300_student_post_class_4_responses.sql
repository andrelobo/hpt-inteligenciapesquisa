CREATE TABLE public.student_post_class_4_responses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  whatsapp text NOT NULL,
  class_code text NOT NULL DEFAULT 'HPCT01',
  class_number integer NOT NULL DEFAULT 4,
  instructor text NOT NULL DEFAULT 'Heberton Pinheiro',
  workshop text NOT NULL DEFAULT 'Libras no Comércio – Comunicação sem Barreiras',
  application_date date NOT NULL DEFAULT ((now() AT TIME ZONE 'America/Sao_Paulo')::date),
  q1_activity_objective text NOT NULL,
  q2_learning_depends_on text NOT NULL,
  q3_instructor_action text NOT NULL,
  q4_pairs_objective text NOT NULL,
  q5_students_alternated text NOT NULL,
  q6_error_treated_as text NOT NULL,
  q7_indispensable_element text NOT NULL,
  q8_collective_reflection text NOT NULL,
  q9_evaluation_result text NOT NULL,
  q10_workshop_objective text NOT NULL,
  suggestion text,
  consent boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.student_post_class_4_responses TO anon, authenticated;
GRANT ALL ON public.student_post_class_4_responses TO service_role;

ALTER TABLE public.student_post_class_4_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a post-class 4 response"
  ON public.student_post_class_4_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (consent = true);

CREATE OR REPLACE FUNCTION public.check_post_class_4_unique_response()
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
  FROM public.student_post_class_4_responses
  WHERE regexp_replace(whatsapp, '\D', '', 'g') = normalized_whatsapp
    AND class_code = NEW.class_code;
  IF existing_count > 0 THEN
    RAISE EXCEPTION 'Este WhatsApp já respondeu o questionário desta aula.' USING ERRCODE = '23505';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER check_post_class_4_unique_before_insert
  BEFORE INSERT ON public.student_post_class_4_responses
  FOR EACH ROW EXECUTE FUNCTION public.check_post_class_4_unique_response();

REVOKE EXECUTE ON FUNCTION public.check_post_class_4_unique_response() FROM PUBLIC, anon, authenticated;
