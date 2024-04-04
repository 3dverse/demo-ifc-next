import { useState, memo } from "react";
import { Switch } from "@chakra-ui/react";
import { handleReset, handleEdgeSwitchChange, handleCameraSwitchChange, getInitialPoint } from "../lib/3dverse/helpers";
import { BasePoint } from "@/types/ifc";
import { ArrowsToDotLightIcon, EllipsisLightIcon, PlaneUpLightIcon, PlaneUpSlashLightIcon } from "./icons";

export const Settings = memo(({ basePoint }: { basePoint: BasePoint }) => {
    const [switchCameraState, setSwitchCameraState] = useState(true);
    const [switchEdgeState, setSwitchEdgeState] = useState(true);

    return (
        <nav className="button-group">
            <button className="button button-icon-only button-island" onClick={() => handleReset(basePoint)}>
                <ArrowsToDotLightIcon />
            </button>
            <button
                className="button button-icon-only button-island"
                onClick={() => handleCameraSwitchChange(switchCameraState, setSwitchCameraState)}
            >
                {switchCameraState ? <PlaneUpLightIcon /> : <PlaneUpSlashLightIcon />}
            </button>
            <button className="button button-island edge-camera-settings">
                <Switch
                    id="edges"
                    onChange={() => handleEdgeSwitchChange(switchEdgeState, setSwitchEdgeState)}
                    isChecked={switchEdgeState}
                />
                <p>Edges</p>
            </button>
        </nav>
    );
});

Settings.displayName = "Settings";
