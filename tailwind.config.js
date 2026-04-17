/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sys-black': '#050505',
        'sys-white': '#F4F4F4',
        'sys-yellow': '#FFED00',
        'sys-yellow-soft': '#FFF873',
        'sys-purple': '#B829FF',
        'sys-purple-deep': '#710878',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'ui-monospace', 'monospace'],
        body: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        sans: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
      },
      borderWidth: {
        '1': '1px',
      },
      spacing: {
        'vw': '5vw',
      },
    },
  },
  plugins: [],
}
