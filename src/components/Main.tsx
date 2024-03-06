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

import { handleCanvasSelection, unselectEntities } from "@/lib/3dverse/helpers";

export const Main = memo(() => {
    const [guid, setGuid] = useState("");
    const [basePoint, setBasePoint] = useState([0, 0, 0]);

    const handleChange = useCallback((event: React.MouseEvent<HTMLElement>) => {
        handleCanvasSelection(event, setGuid);
    }, []);

    const handleKey = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
        unselectEntities(event, setGuid);
    }, []);

    return (
        <>
            <Canvas onInputChange={handleChange} onKeyboardChange={handleKey} setBasePoint={setBasePoint} />
            <SidePanel />
            <EnergyPanel />
            {guid ? <PropertiesPanel guid={guid} /> : null}
            <Settings basePoint={basePoint} />
        </>
    );
});

Main.displayName = "Main";
