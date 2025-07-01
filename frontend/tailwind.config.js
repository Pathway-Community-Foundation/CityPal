/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-in': 'slideIn 0.4s ease-out forwards',
        scaleIn: 'scaleIn 0.3s ease-out', // ✅ your animation name
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        }, // ✅ added scaleIn keyframes
      },
    },
  },
  plugins: [],
}

