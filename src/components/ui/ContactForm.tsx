'use client'

import { useState, useId } from 'react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface FormValues {
  name: string
  email: string
  phone: string
  business: string
  category: string
  message: string
  interest: string
}

const INITIAL: FormValues = {
  name: '',
  email: '',
  phone: '',
  business: '',
  category: '',
  message: '',
  interest: 'membership',
}

const INTEREST_OPTIONS = [
  { value: 'membership', label: 'Membership inquiry' },
  { value: 'visitor', label: 'Attend a meeting as a guest' },
  { value: 'chapter', label: 'Start a new chapter' },
  { value: 'general', label: 'General question' },
]

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Partial<FormValues>>({})
  const id = useId()

  const field = (name: keyof FormValues) => `${id}-${name}`

  const validate = (): boolean => {
    const newErrors: Partial<FormValues> = {}
    if (!values.name.trim()) newErrors.name = 'Your name is required.'
    if (!values.email.trim()) newErrors.email = 'Your email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      newErrors.email = 'Please enter a valid email address.'
    if (!values.message.trim()) newErrors.message = 'Please include a message.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
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

    // Simulated submit — replace with actual API endpoint or form service
    await new Promise((res) => setTimeout(res, 1200))
    setStatus('success')
    setValues(INITIAL)
  }

  if (status === 'success') {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="rounded-xl bg-green-50 border border-green-200 p-8 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-secondary font-bold text-xl mb-2">Message Received</h3>
        <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
          Thank you for reaching out. A member of our team will follow up within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="btn-outline mt-6 text-sm py-2"
          aria-label="Send another message"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact ThinkBiz.Solutions"
      className="space-y-5"
    >
      {status === 'error' && (
        <div role="alert" aria-live="assertive" className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          Something went wrong. Please try again or email us directly at{' '}
          <a href="mailto:team@thinkbiz.solutions" className="font-semibold underline">
            team@thinkbiz.solutions
          </a>.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor={field('name')} className="block text-sm font-semibold text-gray-700 mb-1.5">
            Full Name <span aria-hidden="true" className="text-red-500">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id={field('name')}
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            autoComplete="name"
            required
            aria-required="true"
            aria-describedby={errors.name ? `${field('name')}-error` : undefined}
            aria-invalid={!!errors.name}
            placeholder="Jane Smith"
            className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition ${
              errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white focus:border-primary'
            }`}
          />
          {errors.name && (
            <p id={`${field('name')}-error`} role="alert" className="mt-1.5 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor={field('email')} className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email Address <span aria-hidden="true" className="text-red-500">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id={field('email')}
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="email"
            required
            aria-required="true"
            aria-describedby={errors.email ? `${field('email')}-error` : undefined}
            aria-invalid={!!errors.email}
            placeholder="jane@yourbusiness.com"
            className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition ${
              errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white focus:border-primary'
            }`}
          />
          {errors.email && (
            <p id={`${field('email')}-error`} role="alert" className="mt-1.5 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Phone */}
        <div>
          <label htmlFor={field('phone')} className="block text-sm font-semibold text-gray-700 mb-1.5">
            Phone Number
          </label>
          <input
            id={field('phone')}
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            autoComplete="tel"
            placeholder="(405) 000-0000"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>

        {/* Business Name */}
        <div>
          <label htmlFor={field('business')} className="block text-sm font-semibold text-gray-700 mb-1.5">
            Business Name
          </label>
          <input
            id={field('business')}
            name="business"
            type="text"
            value={values.business}
            onChange={handleChange}
            autoComplete="organization"
            placeholder="Acme Consulting LLC"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>
      </div>

      {/* Professional Category */}
      <div>
        <label htmlFor={field('category')} className="block text-sm font-semibold text-gray-700 mb-1.5">
          Professional Category
        </label>
        <input
          id={field('category')}
          name="category"
          type="text"
          value={values.category}
          onChange={handleChange}
          placeholder="e.g. Financial Advisor, General Contractor, Insurance Agent"
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
      </div>

      {/* Interest */}
      <div>
        <label htmlFor={field('interest')} className="block text-sm font-semibold text-gray-700 mb-1.5">
          What can we help you with?
        </label>
        <select
          id={field('interest')}
          name="interest"
          value={values.interest}
          onChange={handleChange}
          aria-label="Select the nature of your inquiry"
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        >
          {INTEREST_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor={field('message')} className="block text-sm font-semibold text-gray-700 mb-1.5">
          Message <span aria-hidden="true" className="text-red-500">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id={field('message')}
          name="message"
          value={values.message}
          onChange={handleChange}
          required
          aria-required="true"
          aria-describedby={errors.message ? `${field('message')}-error` : undefined}
          aria-invalid={!!errors.message}
          rows={5}
          placeholder="Tell us a bit about your business and what you are hoping to get from networking..."
          className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition resize-y min-h-32 ${
            errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white focus:border-primary'
          }`}
        />
        {errors.message && (
          <p id={`${field('message')}-error`} role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full py-4 text-base"
        aria-busy={status === 'submitting'}
        aria-label={status === 'submitting' ? 'Sending your message' : 'Send your message to ThinkBiz.Solutions'}
      >
        {status === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        By submitting this form, you agree to our{' '}
        <a href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</a>.
        We do not sell or share your personal information.
      </p>
    </form>
  )
}
