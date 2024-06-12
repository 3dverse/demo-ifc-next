//------------------------------------------------------------------------------
import { useState } from "react";
import { Button } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { runAnimation, pauseAnimation, stopAnimation } from "@/lib/3dverse/helpers";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const ControlAnimation = () => {
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
    return (
        <article className="card-wrapper pset-header">
            <h4 className="pset-title">Animation</h4>
            <div className="flex gap-1">
                {isAnimationPlaying && (
                    <Button variant="accent" size="xs" onClick={resetAnimation}>
                        Reset
                    </Button>
                )}
                <Button variant="accent" size="xs" onClick={toggleAnimation}>
                    {isAnimationPlaying ? "Pause" : "Play"}
                </Button>
            </div>
        </article>
    );
};

ControlAnimation.displayName = "ControlAnimation";
