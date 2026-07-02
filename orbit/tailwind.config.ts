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
        background: '#050816',
        surface: '#0D1224',
        card: '#151C34',
        primary: '#3B82F6',
        'primary-glow': 'rgba(59, 130, 246, 0.4)',
        secondary: '#8B5CF6',
        'secondary-glow': 'rgba(139, 92, 246, 0.4)',
        accent: '#06B6D4',
        'accent-glow': 'rgba(6, 182, 212, 0.4)',
        text: '#F8FAFC',
        muted: '#94A3B8',
        success: '#22C55E',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Geist Sans', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
