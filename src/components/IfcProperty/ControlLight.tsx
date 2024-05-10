//------------------------------------------------------------------------------
import { useEffect, useState } from "react";

//------------------------------------------------------------------------------
import { updateColor, updateLightIntensity, rgbToHex } from "@/lib/3dverse/helpers";

//------------------------------------------------------------------------------
import { Entity } from "@/types/3dverse";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const ControlLight = ({ spotLightEntity }: { spotLightEntity: Entity | undefined }) => {
    //--------------------------------------------------------------------------
    // Hooks
    const [intensity, setIntensity] = useState(0);
    const [color, setColor] = useState([0, 0, 0]);
    //--------------------------------------------------------------------------
    // Effects
    useEffect(() => {
        if (spotLightEntity) {
            setIntensity(spotLightEntity.components.point_light.intensity);
            setColor(spotLightEntity.components.point_light.color);
        }
    }, []);
    //--------------------------------------------------------------------------
    return (
        <article className="card-wrapper pset-header">
            <h4 className="pset-title">Light</h4>
            <div>
                <input
                    type="range"
                    id="intensity"
                    name="intensity"
                    value={intensity}
                    min="0"
                    max="1000"
                    onChange={async (e) => {
                        await updateLightIntensity(Number(e.target.value), spotLightEntity, setIntensity);
                    }}
                />
                <input
                    onChange={async (e) => {
                        await updateColor(e.target.value, spotLightEntity, setColor);
                    }}
                    type="color"
                    id="color"
                    name="color"
                    value={rgbToHex(color)}
                />
            </div>
        </article>
    );
};

//------------------------------------------------------------------------------
ControlLight.displayName = "ControlLight";
