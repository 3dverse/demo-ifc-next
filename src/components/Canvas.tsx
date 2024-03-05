import { useEffect, memo } from "react";
import { initApp } from "@/lib/3dverse/init";

export const Canvas = memo(({ onInputChange }: { onInputChange: (event: React.MouseEvent<HTMLElement>) => void }) => {
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
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <>
            <canvas
                id="display-canvas"
                className="w-screen h-screen"
                tabIndex={1}
                onContextMenu={handleContextMenu}
                onClick={onInputChange}
            ></canvas>
        </>
    );
});

Canvas.displayName = "Canvas";
