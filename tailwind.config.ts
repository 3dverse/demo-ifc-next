import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";
import plugin from "tailwindcss/plugin";

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
                "accent-100": "var(--color-accent-100)",
                "accent-200": "var(--color-accent-200)",
                "accent-500": "var(--color-accent-500)",
                "accent-800": "var(--color-accent-800)",

                "informative-50": "var(--color-feedback-informative-50)",
                "informative-100": "var(--color-feedback-informative-100)",
                "informative-500": "var(--color-feedback-informative-500)",
                informative: "var(--color-feedback-informative-500)",
                "informative-800": "var(--color-feedback-informative-800)",

                "positive-500": "var(--color-feedback-positive-500)",
                positive: "var(--color-feedback-positive-500)",
                "positive-800": "var(--color-feedback-positive-800)",
                "positive-900": "var(--color-feedback-positive-900)",

                "warning-500": "var(--color-feedback-warning-500)",
                warning: "var(--color-feedback-warning-500)",
                "warning-800": "var(--color-feedback-warning-800)",

                "negative-100": "var(--color-feedback-negative-100)",
                "negative-400": "var(--color-feedback-negative-400)",
                "negative-500": "var(--color-feedback-negative-500)",
                negative: "var(--color-feedback-negative-500)",
                "negative-800": "var(--color-feedback-negative-800)",
            },
            backgroundColor: {
                ground: "hsl(var(--color-bg-ground-hsl), var(--tw-bg-opacity, 1))",
                underground: "hsl(var(--color-bg-underground-hsl), var(--tw-bg-opacity, 1))",
                "underground-dark": "hsl(var(--color-bg-underground-dark-hsl), var(--tw-bg-opacity, 1))",
                overground: "hsl(var(--color-bg-overground-hsl), var(--tw-bg-opacity, 1))",
            },
            textColor: {
                primary: "var(--color-content-primary)",
                "primary-light": "var(--color-content-primary-light)",
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
            fontSize: {
                base: ["var(--font-size-md)", "var(--leading-normal)"],
                "9xl": ["var(--font-size-9xl)", "var(--leading-normal)"],
                "8xl": ["var(--font-size-8xl)", "var(--leading-normal)"],
                "7xl": ["var(--font-size-7xl)", "var(--leading-normal)"],
                "6xl": ["var(--font-size-6xl)", "var(--leading-normal)"],
                "5xl": ["var(--font-size-5xl)", "var(--leading-normal)"],
                "4xl": ["var(--font-size-4xl)", "var(--leading-normal)"],
                "3xl": ["var(--font-size-3xl)", "var(--leading-snug)"],
                "2xl": ["var(--font-size-2xl)", "var(--leading-normal)"],
                xl: ["var(--font-size-xl)", "var(--leading-normal)"],
                lg: ["var(--font-size-lg)", "var(--leading-normal)"],
                md: ["var(--font-size-md)", "var(--leading-normal)"],
                sm: ["var(--font-size-sm)", "var(--leading-normal)"],
                xs: ["var(--font-size-xs)", "var(--leading-normal)"],
                "2xs": ["var(--font-size-2xs)", "var(--leading-normal)"],
                "3xs": ["var(--font-size-3xs)", "var(--leading-normal)"],
            },
            borderRadius: {
                xs: "var(--border-radius-xs)",
                sm: "var(--border-radius-sm)",
                md: "var(--border-radius-md)",
                lg: "var(--border-radius-lg)",
                xl: "var(--border-radius-xl)",
                "2xl": "var(--border-radius-2xl)",
                "3xl": "var(--border-radius-3xl)",

                full: "9999px",
                none: "0px",
                inherit: "inherit",
            },
            spacing: {
                0: "0",
                px: "1px",
                1: "var(--spacing-1)",
                2: "var(--spacing-2)",
                3: "var(--spacing-3)",
                4: "var(--spacing-4)",
                5: "var(--spacing-5)",
                6: "var(--spacing-6)",
                7: "var(--spacing-7)",
                8: "var(--spacing-8)",
                9: "var(--spacing-9)",
                10: "var(--spacing-10)",
                11: "var(--spacing-11)",
                12: "var(--spacing-12)",
                14: "var(--spacing-14)",
                16: "var(--spacing-16)",
                20: "var(--spacing-20)",
                24: "var(--spacing-24)",
                28: "var(--spacing-28)",
                32: "var(--spacing-32)",
                36: "var(--spacing-36)",
                40: "var(--spacing-40)",
                44: "var(--spacing-44)",
                48: "var(--spacing-48)",
                52: "var(--spacing-52)",
                56: "var(--spacing-56)",
                60: "var(--spacing-60)",
                64: "var(--spacing-64)",
                72: "var(--spacing-72)",
                80: "var(--spacing-80)",
                96: "var(--spacing-96)",
            },
            screens: {
                sm: "30em",
                md: "48em",
                lg: "62em",
                xl: "80em",
                "2xl": "96em",
                "3xl": "1600px",
                "4xl": "1800px",
            },
        },
    },
    plugins: [
        plugin(
            ({ matchUtilities, theme }: { matchUtilities: PluginAPI["matchUtilities"]; theme: PluginAPI["theme"] }) => {
                matchUtilities(
                    {
                        "animation-delay": (value: string) => {
                            return {
                                "animation-delay": value,
                            };
                        },
                    },
                    {
                        values: theme("transitionDelay"),
                    },
                );
            },
        ),
    ],
};
export default config;
