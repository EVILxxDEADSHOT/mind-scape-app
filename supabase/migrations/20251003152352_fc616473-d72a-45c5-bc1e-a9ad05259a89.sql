-- Drop all existing RLS policies on moods table
DROP POLICY IF EXISTS "Users can view their own moods" ON public.moods;
DROP POLICY IF EXISTS "Users can insert their own moods" ON public.moods;
DROP POLICY IF EXISTS "Users can delete their own moods" ON public.moods;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.moods;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.moods;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.moods;
DROP POLICY IF EXISTS "Enable update for all users" ON public.moods;

-- Create permissive RLS policies since Clerk handles authentication
-- Users can perform any operation on moods table
CREATE POLICY "Allow all operations on moods"
  ON public.moods
  FOR ALL
  USING (true)
  WITH CHECK (true);