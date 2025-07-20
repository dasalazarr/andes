/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.gray[400]'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray[400]'),
            '--tw-prose-bullets': theme('colors.primary.DEFAULT'),
            '--tw-prose-hr': theme('colors.border'),
            '--tw-prose-quotes': theme('colors.gray[200]'),
            '--tw-prose-quote-borders': theme('colors.primary.DEFAULT'),
            '--tw-prose-captions': theme('colors.gray[400]'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.gray[300]'),
            '--tw-prose-pre-bg': 'hsl(var(--muted))',
            '--tw-prose-th-borders': theme('colors.border'),
            '--tw-prose-td-borders': theme('colors.border'),
            '--tw-prose-invert-body': theme('colors.gray[300]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.gray[400]'),
            '--tw-prose-invert-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.gray[400]'),
            '--tw-prose-invert-bullets': theme('colors.primary.DEFAULT'),
            '--tw-prose-invert-hr': theme('colors.border'),
            '--tw-prose-invert-quotes': theme('colors.gray[200]'),
            '--tw-prose-invert-quote-borders': theme('colors.primary.DEFAULT'),
            '--tw-prose-invert-captions': theme('colors.gray[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.gray[300]'),
            '--tw-prose-invert-pre-bg': 'hsl(var(--muted))',
            '--tw-prose-invert-th-borders': theme('colors.border'),
            '--tw-prose-invert-td-borders': theme('colors.border'),
             h2: {
                color: 'var(--tw-prose-headings)',
                fontWeight: '600',
                borderBottom: `1px solid ${theme('colors.border')}`,
                paddingBottom: theme('spacing.2'),
              },
              h3: {
                color: 'var(--tw-prose-headings)',
                fontWeight: '600',
              },
              a: {
                color: 'var(--tw-prose-links)',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
          },
        },
      }),
      colors: {
        // Colores existentes...
        // Paleta Andes: Verde base y resalte
        'andes-green': '#006b5b', // Base
        'andes-green-highlight': '#25d366', // Resalte electrizante
        'andes-green-dark': '#005144', // Sombra/hover oscuro
        'andes-green-light': '#25d366', // Para gradientes y hover
        // Gradientes Andes
        'andes-gradient-start': '#006b5b',
        'andes-gradient-end': '#25d366',
        // Sombra electrizante
        'andes-shadow': 'rgba(37, 211, 102, 0.35)',
        'solar-yellow': '#FFC700', // Accent color
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "pulse-slow": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: ".9" },
        },
        "pulse-gradient": {
          "0%, 100%": { 
            background: "linear-gradient(135deg, #006b5b, #25d366)",
            boxShadow: "0 0 15px rgba(37, 211, 102, 0.35)"
          },
          "50%": { 
            background: "linear-gradient(135deg, #25d366, #006b5b)",
            boxShadow: "0 0 25px rgba(37, 211, 102, 0.5)"
          },
        },
        "icon-glow": {
          "0%, 100%": { 
            filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))",
            opacity: "0.8"
          },
          "50%": { 
            filter: "drop-shadow(0 0 5px rgba(255, 199, 0, 0.9))",
            opacity: "1"
          },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "accordion-up": "accordion-up 0.2s ease-out",
        "icon-glow": "icon-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
}