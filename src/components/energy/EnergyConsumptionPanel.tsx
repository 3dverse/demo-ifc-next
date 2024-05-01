//------------------------------------------------------------------------------
import { memo } from "react";
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
import { EnergyConsumptionList } from "./EnergyConsumptionList";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const EnergyConsumptionPanel = memo(({ isMainPanelExpanded }: { isMainPanelExpanded: boolean }) => {
    return (
        <aside
            className={twMerge(
                `fixed bottom-14 lg:bottom-0 left-0
                hidden md:flex flex-col gap-1 max-h-[10rem] w-auto lg:w-[30rem] mx-2 my-4
                bg-backdrop-blur rounded-lg shadow-xl
                animate-appear-top animation-delay-[500ms] opacity-0 transition-all
            `,
                isMainPanelExpanded ? "lg:left-[var(--main-panel-width)]" : "lg:left-16",
            )}
        >
            <EnergyConsumptionList />
        </aside>
    );
});

//------------------------------------------------------------------------------
EnergyConsumptionPanel.displayName = "EnergyConsumptionPanel";
