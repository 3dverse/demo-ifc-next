import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            backgroundColor: {
                "color-ground": "var(--color-bg-ground)",
                "color-underground": "var(--color-bg-underground)",
                "color-overground": "var(--color-bg-overground)",
            },

            textColor: {
                "color-primary": "var(--color-content-primary)",
                "color-secondary": "var(--color-content-secondary)",
                "color-tertiary": "var(--color-content-tertiary)",
                "color-increase": "var(--color-energy-increase)",
                "color-decrease": "var(--color-energy-decrease)",
            },

            borderColor: {
                "border-primary": "var(--color-border-primary)",
                "border-secondary": "var(--color-border-secondary)",
                "border-tertiary": "var(--color-border-tertiary)",
            },
        },
    },
    plugins: [],
};
export default config;
