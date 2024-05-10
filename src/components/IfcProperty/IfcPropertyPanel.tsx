//------------------------------------------------------------------------------
import IFC_DATA from "../../../public/data/json/ifcInfo.json";

//------------------------------------------------------------------------------
import { Header } from "./Header";
import { ControlLight } from "./ControlLight";
import { ControlAnimation } from "./ControlAnimation";
import { Attributes } from "./Attributes";

//------------------------------------------------------------------------------
import { IfcData } from "@/types/ifc";
import { Entity } from "@/types/3dverse";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const IfcPropertyPanel = ({
    uppertitle,
    guid,
    spotLightEntity,
}: {
    uppertitle?: string;
    guid: string;
    spotLightEntity?: Entity;
}) => {
    //------------------------------------------------------------------------------
    const ifcData = IFC_DATA as IfcData;
    const entitiyProperties = ifcData[guid];

    if (!entitiyProperties?.props?.Name) {
        return <></>;
    }

    //------------------------------------------------------------------------------
    return (
        <>
            <Header uppertitle={uppertitle} entitiyProperties={entitiyProperties} />
            <div className="card-body pb-8">
                {entitiyProperties?.props?.type == "IfcLightFixture" && (
                    <ControlLight spotLightEntity={spotLightEntity} />
                )}
                {entitiyProperties?.props?.GlobalId == "02a5zYLwD3j9mC$YV6woIu" && <ControlAnimation />}
                <Attributes guid={guid} />
            </div>
        </>
    );
};
//------------------------------------------------------------------------------
IfcPropertyPanel.displayName = "IfcPropertyPanel";
