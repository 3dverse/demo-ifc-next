import { defineStyleConfig } from "@chakra-ui/react";

export default defineStyleConfig({
    baseStyle: {
        track: {
            h: "3px",
            bgColor: "borderPrimary",
        },
        thumb: {
            bgColor: "accent.500",
            width: "3",
            height: "3",
        },
    },
    variants: {
        filled: {
            container: {
                h: "3",
            },
            track: {
                h: "3",
                bgColor: "accent.100",
            },
            filledTrack: {
                bgColor: "accent.300",
                rounded: "2px",
            },
            thumb: {
                bgColor: "accent.500",
                rounded: "xs",
                width: "5px",
            },
        },
        "hover-highlight": {
            _before: {
                content: `""`,
                pos: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                w: "calc(100% + 16px)",
                h: "calc(100% + 4px)",
                rounded: "full",
                transitionDuration: "250ms",
                transitionTimingFunction: "ease-in-out",
                zIndex: "-1",
            },
            _hover: {
                _before: {
                    bgColor: "#ffffff",
                },
            },
            _active: {
                _before: {
                    bgColor: "#ffffff",
                },
            },
        },
    },
});
