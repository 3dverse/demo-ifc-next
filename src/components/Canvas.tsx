import Script from "next/script";
import { publicToken, mainSceneUUID } from "../utils/config.js";
import { memo } from "react";

export const Canvas = memo(({ onInputChange }) => {
    const initApp = async () => {
        await SDK3DVerse.joinOrStartSession({
            userToken: publicToken,
            sceneUUID: mainSceneUUID,

            canvas: document.getElementById("display-canvas"),
            viewportProperties: {
                defaultControllerType: SDK3DVerse.controller_type.editor,
            },
        });

        const projectEntity = (await SDK3DVerse.engineAPI.findEntitiesByNames("IfcProject"))[0];
        const projectGlobalCenter = projectEntity.getGlobalAABB().center;

        SDK3DVerse.updateControllerSetting({
            lookAtPoint: [projectGlobalCenter[0], projectGlobalCenter[1], projectGlobalCenter[2]],
        });
    };

    const handleContextMenu = (event: any) => {
        event.preventDefault();
    };

    return (
        <>
            <Script src="https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js" onLoad={initApp} />
            <canvas
                id="display-canvas"
                className="w-screen h-screen"
                tabIndex={1}
                onContextMenu={handleContextMenu}
                onClick={onInputChange}
            ></canvas>
        </>
    );
});
