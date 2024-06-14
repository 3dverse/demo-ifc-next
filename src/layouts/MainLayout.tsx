//------------------------------------------------------------------------------
import { useRef, useState, useCallback, memo, useEffect } from "react";
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { MainPanel } from "@/components/layout/MainPanel";
import { WelcomeModal } from "@/components/common/WelcomeModal";
import { Canvas } from "@/components/canvas/Canvas";
import { MainActionBar } from "@/components/layout/MainActionBar";
import { InviteButton } from "@/components/layout/InviteButton";
import { BottomActionBar } from "@/components/layout/BottomActionBar";
import { About3dverseButton } from "@/components/about/About3dverseButton";
import { SettingsActionBar } from "@/components/settings/SettingsActionBar";
import { IfcPropertyPanel } from "@/components/IfcProperty/IfcPropertyPanel";
import * as THREE from "three";
//------------------------------------------------------------------------------
import { handleCanvasSelection, CameraController_, unselectEntities } from "@/lib/3dverse/helpers";
import { Entity } from "@/types/3dverse";

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
    SDK3DVerse.engineAPI.cameraAPI.travel = async (
        position: [number, number, number],
        orientation: [number, number, number, number],
        targetPos?: [number, number, number]
    ) => {
        if (onMobile) {
            const target = new THREE.Object3D();
            target.position.set(...position)
            target.rotation.setFromQuaternion(new THREE.Quaternion(...orientation));
            target.translateOnAxis(new THREE.Vector3(0, 0, -1), 0.01);
            if (targetPos) {
                await cameraControllerRef?.current?.cameraControls.setLookAt(...position, ...targetPos, false);
            }
            else {
                await cameraControllerRef?.current?.cameraControls.setLookAt(...position, ...target.position.toArray(), false);
            }
        }
        else {
            SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0].getCamera().setGlobalTransform(
                {
                    position: position,
                    orientation: orientation
                }
            );
        }
    }

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
                        basePoint={basePoint}
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
