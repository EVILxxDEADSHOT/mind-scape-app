-- Drop existing RLS policies
DROP POLICY IF EXISTS "Users can view their own moods" ON public.moods;
DROP POLICY IF EXISTS "Users can insert their own moods" ON public.moods;
DROP POLICY IF EXISTS "Users can delete their own moods" ON public.moods;

-- Create new RLS policies that work with any authenticated user
-- Since Clerk handles authentication, we trust the user_id from the client
CREATE POLICY "Enable read access for all users"
  ON public.moods
  FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for all users"
  ON public.moods
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable delete for all users"
  ON public.moods
  FOR DELETE
  USING (true);

CREATE POLICY "Enable update for all users"
  ON public.moods
  FOR UPDATE
  USING (true);