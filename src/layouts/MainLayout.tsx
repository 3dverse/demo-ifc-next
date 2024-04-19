import { useState, useCallback, memo } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { twMerge } from "tailwind-merge";

import { Canvas } from "@/components/Canvas";
import { SidePanel } from "@/components/SidePanel";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { Settings } from "@/components/Settings";
import { EnergyView } from "@/components/EnergyView";
import { EnergyViewButton } from "@/components/EnergyViewButton";
import { ShareQRCode } from "@/components/ShareQRCode";

import { handleCanvasSelection, unselectEntities } from "@/lib/3dverse/helpers";
import { CanvasActionBar } from "@/components/CanvasActionBar";

export const MainLayout = memo(() => {
    const [selectedPropertyEUID, setSelectedPropertyEUID] = useState("");
    const [energyVisible, setEnergyVisibility] = useState(false);
    const [basePoint, setBasePoint] = useState({ position: [0, 0, 0], orientation: [0, 0, 0, 1] });
    const [sessionId, setSessionId] = useState("");

    const {
        isOpen: isSidePanelExpanded,
        onClose: onCollapseSidePanel,
        onOpen: onExpandSidePanel,
    } = useDisclosure({ defaultIsOpen: true });

    const handleChange = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            handleCanvasSelection(event, setSelectedPropertyEUID, energyVisible);
        },
        [energyVisible],
    );

    const handleKey = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
        unselectEntities(event, setSelectedPropertyEUID);
    }, []);

    return (
        <>
            <Canvas
                onInputChange={handleChange}
                onKeyboardChange={handleKey}
                setBasePoint={setBasePoint}
                setSessionId={setSessionId}
            />

            <SidePanel
                isUnderAnotherMobilepanel={!!selectedPropertyEUID}
                isExpanded={isSidePanelExpanded}
                onExpand={onExpandSidePanel}
                onCollapse={onCollapseSidePanel}
            />

            <CanvasActionBar
                isSidePanelExpanded={isSidePanelExpanded}
                basePoint={basePoint}
                energyVisible={energyVisible}
                setEnergyVisibility={setEnergyVisibility}
            />

            <EnergyView />

            <ShareQRCode sessionId={sessionId} />

            {selectedPropertyEUID && (
                <PropertiesPanel guid={selectedPropertyEUID} onClose={() => setSelectedPropertyEUID(null)} />
            )}
        </>
    );
});

MainLayout.displayName = "MainLayout";
