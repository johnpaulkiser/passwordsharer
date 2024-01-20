import type { Config } from "tailwindcss";
import twrac from "tailwindcss-react-aria-components";
import twanimate from "tailwindcss-animate";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [twrac, twanimate],
} satisfies Config;
