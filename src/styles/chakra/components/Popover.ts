import { popoverAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
    popper: {
        zIndex: "200",
    },
    content: {
        bgColor: "bg.underground",
        boxShadow: "2xl",
    },
});
export default defineMultiStyleConfig({ baseStyle });
