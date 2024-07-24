/** @type {import('tailwindcss').Config} */
import { colors } from "tailwindcss/defaultTheme";
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // Retain all the default colors
        ...colors,
        primary: "#39E079",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
});
