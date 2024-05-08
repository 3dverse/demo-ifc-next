import { defineStyleConfig } from "@chakra-ui/react";

export default defineStyleConfig({
    baseStyle: {
        container: {
            bgColor: "bg.overground",
            border: "1px",
            borderColor: "border.quaternary!",
            rounded: "xl",
        },
    },
    variants: {
        unstyled: {
            container: {},
        },
        glass: {
            container: {
                border: "none",
                bgColor: "hsla(var(--color-bg-ground-hsl), .6)",
                boxShadow: "xl",
                backdropFilter: "blur(10px)",
            },
        },
    },
});
