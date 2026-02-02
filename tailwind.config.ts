import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
          foreground: "hsl(var(--foreground))",
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
        // Enhanced sky blue palette for glassmorphic design
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe', 
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.2)',
          dark: 'rgba(15, 23, 42, 0.4)',
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "float-sky": {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-15px) rotate(120deg)' },
          '66%': { transform: 'translateY(8px) rotate(240deg)' },
        },
        "pulse-sky": {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(56, 189, 248, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(56, 189, 248, 0)' },
        },
        "shimmer": {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        "gradient-shift": {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '100% 50%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '0% 100%' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-sky": "float-sky 8s ease-in-out infinite",
        "pulse-sky": "pulse-sky 2s infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(56, 189, 248, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-hover': '0 20px 40px rgba(56, 189, 248, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glow-sky': '0 0 20px rgba(56, 189, 248, 0.4), 0 0 40px rgba(56, 189, 248, 0.2)',
        'glow-sky-intense': '0 0 30px rgba(56, 189, 248, 0.6), 0 0 60px rgba(56, 189, 248, 0.4)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
