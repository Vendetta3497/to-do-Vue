/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            appDark: '#212E41',
            dark: '#303030',
         },
      },
   },
   plugins: [],
};
