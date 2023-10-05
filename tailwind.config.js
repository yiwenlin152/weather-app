/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar'
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "weather-primary":'#00668A',
        "weather-secondary":'#004E71'
      },
      container:{
        padding: '10rem',
        center: true
      }
    },
  },
  plugins: [
    tailwindScrollbar()
  ],
}

