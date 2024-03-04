import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";

import { toggleEnergyView, createChartInputs, createChart } from "../3dverse/helpers.js";

Chart.register(CategoryScale);

export const EnergyPanel = () => {
    const [energyVisible, setEnergyVisibility] = useState(false);

    const handleClick = () => {
        toggleEnergyView(!energyVisible);
        setEnergyVisibility(!energyVisible);
    };

    const charInputs = createChartInputs();
    const chartSettings = createChart(charInputs.data, charInputs.labels, charInputs.colors);

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
