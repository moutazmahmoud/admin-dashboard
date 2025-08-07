/** @type {import('tailwindcss').Config} */

const spacing = {
  // Full numbers (1rem = 8px)
  ...Object.fromEntries(
    Array.from({ length: 30 }, (_, i) => [String(i + 1), `${i + 1}rem`]),
  ),
  // Add fractional steps
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
  // add more if needed
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: spacing,
      borderRadius: spacing,
      colors: {
        primary: "#4880FF", // Indigo-600
        text: "#202224", // Indigo-600
        secondary: "#f59e0b", // Amber-500
        accent: "#10b981", // Emerald-500
        neutral: "#1f2937", // Gray-800
        base: "#f3f4f6", // Gray-100
        danger: "#F93C65", // Red-500
        success: "#00B69B", // Green-500
        warning: "#FCBE2D", // Yellow-500
        // Add more if needed
      },
    },
  },
  plugins: [require("daisyui")],
};
