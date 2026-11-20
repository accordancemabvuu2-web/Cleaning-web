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
        },
        /* Structural tokens used across sections */
        navy: '#0A2E73',
        navyDeep: '#061A3D',
        azure: '#1348B8',
        azureSoft: '#EAF1FF',
        ivory: '#F7F4EC',
        ivoryDeep: '#EFEADD',
        ink: '#0F172A',
        muted: '#4B5563',
      },
      fontFamily: {
        heading: ['"Manrope"', '"DM Sans"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1240px',
        reading: '68ch',
      },
      boxShadow: {
        'subtle': '0 1px 2px rgba(10, 46, 115, 0.04), 0 10px 30px -18px rgba(10, 46, 115, 0.28)',
        'premium': '0 2px 4px rgba(10, 46, 115, 0.05), 0 24px 60px -28px rgba(10, 46, 115, 0.4)',
        'elevated': '0 30px 70px -24px rgba(10, 46, 115, 0.45)',
      }
    },
  },
  plugins: [],
}
