import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#21bdc8',
          50: '#f0fafa',
          100: '#d0f2f4',
          200: '#a5e6ea',
          300: '#6dd3db',
          400: '#35bac6',
          500: '#21bdc8',
          600: '#148d9b',
          700: '#12727e',
          800: '#135c66',
          900: '#134c56',
          950: '#09313a',
        },
        secondary: {
          DEFAULT: '#086788',
          50: '#f0f9ff',
          100: '#dff2fd',
          200: '#b7e5fb',
          300: '#78d2f8',
          400: '#32bcf3',
          500: '#08a4e2',
          600: '#0082bf',
          700: '#086788',
          800: '#065571',
          900: '#09475e',
          950: '#062d3f',
        },
        accent: {
          DEFAULT: '#f0c808',
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#f0c808',
          500: '#d4af07',
          600: '#a58506',
          700: '#7c6208',
          800: '#654f0e',
          900: '#554212',
          950: '#312308',
        },
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', 'sans-serif'],
        lato: ['Lato', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', fontWeight: '900' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', fontWeight: '700' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'display-sm': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.3', fontWeight: '600' }],
      },
      spacing: {
        section: '5rem',
        'section-sm': '3rem',
      },
      maxWidth: {
        prose: '68ch',
        site: '1280px',
      },
      borderRadius: {
        brand: '0.5rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 16px 0 rgba(33,189,200,0.08)',
        'card-hover': '0 4px 12px 0 rgba(0,0,0,0.10), 0 8px 32px 0 rgba(33,189,200,0.14)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'progress-bar': 'progressBar 0.1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#1a1a1a',
            '--tw-prose-headings': '#086788',
            '--tw-prose-links': '#21bdc8',
            '--tw-prose-bold': '#000000',
            maxWidth: '68ch',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
