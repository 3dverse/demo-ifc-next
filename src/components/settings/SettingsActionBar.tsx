//------------------------------------------------------------------------------
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
import { SettingsMenu } from "@/components/settings/SettingsMenu";
import { BasePoint } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const SettingsActionBar = ({
    isMainPanelExpanded,
    basePoint,
}: {
    isMainPanelExpanded: boolean;
    basePoint: BasePoint;
}) => {
    return (
        <div
            className={twMerge(
                `absolute top-1/2 -translate-y-1/2 left-0 lg:left-[var(--main-panel-width)]
                flex flex-col md:flex-row items-start justify-between gap-2 
                max-w-[500px] ml-2
                animate-appear-left animation-delay-[250ms] opacity-0 transition-all`,
                !isMainPanelExpanded ? "lg:left-16" : "",
            )}
        >
            <SettingsMenu basePoint={basePoint} />
        </div>
    );
};
