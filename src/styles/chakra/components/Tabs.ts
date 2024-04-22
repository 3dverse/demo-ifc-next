import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const noBoxShadow = {
    boxShadow: "none",
};

const line = definePartsStyle({
    tablist: {
        borderBottom: "1px",
        borderColor: "border.secondary",
        gap: 6,
    },
    tab: {
        px: "1px",
        py: 2,
        mb: "-1px",
        color: "content.secondary",
        borderBottom: "1px",
        _focus: {
            boxShadow: "none",
        },
        _selected: {
            color: "accent.500",
            borderColor: "accent.500",
        },
        _focusVisible: noBoxShadow,
    },
});

const segment = definePartsStyle({
    tablist: {
        w: "fit-content",
        ml: "2",
        gap: "1px",
        fontSize: "sm",
        fontWeight: "100",
        bgColor: "bg.underground",
        border: "1px",
        borderColor: "border.secondary",
        rounded: "md",
    },
    tab: {
        rounded: "md",
        py: "3px",
        px: "3",
        color: "content.secondary",
        _hover: {
            color: "accent.700",
            bgColor: "bg.ground",
        },
        _selected: {
            color: "gray.100",
            bgColor: "accent.500",
            boxShadow: "0 0 0 1px var(--chakra-colors-accent-500)",
        },
    },
});

const segmentAnimated = definePartsStyle({
    tablist: {
        w: "fit-content",
        ml: "2",
        gap: "1px",
        fontSize: "sm",
        fontWeight: "100",
        bgColor: "bg.underground",
        border: "1px",
        borderColor: "border.secondary",
        rounded: "full",
    },
    tab: {
        rounded: "full",
        py: "3px",
        px: "3",
        color: "content.secondary",
        _hover: {
            color: "accent.700",
        },
        _selected: {
            color: "gray.100",
        },
    },
});

const segmentOutline = definePartsStyle({
    root: {
        border: "1px",
        borderColor: "border.secondary",
        marginTop: "7",
        rounded: "md",
    },
    tablist: {
        ...segment.tablist,
        pos: "absolute",
        transform: "translateY(-50%)",
    },
    tabpanels: {
        paddingTop: "16px",
    },
    tab: segment.tab,
});

const variants = {
    line,
    segment,
    segmentAnimated,
    segmentOutline,
};

export default defineMultiStyleConfig({
    variants,
});
