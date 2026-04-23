-- Seed for marketing site: 3 chapters, 13 members, industry seats.
-- Idempotent: safe to re-run. Uses ON CONFLICT upserts keyed on slug / email.
--
-- Run order:
--   1) 20260422140651_marketing_fields.sql (schema)
--   2) This file (seed)
--   3) 20260422140652_marketing_rls.sql (RLS)  -- seed first, then lock down
--
-- IMPORTANT: Member emails below are placeholders (<slug>@thinkbiz-seed.local).
-- Replace them with real emails before the rows are referenced anywhere else
-- (auth.users, weekly_logs FKs, etc.). The marketing site does not expose the
-- email field.

-- ─── CLUBS ────────────────────────────────────────────────────────────────────
INSERT INTO public.clubs
  (slug, display_name, chapter_number, city, area, address, venue_name,
   day_of_week, start_time, meeting_frequency, short_description, description,
   feature_image, map_url, established, target_seats, is_public)
VALUES
  ('okc-north', 'OKC North Chapter', 1, 'Oklahoma City', 'North Oklahoma City',
   '3810 N Tulsa Ave, Oklahoma City, OK 73112', 'The Meeting Room at Tulsa Ave',
   'Tuesday', '7:30 AM', 'Weekly',
   'Our founding chapter — a tight-knit group of OKC professionals meeting every Tuesday morning to grow through referrals.',
   'The OKC North Chapter is the original ThinkBiz.Solutions chapter, established in 2022. This group of established professionals meets every Tuesday morning and has built one of the most active referral cultures in our network. Members span a wide range of complementary industries, creating a high volume of relevant, quality referrals week over week. There are still a handful of open seats available for the right professionals.',
   '/assets/illustrations/team-work-illustration.svg',
   'https://maps.google.com/?q=3810+N+Tulsa+Ave+Oklahoma+City+OK+73112',
   2022, 12, true),

  ('okc-south', 'OKC South Chapter', 2, 'Oklahoma City', 'South Oklahoma City',
   '1221 SW 44th St, Oklahoma City, OK 73119', 'Southside Business Center',
   'Wednesday', '12:00 PM', 'Weekly',
   'A growing midday chapter on the south side of OKC, with several high-value seats still available.',
   'The OKC South Chapter launched in early 2023 and has quickly built a reputation for energy and accountability. This chapter meets every Wednesday at noon, making it an ideal fit for professionals whose mornings are less flexible. With several open seats available across high-demand categories, this is an excellent time to get established in a group that is still building its foundation.',
   '/assets/illustrations/follow-the-leader-illustration.svg',
   'https://maps.google.com/?q=1221+SW+44th+St+Oklahoma+City+OK+73119',
   2023, 10, true),

  ('edmond', 'Edmond Chapter', 3, 'Edmond', 'Edmond, OK',
   '14 E 1st St, Edmond, OK 73034', 'Edmond Community Hub',
   'Thursday', '7:30 AM', 'Weekly',
   'Edmond''s dedicated ThinkBiz chapter — early morning meetings for professionals who want to grow locally.',
   'The Edmond Chapter was established in 2023 to serve the thriving business community in Edmond and surrounding areas. This Thursday morning chapter is actively recruiting members across most professional categories. If you serve Edmond-area clients and want to build referral relationships with other trusted local professionals, this chapter has room for you.',
   '/assets/illustrations/leadership-growth.svg',
   'https://maps.google.com/?q=14+E+1st+St+Edmond+OK+73034',
   2023, 10, true)
ON CONFLICT (slug) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  chapter_number = EXCLUDED.chapter_number,
  city = EXCLUDED.city,
  area = EXCLUDED.area,
  address = EXCLUDED.address,
  venue_name = EXCLUDED.venue_name,
  day_of_week = EXCLUDED.day_of_week,
  start_time = EXCLUDED.start_time,
  meeting_frequency = EXCLUDED.meeting_frequency,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  feature_image = EXCLUDED.feature_image,
  map_url = EXCLUDED.map_url,
  established = EXCLUDED.established,
  target_seats = EXCLUDED.target_seats,
  is_public = EXCLUDED.is_public;

-- ─── MEMBERS ──────────────────────────────────────────────────────────────────
-- Format: one UPSERT per member. current_club_id resolved from clubs.slug.

