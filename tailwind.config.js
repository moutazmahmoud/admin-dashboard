/** @type {import('tailwindcss').Config} */

const spacing = {
  ...Object.fromEntries(
    Array.from({ length: 30 }, (_, i) => [String(i + 1), `${i + 1}rem`]),
  ),
  0.125: "0.125rem",
  0.25: "0.25rem",
  0.5: "0.5rem",
  0.75: "0.75rem",
  1.5: "1.5rem",
  2.5: "2.5rem",
  3.5: "3.5rem",
  4.5: "4.5rem",
  5.5: "5.5rem",
  6.5: "6.5rem",
  7.5: "7.5rem",
  8.5: "8.5rem",
  9.5: "9.5rem",
  10.5: "10.5rem",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minWidth: spacing,
      colors: {
        primary: "#4880FF",
        text: "#202224",
        secondary: "#f59e0b",
        accent: "#10b981",
        neutral: "#1f2937",
        base: "#f3f4f6",
        danger: "#F93C65",
        success: "#00B69B",
        warning: "#FCBE2D",
      },
    },
  },
  plugins: [require("daisyui")],
};
