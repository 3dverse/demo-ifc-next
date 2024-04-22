import { defineStyleConfig } from "@chakra-ui/react";

// Note: Keep in mind that loading states are also disabled.
const disabledStyles = {
    boxShadow: "none",
};

export default defineStyleConfig({
    baseStyle: {
        color: "content.primary",
        fontWeight: "500",
        borderRadius: "md",
        border: "1px",
        borderColor: "transparent",
        textDecoration: "none",
        // letterSpacing: ".025em",
        WebkitTapHighlightColor: "transparent",
        whiteSpace: "normal",
        _disabled: {
            ...disabledStyles,
        },
        _loading: {
            opacity: 1,
        },
        _hover: {
            zIndex: 1,
        },
        _focusVisible: disabledStyles,
    },
    variants: {
        primary: {
            color: "content.primaryLight",
            bgColor: "accent.500",
            boxShadow: "0px 3px 13px var(--accent-color)",
            _hover: {
                bgColor: "accent.600",
                boxShadow: "0px 1px 12px var(--accent-color)",
                _disabled: {
                    ...disabledStyles,
                    bgColor: "accent.500",
                },
            },
            _focus: {
                bgColor: "accent.600",
                boxShadow: "0px 1px 12px var(--accent-color)",
            },
            _active: {
                bgColor: "accent.500",
                boxShadow: "0px 1px 16px var(--accent-color)",
            },
            _loading: {
                bgColor: "accent.500",
            },
        },
        secondary: {
            bgColor: "bg.ground",
            _hover: {
                borderColor: "border.tertiary",
                bgColor: "bg.ground",
                _disabled: {
                    ...disabledStyles,
                    borderColor: "transparent",
                    bgColor: "bg.ground",
                },
            },
            _focus: {
                borderColor: "border.tertiary",
                bgColor: "bg.ground",
            },
            _active: {
                borderColor: "border.tertiary",
                bgColor: "bg.ground",
            },
        },
        tertiary: {
            color: "content.tertiary",
            bgColor: "gray.800",
            _hover: {
                color: "content.secondary",
                bgColor: "gray.900",
                _disabled: {
                    ...disabledStyles,
                    color: "content.tertiary",
                    bgColor: "gray.800",
                },
            },
            _active: {
                color: "content.primaryDark",
                borderColor: "transparent",
                bgColor: "gray.900",
            },
        },
        ghost: {
            color: "content.secondary",
            bgColor: "transparent",
            _hover: {
                color: "content.primary",
                bgColor: "bg.ground",
                _disabled: {
                    ...disabledStyles,
                    color: "content.secondary",
                    bgColor: "transparent",
                },
            },
            _focus: {
                bgColor: "bg.ground",
            },
            _active: {
                bgColor: "bg.ground",
            },
        },
        outline: {
            bgColor: "transparent",
            borderColor: "border.secondary",
            _hover: {
                borderColor: "content.tertiary",
                bgColor: "transparent",
                _disabled: {
                    ...disabledStyles,
                    borderColor: "transparent",
                },
            },
            _focus: {
                borderColor: "content.tertiary",
                bgColor: "transparent",
            },
            _active: {
                borderColor: "content.tertiary",
                bgColor: "transparent",
            },
            _disabled: {
                ...disabledStyles,
                borderColor: "transparent",
            },
        },
        "outline-accent": {
            color: "accent.700",
            bgColor: "transparent",
            borderColor: "accent.200",
            _hover: {
                borderColor: "accent.500",
                bgColor: "transparent",
                _disabled: {
                    ...disabledStyles,
                    borderColor: "transparent",
                },
            },
            _focus: {
                borderColor: "accent.500",
                bgColor: "transparent",
            },
            _active: {
                borderColor: "accent.500",
                bgColor: "transparent",
            },
            _disabled: {
                ...disabledStyles,
                borderColor: "transparent",
            },
        },
        "outline-informative": {
            color: "informative.500",
            bgColor: "transparent",
            borderColor: "informative.800",
            _hover: {
                borderColor: "informative.500",
                bgColor: "transparent",
                _disabled: {
                    ...disabledStyles,
                    borderColor: "transparent",
                },
            },
            _focus: {
                borderColor: "informative.500",
                bgColor: "transparent",
            },
            _active: {
                borderColor: "informative.500",
                bgColor: "transparent",
            },
            _disabled: {
                ...disabledStyles,
                borderColor: "transparent",
            },
        },
        "outline-warning": {
            borderColor: "warning.800",
            color: "warning.500",

            _hover: {
                bgColor: "transparent",
                borderColor: "warning.500",
                color: "content.white",
                _disabled: {
                    ...disabledStyles,
                    borderColor: "transparent",
                },
            },
            _focus: {
                bgColor: "transparent",
                borderColor: "warning.500",
                color: "content.white",
            },
            _active: {
                bgColor: "transparent",
                borderColor: "warning.500",
                color: "content.white",
            },
            _disabled: {
                ...disabledStyles,
                borderColor: "transparent",
            },
        },

        "outline-island": {
            bgColor: "rgba(252, 250, 254, 0.8)",
            borderColor: "border.secondary",
            rounded: "md",
        },

        link: {
            bgColor: "transparent",
            fontWeight: "400",
            color: "accent.500",
            letterSpacing: "0",
            rounded: "md",
            paddingInline: "5px",
            paddingBlock: "0px",
            _hover: {
                textDecoration: "none",
                bgColor: "hsl(var(--color-accent-hsl), 0.1)",
            },
            _active: {
                color: "accent.500",
                bgColor: "transparent",
            },
            _focus: {
                bgColor: "transparent",
            },
            _disabled: {
                bgColor: "transparent",
            },
        },
        "link-primary": {
            bgColor: "transparent",
            color: "content.primary",
            fontWeight: "400",
            rounded: "md",
            paddingInline: "5px",
            paddingBlock: "0px",
            _hover: {
                color: "content.primary",
                textDecoration: "none",
                bgColor: "hsl(var(--color-content-primary-hsl), 0.1)",
            },
            _active: {
                color: "accent.500",
                bgColor: "transparent",
            },
            _focus: {
                bgColor: "transparent",
            },
            _disabled: {
                bgColor: "transparent",
            },
        },
        "link-secondary": {
            bgColor: "transparent",
            color: "content.secondary",
            fontWeight: "400",
            rounded: "md",
            paddingInline: "5px",
            paddingBlock: "0px",
            _hover: {
                color: "content.primary",
                textDecoration: "none",
                bgColor: "hsl(var(--color-content-primary-hsl), 0.1)",
            },
            _active: {
                color: "accent.500",
                bgColor: "transparent",
            },
            _focus: {
                bgColor: "transparent",
            },
            _disabled: {
                bgColor: "transparent",
            },
        },
        "link-tertiary": {
            bgColor: "transparent",
            color: "content.tertiary",
            rounded: "md",
            fontWeight: "400",
            paddingInline: "5px",
            paddingBlock: "0px",
            _hover: {
                color: "content.primary",
                textDecoration: "none",
                bgColor: "hsl(var(--color-content-primary-hsl), 0.1)",
            },
            _active: {
                color: "accent.500",
                bgColor: "transparent",
            },
            _focus: {
                bgColor: "transparent",
            },
            _disabled: {
                bgColor: "transparent",
            },
        },
        "link-informative": {
            bgColor: "transparent",
            color: "informative.500",
            fontWeight: "400",
            _hover: {
                bgColor: "hsl(var(--color-feedback-informative-500-hsl), .1)",
                textDecorationColor: "currentColor",
            },
            _focus: {
                bgColor: "hsl(var(--color-feedback-informative-500-hsl), .1)",
                textDecorationColor: "currentColor",
            },
            _active: {
                bgColor: "hsl(var(--color-feedback-informative-500-hsl), .1)",
                textDecorationColor: "currentColor",
            },
            _disabled: {
                bgColor: "transparent",
            },
        },
    },
    defaultProps: {
        variant: "secondary",
    },
});
