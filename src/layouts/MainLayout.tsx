import { useState, useCallback, memo, useEffect } from "react";
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { WelcomeModal } from "@/components/common/WelcomeModal";
import { Canvas } from "@/components/canvas/Canvas";
import { MainActionBar } from "@/components/canvas/MainActionBar";
import { DetailsPanel } from "@/components/canvas/DetailsPanel";
import { SecondaryActionBar } from "@/components/canvas/SecondaryActionBar";
import { MainPanel } from "@/components/layout/MainPanel";
import { EnergyConsumptionPanel } from "@/components/energy/EnergyConsumptionPanel";
import { AboutCard } from "@/components/about/AboutCard";

//------------------------------------------------------------------------------
import { Product } from "@/types/ifc";
import { Entity } from "@/types/3dverse";
import { CameraController_, handleCanvasSelection, unselectEntities } from "@/lib/3dverse/helpers";
import { useRef } from "react";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MainLayout = memo(() => {
    //--------------------------------------------------------------------------
    // Hooks
    const [selectedPropertyGUID, setselectedPropertyGUID] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
            handleCanvasSelection(event, setselectedPropertyGUID, energyVisible);
        },
        [energyVisible],
    );

    //------------------------------------------------------------------------------
    const handleKey = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
        unselectEntities(event, setselectedPropertyGUID);
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
            <MainPanel
                isExpanded={isMainPanelExpanded}
                onExpand={onExpandMainPanel}
                onCollapse={onCollapseMainPanel}
                setselectedPropertyGUID={setselectedPropertyGUID}
                setSelectedProduct={setSelectedProduct}
            />
            <MainActionBar isMainPanelExpanded={isMainPanelExpanded} setEnergyVisibility={setEnergyVisibility} />
            <SecondaryActionBar basePoint={basePoint} sessionId={sessionId} />
            <DetailsPanel
                spotLightEntity={spotLightEntity}
                selectedProduct={selectedProduct}
                selectedPropertyGUID={selectedPropertyGUID}
                onClose={() => {
                    setselectedPropertyGUID(null);
                    setSelectedProduct(null);
                }}
            />

            <AboutCard />
            <WelcomeModal />
        </>
    );
});

//------------------------------------------------------------------------------
MainLayout.displayName = "MainLayout";
