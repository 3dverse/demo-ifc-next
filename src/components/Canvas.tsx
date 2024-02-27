import Script from "next/script";
import { useStateContext } from "./StateContext";
import { guid2euid, euid2guid } from "../utils/idsConverter";

export const Canvas = () => {
    const { setBasePoint } = useStateContext();

    const initApp = async () => {
        await SDK3DVerse.joinOrStartSession({
            userToken: "public_TKysjsYtTdahW699",
            sceneUUID: "e8650680-0933-4a4f-9ad1-983de50433e3",

            canvas: document.getElementById("display-canvas"),
            viewportProperties: {
                defaultControllerType: SDK3DVerse.controller_type.editor,
            },
        });

        const cameraPose = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0].getCamera().getGlobalTransform();

        setBasePoint([cameraPose.position[0], cameraPose.position[1], cameraPose.position[2]]);

        const projectEntity = (await SDK3DVerse.engineAPI.findEntitiesByNames("IfcProject"))[0];
        const projectGlobalCenter = projectEntity.getGlobalAABB().center;

        SDK3DVerse.updateControllerSetting({
            lookAtPoint: [projectGlobalCenter[0], projectGlobalCenter[1], projectGlobalCenter[2]],
        });
    };

    const handleContextMenu = (event: any) => {
        event.preventDefault();
    };

    const { state, setState } = useStateContext();
    const { ifcData }: any = useStateContext();

    async function handleClick(event: any) {
        const target = await SDK3DVerse.engineAPI.castScreenSpaceRay(event.clientX, event.clientY);
        if (!target.pickedPosition) return;
        const entity = target.entity;
        setState(ifcData[euid2guid(entity.getParent().getEUID())]);
    }

    return (
        <>
            <Script src="https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js" onLoad={initApp} />
            <canvas
                id="display-canvas"
                className="w-screen h-screen"
                tabIndex={1}
                onContextMenu={handleContextMenu}
                onClick={handleClick}
            ></canvas>
        </>
    );
};
