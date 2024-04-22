import { defineStyleConfig, cssVar } from "@chakra-ui/react";

const $arrowBg = cssVar("popper-arrow-bg");

export default defineStyleConfig({
    baseStyle: {
        color: "content.primaryDark",
        lineHeight: "5",
        py: "6px",
        px: "8px",
        bgColor: "white",
        rounded: "xl",
        boxShadow: "lg",
        [$arrowBg.variable]: "var(--color-content-secondary)",
    },
    variants: {
        accent: {
            color: "content.primaryDark",
            bgColor: "accent.500",
            [$arrowBg.variable]: "var(--color-accent)",
        },
    },
    sizes: {
        sm: {
            fontSize: "2xs",
            py: "1px",
            px: "2",
            maxW: "200px",
        },
        lg: {
            py: ".5rem",
            px: "1rem",
            maxW: "16rem",
        },
    },
});
