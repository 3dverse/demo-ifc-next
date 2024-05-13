//------------------------------------------------------------------------------
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
import { wasteTypes } from "./content";

//------------------------------------------------------------------------------
import { WasteType } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const WasteTypeLabel = ({ wasteType, className }: { wasteType: WasteType | string; className?: string }) => {
    //------------------------------------------------------------------------------
    const wasteTypeDetail = wasteTypes.find((w) => w.type === wasteType);

    //------------------------------------------------------------------------------
    if (!wasteTypeDetail) {
        return <></>;
    }
    //------------------------------------------------------------------------------
    return (
        <div className={twMerge("flex flex-row-reverse items-center gap-1", className)}>
            <div
                className="w-3 aspect-square rounded-sm"
                style={{
                    backgroundColor: wasteTypeDetail.color,
                }}
            />
            <p className="text-2xs text-seocndary">{wasteTypeDetail.type}</p>
        </div>
    );
};
