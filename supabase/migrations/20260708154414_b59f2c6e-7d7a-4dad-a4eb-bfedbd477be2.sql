-- Allow anyone to check if the guest evaluation was already answered
CREATE POLICY "Anyone can read guest evaluation existence"
ON public.guest_evaluation_responses
FOR SELECT
TO anon, authenticated
USING (true);

GRANT SELECT ON public.guest_evaluation_responses TO anon;

-- Enforce single response at the database level
CREATE OR REPLACE FUNCTION public.check_guest_evaluation_single_response()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  existing_count integer;
BEGIN
  SELECT count(*) INTO existing_count FROM public.guest_evaluation_responses;
  IF existing_count > 0 THEN
    RAISE EXCEPTION 'Esta avaliação já foi respondida.' USING ERRCODE = '23505';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER guest_evaluation_single_response
BEFORE INSERT ON public.guest_evaluation_responses
FOR EACH ROW EXECUTE FUNCTION public.check_guest_evaluation_single_response();