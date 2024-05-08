import ifcInfo from "../../../data/json/ifcInfo.json";
import ifctype2guids from "../../../data/json/ifctype2guids.json";
import energyData from "../../../data/json/energyData.json";
import { guid2euid, euid2guid } from "../id-converter";
import { EnergyData, IfcData, ChartInput, CanvasEvent, Attribute, BasePoint } from "@/types/ifc";
import * as THREE from "three";
import CameraControls from "camera-controls";

CameraControls.install({ THREE: THREE });

import chroma from "chroma-js";

const ifcData = ifcInfo as IfcData;
const ifcTypes = ifctype2guids;
const roomEnergyData = energyData as EnergyData;

const TRAVEL_TIME = 1;

function getValueColor(value: number) {
    const scale = chroma.scale(["green", "yellow", "red"]).domain([0, 600]);
    return scale(value).rgb();
}

export function createChartInputs() {
    let labels: string[] = [];
    let data = [];
    let colors = [];

    for (const s in energyData) {
        const spaceName = ifcData[s].props.LongName
            ? `${ifcData[s].props.LongName} - ${ifcData[s].props.Name}`
            : ifcData[s].props.Name;
        if (typeof spaceName == "string") {
            labels.push(spaceName);
            data.push(roomEnergyData[s]);
            colors.push(getValueColor(roomEnergyData[s]));
        }
    }

    const formattedColors = colors.map((color) => `rgba(${color.join(",")})`);
    const combinedArrays = data.map((value, index) => ({ a: value, b: labels[index], c: formattedColors[index] }));
    combinedArrays.sort((obj1, obj2) => obj2.a - obj1.a);

    data = combinedArrays.map((obj) => obj.a);
    labels = combinedArrays.map((obj) => obj.b);
    colors = combinedArrays.map((obj) => obj.c);

    return {
        data: data,
        labels: labels,
        colors: colors,
    };
}

export function createChart({ data, labels, colors }: ChartInput) {
    // Chart.js data object
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Energy consumption",
                data: data,
                backgroundColor: colors,
                borderWidth: 1,
            },
        ],
    };

    // Chart.js options object
    const chartOptions = {
        type: "bar",
        indexAxis: "y" as const,
        responsive: true,
        tooltips: {
            mode: "y" as const,
        },
    };

    return { chart_data: chartData, chart_options: chartOptions };
}

export async function toggleEnergyView(activate: boolean) {
    const originalColor = [0, 0.5686274509803921, 0.788235294117647];

    const matIds = {
        "d1cccba6-1dc8-43e7-b9f5-380b838b533b": { originalColor: originalColor, energyColor: [0, 1, 0] },
        "6d0cec57-748b-4906-9ddc-d83d221ede40": { originalColor: originalColor, energyColor: [1, 0.5, 0] },
        "7f72e7bd-055e-43af-9b93-8140ec5b69a8": { originalColor: originalColor, energyColor: [1, 0, 0] },
    };

    const originalMat = {
        dataJson: {
            albedo: [0, 0.5686274509803921, 0.788235294117647],
            metallic: 1,
            opacity: 0,
            roughness: 0.7,
        },
        isDoubleSided: true,
        name: "Interior Fill",
        shaderRef: "6d7d6861-0938-41db-9fc2-187e09504c96",
        skinnedShaderRef: "baa040d3-4e11-4bbf-b932-5c7782d2dcc4",
        uuid: "18803c48-b14f-4fc2-b0ce-ed72b2776c77",
        version: 1,
    };

    for (const [matUUID, colors] of Object.entries(matIds)) {
        const newMatDesc = originalMat;
        newMatDesc.uuid = matUUID;
        if (activate) {
            newMatDesc.dataJson.albedo = colors.energyColor;
            newMatDesc.dataJson.opacity = 0.7;
        } else {
            newMatDesc.dataJson.albedo = colors.originalColor;
        }

        SDK3DVerse.engineAPI.ftlAPI.updateMaterial(matUUID, newMatDesc);
    }
}

