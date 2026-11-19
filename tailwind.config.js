/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: '#0A2E73',
          forestDark: '#061A3D',
          forestLight: '#1348B8',
          sage: '#1348B8',
          sageLight: '#EEF4FF',
          sageMuted: '#C5D4EF',
          ivory: '#F7F4EC',
          ivoryDark: '#EEE8DC',
          surface: '#FFFFFF',
          charcoal: '#111827',
          charcoalMuted: '#4B5563',
          gold: '#1348B8',
          goldLight: '#DCE8FF',
        }
      },
      fontFamily: {
        heading: ['"Manrope"', '"DM Sans"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(10, 46, 115, 0.05)',
        'premium': '0 10px 30px -5px rgba(10, 46, 115, 0.10), 0 4px 12px -2px rgba(10, 46, 115, 0.04)',
        'elevated': '0 20px 40px -15px rgba(10, 46, 115, 0.16)',
      }
    },
  },
  plugins: [],
}
