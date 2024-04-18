import { useState, useCallback, memo } from "react";

import { Canvas } from "../components/Canvas";
import { SidePanel } from "@/components/SidePanel";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { Settings } from "@/components/Settings";
import { EnergyView } from "../components/EnergyView";
import { EnergyViewButton } from "../components/EnergyViewButton";
import { ShareQRCode } from "@/components/ShareQRCode";

import { handleCanvasSelection, unselectEntities } from "@/lib/3dverse/helpers";

export const MainLayout = memo(() => {
    const [guid, setGuid] = useState("");
    const [energyVisible, setEnergyVisibility] = useState(false);
    const [basePoint, setBasePoint] = useState({ position: [0, 0, 0], orientation: [0, 0, 0, 1] });
    const [sessionId, setSessionId] = useState("");

    const handleChange = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            handleCanvasSelection(event, setGuid, energyVisible);
        },
        [energyVisible],
    );

    const handleKey = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
        unselectEntities(event, setGuid);
    }, []);

    return (
        <>
            <Canvas
                onInputChange={handleChange}
                onKeyboardChange={handleKey}
                setBasePoint={setBasePoint}
                setSessionId={setSessionId}
            />

            <SidePanel />

            <div
                className="
                    absolute top-4 left-[var(--side-panel-width)]
                    flex flex-row justify-between gap-3
                    ml-3 max-w-[500px]
                    animate-appear-left animation-delay-[250ms] opacity-0
                "
            >
                <Settings basePoint={basePoint} />
                <EnergyViewButton energyVisible={energyVisible} setEnergyVisibility={setEnergyVisibility} />
            </div>

            <EnergyView />

            <ShareQRCode sessionId={sessionId} />

            {guid ? <PropertiesPanel guid={guid} /> : null}
        </>
    );
});

MainLayout.displayName = "MainLayout";
