import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
    container: {},
    thumb: {
        bg: "white",
        _checked: {
            bg: "accent.500",
        },
    },
    track: {
        bg: "gray.300",
        _checked: {
            bg: "gray.300",
        },
    },
});

export default defineMultiStyleConfig({ baseStyle });
