CREATE TABLE public.user_preferences (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  sport TEXT NOT NULL DEFAULT 'soccer',
  league_id TEXT NOT NULL DEFAULT 'premier-league',
  teams TEXT[] NOT NULL DEFAULT '{}',
  region TEXT NOT NULL DEFAULT 'United States · Eastern',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_preferences TO authenticated;
GRANT ALL ON public.user_preferences TO service_role;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own preferences" ON public.user_preferences
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.user_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  provider_id TEXT NOT NULL,
  service_email TEXT NOT NULL,
  service_password TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, provider_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_services TO authenticated;
GRANT ALL ON public.user_services TO service_role;
ALTER TABLE public.user_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own services" ON public.user_services
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_services_updated_at BEFORE UPDATE ON public.user_services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();