/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shrimp-coral': '#FF6B6B',
        'shrimp-teal': '#4ECDC4',
        'shrimp-purple': '#9B5DE5',
        'shrimp-yellow': '#F7DC6F',
        'shrimp-hot-pink': '#FF1493',
        'shrimp-electric-blue': '#00D4FF',
        'deep-ocean': '#0a0a1a',
        'bioluminescent': '#12122a',
        'card-surface': '#1a1a3e',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0c0',
      },
      fontFamily: {
        'display': ['Orbitron', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(78, 205, 196, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(78, 205, 196, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
