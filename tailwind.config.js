// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for different accessibility modes
        accessible: {
          light: "#FFFFFF",
          dark: "#121212",
          highlight: "#FFCB05",
          focus: "#1E88E5",
        },
      },
      fontSize: {
        // Larger base font size for better readability
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
      },
      spacing: {
        // Larger spacing for better touch targets
        4: "1rem",
        8: "2rem",
        12: "3rem",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            lineHeight: 1.5,
          },
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("@tailwindcss/typography")],
};
