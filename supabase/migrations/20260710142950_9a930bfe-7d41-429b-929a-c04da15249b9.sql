CREATE TABLE public.student_post_class_3_responses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  whatsapp text NOT NULL,
  class_code text NOT NULL DEFAULT 'HPCT01',
  class_number integer NOT NULL DEFAULT 3,
  instructor text NOT NULL DEFAULT 'Heberton Pinheiro',
  workshop text NOT NULL DEFAULT 'Libras no Comércio – Comunicação sem Barreiras',
  application_date date NOT NULL DEFAULT ((now() AT TIME ZONE 'America/Sao_Paulo')::date),
  learning_rating text NOT NULL,
  parameters_comprehension text NOT NULL,
  objects_activity_contribution text NOT NULL,
  knew_handtalk text NOT NULL,
  handtalk_presentation_rating text NOT NULL,
  handtalk_usefulness text NOT NULL,
  handtalk_usage_success text NOT NULL,
  autonomous_research_readiness text NOT NULL,
  methodology_rating text NOT NULL,
  main_learning text NOT NULL,
  handtalk_attention text NOT NULL,
  continue_using_handtalk text NOT NULL,
  topic_to_learn text NOT NULL,
  suggestion text,
  evolution_perception text NOT NULL,
  consent boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.student_post_class_3_responses TO anon, authenticated;
GRANT ALL ON public.student_post_class_3_responses TO service_role;

ALTER TABLE public.student_post_class_3_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a post-class 3 response"
  ON public.student_post_class_3_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (consent = true);

CREATE OR REPLACE FUNCTION public.check_post_class_3_unique_response()
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
  FROM public.student_post_class_3_responses
  WHERE regexp_replace(whatsapp, '\D', '', 'g') = normalized_whatsapp
    AND class_code = NEW.class_code;
  IF existing_count > 0 THEN
    RAISE EXCEPTION 'Este WhatsApp já respondeu o questionário desta aula.' USING ERRCODE = '23505';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER check_post_class_3_unique_before_insert
  BEFORE INSERT ON public.student_post_class_3_responses
  FOR EACH ROW EXECUTE FUNCTION public.check_post_class_3_unique_response();