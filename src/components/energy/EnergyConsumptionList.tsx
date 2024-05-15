//------------------------------------------------------------------------------
import { memo } from "react";

//------------------------------------------------------------------------------
import IFC_DATA from "../../../public/data/json/ifcData.json";
import energyData from "../../../public/data/json/energyData.json";

//------------------------------------------------------------------------------
import { EnergyConsumptionItem } from "@/components/energy/EnergyConsumptionItem";
import { MainPanelHeader } from "@/components/layout/MainPanelHeader";

//------------------------------------------------------------------------------
import { IfcData, EnergyData } from "@/types/ifc";

//------------------------------------------------------------------------------
const ifcData = IFC_DATA as IfcData;
const roomEnergyData = energyData as EnergyData;

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const EnergyConsumptionList = memo(() => {
    return (
        <article className="overflow-y-scroll h-full">
            <MainPanelHeader title="Energy consumption">
                <p className="flex items-center justify-center gap-1 font-medium text-2xs rounded-full bg-negative-100 text-negative px-2">
                    <small>&#9650;</small> 3 Alerts
                </p>
            </MainPanelHeader>
            <div className="grid grid-cols-3 h-full gap-3 px-4">
                {Object.entries(roomEnergyData).map(([roomGuid, cons]: [string, number]) => (
                    <EnergyConsumptionItem key={roomGuid} roomName={ifcData[roomGuid].props.Name} cons={cons} />
                ))}
            </div>
        </article>
    );
});

//------------------------------------------------------------------------------
EnergyConsumptionList.displayName = "EnergyConsumptionList";
