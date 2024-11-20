/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        clemsonOrange: '#F56600',  // Clemson Orange
        goalLine: '#FFFFFF',       // Goal Line (White)
        regalia: '#522D80',        // Regalia
        collegeAve: '#333333',     // College Avenue
        diploma: '#2E1A47',        // Diploma
        parchment: '#EFDBB2',      // Parchment
        campusBrick: '#B94700',    // Campus Brick
        bowman: '#546223',         // Bowman
        blueRidge: '#005EB8',      // Blue Ridge
        stateFlag: '#00205B',      // State Flag
        stadium: '#CBC4BC',        // Stadium
        howardsRock: '#8C8279',    // Howards Rock
        reflection: '#C8C9C7',     // Reflection
        innovation: '#888B8D',     // Innovation
        bengalStripe: '#000000',   // Bengal Stripe (Black)
        classRing: '#F1C400',      // Class Ring (Yellow)
        clemsonBottoms: '#B7BF10', // Clemson Bottoms (Green)
        azalea: '#AD1AAC',         // Azalea (Purple)
      },
    },
  },
  plugins: [],
};
