import { defineStyleConfig } from "@chakra-ui/react";

export default defineStyleConfig({
    baseStyle: {
        filledTrack: {
            bgColor: "accent.500",
        },
        track: {
            borderRadius: "var(--chakra-radii-md)",
        },
    },
    variants: {
        positive: {
            filledTrack: {
                bgColor: "var(--color-feedback-positive)",
            },
        },
        warning: {
            filledTrack: {
                bgColor: "var(--color-feedback-warning-500)",
            },
        },
    },
});
