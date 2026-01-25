/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "soft-radial":
          "radial-gradient(circle 476px at 54.8% 51.5%, rgba(168,229,253,1) 0%, rgba(244,244,254,1) 42.3%, rgba(244,244,254,1) 100.2%)",
      },
    },
  },
  plugins: [],
};
