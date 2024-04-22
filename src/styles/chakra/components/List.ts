import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { listAnatomy as parts } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
    container: {
        fontSize: "2xl",
        my: 2,
        ml: "0px !important",
    },
    item: {
        py: 1,
        ml: 5,
    },
});

export default defineMultiStyleConfig({
    baseStyle,
});
