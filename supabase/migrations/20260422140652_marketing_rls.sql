-- RLS for marketing-exposed tables.
-- Grants public (anon) SELECT only to rows opted in via is_public.
-- No INSERT/UPDATE/DELETE policies are defined; writes must go through the
-- service role (dashboard / backend jobs).
--
-- WARNING: This enables RLS on shared tables (clubs, members). The members-app
-- that also uses these tables must either use the service-role key (bypasses
-- RLS) or already have its own `authenticated` policies. Add those before
-- running this migration against production if the members-app uses the anon
-- key for reads.

ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public clubs readable" ON public.clubs;
CREATE POLICY "public clubs readable"
  ON public.clubs
  FOR SELECT
  TO anon
  USING (is_public = true);

ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public members readable" ON public.members;
CREATE POLICY "public members readable"
  ON public.members
  FOR SELECT
  TO anon
  USING (is_public = true AND is_active = true);

ALTER TABLE public.club_seats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public seats readable" ON public.club_seats;
CREATE POLICY "public seats readable"
  ON public.club_seats
  FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.clubs c
      WHERE c.id = club_seats.club_id AND c.is_public = true
    )
  );
