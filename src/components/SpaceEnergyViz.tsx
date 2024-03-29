import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);

export const SpaceEnergyViz = ({ roomName, cons }: { roomName: string | null; cons: number }) => {
    const consValues = Array.from({ length: 6 }, () => Math.floor(Math.random() * (cons + 1)));
    const consHasIncreased = consValues[consValues.length - 1] - consValues[0] > 0;

    const data = {
        labels: ["", "", "", "", "", ""],
        datasets: [
            {
                label: "My First Dataset",

                borderColor: consHasIncreased ? "#E9204C" : "#51AA09",
                data: consValues,
            },
        ],
    };

    const options = {
        elements: {
            point: {
                radius: 0,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        legend: {
            display: false,
        },
        tooltips: {
            enabled: false,
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                display: false,
            },
            x: {
                display: false,
                beginAtZero: true,
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="flex flex-row items-center justify-center gap-4 hover:bg-color-underground">
            <div>
                <p className="h-[100%] text-2xl">{roomName}</p>

                {consHasIncreased ? (
                    <p className="h-[100%] text-color-increase">
                        {cons.toFixed(2)} <small>&#9650;</small>
                    </p>
                ) : (
                    <p className="h-[100%] text-color-decrease">
                        {cons.toFixed(2)} <small>&#9660;</small>
                    </p>
                )}
            </div>
            <div>
                <Line width={"50%"} height={"30%"} data={data} options={options}></Line>
            </div>
        </div>
    );
};

SpaceEnergyViz.displayName = "SpaceEnergyViz";
