//------------------------------------------------------------------------------
import { wasteTypes } from "./content";

//------------------------------------------------------------------------------
import { WasteType } from "@/types/ifc";

//------------------------------------------------------------------------------
export const WasteTypeLabel = ({ wasteType }: { wasteType: WasteType | string }) => {
    //------------------------------------------------------------------------------
    const wasteTypeDetail = wasteTypes.find((w) => w.name === wasteType);

    //------------------------------------------------------------------------------
    if (!wasteTypeDetail) {
        return <></>;
    }
    //------------------------------------------------------------------------------
    return (
        <div className="flex items-center gap-1">
            <div
                className="w-3 aspect-square rounded-sm"
                style={{
                    backgroundColor: wasteTypeDetail.color,
                }}
            />
            <p className="text-2xs text-seocndary">{wasteTypeDetail.name}</p>
        </div>
    );
};
