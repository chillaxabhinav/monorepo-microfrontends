const path = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	purge: {
		enabled: true,
		content: [path.resolve(process.cwd(), `src/**/*.{js,jsx,ts,tsx}`)]
	},
	theme: {
		fontFamily: {
			sans: ['ixi-type', ...defaultTheme.fontFamily.sans]
		},
		extend: {
			colors: {
				electric: "pink"
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
