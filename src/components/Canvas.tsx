import Script from "next/script";
import { memo } from "react";
import { initApp } from "../3dverse/helpers.js";

export const Canvas = memo(({ onInputChange }) => {
    const handleContextMenu = (event: any) => {
        event.preventDefault();
    };

    return (
        <>
            <Script src="https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js" onLoad={initApp} />
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
