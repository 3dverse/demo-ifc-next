//------------------------------------------------------------------------------
import { memo, useEffect, useState } from "react";

//------------------------------------------------------------------------------
import { MainPanelHeader } from "@/components/layout/MainPanelHeader";
import { ControlAnimation } from "../IfcProperty/ControlAnimation";
import { SmartControlLight } from "./SmartControlLight";
import { getSpotlightEntity } from "@/lib/3dverse/helpers";
import { Entity } from "@/types/3dverse";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const SmartControlList = memo(() => {
    //------------------------------------------------------------------------------
    const [spotLightEntity, setSpotLightEntity] = useState<Entity | undefined>(undefined);

    //------------------------------------------------------------------------------
    useEffect(() => {
        const update = async () => {
            const spotlightEntity = await getSpotlightEntity();
            setSpotLightEntity(spotlightEntity);
        };
        update();
    }, []);

    return (
        <article className="overflow-y-scroll h-full">
            <MainPanelHeader title="Smart controls" />
            <SmartControlLight spotLightEntity={spotLightEntity} />
            <ControlAnimation />
        </article>
    );
});

//------------------------------------------------------------------------------
SmartControlList.displayName = "SmartControlList";
