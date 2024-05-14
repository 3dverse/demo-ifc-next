//------------------------------------------------------------------------------
import { Dispatch, SetStateAction, useEffect, memo, useState } from "react";

//------------------------------------------------------------------------------
import { initApp } from "@/lib/3dverse/init";
import { getInitialPoint } from "@/lib/3dverse/helpers";

//------------------------------------------------------------------------------
import { BasePoint } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const Canvas = memo(
    ({
        onInputChange,
        onKeyboardChange,
        setBasePoint,
        setSessionId,
    }: {
        onInputChange: (event: React.MouseEvent<HTMLElement>) => void;
        onKeyboardChange: (event: React.KeyboardEvent<HTMLElement>) => void;
        setBasePoint: Dispatch<SetStateAction<BasePoint>>;
        setSessionId: Dispatch<SetStateAction<string>>;
    }) => {
        //------------------------------------------------------------------------------
        const handleContextMenu = (event: any) => {
            event.preventDefault();
        };

        //--------------------------------------------------------------------------
        // Hooks
        const [timeMouseKeys, settimeMouseKeys] = useState([0, 0]); // 0: down, 1: up

        //--------------------------------------------------------------------------
        // Effects
        useEffect(() => {
            let cancelled = false;
            SDK3DVerse.disconnectFromSession()
                .catch(() => null)
                .then(async () => {
                    if (cancelled) return;
                    await initApp();
                    setBasePoint(getInitialPoint());
                    setSessionId(SDK3DVerse.getSessionId());
                });

            return () => {
                cancelled = true;
            };
        }, []);

        //------------------------------------------------------------------------------
        return (
            <div>
                <div className="canvas-container">
                    <canvas
                        id="canvas"
                        className="w-screen h-screen bg-underground-dark"
                        tabIndex={1}
                        onContextMenu={handleContextMenu}
                        onWheel={(event) => {
                            if (event.buttons == 2) {
                                const currentSpeed = SDK3DVerse.engineAPI.cameraAPI.controllerSettings.speed;

                                if (event.deltaY > 0) {
                                    SDK3DVerse.engineAPI.cameraAPI.updateControllerSettings({
                                        speed: currentSpeed - 0.5 < 0 ? 0.1 : currentSpeed - 0.5,
                                    });
                                } else {
                                    SDK3DVerse.engineAPI.cameraAPI.updateControllerSettings({
                                        speed: currentSpeed + 0.5,
                                    });
                                }
                            }
                        }}
                        onMouseDown={() => {
                            const time = new Date().getTime();
                            const updatedTimeMouseKeys = [...timeMouseKeys];
                            updatedTimeMouseKeys[0] = time;
                            settimeMouseKeys(updatedTimeMouseKeys);
                        }}
                        onMouseUp={() => {
                            const time = new Date().getTime();
                            const updatedTimeMouseKeys = [...timeMouseKeys];
                            updatedTimeMouseKeys[1] = time;
                            settimeMouseKeys(updatedTimeMouseKeys);
                        }}
                        onClick={(e) => { (timeMouseKeys[1] - timeMouseKeys[0]) < 100 && onInputChange(e) }}
                        onKeyDown={(e) => {
                            onKeyboardChange(e);
                        }}
                    ></canvas>
                </div>

                <div className="canvas-outline" />
            </div>
        );
    },
);

Canvas.displayName = "Canvas";
