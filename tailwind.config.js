/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'], 
      },
      colors: {
        neon: {
          green: '#39FF14',
          cyan: '#00FFFF',
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        glitch: 'glitch 1s infinite',

          sniper: 'sniper 0.5s infinite ease-in-out',
    bullet: 'bullet 1s linear infinite',
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        sniper: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-2px) rotate(-1deg)' },
    },
    bullet: {
      '0%': { transform: 'translateX(20px)', opacity: 1 },
      '100%': { transform: 'translateX(500px)', opacity: 0 },
    },
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
       glitch: {
      '0%': { textShadow: '1px 1px #00FF00, -1px -1px #FF00FF' },
      '20%': { textShadow: '-2px 0 #FF00FF, 2px 2px #00FF00' },
      '40%': { textShadow: '2px -2px #00FF00, -2px 2px #FF00FF' },
      '60%': { textShadow: '-1px 1px #00FF00, 1px -1px #FF00FF' },
      '80%': { textShadow: '0 0 #00FF00' },
      '100%': { textShadow: '1px 1px #FF00FF' },
    },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
