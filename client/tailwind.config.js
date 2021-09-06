const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        "base-400": "#0B090C",
        "base-content-2":"#828282",
      },
      boxShadow: {
        navbar: "0 4px 4px rgba(0,0,0,0.25)",
        "navbar-top": "0 -4px 4px rgba(0,0,0,0.25)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2582ea",
          "primary-focus": "#2577ea",
          "primary-content": "#ffffff",

          secondary: "#252329",
          "secondary-focus": "#1e1c21",
          "secondary-content": "#ffffff",

          accent: "#37cdbe",
          "accent-focus": "#2aa79b",
          "accent-content": "#ffffff",

          neutral: "#3d4451",
          "neutral-focus": "#2a2e37",
          "neutral-content": "#ffffff",

          "base-100": "#252329",
          "base-200": "#3c393f",
          "base-300": "#120f13",
          "base-content": "#E0E0E0",

          info: "#2094f3",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",

          "--animation-btn": "0.25s",
          "--animation-input": ".2s",

          "--padding-card": "2rem",

          "--btn-text-case": "lowercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
          "--focus-ring": "1px",
          "--focus-ring-offset": "0px",
        },
      },
    ],
  },
};
