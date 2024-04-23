import { memo } from "react";
import { EnergyData } from "@/types/ifc";
import { SpaceEnergyViz } from "./SpaceEnergyViz";
import ifcInfo from "../../../data/json/ifcInfo.json";
import energyData from "../../../data/json/energyData.json";
import { IfcData } from "@/types/ifc";

const ifcData = ifcInfo as IfcData;
const roomEnergyData = energyData as EnergyData;

export const EnergyConsumptionList = memo(() => {
    return (
        <article className="overflow-y-scroll grid grid-cols-3 h-full gap-1 px-4">
            {Object.entries(roomEnergyData).map(([roomGuid, cons]: [string, number]) => (
                <SpaceEnergyViz key={roomGuid} roomName={ifcData[roomGuid].props.Name} cons={cons} />
            ))}
        </article>
    );
});

EnergyConsumptionList.displayName = "EnergyConsumptionList";
