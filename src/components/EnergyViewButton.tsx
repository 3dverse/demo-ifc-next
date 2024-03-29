import { Spinner } from "@chakra-ui/react";
import { useState } from "react";

import { toggleEnergyView } from "../lib/3dverse/helpers";

export const EnergyViewButton = () => {
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

    return (
        <div className="flex flex-row items-center rounded text-white gap-1 ">
            {isEnergyVizProcessing ? (
                <div className="flex flex-row gap-2 items-center">
                    {" "}
                    <button className="flex flex-row items-center h-[2.5rem] px-1 bg-color-overground rounded text-white gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="icon">
                            <path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm74.1-396.4c5.8 4.7 7.6 12.9 4.2 19.6L281.9 240H352c6.8 0 12.9 4.3 15.1 10.7s.2 13.5-5.1 17.8l-160 128c-5.9 4.7-14.2 4.7-20.1-.1s-7.6-12.9-4.3-19.6L230.1 272H160c-6.8 0-12.8-4.3-15.1-10.7s-.2-13.5 5.1-17.8l160-128c5.9-4.7 14.2-4.7 20.1.1z" />
                        </svg>
                        {energyVisible ? "Hiding Energy Consumption..." : "Showing Energy Consumption..."}
                    </button>
                    <Spinner color="purple.500" />
                </div>
            ) : (
                <button
                    className="flex flex-row items-center h-[2.5rem] px-1 bg-color-overground rounded text-white gap-1"
                    onClick={() => {
                        handleClick(energyVisible, isEnergyVizProcessing);
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="icon">
                        <path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm74.1-396.4c5.8 4.7 7.6 12.9 4.2 19.6L281.9 240H352c6.8 0 12.9 4.3 15.1 10.7s.2 13.5-5.1 17.8l-160 128c-5.9 4.7-14.2 4.7-20.1-.1s-7.6-12.9-4.3-19.6L230.1 272H160c-6.8 0-12.8-4.3-15.1-10.7s-.2-13.5 5.1-17.8l160-128c5.9-4.7 14.2-4.7 20.1.1z" />
                    </svg>
                    {energyVisible ? "Hide Energy Consumption" : "Visualize Energy Consumption"}
                </button>
            )}
        </div>
    );
};

EnergyViewButton.displayName = "EnergyViewButton";
