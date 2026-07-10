ALTER TABLE public.student_post_class_4_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view post-class 4 responses"
  ON public.student_post_class_4_responses
  FOR SELECT
  TO anon, authenticated
  USING (true);
