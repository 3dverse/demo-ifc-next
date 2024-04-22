import { defineStyleConfig } from "@chakra-ui/react";

export default defineStyleConfig({
    baseStyle: {
        mt: 0,
    },
    variants: {
        secondary: {
            color: "content.secondary",
        },
        tertiary: {
            color: "content.tertiary",
        },
        caption: {
            color: "content.tertiary",
            fontSize: "xs",
        },
        inverted: {
            color: "white",
        },
    },
});