INSERT INTO public.members
  (email, slug, first_name, last_name, company_name, title, industry, role,
   bio, short_bio, member_headshot, linkedin_url, website_url,
   core_skills, testimonial, member_since,
   current_club_id, is_active, is_public)
VALUES
  ('garrett-hammonds@thinkbiz-seed.local', 'garrett-hammonds', 'Garrett', 'Hammonds',
   'Hammonds Media', 'Founder', 'Digital Marketing', 'President',
   'Garrett Hammonds is the founder of Hammonds Media, a full-service digital marketing and web design agency serving small and mid-sized businesses across Oklahoma. With over a decade of experience building websites and running digital campaigns, Garrett brings a data-driven approach to every project. He joined ThinkBiz.Solutions because he believes strongly in the power of referral relationships — most of his best clients started as a warm introduction from someone he trusted. He currently serves as Chapter President of the OKC North chapter.',
   'Garrett helps local businesses build their online presence through strategic web design and digital marketing.',
   '/assets/illustrations/excitement-illustration.svg',
   'https://www.linkedin.com/in/garretthammonds',
   'https://hammondsmedia.com',
   ARRAY['Website Design','SEO','Google Ads','Social Media Marketing'],
   'ThinkBiz has been one of the single best business decisions I have made. The referrals I receive from my chapter generate more revenue per dollar than any ad campaign I have run.',
   '2022-01-15',
   (SELECT id FROM public.clubs WHERE slug = 'okc-north'), true, true),

  ('sarah-martinez@thinkbiz-seed.local', 'sarah-martinez', 'Sarah', 'Martinez',
   'Martinez Accounting Group', 'CPA', 'Tax Advisor/Tax CPA', 'Vice President',
   'Sarah Martinez founded Martinez Accounting Group after spending eight years in public accounting at a regional firm. She works exclusively with small business owners, helping them understand their numbers, reduce their tax burden, and build financial systems that scale. Sarah has been a ThinkBiz member since the OKC North chapter launched and currently serves as Vice President. Her straightforward, no-jargon approach to accounting has earned her referrals from virtually every member of her chapter.',
   'Sarah is a licensed CPA specializing in small business accounting, tax strategy, and bookkeeping for service-based businesses.',
   '/assets/illustrations/leadership-growth.svg',
   'https://www.linkedin.com/in/sarahmartinezcpa',
   'https://martinezaccounting.com',
   ARRAY['Small Business Tax','Bookkeeping','QuickBooks','Business Formation'],
   'The structured format of ThinkBiz keeps referrals moving consistently. I have built relationships in my chapter that I expect to last my entire career.',
   '2022-01-15',
   (SELECT id FROM public.clubs WHERE slug = 'okc-north'), true, true),

  ('james-whitfield@thinkbiz-seed.local', 'james-whitfield', 'James', 'Whitfield',
   'Whitfield Business Law', 'Attorney', 'Business Law', 'Member',
   'James Whitfield has been practicing business law in Oklahoma City for over 15 years. His firm, Whitfield Business Law, handles everything from LLC and corporation formation to complex commercial contracts and business acquisitions. James joined ThinkBiz because he saw how many of his existing clients were connected to one another — and wanted a structured environment to turn those connections into a reliable referral system. He is known in his chapter for giving thoughtful, specific referrals and always following up.',
   'James is a business attorney focusing on contracts, entity formation, and commercial transactions for Oklahoma entrepreneurs.',
   '/assets/illustrations/follow-the-leader-illustration.svg',
   'https://www.linkedin.com/in/jameswhitfieldlaw',
   NULL,
   ARRAY['Contract Review','Business Formation','Mergers & Acquisitions','Commercial Leases'],
   NULL,
   '2022-03-10',
   (SELECT id FROM public.clubs WHERE slug = 'okc-north'), true, true),

  ('priya-patel@thinkbiz-seed.local', 'priya-patel', 'Priya', 'Patel',
   'Patel Insurance Solutions', 'Broker', 'Commercial Insurance', 'Member',
   'Priya Patel is an independent insurance broker with over ten years of experience placing commercial coverage for small businesses throughout Oklahoma. She represents multiple carriers, which lets her find competitive rates without being locked into a single company''s products. Priya joined ThinkBiz after a colleague recommended it and has since become one of the most active referral givers in her chapter. She genuinely enjoys connecting people and considers relationship-building the most rewarding part of her work.',
   'Priya specializes in commercial insurance packages for small businesses, including general liability, BOP, and workers'' comp.',
   '/assets/illustrations/team-work-illustration.svg',
   'https://www.linkedin.com/in/priyapatelinsurance',
   NULL,
   ARRAY['General Liability','Business Owner Policy','Workers'' Comp','Commercial Auto'],
   'I was skeptical about structured networking at first. Now I cannot imagine running my book of business without it.',
   '2022-06-01',
   (SELECT id FROM public.clubs WHERE slug = 'okc-north'), true, true),

  ('brandon-cole@thinkbiz-seed.local', 'brandon-cole', 'Brandon', 'Cole',
   'Cole Realty Group', 'Realtor', 'Residential Real Estate', 'Member',
   'Brandon Cole has been selling residential real estate in the OKC metro for nine years and consistently ranks among the top agents at his brokerage. He joined ThinkBiz because he recognized that the most sustainable real estate businesses are built on referral relationships, not paid leads. Brandon is known for his thorough market knowledge and his genuine interest in helping clients make sound decisions — not just quick ones.',
   'Brandon is a top-producing residential real estate agent serving the greater Oklahoma City metro area.',
   '/assets/illustrations/business-flying.svg',
   'https://www.linkedin.com/in/brandoncoleokc',
   NULL,
   ARRAY['Buyer Representation','Seller Representation','First-Time Buyers','Investment Properties'],
   NULL,
   '2023-02-01',
   (SELECT id FROM public.clubs WHERE slug = 'okc-north'), true, true),

  ('lisa-tran@thinkbiz-seed.local', 'lisa-tran', 'Lisa', 'Tran',
   'Tran Mortgage Group', 'Mortgage Loan Officer', 'Residential Mortgages', 'Secretary',
   'Lisa Tran has been originating home loans in Oklahoma for over twelve years. She joined ThinkBiz because she works in close proximity to real estate agents, financial planners, and insurance professionals — and found that the structured referral model created natural, accountable partnerships with all of them. Lisa serves as chapter Secretary and is well known for the educational "mortgage minute" she delivers at every meeting to keep the chapter up to date on rate changes and lending trends.',
   'Lisa is a mortgage loan officer helping homebuyers navigate conventional, FHA, VA, and USDA loan programs.',
   '/assets/illustrations/excitement-illustration.svg',
   'https://www.linkedin.com/in/lisatranmortgage',
   NULL,
   ARRAY['Conventional Loans','FHA','VA Loans','USDA','Pre-Approval'],
   NULL,
   '2022-09-15',
   (SELECT id FROM public.clubs WHERE slug = 'okc-north'), true, true),

  ('rachel-kim@thinkbiz-seed.local', 'rachel-kim', 'Rachel', 'Kim',
   'Kim Financial Planning', 'CFP', 'Financial Advisor/Life Insurance', 'Member',
   'Rachel Kim is a CFP® professional and founder of Kim Financial Planning, a fee-only advisory practice serving individuals and small business owners. Her approach centers on clear, conflict-free advice — she does not earn commissions on products she recommends. Rachel joined ThinkBiz because she found that her ideal clients were already connected to mortgage professionals, CPAs, and attorneys in the organization. The cross-referral relationships she has built within her chapter have become the foundation of her client acquisition strategy.',
   'Rachel is a fee-only financial planner helping clients build wealth, plan for retirement, and protect their families.',
   '/assets/illustrations/leadership-growth.svg',
   'https://www.linkedin.com/in/rachelkimcfp',
   NULL,
   ARRAY['Retirement Planning','Investment Management','Estate Planning Coordination','Business Owner Planning'],
   NULL,
   '2023-05-01',
   (SELECT id FROM public.clubs WHERE slug = 'okc-north'), true, true),

  ('david-nguyen@thinkbiz-seed.local', 'david-nguyen', 'David', 'Nguyen',
   'Nguyen Roofing & Exteriors', 'Owner', 'Roofing & Gutters', 'President',
   'David Nguyen founded Nguyen Roofing & Exteriors after working in the industry for over a decade under other contractors. His company handles residential and commercial roofing, siding, gutters, and storm damage claims. David joined ThinkBiz South because he wanted structured access to real estate agents, insurance professionals, and other contractors who regularly encounter homeowners in need of exterior work. He currently serves as Chapter President and is one of the most consistent referral contributors in the group.',
   'David runs a full-service roofing and exterior company serving homeowners and commercial properties across central Oklahoma.',
   '/assets/illustrations/team-work-illustration.svg',
   'https://www.linkedin.com/in/davidnguyenroofing',
   NULL,
   ARRAY['Residential Roofing','Commercial Roofing','Storm Damage','Gutters & Siding'],
   'I have more than tripled my referral revenue since joining ThinkBiz South. The relationships in this group are real.',
   '2023-01-10',
   (SELECT id FROM public.clubs WHERE slug = 'okc-south'), true, true),

  ('amara-williams@thinkbiz-seed.local', 'amara-williams', 'Amara', 'Williams',
   'Williams Estate Law', 'Attorney', 'Estate Planning Law', 'Vice President',
   'Amara Williams has been practicing estate planning law in Oklahoma for eleven years. Her firm, Williams Estate Law, helps individuals and families create wills, trusts, powers of attorney, and comprehensive estate plans that protect what they have built. Amara joined ThinkBiz South because she saw how naturally estate planning intersects with financial planning, insurance, and real estate — and wanted a structured way to build referral partnerships across those disciplines.',
   'Amara is an estate planning attorney helping families protect their assets, plan for the future, and navigate probate.',
   '/assets/illustrations/follow-the-leader-illustration.svg',
   'https://www.linkedin.com/in/amarawilliamslaw',
   NULL,
   ARRAY['Wills & Trusts','Probate','Powers of Attorney','Business Succession Planning'],
   NULL,
   '2023-03-01',
   (SELECT id FROM public.clubs WHERE slug = 'okc-south'), true, true),

  ('carlos-mendez@thinkbiz-seed.local', 'carlos-mendez', 'Carlos', 'Mendez',
   'Mendez Financial Group', 'Insurance Specialist', 'Health Insurance', 'Member',
   'Carlos Mendez has been in the insurance industry for fourteen years, specializing in life insurance, disability income protection, and group health plans for small businesses. He joined ThinkBiz South because he wanted a community of trusted professionals he could confidently refer clients to — and who would return the favor. Carlos believes deeply in the educational component of networking and regularly brings guest speakers on financial protection topics to his chapter meetings.',
   'Carlos helps individuals, families, and small business owners secure life, disability, and health insurance coverage.',
   '/assets/illustrations/business-flying.svg',
   'https://www.linkedin.com/in/carlosmendezinsurance',
   NULL,
   ARRAY['Life Insurance','Disability Insurance','Group Health Benefits','Key Person Coverage'],
   NULL,
   '2023-06-15',
   (SELECT id FROM public.clubs WHERE slug = 'okc-south'), true, true),

  ('jennifer-brooks@thinkbiz-seed.local', 'jennifer-brooks', 'Jennifer', 'Brooks',
   'Brooks HR Consulting', 'HR Consultant', 'Human Resources', 'Member',
   'Jennifer Brooks founded Brooks HR Consulting after spending twelve years as an HR director at a mid-size Oklahoma City company. She now works with small businesses that have outgrown informal people management but are not yet ready to hire a full-time HR professional. Her services range from employee handbooks and compliance audits to full payroll administration and benefits management. Jennifer joined ThinkBiz South because her ideal clients — growing businesses with 5 to 50 employees — are the same businesses that other members in the group serve.',
   'Jennifer helps growing businesses manage HR compliance, payroll, and employee benefits without the overhead of a full HR department.',
   '/assets/illustrations/excitement-illustration.svg',
   'https://www.linkedin.com/in/jenniferbookshr',
   NULL,
   ARRAY['HR Compliance','Payroll Administration','Employee Handbooks','Benefits Management'],
   NULL,
   '2023-09-01',
   (SELECT id FROM public.clubs WHERE slug = 'okc-south'), true, true),

  ('mike-patterson@thinkbiz-seed.local', 'mike-patterson', 'Mike', 'Patterson',
   'Patterson Home Services', 'Owner', 'HVAC – Heating & Air', 'President',
   'Mike Patterson founded Patterson Home Services twelve years ago with a single service van. Today his company runs a fleet of eight vehicles and serves hundreds of homeowners across Edmond and northern Oklahoma City. Mike joined the ThinkBiz Edmond chapter because he works alongside real estate agents, insurance agents, and contractors daily — and wanted a formalized system for turning those relationships into mutual referrals. He currently serves as Chapter President.',
   'Mike runs a residential and light commercial HVAC and plumbing company serving the Edmond and north OKC area.',
   '/assets/illustrations/team-work-illustration.svg',
   'https://www.linkedin.com/in/mikepatersonhvac',
   NULL,
   ARRAY['HVAC Installation','HVAC Repair','Plumbing','Water Heaters'],
   'I joined ThinkBiz Edmond because I knew the people in the room could send me work. What I did not expect was how much I would enjoy showing up every week.',
   '2023-04-01',
   (SELECT id FROM public.clubs WHERE slug = 'edmond'), true, true),

  ('taylor-reed@thinkbiz-seed.local', 'taylor-reed', 'Taylor', 'Reed',
   'Reed Photography & Video', 'Photographer', 'Photographer', 'Member',
   'Taylor Reed has been shooting commercial photography and video in the Oklahoma City area for eight years. Their work spans branding shoots, professional headshots, product photography, and short-form video for social media and websites. Taylor joined the Edmond chapter because they work with many of the same businesses as marketing consultants, web designers, and realtors — and found that referral networking was the most effective way to grow a creative services business sustainably.',
   'Taylor is a commercial photographer and videographer specializing in branding, headshots, and content for local businesses.',
   '/assets/illustrations/leadership-growth.svg',
   'https://www.linkedin.com/in/taylorreedphoto',
   NULL,
   ARRAY['Brand Photography','Headshots','Product Photography','Social Media Video'],
   NULL,
   '2023-07-01',
   (SELECT id FROM public.clubs WHERE slug = 'edmond'), true, true)
