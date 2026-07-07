CREATE OR REPLACE FUNCTION public.check_pre_course_unique_response()
RETURNS TRIGGER
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
  FROM public.student_pre_course_survey_responses
  WHERE regexp_replace(whatsapp, '\D', '', 'g') = normalized_whatsapp
    AND class_code = NEW.class_code;

  IF existing_count > 0 THEN
    RAISE EXCEPTION 'Este WhatsApp já respondeu a pesquisa para esta turma.' USING ERRCODE = '23505';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_prevent_duplicate_pre_survey
BEFORE INSERT ON public.student_pre_course_survey_responses
FOR EACH ROW
EXECUTE FUNCTION public.check_pre_course_unique_response();