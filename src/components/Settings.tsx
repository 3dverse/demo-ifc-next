"use client";
import { useState } from "react";
import { useStateContext } from "./StateContext";
import { Switch } from "@chakra-ui/react";

export const Settings = () => {
    const [switchCameraState, setSwitchCameraState] = useState(true);
    const [switchEdgeState, setSwitchEdgeState] = useState(false);

    const { basePoint } = useStateContext();

    const handleCameraSwitchChange = () => {
        if (!switchCameraState) {
            SDK3DVerse.engineAPI.cameraAPI.setControllerType(
                SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0].getId(),
                SDK3DVerse.cameraControllerType.editor,
            );
        } else {
            SDK3DVerse.engineAPI.cameraAPI.setControllerType(
                SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0].getId(),
                SDK3DVerse.cameraControllerType.orbit,
            );
        }

        setSwitchCameraState(!switchCameraState);
    };

    const handleEdgeSwitchChange = () => {
        const cam = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0].getCamera();
        const camComponent = cam.getComponent("camera");

        if (!switchEdgeState) {
            const newCamComponent = {
                ...camComponent,
                dataJSON: {
                    ...camComponent.dataJSON,
                    edgeOutlines: true,
                },
            };
            cam.setComponent("camera", newCamComponent);
        } else {
            // Untoggle to hide the edges.

            const newCamComponent = {
                ...camComponent,
                dataJSON: {
                    ...camComponent.dataJSON,
                    edgeOutlines: false,
                },
            };
            cam.setComponent("camera", newCamComponent);
        }
        setSwitchEdgeState(!switchEdgeState);
    };

    const handleReset = () => {
        SDK3DVerse.engineAPI.cameraAPI.travel(
            SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0],
            [basePoint[0], basePoint[1], basePoint[2]],
            [0, 0, 0, 1],
            10,
        );
    };

    return (
        <>
            <nav className="settings-box">
                <button className="island-button reset-button" onClick={handleReset}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="icon">
                        <path d="M303.5 5.7c-9-7.6-22.1-7.6-31.1 0l-264 224c-10.1 8.6-11.3 23.7-2.8 33.8s23.7 11.3 33.8 2.8L64 245.5V432c0 44.2 35.8 80 80 80h288c44.2 0 80-35.8 80-80V245.5l24.5 20.8c10.1 8.6 25.3 7.3 33.8-2.8s7.3-25.3-2.8-33.8l-264-224zM464 204.8V432c0 17.7-14.3 32-32 32H144c-17.7 0-32-14.3-32-32V204.8L288 55.5l176 149.3z" />
                    </svg>
                </button>

                <div className="island-button orbital-camera-settings">
                    <Switch id="fly" onChange={handleCameraSwitchChange} isChecked={switchCameraState} />
                    <p>Fly</p>
                </div>
                <div className="island-button edge-camera-settings">
                    <Switch id="edges" onChange={handleEdgeSwitchChange} isChecked={switchEdgeState} />
                    <p>Edges</p>
                </div>

                <button className="island-button" id="play-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="icon">
                        <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                    </svg>
                </button>
            </nav>
        </>
    );
};
