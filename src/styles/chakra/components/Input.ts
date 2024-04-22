import { defineStyleConfig } from "@chakra-ui/react";

export default defineStyleConfig({
    baseStyle: {
        field: {
            _readOnly: {
                color: "content.tertiary",
                borderColor: "border.tertiary",
                bgColor: "transparent",
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
        addon: {
            color: "content.secondary",
            fontWeight: "light",
            bgColor: "bg.overground!",
            border: "1px solid",
            // TODO: Understand why borderColor does not apply and fix it.
            borderColor: "var(--color-border-secondary) !important",
        },
    },
    variants: {
        outline: {
            field: {
                borderColor: "border.secondary",
                _hover: {
                    borderColor: "border.primary",
                },
                _focus: {
                    borderColor: "accent.500",
                    boxShadow: "none",
                },
                _invalid: {
                    borderColor: "negative.500",
                    boxShadow: "0 0 0 1px var(--color-feedback-negative-500)",
                },
            },
        },
    },
});

export const FormLabel = {
    baseStyle: {
        color: "content.secondary",
        fontSize: "xs",
    },
    sizes: {
        xs: {
            fontSize: "xs",
        },
        sm: {
            fontSize: "sm",
        },
        md: {
            fontSize: "md",
        },
    },
};

export const FormError = {
    baseStyle: {
        text: {
            color: "negative.400",
        },
    },
};
