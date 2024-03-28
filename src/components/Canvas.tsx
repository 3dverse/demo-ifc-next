import { useEffect, memo } from "react";
import { Dispatch, SetStateAction } from "react";
import { initApp } from "@/lib/3dverse/init";
import { getInitialPoint } from "@/lib/3dverse/helpers";
import { BasePoint } from "@/types/ifc";

export const Canvas = memo(
    ({
        onInputChange,
        onKeyboardChange,
        setBasePoint,
    }: {
        onInputChange: (event: React.MouseEvent<HTMLElement>) => void;
        onKeyboardChange: (event: React.KeyboardEvent<HTMLElement>) => void;
        setBasePoint: Dispatch<SetStateAction<BasePoint>>;
    }) => {
        const handleContextMenu = (event: any) => {
            event.preventDefault();
        };

        useEffect(() => {
            let cancelled = false;
            SDK3DVerse.disconnectFromSession()
                .catch(() => null)
                .then(async () => {
                    if (cancelled) return;
                    await initApp();
                    setBasePoint(getInitialPoint());
                });

            return () => {
                cancelled = true;
            };
        }, []);

        return (
            <>
                <canvas
                    id="display-canvas"
                    className="w-screen h-screen bg-color-underground"
                    tabIndex={1}
                    onContextMenu={handleContextMenu}
                    onClick={onInputChange}
                    onKeyDown={(e) => {
                        onKeyboardChange(e);
                    }}
                ></canvas>
            </>
        );
    },
);

Canvas.displayName = "Canvas";
