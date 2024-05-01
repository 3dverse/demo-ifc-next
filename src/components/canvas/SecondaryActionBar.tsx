//------------------------------------------------------------------------------
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
import { Settings } from "@/components/canvas/Settings";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const SecondaryActionBar = ({
    isMainPanelExpanded,
    basePoint,
}: {
    isMainPanelExpanded: boolean;
    basePoint: any;
}) => {
    return (
        <div
            className={twMerge(
                `absolute bottom-4 left-0 lg:left-[var(--main-panel-width)] 
                flex flex-col md:flex-row items-start justify-between gap-2 
                max-w-[500px] ml-2 
                animate-appear-left animation-delay-[250ms] opacity-0 transition-all`,
                !isMainPanelExpanded ? "lg:left-16" : "",
            )}
        >
            <Settings basePoint={basePoint} />
        </div>
    );
};
