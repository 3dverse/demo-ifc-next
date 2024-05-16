//------------------------------------------------------------------------------
import { useState } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { RiPauseFill, RiPlayLine } from "react-icons/ri";

//------------------------------------------------------------------------------
import { pauseAnimation, runAnimation, stopAnimation } from "@/lib/3dverse/helpers";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const SmartControlDoor = () => {
    //------------------------------------------------------------------------------
    const [isAnimationPlaying, setAnimationPlaying] = useState(false);
    const ANIMATION_UUID = "7f64dfa2-338a-4cb2-8f96-449a2c101120";

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
        <>
            <Button
                onClick={toggleAnimation}
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
            {isAnimationPlaying && (
                <Button
                    onClick={resetAnimation}
                    variant="ghost"
                    px={1}
                    py="1px"
                    h="auto"
                    size="xs"
                    fontSize="2xs"
                    border="none"
                    className="animate-appear-bottom"
                >
                    Reset
                </Button>
            )}
        </>
    );
};

//------------------------------------------------------------------------------
SmartControlDoor.displayName = "SmartControlDoor";
