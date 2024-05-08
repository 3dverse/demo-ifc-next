import { useState, useCallback, memo, useEffect } from "react";
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { Canvas } from "@/components/canvas/Canvas";
import { MainPanel } from "@/components/layout/MainPanel";
import { IfcPropertyPanel } from "@/components/IfcProperty/IfcPropertyPanel";
import { EnergyConsumptionPanel } from "@/components/energy/EnergyConsumptionPanel";
import { CanvasActionBar } from "@/components/canvas/CanvasActionBar";
import { ShareQRCode } from "@/components/canvas/ShareQRCode";
import { BREAKPOINTS } from "@/styles/theme/breakpoints";
import { handleCanvasSelection, CameraController_, unselectEntities } from "@/lib/3dverse/helpers";
import { useRef } from "react";

//------------------------------------------------------------------------------
import { WelcomeModal } from "@/components/common/WelcomeModal";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MainLayout = memo(() => {
    //------------------------------------------------------------------------------
    const [selectedPropertyEUID, setSelectedPropertyEUID] = useState<string | null>(null);
    const [energyVisible, setEnergyVisibility] = useState(false);

    const [isSmallerThanLG] = useMediaQuery(`(max-width: ${BREAKPOINTS.lg})`);
    const [basePoint, setBasePoint] = useState({ position: [0, 0, 0], orientation: [0, 0, 0, 1] });
    const [sessionId, setSessionId] = useState("");

    const {
        isOpen: isMainPanelExpanded,
        onClose: onCollapseMainPanel,
        onOpen: onExpandMainPanel,
    } = useDisclosure({ defaultIsOpen: isSmallerThanLG });

    //------------------------------------------------------------------------------
    const handleChange = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            handleCanvasSelection(event, setSelectedPropertyEUID, energyVisible);
        },
        [energyVisible],
    );

    //------------------------------------------------------------------------------
    const handleKey = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
        unselectEntities(event, setSelectedPropertyEUID);
    }, []);

    const maxWidth = "760px";
    const [onMobile] = useMediaQuery(`(max-width: ${maxWidth})`, { ssr: false });

    const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    const cameraControllerRef = useRef<CameraController_ | null>(null);

    useEffect(() => {
        if (!sessionId) return;
        if (!cameraControllerRef.current) {
            cameraControllerRef.current = new CameraController_(canvasElement);
        }
    }, [sessionId]);

    useEffect(() => {
        if (!cameraControllerRef.current || !sessionId) return;

        if (onMobile) {
            cameraControllerRef.current.activateThreeJsController();
        } else {
            cameraControllerRef.current.deactivateThreeJsController();
        }
    }, [sessionId, onMobile]);

    return (
        <>
            <Canvas
                onInputChange={handleChange}
                onKeyboardChange={handleKey}
                setBasePoint={setBasePoint}
                setSessionId={setSessionId}
            />

            {energyVisible && <EnergyConsumptionPanel isMainPanelExpanded={isMainPanelExpanded} />}

            <MainPanel isExpanded={isMainPanelExpanded} onExpand={onExpandMainPanel} onCollapse={onCollapseMainPanel} />

            <CanvasActionBar
                isMainPanelExpanded={isMainPanelExpanded}
                basePoint={basePoint}
                energyVisible={energyVisible}
                setEnergyVisibility={setEnergyVisibility}
            />

            <ShareQRCode sessionId={sessionId} />

            {selectedPropertyEUID && (
                <IfcPropertyPanel guid={selectedPropertyEUID} onClose={() => setSelectedPropertyEUID(null)} />
            )}

            <WelcomeModal />
        </>
    );
});

//------------------------------------------------------------------------------
MainLayout.displayName = "MainLayout";
