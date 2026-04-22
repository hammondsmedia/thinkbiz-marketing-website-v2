-- Marketing site additive fields for clubs, members, and seat inventory.
-- Run in Supabase dashboard SQL Editor or via `supabase db push`.
-- Safe to run multiple times: uses IF NOT EXISTS where available.

-- ─── clubs: display + marketing fields ────────────────────────────────────────
ALTER TABLE public.clubs
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS display_name text,
  ADD COLUMN IF NOT EXISTS chapter_number int,
  ADD COLUMN IF NOT EXISTS area text,
  ADD COLUMN IF NOT EXISTS venue_name text,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS short_description text,
  ADD COLUMN IF NOT EXISTS feature_image text,
  ADD COLUMN IF NOT EXISTS map_url text,
  ADD COLUMN IF NOT EXISTS established int,
  ADD COLUMN IF NOT EXISTS meeting_frequency text DEFAULT 'Weekly',
  ADD COLUMN IF NOT EXISTS target_seats int DEFAULT 12,
  ADD COLUMN IF NOT EXISTS is_public boolean DEFAULT true;

-- Unique slug once populated. Create as a separate statement so re-runs succeed.
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'clubs_slug_key'
  ) THEN
    ALTER TABLE public.clubs ADD CONSTRAINT clubs_slug_key UNIQUE (slug);
  END IF;
END $$;

-- ─── members: marketing profile fields ───────────────────────────────────────
ALTER TABLE public.members
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS short_bio text,
  ADD COLUMN IF NOT EXISTS role text,
  ADD COLUMN IF NOT EXISTS testimonial text,
  ADD COLUMN IF NOT EXISTS member_since date,
  ADD COLUMN IF NOT EXISTS is_public boolean DEFAULT false;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'members_slug_key'
  ) THEN
    ALTER TABLE public.members ADD CONSTRAINT members_slug_key UNIQUE (slug);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'members_role_check'
  ) THEN
    ALTER TABLE public.members ADD CONSTRAINT members_role_check
      CHECK (role IN ('President','Vice President','Secretary','Member'));
  END IF;
END $$;

-- ─── club_seats: industry seat inventory per club ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.club_seats (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id uuid NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  industry text NOT NULL,
  industry_slug text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','filled')),
  member_id uuid REFERENCES public.members(id) ON DELETE SET NULL,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE (club_id, industry_slug)
);

CREATE INDEX IF NOT EXISTS club_seats_club_id_idx ON public.club_seats (club_id);
CREATE INDEX IF NOT EXISTS club_seats_member_id_idx ON public.club_seats (member_id);
