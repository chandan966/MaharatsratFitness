import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        crea: { orange: "#FF6B00", ink: "#050505" }
      }
    }
  },
  plugins: []
};

export default config;
