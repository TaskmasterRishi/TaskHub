module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#6366f1",
        "primary-dark": "#4f46e5",
        "secondary": "#f472b6",
        "accent": "#f59e0b"
      },
      animation: {
        "loader": "loader 1s linear infinite",
      },
      keyframes: {
        loader: {
          "0%": { transform: "rotate(0) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.5)" },
          "100%": { transform: "rotate(360deg) scale(1)" }
        }
      }
    },
  },
  plugins: [],
}
