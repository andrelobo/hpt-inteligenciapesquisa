CREATE TABLE public.guest_evaluation_responses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name text NOT NULL DEFAULT 'Kleberson',
  class_code text NOT NULL DEFAULT 'HPCT01',
  workshop text NOT NULL DEFAULT 'Libras no Comércio – Comunicação sem Barreiras',
  instructor text NOT NULL DEFAULT 'Heberton Pinheiro',
  application_date date NOT NULL DEFAULT ((now() AT TIME ZONE 'America/Sao_Paulo'))::date,
  experience_rating text NOT NULL,
  welcoming text NOT NULL,
  students_interest text NOT NULL,
  respect_shown text NOT NULL,
  positive_point text NOT NULL,
  could_be_different text,
  brought_communities_closer text NOT NULL,
  methodology_rating text NOT NULL,
  would_participate_again text NOT NULL,
  message_to_students text NOT NULL,
  testimonial_consent text NOT NULL,
  consent boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.guest_evaluation_responses TO anon, authenticated;
GRANT ALL ON public.guest_evaluation_responses TO service_role;

ALTER TABLE public.guest_evaluation_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a guest evaluation response"
  ON public.guest_evaluation_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (consent = true);