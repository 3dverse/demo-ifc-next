import ifcInfo from "../../../data/json/ifcInfo.json";
import ifctype2guids from "../../../data/json/ifctype2guids.json";
import energyData from "../../../data/json/energyData.json";
import { guid2euid, euid2guid } from "../id-converter";
import { EnergyData, IfcData, ChartInput, CanvasEvent, Attribute } from "@/types/ifc";

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
    const rootEntities = await SDK3DVerse.engineAPI.getRootEntities();

    for (const rootEntity of rootEntities) {
        if (
            !("camera" in rootEntity.components) &&
            !("point_light" in rootEntity.components) &&
            !("label" in rootEntity.components)
        ) {
            await rootEntity.setVisibility(activate ? false : true);
        }
    }

    for (const guid of ifcTypes["IfcSpace"]) {
        const spaceEntity = (await SDK3DVerse.engineAPI.findEntitiesByEUID(guid2euid(guid)))[0];
        const charge = roomEnergyData[guid];
        const spaceEntityChildren = await spaceEntity.getChildren();

        for (const spaceEntityChild of spaceEntityChildren) {
            if ("tags" in spaceEntityChild.components) {
                if (spaceEntityChild.components.tags.value.includes("IfcSpace")) {
                    if (charge) {
                        spaceEntityChild.detachComponent("material_ref");
                        spaceEntityChild.detachComponent("material");
                        spaceEntityChild.attachComponent("material");

                        const color = getValueColor(charge);

                        spaceEntityChild.setComponent("material", {
                            dataJSON: activate
                                ? {
                                      albedo: [color[0] / 255, color[1] / 255, color[2] / 255],
                                      opacity: 0.75,
                                  }
                                : {
                                      albedo: [0, 0.5686274509803921, 0.788235294117647],
                                      opacity: 0.15,
                                      metallic: 0.01,
                                      roughness: 0.99,
                                  },

                            isDoubleSided: true,

                            shaderRef: "6d7d6861-0938-41db-9fc2-187e09504c96",
                        });
                    }
                    await spaceEntityChild.setVisibility(true);
                }
            }
        }
    }
}

export async function handleCanvasSelection(event: CanvasEvent, guidSetter: (guid: string) => void) {
    const target = await SDK3DVerse.engineAPI.castScreenSpaceRay(event.clientX, event.clientY);
    if (!target.pickedPosition) {
        SDK3DVerse.engineAPI.unselectAllEntities();
        guidSetter("");
        return;
    }
    const entity = target.entity;
    entity.select();
    const guid = euid2guid(entity.getParent().getEUID());
    if (guid in ifcData) {
        guidSetter(euid2guid(entity.getParent().getEUID()));
    }
}

export function unselectEntities(event: React.KeyboardEvent<HTMLElement>, guidSetter: (guid: string) => void) {
    if (event.key === "Escape") {
        SDK3DVerse.engineAPI.unselectAllEntities();
        guidSetter("");
    }
}

export function getInitialPoint() {
    return SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0].getCamera().getGlobalTransform().position;
}

export function handleReset(basePoint: number[]) {
    SDK3DVerse.engineAPI.cameraAPI.travel(
        SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0],
        basePoint,
        [0, 0, 0, 1],
        10,
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
