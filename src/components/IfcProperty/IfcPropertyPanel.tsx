//------------------------------------------------------------------------------
import ifcInfo from "../../../data/json/ifcInfo.json";

//------------------------------------------------------------------------------
import { Header } from "./Header";
import { ControlLight } from "./ControlLight";
import { ControlAnimation } from "./ControlAnimation";
import { Attributes } from "./Attributes";

//------------------------------------------------------------------------------
import { IfcData } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const IfcPropertyPanel = ({ guid, onClose }: { guid: string; onClose: () => void }) => {
    //------------------------------------------------------------------------------
    const ifcData = ifcInfo as IfcData;
    const entitiyProperties = ifcData[guid];

    if (!entitiyProperties?.props?.Name) {
        return <></>;
    }

    //------------------------------------------------------------------------------
    return (
        <aside className="panel-card lg:card animate-appear-top absolute lg:left-auto lg:bottom-0 lg:right-3 lg:max-h-[46vh] flex flex-col">
            <Header entitiyProperties={entitiyProperties} onClose={onClose} />
            <div className="card-body">
                {entitiyProperties?.props?.type == "IfcLightFixture" && <ControlLight guid={guid} />}
                {entitiyProperties?.props?.GlobalId == "02a5zYLwD3j9mC$YV6woIu" && <ControlAnimation />}
                <Attributes guid={guid} />
            </div>
        </aside>
    );
};
//------------------------------------------------------------------------------
IfcPropertyPanel.displayName = "IfcPropertyPanel";
