// tailwind.config.js
module.exports = {
  content: [/* your file paths */],
  theme: {
    extend: {
      animation: {
        'bounce-updown': 'bounceUpDown 3s ease-in-out infinite',
        'bounce-leftright': 'bounceLeftRight 3s ease-in-out infinite',
      },
      keyframes: {
        bounceUpDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        bounceLeftRight: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20px)' },
        },
      },
    },
  },
  plugins: [],
}
