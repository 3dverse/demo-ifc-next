import { memo } from "react";
import { EnergyData } from "@/types/ifc";
import { SpaceEnergyViz } from "./SpaceEnergyViz";

import ifcInfo from "../../data/json/ifcInfo.json";

import { IfcData } from "@/types/ifc";
import energyData from "../../data/json/energyData.json";

const ifcData = ifcInfo as IfcData;
const roomEnergyData = energyData as EnergyData;
export const EnergyView = memo(() => {
    return (
        <aside
            className="absolute bottom-3 left-[30rem]
                flex flex-col gap-1 max-h-[10rem] w-[30rem]
                bg-ground rounded-lg shadow-xl
                animation-appear-top animation-delay-[500ms] opacity-0
            "
        >
            <header className="flex flex-row justify-between px-4 pt-2">
                <div className="w-full flex flex-row justify-between gap-4 items-center">
                    <p className="font-normal text-gray-600 text-sm">Energy Consumption</p>
                    <div className=" flex flex-row justify-center gap-1 font-light text-xs rounded-full bg-red-100 text-increase px-1 w-[5rem]">
                        <small>&#9650;</small> 3 ALERTS
                    </div>
                </div>
            </header>
            <div className="overflow-y-scroll grid grid-cols-3 h-full gap-1 px-4">
                {Object.entries(roomEnergyData).map(([roomGuid, cons]: [string, number]) => (
                    <SpaceEnergyViz key={roomGuid} roomName={ifcData[roomGuid].props.Name} cons={cons} />
                ))}
            </div>
        </aside>
    );
});

EnergyView.displayName = "EnergyView";
