import { publicToken, mainSceneUUID } from "../../../config.js";

export async function initApp() {
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
}
