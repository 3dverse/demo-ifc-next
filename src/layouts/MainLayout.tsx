//------------------------------------------------------------------------------
import { useRef, useState, useCallback, memo, useEffect } from "react";
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { MainPanel } from "@/components/layout/MainPanel";
import { WelcomeModal } from "@/components/common/WelcomeModal";
import { Canvas } from "@/components/canvas/Canvas";
import { MainActionBar } from "@/components/canvas/MainActionBar";
import { InviteButton } from "@/components/canvas/InviteButton";
import { BottomActionBar } from "@/components/canvas/BottomActionBar";
import { About3dverseButton } from "@/components/about/About3dverseButton";
import { SettingsActionBar } from "@/components/settings/SettingsActionBar";
import { IfcPropertyPanel } from "@/components/IfcProperty/IfcPropertyPanel";

//------------------------------------------------------------------------------
import { handleCanvasSelection, CameraController_, unselectEntities } from "@/lib/3dverse/helpers";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MainLayout = memo(() => {
    //--------------------------------------------------------------------------
    // Hooks
    const [selectedPropertyGUID, setSelectedPropertyGUID] = useState<string | null>(null);
    const [energyVisible, setEnergyVisibility] = useState(false);
    const [basePoint, setBasePoint] = useState({ position: [0, 0, 0], orientation: [0, 0, 0, 1] });
    const [sessionId, setSessionId] = useState("");

    //------------------------------------------------------------------------------
    const {
        isOpen: isMainPanelExpanded,
        onClose: onCollapseMainPanel,
        onOpen: onExpandMainPanel,
    } = useDisclosure({ defaultIsOpen: true });

    //--------------------------------------------------------------------------
    // Effects
    useEffect(() => {
        document.documentElement.classList.toggle("main-panel-expanded", isMainPanelExpanded);
    }, [isMainPanelExpanded]);

    //------------------------------------------------------------------------------
    const handleChange = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            handleCanvasSelection(event, setSelectedPropertyGUID, energyVisible);
        },
        [energyVisible],
    );

    //------------------------------------------------------------------------------
    const handleKey = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
        unselectEntities(event, setSelectedPropertyGUID);
    }, []);

    //------------------------------------------------------------------------------
    const maxWidth = "760px";
    const [onMobile] = useMediaQuery(`(max-width: ${maxWidth})`, { ssr: false });

    //------------------------------------------------------------------------------
    const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    const cameraControllerRef = useRef<CameraController_ | null>(null);

    //------------------------------------------------------------------------------
    useEffect(() => {
        if (!sessionId) return;
        if (!cameraControllerRef.current) {
            cameraControllerRef.current = new CameraController_(canvasElement);
        }
    }, [sessionId]);

    //------------------------------------------------------------------------------
    useEffect(() => {
        if (!cameraControllerRef.current || !sessionId) return;

        if (onMobile) {
            cameraControllerRef.current.activateThreeJsController();
        } else {
            cameraControllerRef.current.deactivateThreeJsController();
        }
    }, [sessionId, onMobile]);

    //------------------------------------------------------------------------------
    // UI
    return (
        <>
            <Canvas
                onInputChange={handleChange}
                onKeyboardChange={handleKey}
                setBasePoint={setBasePoint}
                setSessionId={setSessionId}
            />

            <MainPanel isExpanded={isMainPanelExpanded} onExpand={onExpandMainPanel} onCollapse={onCollapseMainPanel} />

            {sessionId && (
                <>
                    <MainActionBar
                        isMainPanelExpanded={isMainPanelExpanded}
                        energyVisible={energyVisible}
                        setEnergyVisibility={setEnergyVisibility}
                    />

                    <SettingsActionBar basePoint={basePoint} isMainPanelExpanded={isMainPanelExpanded} />

                    <BottomActionBar isMainPanelExpanded={isMainPanelExpanded} />

                    <InviteButton sessionId={sessionId} />
                </>
            )}

            {selectedPropertyGUID && (
                <IfcPropertyPanel guid={selectedPropertyGUID} onClose={() => setSelectedPropertyGUID(null)} />
            )}

            <About3dverseButton />
            <WelcomeModal />
        </>
    );
});

//------------------------------------------------------------------------------
MainLayout.displayName = "MainLayout";
