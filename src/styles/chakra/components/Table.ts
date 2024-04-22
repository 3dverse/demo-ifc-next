import { tableAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const simple = definePartsStyle({
    thead: {
        fontSize: "xs",
        color: "content.tertiary",
    },
    td: {
        px: "2",
        py: "3",
    },
});

const variants = {
    simple,
};
export default defineMultiStyleConfig({ variants });
