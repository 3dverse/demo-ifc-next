import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";

import { toggleEnergyView, createChartInputs, createChart } from "../3dverse/helpers";

Chart.register(CategoryScale);

export const EnergyPanel = () => {
    const [energyVisible, setEnergyVisibility] = useState(false);

    const handleClick = () => {
        setEnergyVisibility((previousEnergyVisible) => {
            const newEnergyVisible = !previousEnergyVisible;
            toggleEnergyView(newEnergyVisible);
            return newEnergyVisible;
        });
    };

    const charInputs = createChartInputs();
    const chartSettings = createChart({ data: charInputs.data, labels: charInputs.labels, colors: charInputs.colors });

    return (
        <>
            <aside className="card energy-rooms">
                <header className="card-header">
                    <h1>Energy Consumption</h1>
                    <button onClick={handleClick} id="energy-button">
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
