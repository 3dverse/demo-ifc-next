import { useState } from "react";
import { Button } from "@chakra-ui/react";
import ifcInfo from "../../../data/json/ifcInfo.json";
import { IfcData } from "@/types/ifc";
import { updateColor, updateLightIntensity, runAnimation, pauseAnimation, stopAnimation } from "@/lib/3dverse/helpers";

export const PropertiesPanel = ({ guid, onClose }: { guid: string; onClose: () => void }) => {
    const ifcData = ifcInfo as IfcData;
    const entitiyProperties = ifcData[guid];

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
        <aside className="panel-card xl:card animate-appear-bottom absolute xl:left-auto xl:bottom-0 xl:right-3 xl:max-h-[46vh] flex flex-col">
            {entitiyProperties?.props?.Name && (
                <>
                    <header className="card-header card-wrapper py-3">
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between">
                                <p className="card-title">Selection</p>
                                <Button
                                    variant="ghost"
                                    size="xs"
                                    color="content.tertiary"
                                    fontWeight={400}
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                            </div>
                            <h1 className="text-xl">{entitiyProperties.props.type}</h1>
                            <p className="text-sm font-light">{entitiyProperties.props.Name}</p>
                        </div>
                    </header>
                    <div className="card-body">
                        {entitiyProperties?.props?.type == "IfcLightFixture" && (
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
                        )}

                        {entitiyProperties?.props?.GlobalId == "02a5zYLwD3j9mC$YV6woIu" && (
                            <article className="card-wrapper pset-header">
                                <h4 className="pset-title">Animation</h4>
                                <div className="flex gap-1">
                                    {isAnimationPlaying && (
                                        <Button variant="primary" size="sm" onClick={resetAnimation}>
                                            Reset
                                        </Button>
                                    )}
                                    <Button variant="primary" size="sm" onClick={toggleAnimation}>
                                        {isAnimationPlaying ? "Pause" : "Play"}
                                    </Button>
                                </div>
                            </article>
                        )}

                        <article>
                            <div className="pset">
                                <div className="card-wrapper pset-header">
                                    <h4 className="pset-title">Attributes</h4>
                                </div>
                                <ul className="pset-list">
                                    {Object.entries(entitiyProperties.props).map(
                                        ([propertyName, propertyValue]: any) =>
                                            String(propertyValue)[0] != "#" && (
                                                <li key={propertyName} className="pset-list-item card-wrapper">
                                                    <p className="pset-label" title={propertyName}>
                                                        {propertyName}
                                                    </p>
                                                    <p className="pset-value">{String(propertyValue)}</p>
                                                </li>
                                            ),
                                    )}
                                </ul>
                            </div>

                            {Object.keys(entitiyProperties.psets).map((psetName: any) => (
                                <div key={psetName} className="pset">
                                    <div className="card-wrapper pset-header">
                                        <h4 className="pset-title">{psetName}</h4>
                                    </div>
                                    <div className="pset-list">
                                        {Object.entries(entitiyProperties.psets[psetName]).map(
                                            ([propertyName, propertyValue]: any) =>
                                                String(propertyValue)[0] != "#" && (
                                                    <li
                                                        key={`${psetName}-${propertyName}`}
                                                        className="pset-list-item card-wrapper"
                                                    >
                                                        <p className="pset-label" title={propertyName}>
                                                            {propertyName}
                                                        </p>
                                                        <p className="pset-value">{String(propertyValue)}</p>
                                                    </li>
                                                ),
                                        )}
                                    </div>
                                </div>
                            ))}
                        </article>
                    </div>
                </>
            )}
        </aside>
    );
};

PropertiesPanel.displayName = "PropertiesPanel";
