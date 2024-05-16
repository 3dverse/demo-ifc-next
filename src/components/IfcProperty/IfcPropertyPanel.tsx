//------------------------------------------------------------------------------
import IFC_DATA from "../../../public/data/json/ifcData.json";

//------------------------------------------------------------------------------
import { Header } from "./Header";
import { SmartControlLight } from "../smartControls/SmartControlLight";
import { ControlAnimation } from "./ControlAnimation";
import { Attributes } from "./Attributes";

//------------------------------------------------------------------------------
import { IfcData } from "@/types/ifc";
import { Entity } from "@/types/3dverse";
import { DOOR_GUID } from "@/lib/3dverse/helpers";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const IfcPropertyPanel = ({
    guid,
    onClose,
    spotLightEntity,
}: {
    guid: string;
    onClose: () => void;
    spotLightEntity: Entity | undefined;
}) => {
    //------------------------------------------------------------------------------
    const ifcData = IFC_DATA as IfcData;
    const entitiyProperties = ifcData[guid];

    if (!entitiyProperties?.props?.Name) {
        return <></>;
    }

    //------------------------------------------------------------------------------
    return (
        <aside className="panel-card lg:card animate-appear-top absolute lg:left-auto lg:bottom-0 lg:right-3 lg:max-h-[46vh] flex flex-col">
            <Header entitiyProperties={entitiyProperties} onClose={onClose} />
            <div className="card-body">
                {entitiyProperties?.props?.type == "IfcLightFixture" && (
                    <SmartControlLight spotLightEntity={spotLightEntity} />
                )}
                {entitiyProperties?.props?.GlobalId == DOOR_GUID && <ControlAnimation />}
                <Attributes guid={guid} />
            </div>
        </aside>
    );
};
//------------------------------------------------------------------------------
IfcPropertyPanel.displayName = "IfcPropertyPanel";
