import 'server-only'
import { createPublicClient as createClient } from '@/lib/supabase/server'
import type { Club, ClubMember, IndustrySeat } from '@/types/club'
import type { ClubRow, ClubSeatRow, MemberRow } from '@/types/supabase'

export type SeatWithMember = IndustrySeat & { member?: ClubMember }

export type ClubPageData = {
  club: Club
  members: ClubMember[]
  president?: ClubMember
  seats: SeatWithMember[]
}

export type MemberPageData = {
  member: ClubMember
  clubs: Club[]
}

// ─── MAPPERS ──────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function mapMemberRow(row: MemberRow, clubSlug?: string): ClubMember {
  const industry = row.industry ?? ''
  const fallbackShort =
    row.short_bio ??
    (row.bio ? row.bio.slice(0, 180).replace(/\s+\S*$/, '') + (row.bio.length > 180 ? '…' : '') : '')

  return {
    id: row.id,
    name: `${row.first_name} ${row.last_name}`.trim(),
    slug: row.slug ?? row.id,
    businessName: row.company_name ?? '',
    industry,
    industrySlug: industry ? slugify(industry) : '',
    role: row.role ?? 'Member',
    bio: row.bio ?? '',
    shortBio: fallbackShort,
    avatar: row.member_headshot ?? '',
    linkedin: row.linkedin_url ?? undefined,
    website: row.website_url ?? undefined,
    phone: undefined,
    memberSince: row.member_since ?? row.created_at ?? new Date().toISOString(),
    clubSlugs: clubSlug ? [clubSlug] : [],
    testimonial: row.testimonial ?? undefined,
    specialties: row.core_skills ?? [],
  }
}

function mapSeatRow(row: ClubSeatRow): IndustrySeat {
  return {
    industry: row.industry,
    industrySlug: row.industry_slug,
    status: row.status,
    memberId: row.member_id ?? undefined,
  }
}

function mapClubRow(row: ClubRow, seats: IndustrySeat[], members: ClubMember[]): Club {
  const memberCount = members.length
  const openSeats = seats.filter((s) => s.status === 'open').length
  const president = members.find((m) => m.role === 'President')
  const meetingDay = row.day_of_week ?? ''
  const meetingTime = row.start_time ?? ''

  return {
    id: row.id,
    name: row.display_name ?? row.name ?? '',
    slug: row.slug ?? row.id,
    chapter: row.chapter_number ? `Chapter ${row.chapter_number}` : '',
    city: row.city ?? '',
    area: row.area ?? '',
    address: row.address ?? '',
    venueName: row.venue_name ?? '',
    meetingDay,
    meetingTime,
    meetingFrequency: row.meeting_frequency ?? 'Weekly',
    description: row.description ?? '',
    shortDescription: row.short_description ?? '',
    featureImage: row.feature_image ?? '',
    mapUrl: row.map_url ?? '',
    established: row.established ? String(row.established) : '',
    memberCount,
    openSeats,
    seats,
    memberIds: members.map((m) => m.id),
    presidentId: president?.id,
  }
}

// ─── QUERIES ──────────────────────────────────────────────────────────────────

export async function getAllClubs(): Promise<Club[]> {
  const supabase = createClient()

  const [clubsRes, membersRes, seatsRes] = await Promise.all([
    supabase
      .from('clubs')
      .select('*')
      .eq('is_public', true)
      .order('chapter_number', { ascending: true, nullsFirst: false }),
    supabase
      .from('members')
      .select('*')
      .eq('is_public', true)
      .eq('is_active', true),
    supabase
      .from('club_seats')
      .select('*')
      .order('sort_order', { ascending: true, nullsFirst: false }),
  ])

  if (clubsRes.error) throw clubsRes.error
  const clubRows = clubsRes.data ?? []
  const memberRows = membersRes.data ?? []
  const seatRows = seatsRes.data ?? []

  const membersByClub = new Map<string, ClubMember[]>()
  for (const row of memberRows) {
    const clubId = row.current_club_id
    if (!clubId) continue
    const clubSlug = clubRows.find((c) => c.id === clubId)?.slug ?? undefined
    const list = membersByClub.get(clubId) ?? []
    list.push(mapMemberRow(row, clubSlug ?? undefined))
    membersByClub.set(clubId, list)
  }

  const seatsByClub = new Map<string, IndustrySeat[]>()
  for (const row of seatRows) {
    const list = seatsByClub.get(row.club_id) ?? []
    list.push(mapSeatRow(row))
    seatsByClub.set(row.club_id, list)
  }

  return clubRows.map((row) =>
    mapClubRow(row, seatsByClub.get(row.id) ?? [], membersByClub.get(row.id) ?? [])
  )
}

