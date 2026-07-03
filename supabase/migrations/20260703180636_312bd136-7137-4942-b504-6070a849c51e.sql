
CREATE TABLE public.student_pre_course_survey_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT,
  previous_libras_contact TEXT NOT NULL,
  has_attended_deaf_person TEXT NOT NULL,
  initial_confidence_score INTEGER NOT NULL CHECK (initial_confidence_score BETWEEN 0 AND 10),
  biggest_difficulty TEXT NOT NULL,
  usage_context TEXT NOT NULL,
  learning_expectation TEXT NOT NULL,
  usefulness_expectation TEXT NOT NULL,
  future_courses_interest TEXT NOT NULL,
  consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.student_pre_course_survey_responses TO anon;
GRANT INSERT ON public.student_pre_course_survey_responses TO authenticated;
GRANT ALL ON public.student_pre_course_survey_responses TO service_role;

ALTER TABLE public.student_pre_course_survey_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a survey response"
  ON public.student_pre_course_survey_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (consent = true);
