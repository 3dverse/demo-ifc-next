import { useState, useCallback, memo } from "react";
import dynamic from "next/dynamic";

import { euid2guid } from "../utils/idsConverter";

import { SidePanel } from "@/components/SidePanel";
import { EnergyPanel } from "@/components/EnergyPanel";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { Settings } from "@/components/Settings";

export const Canvas = dynamic(() => import("@/components/Canvas").then((mod) => mod.Canvas), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

export const Main = memo(() => {
    const [guid, setGuid] = useState("");
    
    const handleChange: Function = useCallback(async (event: any) => {
        const target = await SDK3DVerse.engineAPI.castScreenSpaceRay(event.clientX, event.clientY);
        if (!target.pickedPosition){
            setGuid("");
            return;
        } 
        const entity = target.entity;
        setGuid(euid2guid(entity.getParent().getEUID()));
    }, []);

    return (
        <>
            <Canvas onInputChange={handleChange} />
            <SidePanel />
            <EnergyPanel test="electricity" />
            {guid ?  <PropertiesPanel guid={guid}/>: null}
       
            
           
            <Settings />
        </>
    );
});
