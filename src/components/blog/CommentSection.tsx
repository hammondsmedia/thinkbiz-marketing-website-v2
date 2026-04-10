'use client'

import { useState, useId } from 'react'
import { formatDate } from '@/lib/utils'

interface Comment {
  id: string
  name: string
  date: string
  body: string
}

// Seed comments per post slug
const SEED_COMMENTS: Record<string, Comment[]> = {
  'why-referral-networking-beats-cold-outreach': [
    {
      id: 'c1',
      name: 'Marcus T.',
      date: '2026-03-18T14:30:00Z',
      body: "This is exactly what I needed to read. I've been spending so much on cold email campaigns with minimal return. Going to look into ThinkBiz for my financial planning practice.",
    },
    {
      id: 'c2',
      name: 'Linda R.',
      date: '2026-03-21T09:15:00Z',
      body: "The stat about referred customers having 16-25% higher lifetime value is striking. We see this in our own business — referrals almost never churn. Great article.",
    },
  ],
}

interface CommentSectionProps {
  postSlug: string
}

export function CommentSection({ postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(SEED_COMMENTS[postSlug] ?? [])
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; body?: string }>({})
  const id = useId()

  const validate = () => {
    const e: { name?: string; body?: string } = {}
    if (!name.trim()) e.name = 'Please enter your name.'
    if (!body.trim() || body.trim().length < 10) e.body = 'Please write at least 10 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const newComment: Comment = {
      id: `c${Date.now()}`,
      name: name.trim(),
      date: new Date().toISOString(),
      body: body.trim(),
    }
    setComments((prev) => [...prev, newComment])
    setName('')
    setBody('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section aria-labelledby="comments-heading" className="mt-12">
      <h2 id="comments-heading" className="text-secondary text-2xl font-bold mb-6">
        {comments.length > 0 ? `${comments.length} Comment${comments.length > 1 ? 's' : ''}` : 'Leave a Comment'}
      </h2>

      {/* Existing comments */}
      {comments.length > 0 && (
        <div className="space-y-5 mb-10" aria-label="Reader comments">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-slate-50 rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm"
                  aria-hidden="true"
                >
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-secondary text-sm">{comment.name}</p>
                  <time dateTime={comment.date} className="text-xs text-gray-400">
                    {formatDate(comment.date)}
                  </time>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{comment.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* Comment form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-secondary font-bold text-lg mb-5">Join the Conversation</h3>

        {submitted && (
          <div role="alert" aria-live="polite" className="mb-5 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium">
            Your comment has been posted. Thank you for sharing your thoughts!
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate aria-label="Submit a comment">
          <div className="mb-4">
            <label htmlFor={`${id}-name`} className="block text-sm font-semibold text-gray-700 mb-1.5">
              Name <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id={`${id}-name`}
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors((p) => ({ ...p, name: undefined }))
              }}
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${id}-name-error` : undefined}
              placeholder="Your first name"
              className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
            />
            {errors.name && <p id={`${id}-name-error`} role="alert" className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor={`${id}-body`} className="block text-sm font-semibold text-gray-700 mb-1.5">
              Comment <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <textarea
              id={`${id}-body`}
              value={body}
              onChange={(e) => {
                setBody(e.target.value)
                if (errors.body) setErrors((p) => ({ ...p, body: undefined }))
              }}
              required
              aria-required="true"
              aria-invalid={!!errors.body}
              aria-describedby={errors.body ? `${id}-body-error` : undefined}
              rows={4}
              placeholder="Share your thoughts or questions..."
              className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition resize-y ${
                errors.body ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
            />
            {errors.body && <p id={`${id}-body-error`} role="alert" className="mt-1 text-xs text-red-600">{errors.body}</p>}
          </div>

          <button type="submit" className="btn-primary text-sm py-2.5 px-6" aria-label="Post your comment">
            Post Comment
          </button>
        </form>
      </div>
    </section>
  )
}
