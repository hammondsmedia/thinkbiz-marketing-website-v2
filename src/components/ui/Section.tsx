import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'white' | 'alt' | 'primary' | 'secondary' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  'aria-labelledby'?: string
}

const backgroundClasses = {
  white: 'bg-white',
  alt: 'bg-slate-50',
  primary: 'bg-primary/5',
  secondary: 'bg-secondary text-white',
  dark: 'bg-gray-900 text-white',
}

const paddingClasses = {
  sm: 'py-12 lg:py-16',
  md: 'py-16 lg:py-24',
  lg: 'py-20 lg:py-32',
}

export function Section({
  children,
  className,
  id,
  background = 'white',
  size = 'md',
  'aria-labelledby': ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(backgroundClasses[background], paddingClasses[size], className)}
      aria-labelledby={ariaLabelledBy}
    >
      <div className="container-site">{children}</div>
    </section>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  titleId?: string
  description?: string
  align?: 'left' | 'center'
  titleAs?: 'h1' | 'h2' | 'h3'
  className?: string
  light?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  titleId,
  description,
  align = 'center',
  titleAs: TitleTag = 'h2',
  className,
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl',
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'text-sm font-bold uppercase tracking-widest mb-3',
            light ? 'text-accent' : 'text-primary'
          )}
          aria-label={`Section: ${eyebrow}`}
        >
          {eyebrow}
        </p>
      )}
      <TitleTag
        id={titleId}
        className={cn(
          'font-black leading-tight mb-4',
          'text-3xl md:text-4xl',
          light ? 'text-white' : 'text-secondary'
        )}
      >
        {title}
      </TitleTag>
      {description && (
        <p
          className={cn(
            'text-lg leading-relaxed',
            light ? 'text-blue-100' : 'text-gray-600'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
