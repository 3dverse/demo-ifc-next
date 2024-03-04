import { useState, useCallback, memo } from "react";
import dynamic from "next/dynamic";

import { SidePanel } from "@/components/SidePanel";
import { EnergyPanel } from "@/components/EnergyPanel";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { Settings } from "@/components/Settings";

export const Canvas = dynamic(() => import("@/components/Canvas").then((mod) => mod.Canvas), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

import { handleCanvasSelection } from "../3dverse/helpers.js";

export const Main = memo(() => {
    const [guid, setGuid] = useState("");

    const handleChange: Function = useCallback((event) => {
        handleCanvasSelection(event, setGuid);
    }, []);

    return (
        <>
            <Canvas onInputChange={handleChange} />
            <SidePanel />
            <EnergyPanel />
            {guid ? <PropertiesPanel guid={guid} /> : null}
            <Settings />
        </>
    );
});
