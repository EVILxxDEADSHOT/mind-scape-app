-- Create moods table
CREATE TABLE public.moods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  mood TEXT NOT NULL CHECK (mood IN ('happy', 'sad', 'angry', 'anxious', 'calm')),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.moods ENABLE ROW LEVEL SECURITY;

-- Create index for user_id lookups
CREATE INDEX idx_moods_user_id ON public.moods(user_id);

-- Create index for timestamp ordering
CREATE INDEX idx_moods_timestamp ON public.moods(timestamp DESC);

-- RLS Policies: Users can only see and manage their own moods
CREATE POLICY "Users can view their own moods"
  ON public.moods
  FOR SELECT
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert their own moods"
  ON public.moods
  FOR INSERT
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can delete their own moods"
  ON public.moods
  FOR DELETE
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');