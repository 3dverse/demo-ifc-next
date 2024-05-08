import { modalAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, ModalProps } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(modalAnatomy.keys);

const baseStyle = definePartsStyle({
    overlay: {
        bgColor: "hsl(var(--color-bg-overground-hsl), .9)",
        opacity: 0.5,
    },
    dialogContainer: {},
    dialog: {
        rounded: "lg",
        bg: "bg.ground",
        margin: 0,
        px: { base: 12, md: 8 },
        py: { base: 8, md: 12 },
    },
    header: {
        px: [6, 8, 10],
        pt: [5, null, 6],
    },
    body: {
        px: [6, 8, 16],
        pb: [10, null, 9],
    },
    footer: {
        px: 0,
        py: 0,
    },
});

const fullWithNav = definePartsStyle({
    overlay: {
        top: "var(--top-nav-height)",
        minHeight: "calc(100vh - var(--top-nav-height))",
    },
    dialogContainer: {
        top: "var(--top-nav-height)",
        minHeight: "calc(100vh - var(--top-nav-height))",
    },
});

const bottomSheet = definePartsStyle({
    dialog: {
        position: "fixed",
        bottom: "0px",
        left: "0px",
        maxW: "4xl",
        minH: "auto",
        maxH: "80vh",
        mb: "0",
        bg: `bg.ground`,
        rounded: "1rem 1rem 0px 0px",
        overflow: "auto",
    },
});

const sizes = {
    full: {
        dialog: {
            border: "none",
        },
        dialogContainer: {
            paddingTop: "0",
            paddingBottom: "0",
        },
    },
};

export default defineMultiStyleConfig({
    baseStyle,
    sizes,
    variants: { bottomSheet, fullWithNav },
});

export const defaultModalProps: Partial<ModalProps> = {
    preserveScrollBarGap: true,
    variant: ["bottomSheet", "unstyled"],
    scrollBehavior: "outside",
    motionPreset: "slideInBottom",
};
