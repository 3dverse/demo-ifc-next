//------------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@chakra-ui/react";

//------------------------------------------------------------------------------
export function useSyncMediaQuery(...args: Parameters<typeof useMediaQuery>) {
    // don't try to execute a media query if in SSR
    const isAsyncResultReady = useRef(typeof window === "undefined");
    useEffect(() => {
        isAsyncResultReady.current = true;
    }, []);
    const asyncResult = useMediaQuery(...args);
    return isAsyncResultReady.current
        ? asyncResult
        : ([] as string[]).concat(args[0]).map((q) => window.matchMedia(q).matches);
}

//------------------------------------------------------------------------------
const getIsTouch = () => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

//------------------------------------------------------------------------------
export const getIsIos = () => {
    if (typeof navigator === "undefined") return false;
    return (
        ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(
            navigator.platform,
        ) ||
        (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
};

//------------------------------------------------------------------------------
const getIsAndroid = () => {
    if (typeof navigator === "undefined") return false;
    return navigator.userAgent.toLowerCase().indexOf("android") > -1;
};

//------------------------------------------------------------------------------
export const useDevice = () => {
    const [isTouch, setIsTouch] = useState<boolean>(getIsTouch());
    const [isIos, setIsIos] = useState<boolean>(getIsIos());
    const [isAndroid, setIsAndroid] = useState<boolean>(getIsAndroid());
    return { isTouch, isIos, isAndroid };
};