ON CONFLICT (email) DO UPDATE SET
  slug = EXCLUDED.slug,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  company_name = EXCLUDED.company_name,
  title = EXCLUDED.title,
  industry = EXCLUDED.industry,
  role = EXCLUDED.role,
  bio = EXCLUDED.bio,
  short_bio = EXCLUDED.short_bio,
  member_headshot = EXCLUDED.member_headshot,
  linkedin_url = EXCLUDED.linkedin_url,
  website_url = EXCLUDED.website_url,
  core_skills = EXCLUDED.core_skills,
  testimonial = EXCLUDED.testimonial,
  member_since = EXCLUDED.member_since,
  current_club_id = EXCLUDED.current_club_id,
  is_active = EXCLUDED.is_active,
  is_public = EXCLUDED.is_public;

-- ─── CLUB SEATS ───────────────────────────────────────────────────────────────
-- Each (club, industry) slot. Filled seats link to the member via email lookup.

-- OKC North (7 filled, 5 open)
INSERT INTO public.club_seats (club_id, industry, industry_slug, status, member_id, sort_order)
SELECT c.id, v.industry, v.industry_slug, v.status,
       (SELECT id FROM public.members WHERE email = v.member_email),
       v.sort_order
FROM (VALUES
  ('Digital Marketing', 'digital-marketing', 'filled', 'garrett-hammonds@thinkbiz-seed.local', 1),
  ('Tax Advisor/Tax CPA', 'tax-advisor-tax-cpa', 'filled', 'sarah-martinez@thinkbiz-seed.local', 2),
  ('Business Law', 'business-law', 'filled', 'james-whitfield@thinkbiz-seed.local', 3),
  ('Commercial Insurance', 'commercial-insurance', 'filled', 'priya-patel@thinkbiz-seed.local', 4),
  ('Residential Real Estate', 'residential-real-estate', 'filled', 'brandon-cole@thinkbiz-seed.local', 5),
  ('Residential Mortgages', 'residential-mortgages', 'filled', 'lisa-tran@thinkbiz-seed.local', 6),
  ('Financial Advisor/Life Insurance', 'financial-advisor-life-insurance', 'filled', 'rachel-kim@thinkbiz-seed.local', 7),
  ('HVAC – Heating & Air', 'hvac-heating-air', 'open', NULL, 8),
  ('Human Resources', 'human-resources', 'open', NULL, 9),
  ('Commercial Real Estate', 'commercial-real-estate', 'open', NULL, 10),
  ('Chiropractor', 'chiropractor', 'open', NULL, 11),
  ('Title Services', 'title-services', 'open', NULL, 12)
) AS v(industry, industry_slug, status, member_email, sort_order),
     public.clubs c
