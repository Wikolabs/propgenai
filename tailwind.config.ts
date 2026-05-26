import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 50:"#fff1f2",100:"#ffe4e6",200:"#fecdd3",300:"#fda4af",500:"#f43f5e",600:"#e11d48",700:"#be123c",900:"#881337" }
      },
      fontFamily: { display:["'Libre Baskerville'","serif"], body:["'Bricolage Grotesque'","sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
