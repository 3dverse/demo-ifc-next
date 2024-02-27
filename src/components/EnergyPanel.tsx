"use client";

import energyData from "../../public/data/json/energyData.json";
import chroma from "chroma-js";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import { useStateContext } from "./StateContext";
import { guid2euid, euid2guid } from "../utils/idsConverter";

Chart.register(CategoryScale);

export const EnergyPanel = ({ test }: { test: string }) => {
    const { ifcData }: any = useStateContext();
    const { ifcType2Guids }: any = useStateContext();
    const [localIfcData, setLocalValue] = useState(ifcData);

    async function displayRoomEnergyConsumption(types2Isolate = "IfcSpace") {
        const storeys_ = ifcType2Guids["IfcBuildingStorey"];

        for (var i = 0; i < storeys_.length; i++) {
            const storey = storeys_[i];
            const storeyEntity = (await SDK3DVerse.engineAPI.findEntitiesByEUID(guid2euid(storey)))[0];

            const children = await storeyEntity.getChildren();

            for (var j = 0; j < children.length; j++) {
                if (!types2Isolate.includes(children[j].components.debug_name.value)) {
                    children[j].setVisibility(false);
                } else {
                    children[j].setVisibility(false);

                    const subchildren = await children[j].getChildren();
                    for (var k = 0; k < subchildren.length; k++) {
                        const surentity = subchildren[k];
                        const cc = await surentity.getChildren();

                        for (var l = 0; l < cc.length; l++) {
                            if (cc[l].componentList.includes("mesh_ref")) {
                                const entity = cc[l];
                                entity.setVisibility(true);
                                const entityGuid = euid2guid(entity.getParent().getEUID());

                                const charge = energyData[entityGuid];

                                if (charge) {
                                    const color = getValueColor(charge);

                                    entity.detachComponent("material_ref");
                                    entity.attachComponent("material");

                                    entity.setComponent("material", {
                                        dataJSON: {
                                            albedo: [color[0] / 255, color[1] / 255, color[2] / 255],
                                            opacity: 0.75,
                                        },
                                        isDoubleSided: true,

                                        shaderRef: "6d7d6861-0938-41db-9fc2-187e09504c96",
                                    });
                                }
                            } else {
                                cc[l].setVisibility(false);
                            }
                        }
                    }
                }
            }
        }
    }

    const handleClick = () => {
        displayRoomEnergyConsumption();
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
    };

    return (
        <>
            <aside className="card energy-rooms">
                <header className="card-header">
                    <h1>Energy consumption {test}</h1>
                    <button onClick={handleClick} id="energy-button">
                        Show
                    </button>
                </header>

                <div className="side-panel-body">
                    <div className="chart">
                        <Bar width="200" height="2800" data={chartData} options={chartOptions} />
                    </div>
                </div>
            </aside>
        </>
    );
};
