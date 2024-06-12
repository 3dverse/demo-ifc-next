//------------------------------------------------------------------------------
import { useState } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { RiPauseFill, RiPlayLine } from "react-icons/ri";

//------------------------------------------------------------------------------
import { pauseAnimation, runAnimation, stopAnimation } from "@/lib/3dverse/helpers";
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const SmartControlDoor = ({
    isFromIfcPropertyPanel,
    className,
}: {
    isFromIfcPropertyPanel?: boolean;
    className?: string;
}) => {
    //------------------------------------------------------------------------------
    const [isAnimationPlaying, setAnimationPlaying] = useState(false);
    const ANIMATION_UUID = "a7a62caf-5d66-4318-9057-0270f9dcdfdb";

    //------------------------------------------------------------------------------
    const toggleAnimation = () => {
        isAnimationPlaying ? pauseAnimation(ANIMATION_UUID) : runAnimation(ANIMATION_UUID);
        setAnimationPlaying(!isAnimationPlaying);
    };

    //------------------------------------------------------------------------------
    const resetAnimation = () => {
        stopAnimation(ANIMATION_UUID);
        setAnimationPlaying(false);
    };
    //------------------------------------------------------------------------------
    // UI
    return (
        <div className={twMerge("flex items-center gap-4", className)}>
            <Button
                onClick={toggleAnimation}
                variant={isFromIfcPropertyPanel ? "accent" : undefined}
                size="sm"
                fontSize="xs"
                w="full"
                leftIcon={<Icon as={isAnimationPlaying ? RiPauseFill : RiPlayLine} />}
                justifyContent="start"
                border="none"
                pl={2}
            >
                Simulate door opening
            </Button>

            <Button
                onClick={resetAnimation}
                visibility={isAnimationPlaying ? "visible" : "hidden"}
                variant="ghost"
                px={1}
                py="1px"
                h="auto"
                size="xs"
                fontSize="2xs"
                noOfLines={1}
                border="none"
            >
                Reset
            </Button>
        </div>
    );
};

//------------------------------------------------------------------------------
SmartControlDoor.displayName = "SmartControlDoor";
