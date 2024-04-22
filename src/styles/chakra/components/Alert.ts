import { alertAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys);

const baseStyle = definePartsStyle({
    container: {
        pl: 3,
        py: 1,
        w: "fit-content",
    },
    title: {
        fontSize: "var(--font-size-sm)",
        fontWeight: "normal",
    },
    description: {},
    icon: {
        w: 4,
    },
});

export default defineMultiStyleConfig({ baseStyle });
