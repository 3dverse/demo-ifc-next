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
        "glass-effect": {
            container: {
                border: "1px solid var(--color-bg-underground)",
                backgroundColor: "rgba(252, 250, 254, 0.7)",
                boxShadow: "0px 4px 24px rgba(132, 75, 177, 0.2)",
                backdropFilter: "blur(10px)",
            },
        },
    },
});
