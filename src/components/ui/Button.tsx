import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  external?: boolean
  className?: string
  children: React.ReactNode
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  'aria-label'?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-secondary focus-visible:outline-primary',
  secondary: 'bg-secondary text-white hover:bg-primary focus-visible:outline-secondary',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:outline-primary',
  accent: 'bg-accent text-gray-900 hover:bg-yellow-400 focus-visible:outline-accent',
  ghost: 'text-primary hover:bg-primary/10 focus-visible:outline-primary',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  className,
  children,
  disabled,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  )

  if (href) {
    const externalProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}

    return (
      <Link href={href} className={classes} aria-label={ariaLabel} {...externalProps}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
