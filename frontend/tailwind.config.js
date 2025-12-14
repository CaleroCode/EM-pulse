/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fondo principal (oscuro pero con tono turquesa)
        empulseBg: "#021922",

        // Tu paleta
        empulsePrimary: "#15BCE6", // principal
        empulseSoft: "#90D9EB",
        empulseMid: "#5CC4DE",
        empulseAccent: "#228CA7",

        // ICDATA - Verde esmeralda
        icdataGreen: "#2D8659",
      },
    },
  },
  plugins: [],
};

