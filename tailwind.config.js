/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-light': '#FFFFFF',
        'brand-surface': '#F8FAFC',
        'brand-text-main': '#0F172A',
        'brand-text-muted': '#475569',
        'brand-blue': '#0B2447',
        'brand-blue-hover': '#19376D',
        'brand-green': '#10B981',
        'brand-green-hover': '#059669',
      },
    },
  },
  plugins: [],
};
