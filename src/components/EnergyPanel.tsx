import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Spinner } from "@chakra-ui/react";
import { useState } from "react";

import { toggleEnergyView, createChartInputs, createChart } from "../lib/3dverse/helpers";

Chart.register(CategoryScale);

export const EnergyPanel = () => {
    const [energyVisible, setEnergyVisibility] = useState(false);
    const [isEnergyVizProcessing, setIsEnergyVizProcessing] = useState(false);

    async function energyViewModifier(previousEnergyVisible: boolean) {
        const newEnergyVisible = !previousEnergyVisible;
        await toggleEnergyView(newEnergyVisible);
        setEnergyVisibility(newEnergyVisible);
        return newEnergyVisible;
    }

    const handleClick = async (previousEnergyVisible: boolean, previousIsEnergyVizProcessing: boolean) => {
        setIsEnergyVizProcessing(!previousIsEnergyVizProcessing);
        await energyViewModifier(previousEnergyVisible);
        setIsEnergyVizProcessing(previousIsEnergyVizProcessing);
    };

    const charInputs = createChartInputs();
    const chartSettings = createChart({ data: charInputs.data, labels: charInputs.labels, colors: charInputs.colors });

    return (
        <>
            <aside className="card">
                <header className="card-header">
                    <h1 className="card-title">Energy Consumption</h1>
                    <div>
                        {isEnergyVizProcessing ? (
                            <div>
                                <Spinner />
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    handleClick(energyVisible, isEnergyVizProcessing);
                                }}
                                id="energy-button"
                            >
                                {energyVisible ? "Remove" : "Show"}
                            </button>
                        )}
                    </div>
                </header>

                <div className="side-panel-body">
                    <div className="chart">
                        <Bar
                            width={"280"}
                            height={"700"}
                            data={chartSettings.chart_data}
                            options={chartSettings.chart_options}
                        />
                    </div>
                </div>
            </aside>
        </>
    );
};
