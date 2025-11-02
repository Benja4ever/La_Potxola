// tailwind.config.ts (o .js)
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: '#434b34',   // color de texto principal
          paper: '#f7f7ee', // color de fondo principal
        },
      },
      fontFamily: {
        // Usa font-sans y font-display en tus clases/utilidades
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
        display: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
      },
      // Opcional: utilidades semánticas tipo text-h1, text-h2...
      fontSize: {
        h1: ['2.5rem', { lineHeight: '1.2' }],     // ≈40px
        h2: ['2rem',   { lineHeight: '1.25' }],    // ≈32px
        h3: ['1.25rem',{ lineHeight: '1.3' }],     // ≈20px
        h4: ['1rem',   { lineHeight: '1.4' }],     // ≈16px
        body: ['1rem', { lineHeight: '1.7' }],     // ≈16px
      },
    },
  },
  plugins: [],
}
