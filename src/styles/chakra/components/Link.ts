import { defineStyleConfig } from "@chakra-ui/react";

export default defineStyleConfig({
    baseStyle: {
        color: "accent.500",
        fontWeight: "medium",
        _hover: {
            bgColor: "accent.50",
            textDecoration: "none",
            transition: "background-color .25s",
        },
    },
    variants: {
        primary: {
            color: "content.primary",
            _hover: {
                bgColor: "transparent",
                color: "accent.500",
            },
            _focus: {
                bgColor: "transparent",
                color: "accent.500",
            },
            _active: {
                bgColor: "transparent",
                color: "accent.500",
            },
        },
        secondary: {
            color: "content.secondary",
            _hover: {
                bgColor: "transparent",
                color: "accent.500",
            },
            _focus: {
                bgColor: "transparent",
                color: "accent.500",
            },
            _active: {
                bgColor: "transparent",
                color: "accent.500",
            },
        },
        tertiary: {
            color: "content.tertiary",
            _hover: {
                bgColor: "transparent",
                color: "accent.500",
            },
            _focus: {
                bgColor: "transparent",
                color: "accent.500",
            },
            _active: {
                bgColor: "transparent",
                color: "accent.500",
            },
        },
    },
});