WHERE c.slug = 'okc-north'
ON CONFLICT (club_id, industry_slug) WHERE industry_slug <> 'other' DO UPDATE SET
  industry = EXCLUDED.industry,
  status = EXCLUDED.status,
  member_id = EXCLUDED.member_id,
  sort_order = EXCLUDED.sort_order;

-- OKC South (4 filled, 6 open)
INSERT INTO public.club_seats (club_id, industry, industry_slug, status, member_id, sort_order)
SELECT c.id, v.industry, v.industry_slug, v.status,
       (SELECT id FROM public.members WHERE email = v.member_email),
       v.sort_order
FROM (VALUES
  ('Roofing & Gutters', 'roofing-gutters', 'filled', 'david-nguyen@thinkbiz-seed.local', 1),
  ('Estate Planning Law', 'estate-planning-law', 'filled', 'amara-williams@thinkbiz-seed.local', 2),
  ('Health Insurance', 'health-insurance', 'filled', 'carlos-mendez@thinkbiz-seed.local', 3),
  ('Human Resources', 'human-resources', 'filled', 'jennifer-brooks@thinkbiz-seed.local', 4),
  ('Bookkeeping', 'bookkeeping', 'open', NULL, 5),
  ('Residential Mortgages', 'residential-mortgages', 'open', NULL, 6),
  ('Residential Real Estate', 'residential-real-estate', 'open', NULL, 7),
  ('Web Design & Development', 'web-design-development', 'open', NULL, 8),
  ('Financial Advisor/Life Insurance', 'financial-advisor-life-insurance', 'open', NULL, 9),
  ('Cleaning Service', 'cleaning-service', 'open', NULL, 10)
) AS v(industry, industry_slug, status, member_email, sort_order),
     public.clubs c