async function processPickedEntity(
    position: { x: number; y: number },
    guidSetter: (guid: string) => void,
    energyVisible: boolean,
) {
    const target = await SDK3DVerse.engineAPI.castScreenSpaceRay(position.x, position.y);

    if (!target.pickedPosition) {
        SDK3DVerse.engineAPI.unselectAllEntities();
        guidSetter("");
        return;
    }

    const entity = target.entity;

    if (!("tags" in entity.components)) {
        return;
    }

    if (entity.components.tags.value[0] == "IfcSpace" && !energyVisible) {
        entity.setVisibility(false);
        await processPickedEntity(position, guidSetter, energyVisible);
        entity.setVisibility(true);
    } else {
        entity.select();
        const guid = euid2guid(entity.getParent().getEUID());
        if (guid in ifcData) {
            guidSetter(euid2guid(entity.getParent().getEUID()));
        }
    }
}

export async function handleCanvasSelection(
    event: CanvasEvent,
    guidSetter: (guid: string) => void,
    energyVisible: boolean,
) {
    processPickedEntity({ x: event.clientX, y: event.clientY }, guidSetter, energyVisible);
}

export function unselectEntities(event: React.KeyboardEvent<HTMLElement>, guidSetter: (guid: string) => void) {
    if (event.key === "Escape") {
        SDK3DVerse.engineAPI.unselectAllEntities();
        guidSetter("");
    }
}

export function getInitialPoint() {
    const cameraTransform = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0].getCamera().getGlobalTransform();
    return { position: cameraTransform.position, orientation: cameraTransform.orientation };
}

export function handleReset(basePoint: BasePoint) {
    SDK3DVerse.engineAPI.cameraAPI.travel(
        SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0],
        basePoint.position,
        basePoint.orientation,
        10000,
    );
}

