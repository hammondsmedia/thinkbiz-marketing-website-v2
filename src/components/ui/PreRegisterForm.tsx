'use client'

import { useState, useId } from 'react'
import type { Club } from '@/types/club'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface FormValues {
  name: string
  email: string
  phone: string
  business: string
  industry: string
  preferredDate: string
  heardFrom: string
  note: string
}

const INITIAL: FormValues = {
  name: '',
  email: '',
  phone: '',
  business: '',
  industry: '',
  preferredDate: '',
  heardFrom: '',
  note: '',
}

const HEARD_FROM_OPTIONS = [
  { value: '', label: 'Select an option' },
  { value: 'member-referral', label: 'Referred by a member' },
  { value: 'google', label: 'Google search' },
  { value: 'social-media', label: 'Social media' },
  { value: 'existing-member', label: "I'm already a member of another chapter" },
  { value: 'event', label: 'Local event or community' },
  { value: 'other', label: 'Other' },
]

interface PreRegisterFormProps {
  club: Club
}

export function PreRegisterForm({ club }: PreRegisterFormProps) {
  const [values, setValues] = useState<FormValues>(INITIAL)
  const [errors, setErrors] = useState<Partial<FormValues>>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const formId = useId()

  const field = (name: keyof FormValues) => `${formId}-${name}`

  const validate = (): boolean => {
    const e: Partial<FormValues> = {}
    if (!values.name.trim()) e.name = 'Your name is required.'
    if (!values.email.trim()) e.email = 'Your email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = 'Please enter a valid email address.'
    if (!values.industry.trim()) e.industry = 'Your professional category helps us prepare for your visit.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    // Simulated submit — replace with real form endpoint
    await new Promise((res) => setTimeout(res, 1200))
    setStatus('success')
    setValues(INITIAL)
  }

  if (status === 'success') {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-bold text-secondary text-xl mb-2">You're Registered!</h3>
        <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto mb-2">
          Thanks for pre-registering to visit the <strong>{club.name}</strong>. A member of our
          team will reach out within one business day to confirm your visit details.
        </p>
        <p className="text-gray-500 text-xs">
          Meetings are held every <strong>{club.meetingDay}</strong> at <strong>{club.meetingTime}</strong> at {club.venueName}.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="btn-outline mt-6 text-sm py-2"
          aria-label="Submit another pre-registration"
        >
          Register Again
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={`Pre-register to visit the ${club.name}`}
      className="space-y-5"
    >
      {status === 'error' && (
        <div role="alert" aria-live="assertive" className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          Something went wrong. Please try again or{' '}
          <a href="/contact" className="font-semibold underline">contact us directly</a>.
        </div>
      )}

      {/* Hidden club field — would be sent with real form submission */}
      <input type="hidden" name="club" value={club.name} />

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label htmlFor={field('name')} className="block text-sm font-semibold text-gray-700 mb-1.5">
            Full Name <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id={field('name')} name="name" type="text"
            value={values.name} onChange={handleChange}
            autoComplete="name" required aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${field('name')}-err` : undefined}
            placeholder="Jane Smith"
            className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white focus:border-primary'}`}
          />
          {errors.name && <p id={`${field('name')}-err`} role="alert" className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor={field('email')} className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email Address <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id={field('email')} name="email" type="email"
            value={values.email} onChange={handleChange}
            autoComplete="email" required aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${field('email')}-err` : undefined}
            placeholder="jane@yourbusiness.com"
            className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white focus:border-primary'}`}
          />
          {errors.email && <p id={`${field('email')}-err`} role="alert" className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Phone */}
        <div>
          <label htmlFor={field('phone')} className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
          <input
            id={field('phone')} name="phone" type="tel"
            value={values.phone} onChange={handleChange}
            autoComplete="tel" placeholder="(405) 000-0000"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>

        {/* Business */}
        <div>
          <label htmlFor={field('business')} className="block text-sm font-semibold text-gray-700 mb-1.5">Business Name</label>
          <input
            id={field('business')} name="business" type="text"
            value={values.business} onChange={handleChange}
            autoComplete="organization" placeholder="Acme Consulting LLC"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>
      </div>

      {/* Industry / Category */}
      <div>
        <label htmlFor={field('industry')} className="block text-sm font-semibold text-gray-700 mb-1.5">
          Professional Category <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id={field('industry')} name="industry" type="text"
          value={values.industry} onChange={handleChange}
          required aria-required="true"
          aria-invalid={!!errors.industry}
          aria-describedby={errors.industry ? `${field('industry')}-err` : `${field('industry')}-hint`}
          placeholder="e.g. CPA / Accountant, Mortgage Broker, Insurance Agent"
          className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition ${errors.industry ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white focus:border-primary'}`}
        />
        <p id={`${field('industry')}-hint`} className="mt-1 text-xs text-gray-400">
          This helps us confirm whether your category has an open seat.
        </p>
        {errors.industry && <p id={`${field('industry')}-err`} role="alert" className="mt-1 text-xs text-red-600">{errors.industry}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Preferred date */}
        <div>
          <label htmlFor={field('preferredDate')} className="block text-sm font-semibold text-gray-700 mb-1.5">
            Preferred Visit Date
          </label>
          <input
            id={field('preferredDate')} name="preferredDate" type="date"
            value={values.preferredDate} onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            aria-describedby={`${field('preferredDate')}-hint`}
          />
          <p id={`${field('preferredDate')}-hint`} className="mt-1 text-xs text-gray-400">
            Meetings are every {club.meetingDay} at {club.meetingTime}.
          </p>
        </div>

        {/* How did you hear */}
        <div>
          <label htmlFor={field('heardFrom')} className="block text-sm font-semibold text-gray-700 mb-1.5">
            How Did You Hear About Us?
          </label>
          <select
            id={field('heardFrom')} name="heardFrom"
            value={values.heardFrom} onChange={handleChange}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          >
            {HEARD_FROM_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Note */}
      <div>
        <label htmlFor={field('note')} className="block text-sm font-semibold text-gray-700 mb-1.5">
          Anything Else We Should Know?
        </label>
        <textarea
          id={field('note')} name="note"
          value={values.note} onChange={handleChange}
          rows={3}
          placeholder="Questions about the chapter, specific seats you are interested in, or anything else..."
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting'}
        className="btn-accent w-full py-4 text-base font-bold"
        aria-label={`Pre-register to visit the ${club.name}`}
      >
        {status === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </span>
        ) : (
          'Pre-Register to Visit'
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        No commitment required. Visiting is free. We will confirm your details within one business day.
      </p>
    </form>
  )
}
