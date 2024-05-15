//------------------------------------------------------------------------------
import { useRef, useState, useCallback, memo, useEffect } from "react";
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { Canvas } from "@/components/canvas/Canvas";
import { MainPanel } from "@/components/layout/MainPanel";
import { IfcPropertyPanel } from "@/components/IfcProperty/IfcPropertyPanel";
import { EnergyConsumptionPanel } from "@/components/energy/EnergyConsumptionPanel";
import { MainActionBar } from "@/components/canvas/MainActionBar";
import { ShareQRCode } from "@/components/canvas/ShareQRCode";
import { WelcomeModal } from "@/components/common/WelcomeModal";
import { AboutCard } from "@/components/about/AboutCard";
import { BottomActionBar } from "@/components/canvas/BottomActionBar";
import { SettingsActionBar } from "@/components/canvas/SettingsActionBar";

//------------------------------------------------------------------------------
import { Entity } from "@/types/3dverse";
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
    const [spotLightEntity, setSpotLightEntity] = useState<Entity | undefined>(undefined);
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
    useEffect(() => {
        const getSpotlightEntity = async () => {
            const spotligthId = "5f0cf797-d27a-4f53-91b3-de21758050dd";
            const spotlightEntity = (await SDK3DVerse.engineAPI.findEntitiesByEUID(spotligthId))[0];
            setSpotLightEntity(spotlightEntity);
        };
        getSpotlightEntity();
    }, [sessionId]);
    //------------------------------------------------------------------------------
    // UI
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

            <MainActionBar
                isMainPanelExpanded={isMainPanelExpanded}
                energyVisible={energyVisible}
                setEnergyVisibility={setEnergyVisibility}
            />
            <SettingsActionBar basePoint={basePoint} isMainPanelExpanded={isMainPanelExpanded} />

            <BottomActionBar isMainPanelExpanded={isMainPanelExpanded} />

            <ShareQRCode sessionId={sessionId} />

            {selectedPropertyGUID && (
                <IfcPropertyPanel
                    guid={selectedPropertyGUID}
                    onClose={() => setSelectedPropertyGUID(null)}
                    spotLightEntity={spotLightEntity}
                />
            )}

            <AboutCard />
            <WelcomeModal />
        </>
    );
});

//------------------------------------------------------------------------------
MainLayout.displayName = "MainLayout";
