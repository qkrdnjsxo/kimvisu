import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#667eea',
          dark: '#764ba2',
        },
        bg: {
          light: '#f5f7fa',
          'light-alt': '#e9ecef',
          dark: '#0f0f23',
          'dark-alt': '#1a1a3a',
        },
        text: {
          light: '#1a1a1a',
          dark: '#e0e0e0',
        },
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'glass-light': 'rgba(255, 255, 255, 0.95)',
        'glass-dark': 'rgba(15, 15, 35, 0.4)',
      },
      backdropBlur: {
        'glass': '10px',
      },
      borderRadius: {
        'glass': '20px',
      },
      boxShadow: {
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      spacing: {
        'xs': '12px',
        'sm': '16px',
        'md': '20px',
        'lg': '24px',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

export default config
