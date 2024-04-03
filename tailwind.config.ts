import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                accent: "var(--color-accent)",
            },
            backgroundColor: {
                ground: "hsla(var(--color-bg-ground-hsl), var(--tw-bg-opacity, 1))",
                underground: "hsla(var(--color-bg-underground-hsl), var(--tw-bg-opacity, 1))",
                "underground-dark": "hsla(var(--color-bg-underground-dark-hsl), var(--tw-bg-opacity, 1))",
                overground: "hsla(var(--color-bg-overground-hsl), var(--tw-bg-opacity, 1))",
            },
            textColor: {
                primary: "var(--color-content-primary)",
                secondary: "var(--color-content-secondary)",
                tertiary: "var(--color-content-tertiary)",
                increase: "var(--color-energy-increase)",
                decrease: "var(--color-energy-decrease)",
            },
            borderColor: {
                primary: "var(--color-border-primary)",
                secondary: "var(--color-border-secondary)",
                tertiary: "var(--color-border-tertiary)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            borderRadius: {
                xs: "var(--border-radius-xs)",
                sm: "var(--border-radius-sm)",
                md: "var(--border-radius-md)",
                lg: "var(--border-radius-lg)",
                xl: "var(--border-radius-xl)",
                "2xl": "var(--border-radius-2xl)",
                "3xl": "var(--border-radius-3xl)",
            },
        },
    },
    plugins: [],
};
export default config;
