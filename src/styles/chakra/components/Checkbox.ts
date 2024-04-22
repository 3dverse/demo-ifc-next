import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
    control: {
        borderColor: "border.secondary",
        _checked: {
            bg: "accent.500",
            borderColor: "accent.500",
        },
    },
});

const checkboxTheme = defineMultiStyleConfig({ baseStyle });

export default checkboxTheme;
