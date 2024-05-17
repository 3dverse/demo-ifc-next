//------------------------------------------------------------------------------
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
import { NavigationHelpPanel } from "../help/NavigationHelpPanel";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const BottomActionBar = ({ isMainPanelExpanded }: { isMainPanelExpanded: boolean }) => {
    return (
        <div
            className={twMerge(
                `
                absolute bottom-2 lg:bottom-4 left-0 lg:left-[var(--main-panel-width)] 
                hidden lg:flex flex-col md:flex-row items-start justify-between gap-2 
                max-w-[500px] ml-2 
                animate-appear-top animation-delay-[250ms] opacity-0 transition-all`,
                !isMainPanelExpanded ? "lg:left-16" : "",
            )}
        >
            <NavigationHelpPanel />
        </div>
    );
};
