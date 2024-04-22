import { defineStyleConfig } from "@chakra-ui/react";

export default defineStyleConfig({
    baseStyle: {
        caretColor: "var(--chakra-colors-accent-500)", // Note: CSS var is used because accent.500 is not working here.
        _readOnly: {
            color: "content.secondary",
            borderColor: "border.tertiary",
            bgColor: "bg.ground",
            _hover: {
                borderColor: "border.tertiary",
            },
            _focus: {
                borderColor: "border.tertiary",
            },
        },
        _placeholder: {
            color: "content.tertiary",
        },
    },
    variants: {
        outline: {
            boxShadow: "none!",
            borderColor: "border.secondary",
            _hover: {
                borderColor: "border.primary",
            },
            _focus: {
                borderColor: "accent.500",
                boxShadow: "none!",
            },
            _placeholder: {
                color: "content.secondary",
            },
        },
    },
});
