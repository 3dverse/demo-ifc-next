import ifcInfo from "../../public/data/json/ifcInfo.json";
import ifcTypes from "../../public/data/json/ifctype2guids.json";
import energyData from "../../public/data/json/energyData.json";

import chroma from "chroma-js";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { use, useState } from "react";
import { guid2euid, euid2guid } from "../utils/idsConverter";

Chart.register(CategoryScale);

export const EnergyPanel = ({ test }: { test: string }) => {
    const ifcdata = ifcInfo as object;
    const [localIfcData, setLocalValue] = useState(ifcdata);
    const ifctypes = ifcTypes as object;

    const [energyVisible, setEnergyVisibility] = useState(false);

    async function toggleEnergyView(activate) {
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

        for (const guid of ifctypes["IfcSpace"]) {
            const spaceEntity = (await SDK3DVerse.engineAPI.findEntitiesByEUID(guid2euid(guid)))[0];
            const charge = energyData[guid];
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

        setEnergyVisibility(!energyVisible);
    }

    const handleClick = () => {
        toggleEnergyView(!energyVisible);
    };

    function getValueColor(value: any) {
        const scale = chroma.scale(["green", "yellow", "red"]).domain([0, 600]);
        return scale(value).rgb();
    }

    var labels: any = [];
    var data = [];
    var colors = [];

    for (const s in energyData) {
        const l = localIfcData[s].props.Name;
        const adjusted = energyData[s];
        // + Math.random() * 3000;
        const d = adjusted;
        const c = getValueColor(adjusted);

        labels.push(l);
        data.push(d);
        colors.push(c);
    }

    const formattedColors = colors.map((color) => `rgba(${color.join(",")})`);
    const combinedArrays = data.map((value, index) => ({ a: value, b: labels[index], c: formattedColors[index] }));
    combinedArrays.sort((obj1, obj2) => obj2.a - obj1.a);

    data = combinedArrays.map((obj) => obj.a);
    labels = combinedArrays.map((obj) => obj.b);
    colors = combinedArrays.map((obj) => obj.c);

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
    const chartOptions: any = {
        type: "bar",
        indexAxis: "y",
        responsive: true,
        tooltips: {
            mode: "y",
        },
    };

    return (
        <>
            <aside className="card energy-rooms">
                <header className="card-header">
                    <h1>Energy Consumption</h1>
                    <button
                        onClick={() => {
                            handleClick(energyVisible);
                        }}
                        id="energy-button"
                    >
                        {energyVisible ? "Remove" : "Show"}
                    </button>
                </header>

                <div className="side-panel-body">
                    <div className="chart">
                        <Bar width={"280"} height={"700"} data={chartData} options={chartOptions} />
                    </div>
                </div>
            </aside>
        </>
    );
};
