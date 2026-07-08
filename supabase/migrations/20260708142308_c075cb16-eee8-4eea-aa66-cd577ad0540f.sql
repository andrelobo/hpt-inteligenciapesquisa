
CREATE TABLE public.student_post_class_responses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  whatsapp text NOT NULL,
  class_code text NOT NULL DEFAULT 'HPCT01',
  class_number integer NOT NULL DEFAULT 2,
  instructor text NOT NULL DEFAULT 'Heberton Pinheiro',
  workshop text NOT NULL DEFAULT 'Libras no Comércio – Comunicação sem Barreiras',
  application_date date NOT NULL DEFAULT (now() AT TIME ZONE 'America/Sao_Paulo')::date,
  learning_rating text NOT NULL,
  parameters_importance text NOT NULL,
  most_important_parameter text NOT NULL,
  grammar_understanding text NOT NULL,
  guest_contribution text NOT NULL,
  guest_attention text NOT NULL,
  perception_change text NOT NULL,
  communication_readiness text NOT NULL,
  methodology_rating text NOT NULL,
  most_significant_content text NOT NULL,
  topic_to_deepen text NOT NULL,
  suggestion text,
  consent boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.student_post_class_responses TO anon, authenticated;
GRANT ALL ON public.student_post_class_responses TO service_role;

ALTER TABLE public.student_post_class_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a post-class response"
  ON public.student_post_class_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (consent = true);

CREATE OR REPLACE FUNCTION public.check_post_class_unique_response()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  normalized_whatsapp text;
  existing_count integer;
BEGIN
  normalized_whatsapp := regexp_replace(NEW.whatsapp, '\D', '', 'g');

  SELECT count(*) INTO existing_count
  FROM public.student_post_class_responses
  WHERE regexp_replace(whatsapp, '\D', '', 'g') = normalized_whatsapp
    AND class_code = NEW.class_code
    AND class_number = NEW.class_number;

  IF existing_count > 0 THEN
    RAISE EXCEPTION 'Este WhatsApp já respondeu o questionário desta aula.' USING ERRCODE = '23505';
  END IF;

  RETURN NEW;
END;
$function$;

CREATE TRIGGER check_post_class_unique_response_trigger
  BEFORE INSERT ON public.student_post_class_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.check_post_class_unique_response();
