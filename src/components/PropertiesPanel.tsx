import ifcInfo from "../../data/json/ifcInfo.json";
import { IfcData } from "@/types/ifc";
import { updateColor, updateLightIntensity, runAnimation, pauseAnimation, stopAnimation } from "@/lib/3dverse/helpers";
import { useState } from "react";

export const PropertiesPanel = ({ guid }: { guid: string }) => {
    const ifcData = ifcInfo as IfcData;
    const entitiyProperties = ifcData[guid];

    const [animationIsPlaying, setAnimationIsPlaying] = useState(false);
    const animationUUID = "7f64dfa2-338a-4cb2-8f96-449a2c101120";

    return (
        <aside className="card animation-appear-bottom absolute bottom-0 right-3 max-h-[46vh] flex flex-col">
            {entitiyProperties?.props?.Name && (
                <>
                    <header className="card-header card-wrapper py-3">
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between">
                                <p className="card-title">Selection</p>
                                {false && (
                                    <div className="flex flex-row gap-1">
                                        <p>Unselect</p>
                                        <p>&times;</p>
                                    </div>
                                )}
                            </div>
                            <h1 className="text-xl">{entitiyProperties.props.type}</h1>
                            <p className="text-sm font-light">{entitiyProperties.props.Name}</p>
                        </div>
                    </header>
                    <div className="card-body">
                        {entitiyProperties?.props?.type == "IfcLightFixture" && (
                            <div className="light-control card-wrapper">
                                <p>Light</p>
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
                            </div>
                        )}

                        {entitiyProperties?.props?.GlobalId == "02a5zYLwD3j9mC$YV6woIu" && (
                            <div className="light-control card-wrapper">
                                <p>Animation</p>
                                <div className=" flex flex-row gap-5">
                                    {animationIsPlaying ? (
                                        <button
                                            className="island-button reset-button"
                                            onClick={() => {
                                                pauseAnimation(animationUUID);
                                                setAnimationIsPlaying(false);
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 384 512"
                                                className="icon"
                                            >
                                                <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
                                            </svg>
                                        </button>
                                    ) : (
                                        <button
                                            className="island-button"
                                            id="play-button"
                                            onClick={() => {
                                                runAnimation(animationUUID);
                                                setAnimationIsPlaying(true);
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 384 512"
                                                className="icon"
                                            >
                                                <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                                            </svg>
                                        </button>
                                    )}

                                    <button
                                        className="island-button reset-button"
                                        onClick={() => {
                                            stopAnimation(animationUUID);
                                            setAnimationIsPlaying(false);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="icon">
                                            <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="pset">
                                <h4 className="pset-title card-wrapper">Attributes</h4>
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
                                    <h4 className="pset-title card-wrapper">{psetName}</h4>
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
                        </div>
                    </div>
                </>
            )}
        </aside>
    );
};

PropertiesPanel.displayName = "PropertiesPanel";
