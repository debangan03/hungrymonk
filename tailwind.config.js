/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // animation: {
      //   slide: 'slide 2s infinite',
      // },
      // keyframes: {
      //   slide: {
      //     '0%': { transform: 'translateX(-100%)' },
      //     '50%': { transform: 'translateX(100%)', opacity: '0.5' }, // More prominent effect
      //     '100%': { transform: 'translateX(100%)' },
      //   },
      // },
    },
  },
  plugins: [],
};
