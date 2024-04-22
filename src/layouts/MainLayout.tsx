import { useState, useCallback, memo } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Canvas } from "@/components/canvas/Canvas";
import { MainPanel } from "@/components/layout/MainPanel";
import { IfcPropertyPanel } from "@/components/IfcProperty/IfcPropertyPanel";
import { EnergyConsumptionPanel } from "@/components/energy/EnergyConsumptionPanel";
import { CanvasActionBar } from "@/components/canvas/CanvasActionBar";
import { ShareQRCode } from "@/components/canvas/ShareQRCode";
import { handleCanvasSelection, unselectEntities } from "@/lib/3dverse/helpers";

export const MainLayout = memo(() => {
    const [selectedPropertyEUID, setSelectedPropertyEUID] = useState<string | null>(null);
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

            <EnergyConsumptionPanel isSidePanelExpanded={isSidePanelExpanded} />

            <MainPanel isExpanded={isSidePanelExpanded} onExpand={onExpandSidePanel} onCollapse={onCollapseSidePanel} />

            <CanvasActionBar
                isSidePanelExpanded={isSidePanelExpanded}
                basePoint={basePoint}
                energyVisible={energyVisible}
                setEnergyVisibility={setEnergyVisibility}
            />

            <ShareQRCode sessionId={sessionId} />

            {selectedPropertyEUID && (
                <IfcPropertyPanel guid={selectedPropertyEUID} onClose={() => setSelectedPropertyEUID(null)} />
            )}
        </>
    );
});

MainLayout.displayName = "MainLayout";
