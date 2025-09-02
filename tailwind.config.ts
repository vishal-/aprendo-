
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00A79D', // A shade of green-blue
        secondary: '#00796B', // A darker shade
        accent: '#4DD0E1', // A lighter blue
        light: '#F0F4F8', // A very light blue-gray
        dark: '#263238', // A dark slate gray
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
