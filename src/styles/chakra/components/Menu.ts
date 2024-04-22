import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { menuAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
    button: {},
    list: {
        py: "1px",
        px: "1px",
        borderRadius: "md",
        border: "none",
        bgColor: "bg.underground",
        boxShadow: "xl",
        zIndex: 11,
    },
    item: {
        w: "full",
        fontSize: "sm",
        borderRadius: "md",
        color: "content.secondary",
        bgColor: "transparent",
        sx: { "--icon-color": "var(--chakra-colors-content-tertiary)" },
        _hover: {
            color: "content.primary",
            bgColor: "bg.ground",
            "--icon-color": "var(--chakra-colors-accent-500)",
        },
        _focus: {
            color: "content.primary",
            bgColor: "bg.ground",
            "--icon-color": "var(--chakra-colors-accent-500)",
        },
        _active: {
            color: "content.primary",
            bgColor: "bg.overground",
        },
        _disabled: {
            opacity: 0.9,
            color: "content.tertiary",
            "--icon-color": "content.tertiary",
            _hover: {
                bgColor: "transparent",
                color: "content.tertiary",
                "--icon-color": "content.tertiary",
            },
        },
    },
    groupTitle: {
        color: "content.tertiary",
        fontSize: "sm",
    },
    command: {},
    divider: {
        my: "1px",
        borderColor: "border.secondary",
    },
});

export default defineMultiStyleConfig({
    baseStyle,
});
