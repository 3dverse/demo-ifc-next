import { publicToken, mainSceneUUID } from "../../../config.js";
import { showClientAvatars } from "./helpers";

export async function initApp() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.size) {
        if (urlParams.has("sessionId")) {
            try {
                await SDK3DVerse.joinSession({
                    sessionId: urlParams.get("sessionId"),
                    userToken: publicToken,
                    canvas: document.getElementById("canvas"),
                    viewportProperties: {
                        defaultControllerType: SDK3DVerse.controller_type.editor,
                    },
                });
            } catch {
                let url = window.location.href;
                let urlObject = new URL(url);
                urlObject.searchParams.delete("sessionId");
                window.location.href = urlObject.toString();
            }
        }
    } else {
        await SDK3DVerse.startSession({
            userToken: publicToken,
            sceneUUID: mainSceneUUID,

            canvas: document.getElementById("canvas"),
            viewportProperties: {
                defaultControllerType: SDK3DVerse.controller_type.editor,
            },
        });
    }

    await SDK3DVerse.installExtension(SDK3DVerse_ViewportDomOverlay_Ext);

    showClientAvatars();

    const projectEntity = (await SDK3DVerse.engineAPI.findEntitiesByNames("IfcProject"))[0];
    const projectGlobalCenter = projectEntity.getGlobalAABB().center;

    SDK3DVerse.engineAPI.cameraAPI
        .getActiveViewports()[0]
        .getCamera()
        .setComponent("camera", { dataJSON: { edgeOutlines: true, skybox: true } });

    SDK3DVerse.engineAPI.cameraAPI
        .getActiveViewports()[0]
        .getCamera()
        .setComponent("local_transform", {
            position: [7.196020603179932, 34.786617279052734, -44.03242874145508],
            orientation: [0.0176605973392725, 0.9795456528663635, 0.1740744709968567, -0.09938061237335205],
        });

    SDK3DVerse.updateControllerSetting({
        lookAtPoint: [projectGlobalCenter[0], projectGlobalCenter[1], projectGlobalCenter[2]],
    });
}
