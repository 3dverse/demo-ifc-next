//------------------------------------------------------------------------------
import { updateColor, updateLightIntensity } from "@/lib/3dverse/helpers";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const ControlLight = ({ guid }: { guid: string }) => {
    return (
        <article className="card-wrapper pset-header">
            <h4 className="pset-title">Light</h4>
            <div>
                <input
                    type="range"
                    id="intensity"
                    name="intensity"
                    min="0"
                    max="1000"
                    onChange={async (e) => {
                        await updateLightIntensity(Number(e.target.value), guid);
                    }}
                />
                <input
                    onChange={async (e) => {
                        await updateColor(e.target.value, guid);
                    }}
                    type="color"
                    id="color"
                    name="color"
                    value="#ebd634"
                />
            </div>
        </article>
    );
};

//------------------------------------------------------------------------------
ControlLight.displayName = "ControlLight";
