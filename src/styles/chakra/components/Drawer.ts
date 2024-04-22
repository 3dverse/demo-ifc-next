import { drawerAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(drawerAnatomy.keys);

const defaultProps = {};

const baseStyle = definePartsStyle({ dialog: { bg: "bg.underground" } });

const tabsTheme = defineMultiStyleConfig({
    baseStyle,
    defaultProps,
    variants: {
        permanent: {
            dialog: {
                pointerEvents: "auto",
            },
            dialogContainer: {
                pointerEvents: "none",
            },
        },
    },
});

export default tabsTheme;