WHERE c.slug = 'okc-south'
ON CONFLICT (club_id, industry_slug) WHERE industry_slug <> 'other' DO UPDATE SET
  industry = EXCLUDED.industry,
  status = EXCLUDED.status,
  member_id = EXCLUDED.member_id,
  sort_order = EXCLUDED.sort_order;

-- Edmond (2 filled, 8 open)
INSERT INTO public.club_seats (club_id, industry, industry_slug, status, member_id, sort_order)
SELECT c.id, v.industry, v.industry_slug, v.status,
       (SELECT id FROM public.members WHERE email = v.member_email),
       v.sort_order
FROM (VALUES
  ('HVAC – Heating & Air', 'hvac-heating-air', 'filled', 'mike-patterson@thinkbiz-seed.local', 1),
  ('Photographer', 'photographer', 'filled', 'taylor-reed@thinkbiz-seed.local', 2),
  ('Tax Advisor/Tax CPA', 'tax-advisor-tax-cpa', 'open', NULL, 3),
  ('Business Law', 'business-law', 'open', NULL, 4),
  ('Commercial Insurance', 'commercial-insurance', 'open', NULL, 5),
  ('Residential Real Estate', 'residential-real-estate', 'open', NULL, 6),
  ('Residential Mortgages', 'residential-mortgages', 'open', NULL, 7),
  ('Financial Advisor/Life Insurance', 'financial-advisor-life-insurance', 'open', NULL, 8),
  ('Landscape Services', 'landscape-services', 'open', NULL, 9),
  ('Personal Trainer – Fitness', 'personal-trainer-fitness', 'open', NULL, 10)
) AS v(industry, industry_slug, status, member_email, sort_order),
     public.clubs c
WHERE c.slug = 'edmond'
ON CONFLICT (club_id, industry_slug) WHERE industry_slug <> 'other' DO UPDATE SET
  industry = EXCLUDED.industry,
  status = EXCLUDED.status,
  member_id = EXCLUDED.member_id,
  sort_order = EXCLUDED.sort_order;
