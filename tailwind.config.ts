
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				pirate: {
					navy: '#1A3249',
					wood: '#8B4513',
					gold: '#FFD700',
					parchment: '#F5F0DC',
					darkwood: '#5D4037',
					rope: '#C8B083',
					sea: '#3A7CA5'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'spin-reel': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-100%)' }
				},
				'coin-fall': {
					'0%': { transform: 'translateY(-50px) rotate(0deg)', opacity: '1' },
					'100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' }
				},
				'lever-pull': {
					'0%': { transform: 'rotate(0deg)' },
					'50%': { transform: 'rotate(-30deg)' },
					'100%': { transform: 'rotate(0deg)' }
				},
				'float': {
					'0%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
					'100%': { transform: 'translateY(0px)' }
				},
				// New animations
				'swing': {
					'0%': { transform: 'rotate(0deg)' },
					'25%': { transform: 'rotate(5deg)' },
					'50%': { transform: 'rotate(0deg)' },
					'75%': { transform: 'rotate(-5deg)' },
					'100%': { transform: 'rotate(0deg)' }
				},
				'sail': {
					'0%': { transform: 'translateX(0) rotate(0deg)' },
					'50%': { transform: 'translateX(-30px) rotate(-2deg)' },
					'100%': { transform: 'translateX(0) rotate(0deg)' }
				},
				'sail-horizontal': {
					'0%': { transform: 'translateX(-100vw) rotate(0deg)' },
					'100%': { transform: 'translateX(100vw) rotate(0deg)' }
				},
				'pulse-glow': {
					'0%': { filter: 'drop-shadow(0 0 0px rgba(255, 215, 0, 0))' },
					'50%': { filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.7))' },
					'100%': { filter: 'drop-shadow(0 0 0px rgba(255, 215, 0, 0))' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'spin-reel': 'spin-reel 0.5s linear infinite',
				'coin-fall': 'coin-fall 2s linear forwards',
				'lever-pull': 'lever-pull 0.5s ease-in-out',
				'float': 'float 3s ease-in-out infinite',
				// New animations
				'swing': 'swing 6s ease-in-out infinite',
				'sail': 'sail 20s ease-in-out infinite',
				'sail-horizontal': 'sail-horizontal 60s linear infinite',
				'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
				'bounce-subtle': 'bounce-subtle 3s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 20s linear infinite'
			},
			fontFamily: {
				'pirata': ['"Pirata One"', 'cursive'],
				'sans': ['Inter', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
