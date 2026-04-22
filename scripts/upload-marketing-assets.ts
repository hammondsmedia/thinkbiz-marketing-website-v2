/**
 * One-shot: upload local illustration assets to Supabase Storage and print the
 * public URLs so we can plug them into the `members.member_headshot` and
 * `clubs.feature_image` columns.
 *
 * Usage:
 *   1. Create a public Storage bucket named `marketing-assets` in the Supabase
 *      dashboard (or adjust BUCKET below).
 *   2. Export SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL in your
 *      local shell. DO NOT commit the service-role key.
 *      export NEXT_PUBLIC_SUPABASE_URL="https://basrdqwpynzaepmhdbze.supabase.co"
 *      export SUPABASE_SERVICE_ROLE_KEY="<from dashboard: Settings → API>"
 *   3. Run: `npx tsx scripts/upload-marketing-assets.ts`
 *      (or `node --loader ts-node/esm scripts/upload-marketing-assets.ts`)
 *   4. Copy the emitted `UPDATE` statements into the Supabase SQL editor to
 *      replace local `/assets/...` paths with the new public URLs.
 *
 * Safe to re-run: upsert=true means re-uploaded files overwrite.
 */

import { createClient } from '@supabase/supabase-js'
import { readFile, readdir } from 'node:fs/promises'
import { join, extname } from 'node:path'

const BUCKET = 'marketing-assets'
const LOCAL_DIR = join(process.cwd(), 'public', 'assets', 'illustrations')
const REMOTE_PREFIX = 'illustrations'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env var.'
  )
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
})

function contentTypeFor(filename: string): string {
  switch (extname(filename).toLowerCase()) {
    case '.svg':
      return 'image/svg+xml'
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.webp':
      return 'image/webp'
    default:
      return 'application/octet-stream'
  }
}

async function main() {
  const files = await readdir(LOCAL_DIR)
  const results: Array<{ localPath: string; publicUrl: string }> = []

  for (const file of files) {
    const localPath = join(LOCAL_DIR, file)
    const remotePath = `${REMOTE_PREFIX}/${file}`
    const buffer = await readFile(localPath)

    const { error } = await supabase.storage.from(BUCKET).upload(remotePath, buffer, {
      contentType: contentTypeFor(file),
      upsert: true,
    })
    if (error) {
      console.error(`✗ ${file}: ${error.message}`)
      continue
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(remotePath)
    results.push({
      localPath: `/assets/illustrations/${file}`,
      publicUrl: data.publicUrl,
    })
    console.error(`✓ ${file} → ${data.publicUrl}`)
  }

  console.log('')
  console.log('-- Paste into Supabase SQL editor to replace local paths:')
  for (const { localPath, publicUrl } of results) {
    console.log(
      `UPDATE public.members  SET member_headshot = '${publicUrl}' WHERE member_headshot = '${localPath}';`
    )
    console.log(
      `UPDATE public.clubs    SET feature_image   = '${publicUrl}' WHERE feature_image   = '${localPath}';`
    )
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
