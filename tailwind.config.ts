import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Primary Colors
        'primary-burgundy': '#722F37',
        'primary-burgundy-dark': '#5A252C',
        'primary-burgundy-light': '#8B3D47',
        'primary-wine': '#4A1C22',
        'primary-wine-dark': '#3A1519',
        'primary-navy': '#1E3A5F',
        'primary-navy-dark': '#152A45',
        'primary-navy-light': '#2A4A73',
        // Secondary Colors
        'secondary-cream': '#FDF8F3',
        'secondary-ivory': '#FFFEF7',
        'warm-white': '#FAF7F2',
        'warm-beige': '#F5EDE3',
        'rose-cream': '#FBF0ED',
        // Accent Colors
        'accent-gold': '#C9A961',
        'accent-gold-light': '#D4B978',
        'accent-gold-dark': '#B8944A',
        'accent-copper': '#B87333',
        'accent-bronze': '#A67B5B',
        'accent-emerald': '#2D5A4A',
        'accent-rose': '#D4A5A5',
        // Text Colors
        'text-primary': '#2D2D2D',
        'text-secondary': '#5A5A5A',
        'text-muted': '#8A8A8A',
        'text-warm': '#4A3F35',
        'text-cream': '#F5EDE3',
        // UI Colors
        'border-light': '#E8E2D9',
        'border-medium': '#D4C9BC',
        'border-gold': '#D4B97833',
        'border-wine': '#722F3740',
      },
      fontFamily: {
        lumiFontLato: "var(--font-body), 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        lumiFontChivo: "var(--font-heading), Georgia, 'Times New Roman', serif",
        display: "var(--font-heading), Georgia, 'Times New Roman', serif",
        body: "var(--font-body), 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        heading: "var(--font-heading), Georgia, 'Times New Roman', serif",
      },
      boxShadow: {
        'card': '0 4px 12px rgba(30, 58, 95, 0.08)',
        'card-hover': '0 12px 24px rgba(30, 58, 95, 0.15)',
        'elegant': '0 2px 8px rgba(30, 58, 95, 0.06)',
        'nav': '0 2px 12px rgba(74, 28, 34, 0.15)',
        'nav-burgundy': '0 4px 20px rgba(74, 28, 34, 0.25)',
        'footer': '0 -4px 20px rgba(74, 28, 34, 0.1)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