export function handleCameraSwitchChange(cameraState: boolean, cameraSetter: (cameraState: boolean) => void) {
    if (!cameraState) {
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

    cameraSetter(!cameraState);
}

export function handleEdgeSwitchChange(edgeState: boolean, edgeSetter: (edgeState: boolean) => void) {
    const cam = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0].getCamera();
    const camComponent = cam.getComponent("camera");

    if (!edgeState) {
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
    edgeSetter(!edgeState);
}

function computeDistance(u: number[], v: number[]) {
    var dx = u[0] - v[0];
    var dy = u[1] - v[1];
    var dz = u[2] - v[2];

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export async function goToRoom(roomUUID: string | undefined) {
    if (roomUUID) {
        // Retrieve the IfcSpace entity to travel to from the scene graph.
        const spaceEntity = (await SDK3DVerse.engineAPI.findEntitiesByEUID(roomUUID))[0];
        const activeViewPort = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0];

        const aabbCenterGlobal = spaceEntity.getGlobalAABB().center;
        const currentCameraPosition = SDK3DVerse.engineAPI.cameraAPI
            .getActiveViewports()[0]
            .getCamera()
            .getGlobalTransform().position;

        const speed = computeDistance(currentCameraPosition, aabbCenterGlobal) / TRAVEL_TIME;

        SDK3DVerse.engineAPI.cameraAPI.travel(
            activeViewPort,
            [aabbCenterGlobal[0] + 0.5, aabbCenterGlobal[1] + 0.5, aabbCenterGlobal[2] + 0.5],
            [0, 0, 0, 1],
            speed,
        );
        // Update the orbit target.
        SDK3DVerse.updateControllerSetting({
            lookAtPoint: [aabbCenterGlobal[0] + 0.2, aabbCenterGlobal[1] + 0.2, aabbCenterGlobal[2] + 0.2],
        });
    }
}

export async function getEntityFromGuid(guid: string) {
    return (await SDK3DVerse.engineAPI.findEntitiesByEUID(guid2euid(guid)))[0];
}

export function getSurface(areaData: Attribute) {
    return typeof areaData === "number" ? areaData.toFixed(2) : "-";
}

export async function updateLightIntensity(value: number, guid: string) {
    const lightEntity = (await SDK3DVerse.engineAPI.findEntitiesByEUID(guid2euid(guid)))[0];
    const lightEntityChildren = await lightEntity.getChildren();

    for (const lightChild of lightEntityChildren) {
        if ("point_light" in lightChild.components) {
            const spotlightComponent = lightChild.getComponent("point_light");
            const newComponent = {
                ...spotlightComponent,
                intensity: value,
            };
            lightChild.setComponent("point_light", newComponent);
        }
    }
}

export async function updateColor(value: string, guid: string) {
    const colorValHex = value;
    const red = parseInt(colorValHex.substring(1, 3), 16);
    const green = parseInt(colorValHex.substring(3, 5), 16);
    const blue = parseInt(colorValHex.substring(5, 7), 16);

    const rgb = [red / 255, green / 255, blue / 255];
    const lightEntity = (await SDK3DVerse.engineAPI.findEntitiesByEUID(guid2euid(guid)))[0];
    const lightEntityChildren = await lightEntity.getChildren();

    for (const lightChild of lightEntityChildren) {
        if ("point_light" in lightChild.components) {
            const spotlightComponent = lightChild.getComponent("point_light");
            const newComponent = {
                ...spotlightComponent,
                color: rgb,
            };
            lightChild.setComponent("point_light", newComponent);
        }
    }
}

export function toToggle(components: string[]) {
    return !("camera" in components) && !("point_light" in components) && !("label" in components);
}

export async function runAnimation(uuid: string) {
    SDK3DVerse.engineAPI.playAnimationSequence(uuid, { playbackSpeed: 1, seekOffset: 0 });
}

export async function pauseAnimation(uuid: string) {
    SDK3DVerse.engineAPI.pauseAnimationSequence(uuid);
}

export async function stopAnimation(uuid: string) {
    SDK3DVerse.engineAPI.stopAnimationSequence(uuid);
}

export async function showClientAvatars() {
    const clientDisplayEX = await SDK3DVerse.installExtension(SDK3DVerse_ClientDisplay_Ext);
    const clientAvatarContent = await fetch("../../../images/client-avatar.svg").then((res) => res.text());
    clientDisplayEX.showClientAvatars({
        // depending on the size of your scene you might want to adjust the radius
        radius: 80,
        /** @param {{ color: string }} params */
        getClientAvatarSrc({ color }: { color: string }) {
            const svgContent = clientAvatarContent.replace(/FG_COLOR/g, color).replace(/BG_COLOR/g, "#ffffff");
            const url = `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
            return url;
        },
        /** @param {{ clientUUID: string }} params */
        getClientDisplayName({ clientUUID }: { clientUUID: string }) {
            // Convert the UUID to something that looks sort of like a word
            const name = [...clientUUID]
                .filter((s) => /[a-zA-Z]/.test(s))
                .slice(0, 5)
                .join("");
            const nameCapitalized = `${name[0].toUpperCase()}${name.slice(1)}`;
            return `User ${nameCapitalized}`;
        },
    });
}

export class CameraController_ {
    canvasElement: HTMLElement;
    cameraControls: CameraControls;
    viewport: any;

    constructor(canvasElement: HTMLElement) {
        this.canvasElement = canvasElement;
        // create THREE camera
        this.viewport = SDK3DVerse.engineAPI.cameraAPI.getViewports()[0];
        const { fovy, aspectRatio, nearPlane, farPlane } = this.viewport.getProjection();
        const camera = new THREE.PerspectiveCamera(fovy, aspectRatio, nearPlane, farPlane || 100000);
        this.cameraControls = new CameraControls(camera, this.canvasElement);
    }

    onCameraUpdate = () => {
        const cameraPosition = this.cameraControls.camera.position.toArray();
        const cameraOrientation = new THREE.Quaternion();
        this.cameraControls.camera.getWorldQuaternion(cameraOrientation);
        const cameraOrientationArray = cameraOrientation.toArray();

        this.viewport.setLocalTransform({
            position: cameraPosition,
            orientation: cameraOrientationArray,
        });
    };

    async activateThreeJsController() {
        this.viewport.setControllerType(SDK3DVerse.cameraControllerType.none);
        const clock = new THREE.Clock();

        const cameraTransform: {
            position: [number, number, number];
            orientation: [number, number, number, number];
        } = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0].getCamera().getGlobalTransform();

        this.cameraControls.enabled = true;

        const target = new THREE.Object3D();
        target.rotation.setFromQuaternion(new THREE.Quaternion(...cameraTransform.orientation));
        target.translateOnAxis(new THREE.Vector3(0, 0, -1), 0.01);

        this.cameraControls.setLookAt(...cameraTransform.position, ...target.position.toArray());

        // listen to camera update events
        this.cameraControls.addEventListener("update", this.onCameraUpdate);
        this.cameraControls.dollySpeed = 0.5;

        const anim = () => {
            const delta = clock.getDelta();
            this.cameraControls.update(delta);
            requestAnimationFrame(anim);
        };
        anim();
    }

    deactivateThreeJsController() {
        this.cameraControls.enabled = false;
        this.cameraControls.removeEventListener("update", this.onCameraUpdate);
        this.viewport.setControllerType(SDK3DVerse.cameraControllerType.editor);
    }
}
