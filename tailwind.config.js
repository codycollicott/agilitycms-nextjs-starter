const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  mode: "jit",
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",     // Next.js App Router
    "./pages/**/*.{js,ts,jsx,tsx}",   // Next.js Pages
    "./components/**/*.{js,ts,jsx,tsx}",
    "./templates/**/*.{js,ts,jsx,tsx}", // your AgilityCMS templates
	],

	theme: {
		fontSize: {
			'9xl': [
				'5rem',
				{
					lineHeight: '100%',
					letterSpacing: '-2.7%',
					fontWeight: '400',
				},
			],
			'8xl': [
				'4.5rem',
				{
					lineHeight: '100%',
					letterSpacing: '-2.7%',
					fontWeight: '400',
				},
			],
			'7xl': [
				'3rem',
				{
					lineHeight: '100%',
					letterSpacing: '-1%',
					fontWeight: '400',
				},
			],
			'6xl': [
				'2rem',
				{
					lineHeight: '100%',
					letterSpacing: '-1%',
					fontWeight: '400',
				},
			],
			'5xl': [
				'1.2rem',
				{
					lineHeight: '133%',
					letterSpacing: '0%',
					fontWeight: '400',
				},
			],
			'4xl': [
				'1rem',
				{
					lineHeight: '100%',
					letterSpacing: '0%',
					fontWeight: '400',
				},
			],
			'sm': [
				'.875rem',
				{
					lineHeight: '135%',
					letterSpacing: '0',
					fontWeight: '400',
				},
			],
			'xs': [
				'.75rem',
				{
					lineHeight: '135%',
					letterSpacing: '0',
					fontWeight: '400',
				},
			],
			
		},
		
		fontFamily: {
			sans: ['NHaasGroteskTXPro', ...fontFamily.sans],
		},
		extend: {

			colors: {
				transparent: "transparent",
				agility: "#222",
				primary: "#24272A",
				secondary: {
					100: "#7c8ba1",
					200: "#667892",
					300: "#506582",
					400: "#3a5173",
					500: "#243E63",
					600: "#203859",
					700: "#1d324f",
					800: "#192b45",
					900: "#16253b",
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/typography")
	],
};
