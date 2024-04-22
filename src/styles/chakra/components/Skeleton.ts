import { defineStyleConfig, cssVar } from "@chakra-ui/react";

const $startColor = cssVar("skeleton-start-color");
const $endColor = cssVar("skeleton-end-color");

const baseStyle = {
    rounded: "md",
    _dark: { [$startColor.variable]: "hsl(227deg 25% 18%)", [$endColor.variable]: "var(--color-bg-overground)" },
};

export const skeletonTheme = defineStyleConfig({ baseStyle });

export default skeletonTheme;
