//------------------------------------------------------------------------------
import IFC_DATA from "../../../public/data/json/ifcData.json";

//------------------------------------------------------------------------------
import { Header } from "./Header";
import { Attributes } from "./Attributes";
import { SmartControlLight } from "@/components/smartControls/SmartControlLight";
import { SmartControlDoor } from "@/components/smartControls/SmartControlDoor";

//------------------------------------------------------------------------------
import { IfcData } from "@/types/ifc";
import { DOOR_GUID } from "@/lib/3dverse/helpers";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const IfcPropertyPanel = ({ guid, onClose }: { guid: string; onClose: () => void }) => {
    //------------------------------------------------------------------------------
    const ifcData = IFC_DATA as IfcData;
    const entitiyProperties = ifcData[guid];

    //------------------------------------------------------------------------------
    if (!entitiyProperties?.props?.Name) {
        return <></>;
    }

    //------------------------------------------------------------------------------
    return (
        <aside className="panel-card lg:card animate-appear-top absolute lg:left-auto lg:bottom-0 lg:right-3 lg:max-h-[46vh] flex flex-col">
            <Header entitiyProperties={entitiyProperties} onClose={onClose} />
            <div className="card-body">
                {entitiyProperties?.props?.type == "IfcLightFixture" && (
                    <article className="pset-list-item card-wrapper items-center lg:!py-2">
                        <h4 className="pset-title pset-label !text-primary">Light</h4>
                        <div className="pset-value">
                            <SmartControlLight />
                        </div>
                    </article>
                )}
                {entitiyProperties?.props?.GlobalId == DOOR_GUID && (
                    <article className="pset-list-item card-wrapper items-center lg:!py-2">
                        <h4 className="pset-title pset-label !text-primary">Animation</h4>
                        <div className="pset-value">
                            <SmartControlDoor isFromIfcPropertyPanel />
                        </div>
                    </article>
                )}
                <Attributes guid={guid} />
            </div>
        </aside>
    );
};
//------------------------------------------------------------------------------
IfcPropertyPanel.displayName = "IfcPropertyPanel";
