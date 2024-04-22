import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { runAnimation, pauseAnimation, stopAnimation } from "@/lib/3dverse/helpers";

export const ControlAnimation = () => {
    const [isAnimationPlaying, setAnimationPlaying] = useState(false);
    const ANIMATION_UUID = "7f64dfa2-338a-4cb2-8f96-449a2c101120";

    const toggleAnimation = () => {
        isAnimationPlaying ? pauseAnimation(ANIMATION_UUID) : runAnimation(ANIMATION_UUID);
        setAnimationPlaying(!isAnimationPlaying);
    };

    const resetAnimation = () => {
        stopAnimation(ANIMATION_UUID);
        setAnimationPlaying(false);
    };

    return (
        <article className="card-wrapper pset-header">
            <h4 className="pset-title">Animation</h4>
            <div className="flex gap-1">
                {isAnimationPlaying && (
                    <Button variant="primary" size="xs" onClick={resetAnimation}>
                        Reset
                    </Button>
                )}
                <Button variant="primary" size="xs" onClick={toggleAnimation}>
                    {isAnimationPlaying ? "Pause" : "Play"}
                </Button>
            </div>
        </article>
    );
};

ControlAnimation.displayName = "ControlAnimation";
