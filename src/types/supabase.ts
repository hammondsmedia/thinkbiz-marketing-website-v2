// Hand-maintained types for the subset of Supabase tables the marketing site
// consumes. When the schema changes, either update this file or regenerate
// with: npx supabase gen types typescript --project-id basrdqwpynzaepmhdbze
// (requires SUPABASE_ACCESS_TOKEN in the local environment).

export type ClubRow = {
  id: string
  slug: string | null
  display_name: string | null
  chapter_number: number | null
  city: string | null
  area: string | null
  address: string | null
  venue_name: string | null
  day_of_week: string | null
  start_time: string | null
  meeting_frequency: string | null
  description: string | null
  short_description: string | null
  feature_image: string | null
  map_url: string | null
  established: number | null
  target_seats: number | null
  is_public: boolean | null
  name: string | null
  created_at: string | null
}

export type MemberRow = {
  id: string
  slug: string | null
  first_name: string
  last_name: string
  email: string
  company_name: string | null
  title: string | null
  industry: string | null
  role: 'President' | 'Vice President' | 'Secretary' | 'Member' | null
  bio: string | null
  short_bio: string | null
  member_headshot: string | null
  linkedin_url: string | null
  website_url: string | null
  booking_calendar_url: string | null
  core_skills: string[] | null
  testimonial: string | null
  member_since: string | null
  current_club_id: string | null
  is_active: boolean | null
  is_public: boolean | null
  club_director: boolean | null
  created_at: string | null
}

export type ClubSeatRow = {
  id: string
  club_id: string
  industry: string
  industry_slug: string
  status: 'open' | 'filled'
  member_id: string | null
  sort_order: number | null
  created_at: string | null
}

export type Database = {
  public: {
    Tables: {
      clubs: {
        Row: ClubRow
        Insert: Partial<ClubRow> & { id?: string }
        Update: Partial<ClubRow>
        Relationships: []
      }
      members: {
        Row: MemberRow
        Insert: Partial<MemberRow> & {
          first_name: string
          last_name: string
          email: string
        }
        Update: Partial<MemberRow>
        Relationships: [
          {
            foreignKeyName: 'members_current_club_id_fkey'
            columns: ['current_club_id']
            referencedRelation: 'clubs'
            referencedColumns: ['id']
          }
        ]
      }
      club_seats: {
        Row: ClubSeatRow
        Insert: Partial<ClubSeatRow> & {
          club_id: string
          industry: string
          industry_slug: string
        }
        Update: Partial<ClubSeatRow>
        Relationships: [
          {
            foreignKeyName: 'club_seats_club_id_fkey'
            columns: ['club_id']
            referencedRelation: 'clubs'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'club_seats_member_id_fkey'
            columns: ['member_id']
            referencedRelation: 'members'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
