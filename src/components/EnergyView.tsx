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
        <>
            <div
                className="flex 
                            flex-col
                            absolute 
                            top-3 right-3
                            max-h-[10rem]
                            w-[30rem]
                            bg-ground
                            p-2
                            rounded-lg
                            gap-1
                            shadow-xl
                            "
            >
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-4 items-end">
                        <p className="font-normal text-gray-500 text-sm">ENERGY CONSUMPTION</p>
                        <div className=" flex flex-row justify-center gap-1 font-light text-xs rounded-full bg-red-100 text-increase px-1 w-[5rem]">
                            <small>&#9650;</small> 3 ALERTS
                        </div>
                    </div>
                    {/* <div className='font-normal text-gray-500 text-sm'>SEE ALL</div> */}
                </div>
                <div className="overflow-y-scroll  grid grid-cols-3 h-[100%] gap-1">
                    {(() => {
                        return Object.entries(roomEnergyData).map(([roomGuid, cons]: [string, number]) => (
                            <SpaceEnergyViz key={roomGuid} roomName={ifcData[roomGuid].props.Name} cons={cons} />
                        ));
                    })()}
                </div>
            </div>
        </>
    );
});

EnergyView.displayName = "EnergyView";
