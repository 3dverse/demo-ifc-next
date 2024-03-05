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

import { handleCanvasSelection } from "../3dverse/helpers";

export const Main = memo(() => {
    const [guid, setGuid] = useState("");

    const handleChange = useCallback((event: React.MouseEvent<HTMLElement>) => {
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

Main.displayName = "Main";
