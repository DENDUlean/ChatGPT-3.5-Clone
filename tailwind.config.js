/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'asside' : '#202123',
        'chatbox' : '#343541',
        'send-color' : '#383945',
        'bot-color' : '#42434f',
        'user-color' : '#222224'
      },
      fontFamily: {
        'poppins' : ['Poppins'],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

