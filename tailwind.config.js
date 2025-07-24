/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Green Gaming Theme
        'green-neon': '#00FF00',
        'green-lime': '#32CD32', 
        'green-forest': '#228B22',
        'green-dark': '#006400',
        'green-matrix': '#00FF41',
        
        // Background Colors
        'gaming-dark': '#0A0A0A',
        'gaming-darker': '#000000',
        'gaming-bg': '#1A1A1A',
        'gaming-card': '#1E1E1E',
      },
      fontFamily: {
        'gaming': ['Orbitron', 'monospace'],
        'code': ['Source Code Pro', 'monospace'],
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 255, 0, 0.3)',
        'glow-green-strong': '0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 40px #00FF00',
        'gaming': '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.2)',
        'gaming-hover': '0 12px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 255, 0, 0.3)',
      },
      animation: {
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'matrix-rain': 'matrix-rain 3s linear infinite',
      },
      backgroundImage: {
        'gaming-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #000000 100%)',
        'button-gradient': 'linear-gradient(135deg, #228B22, #32CD32)',
        'button-gradient-hover': 'linear-gradient(135deg, #32CD32, #00FF00)',
      },
    },
  },
  plugins: [],
}