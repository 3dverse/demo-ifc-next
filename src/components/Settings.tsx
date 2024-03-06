import { useState, memo } from "react";
import { Switch } from "@chakra-ui/react";
import { handleReset, handleEdgeSwitchChange, handleCameraSwitchChange, getInitialPoint } from "../lib/3dverse/helpers";

export const Settings = memo(({ basePoint }: { basePoint: number[] }) => {
    const [switchCameraState, setSwitchCameraState] = useState(true);
    const [switchEdgeState, setSwitchEdgeState] = useState(true);

    return (
        <>
            <nav className="settings-box">
                <button
                    className="island-button reset-button"
                    onClick={() => {
                        handleReset(basePoint);
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="icon">
                        <path d="M303.5 5.7c-9-7.6-22.1-7.6-31.1 0l-264 224c-10.1 8.6-11.3 23.7-2.8 33.8s23.7 11.3 33.8 2.8L64 245.5V432c0 44.2 35.8 80 80 80h288c44.2 0 80-35.8 80-80V245.5l24.5 20.8c10.1 8.6 25.3 7.3 33.8-2.8s7.3-25.3-2.8-33.8l-264-224zM464 204.8V432c0 17.7-14.3 32-32 32H144c-17.7 0-32-14.3-32-32V204.8L288 55.5l176 149.3z" />
                    </svg>
                </button>

                <div className="island-button orbital-camera-settings">
                    <Switch
                        id="fly"
                        onChange={() => handleCameraSwitchChange(switchCameraState, setSwitchCameraState)}
                        isChecked={switchCameraState}
                    />
                    <p>Fly</p>
                </div>
                <div className="island-button edge-camera-settings">
                    <Switch
                        id="edges"
                        onChange={() => handleEdgeSwitchChange(switchEdgeState, setSwitchEdgeState)}
                        isChecked={switchEdgeState}
                    />
                    <p>Edges</p>
                </div>
            </nav>
        </>
    );
});

Settings.displayName = "Settings";
