import { defineStyleConfig } from "@chakra-ui/react";

export default defineStyleConfig({
    baseStyle: {
        field: {
            cursor: "pointer",
            _readOnly: {
                color: "content.secondary",
                bgColor: "bg.ground",
            },
            _placeholder: {
                color: "content.tertiary",
            },
        },
        icon: {
            fontSize: "sm",
            color: "content.tertiary",
        },
    },
    variants: {
        outline: {
            field: {
                borderColor: "border.secondary",
                cursor: "pointer",
                _hover: {
                    borderColor: "borderPrimary",
                },
                _focus: {
                    borderColor: "accent.500",
                    boxShadow: "none",
                },
            },
        },
    },
});
