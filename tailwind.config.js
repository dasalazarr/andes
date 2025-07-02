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
        // Nuevos colores púrpura más vibrantes
        'neon-purple': '#9B5DE5', // CTA base
        'purple-hover': '#7F3BFF', // CTA hover
        'link-purple': '#8C30FF', // Links
        'link-purple-hover': '#671BFF', // Links hover
        'bg-purple-dark': '#270046', // Deep background
        'bg-purple-light': '#581B98', // Background gradient end
        'electric-fuchsia': '#C32AFF', // Highlights base
        'fuchsia-hover': '#A516FF', // Highlight hover
        'fuchsia-gradient-start': '#BB29FF', // CTA gradient start
        'fuchsia-gradient-end': '#FF5DF1', // Electric Fuchsia gradient end
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
            background: "linear-gradient(135deg, #BB29FF, #7F3BFF)",
            boxShadow: "0 0 15px rgba(155, 93, 229, 0.35)"
          },
          "50%": { 
            background: "linear-gradient(135deg, #7F3BFF, #BB29FF)",
            boxShadow: "0 0 25px rgba(195, 42, 255, 0.5)"
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