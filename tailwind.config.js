/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-hero': ['4.5rem', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-section': ['2.25rem', { lineHeight: '1.18', letterSpacing: '-0.015em' }],
        'display-sm': ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'label': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.09em' }],
      },
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
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // === FABRICIAN WARM WORLD PALETTE ===
        fab: {
          // Worlds palette
          ivory:         '#FCF8F3',
          'ivory-soft':  '#F6F1EA',
          surface:       '#FFFFFF',
          ink:           '#202432',
          muted:         '#69707D',
          line:          '#E8DED2',
          'gold-soft':   '#C8A57A',
          'gold-bright': '#B8924A',
          sage:          '#9BAA8B',
          'sage-dark':   '#7A8F69',
          'powder-blue': '#C8DDED',
          blush:         '#E7C9CF',
          apricot:       '#E6C29B',
          'moon-navy':   '#27324B',
          'moon-dark':   '#1A2235',
          // Brand authority (design.md)
          navy:          '#141B2C',
          'navy-mid':    '#191F2F',
          'navy-light':  '#1E2640',
          gold:          '#C7A36A',
          'gold-deep':   '#9E7E5D',
          brand:         '#F8F2E8',
          cream:         '#EFE4D2',
          leather:       '#6E4B33',
        },
        // Keep fabrician namespace for admin (violet stays)
        fabrician: {
          primary: '#6C5CE7',
          'primary-light': '#A78BFA',
          'primary-dark': '#5B4BD4',
          accent: '#FF8FAB',
          'accent-light': '#FFB3C6',
          gold: '#C8A57A',
          navy: '#27324B',
          'navy-dark': '#1A2235',
        },
      },
      borderRadius: {
        '5xl': '2.5rem',
        '4xl': '2rem',
        '3xl': '1.5rem',
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        // Warm world shadows
        'soft': '0 2px 16px rgba(32,36,50,0.06), 0 1px 3px rgba(32,36,50,0.04)',
        'soft-md': '0 4px 24px rgba(32,36,50,0.08), 0 2px 6px rgba(32,36,50,0.04)',
        'soft-lg': '0 8px 40px rgba(32,36,50,0.10), 0 3px 10px rgba(32,36,50,0.05)',
        'soft-xl': '0 16px 56px rgba(32,36,50,0.12), 0 6px 16px rgba(32,36,50,0.06)',
        'gold-glow': '0 0 24px rgba(200,165,122,0.3), 0 4px 16px rgba(32,36,50,0.08)',
        'card': '0 2px 12px rgba(32,36,50,0.06), 0 1px 3px rgba(32,36,50,0.04)',
        'card-hover': '0 10px 36px rgba(32,36,50,0.12), 0 4px 10px rgba(32,36,50,0.06)',
        // Admin/Studio keep glow
        'glow': '0 0 20px rgba(108,92,231,0.25), 0 4px 12px rgba(0,0,0,0.08)',
        'studio': '0 0 60px rgba(108,92,231,0.2), 0 0 120px rgba(255,143,175,0.1)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(1.5deg)" },
        },
        "float-card": {
          "0%, 100%": { transform: "translateY(0px) rotate(-1deg)" },
          "50%": { transform: "translateY(-8px) rotate(0.5deg)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fabric-wave": {
          "0%, 100%": { borderRadius: "62% 38% 42% 58% / 55% 45% 55% 45%", transform: "scale(1)" },
          "33%": { borderRadius: "42% 58% 68% 32% / 48% 62% 38% 52%", transform: "scale(1.02)" },
          "66%": { borderRadius: "52% 48% 38% 62% / 38% 52% 48% 62%", transform: "scale(0.98)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up-sm": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(108,92,231,0.2)" },
          "50%": { boxShadow: "0 0 35px rgba(108,92,231,0.5)" },
        },
        blob: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", transform: "translate(0,0) rotate(0deg)" },
          "33%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%", transform: "translate(20px,-10px) rotate(2deg)" },
          "66%": { borderRadius: "50% 60% 30% 60% / 30% 60% 70% 40%", transform: "translate(-10px,10px) rotate(-1deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        float: "float 4s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-card": "float-card 5s ease-in-out infinite",
        "soft-pulse": "soft-pulse 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite",
        "fabric-wave": "fabric-wave 10s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in-up-sm": "fade-in-up-sm 0.4s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "slide-up": "slide-up 0.4s ease-out forwards",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        blob: "blob 9s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
