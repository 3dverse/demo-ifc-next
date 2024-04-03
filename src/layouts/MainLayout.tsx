import { useState, useCallback, memo } from "react";

import { Canvas } from "../components/Canvas";
import { SidePanel } from "@/components/SidePanel";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { Settings } from "@/components/Settings";
import { EnergyView } from "../components/EnergyView";
import { EnergyViewButton } from "../components/EnergyViewButton";

import { handleCanvasSelection, unselectEntities } from "@/lib/3dverse/helpers";

export const MainLayout = memo(() => {
    const [guid, setGuid] = useState("");
    const [basePoint, setBasePoint] = useState({ position: [0, 0, 0], orientation: [0, 0, 0, 1] });

    const handleChange = useCallback((event: React.MouseEvent<HTMLElement>) => {
        handleCanvasSelection(event, setGuid);
    }, []);

    const handleKey = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
        unselectEntities(event, setGuid);
    }, []);

    return (
        <>
            <Canvas onInputChange={handleChange} onKeyboardChange={handleKey} setBasePoint={setBasePoint} />
            <div className="relative z-[100]">
                <SidePanel />

                <div
                    className="flex flex-row
                            justify-between
                            absolute
                            top-4
                            left-[var(--side-panel-width)]
                            ml-3
                            max-w-[500px]
                            gap-3"
                >
                    <Settings basePoint={basePoint} />

                    <EnergyViewButton />
                </div>

                <EnergyView />

                {guid ? <PropertiesPanel guid={guid} /> : null}
            </div>
        </>
    );
});

MainLayout.displayName = "MainLayout";