export async function getAllMembers(): Promise<ClubMember[]> {
  const supabase = createClient()
  const [membersRes, clubsRes] = await Promise.all([
    supabase.from('members').select('*').eq('is_public', true).eq('is_active', true),
    supabase.from('clubs').select('*').eq('is_public', true),
  ])
  if (membersRes.error) throw membersRes.error
  const slugByClubId = new Map<string, string>()
  for (const c of clubsRes.data ?? []) {
    if (c.slug) slugByClubId.set(c.id, c.slug)
  }
  return (membersRes.data ?? []).map((row) =>
    mapMemberRow(row, row.current_club_id ? slugByClubId.get(row.current_club_id) : undefined)
  )
}

export async function getClubPageData(slug: string): Promise<ClubPageData | null> {
  const supabase = createClient()
  const clubRes = await supabase
    .from('clubs')
    .select('*')
    .eq('slug', slug)
    .eq('is_public', true)
    .maybeSingle()
  if (clubRes.error) throw clubRes.error
  if (!clubRes.data) return null
  const clubRow = clubRes.data

  const [membersRes, seatsRes] = await Promise.all([
    supabase
      .from('members')
      .select('*')
      .eq('current_club_id', clubRow.id)
      .eq('is_public', true)
      .eq('is_active', true),
    supabase
      .from('club_seats')
      .select('*')
      .eq('club_id', clubRow.id)
      .order('sort_order', { ascending: true, nullsFirst: false }),
  ])
  if (membersRes.error) throw membersRes.error
  if (seatsRes.error) throw seatsRes.error

  const clubSlug = clubRow.slug ?? undefined
  const members = (membersRes.data ?? []).map((row) => mapMemberRow(row, clubSlug))
  const seats = (seatsRes.data ?? []).map(mapSeatRow)
  const memberById = new Map(members.map((m) => [m.id, m]))
  const seatsWithMembers: SeatWithMember[] = seats.map((seat) => ({
    ...seat,
    member: seat.memberId ? memberById.get(seat.memberId) : undefined,
  }))
  const club = mapClubRow(clubRow, seats, members)
  const president = club.presidentId ? memberById.get(club.presidentId) : undefined

  return { club, members, president, seats: seatsWithMembers }
}

export async function getMemberPageData(slug: string): Promise<MemberPageData | null> {
  const supabase = createClient()
  const memberRes = await supabase
    .from('members')
    .select('*')
    .eq('slug', slug)
    .eq('is_public', true)
    .eq('is_active', true)
    .maybeSingle()
  if (memberRes.error) throw memberRes.error
  if (!memberRes.data) return null

  const clubs = memberRes.data.current_club_id
    ? await getClubsByIds([memberRes.data.current_club_id])
    : []
  const clubSlug = clubs[0]?.slug
  const member = mapMemberRow(memberRes.data, clubSlug)
  return { member, clubs }
}

async function getClubsByIds(ids: string[]): Promise<Club[]> {
  if (ids.length === 0) return []
  const supabase = createClient()
  const clubsRes = await supabase
    .from('clubs')
    .select('*')
    .in('id', ids)
    .eq('is_public', true)
  if (clubsRes.error) throw clubsRes.error
  const clubRows = clubsRes.data ?? []
  if (clubRows.length === 0) return []

  const [membersRes, seatsRes] = await Promise.all([
    supabase
      .from('members')
      .select('*')
      .in('current_club_id', ids)
      .eq('is_public', true)
      .eq('is_active', true),
    supabase.from('club_seats').select('*').in('club_id', ids).order('sort_order'),
  ])

  const slugByClubId = new Map<string, string>()
  for (const c of clubRows) if (c.slug) slugByClubId.set(c.id, c.slug)

  const membersByClub = new Map<string, ClubMember[]>()
  for (const row of membersRes.data ?? []) {
    if (!row.current_club_id) continue
    const list = membersByClub.get(row.current_club_id) ?? []
    list.push(mapMemberRow(row, slugByClubId.get(row.current_club_id)))
    membersByClub.set(row.current_club_id, list)
  }

  const seatsByClub = new Map<string, IndustrySeat[]>()
  for (const row of seatsRes.data ?? []) {
    const list = seatsByClub.get(row.club_id) ?? []
    list.push(mapSeatRow(row))
    seatsByClub.set(row.club_id, list)
  }

  return clubRows.map((row) =>
    mapClubRow(row, seatsByClub.get(row.id) ?? [], membersByClub.get(row.id) ?? [])
  )
}
