//------------------------------------------------------------------------------
import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { EnergyConsumptionList } from "./EnergyConsumptionList";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const EnergyConsumptionPanel = memo(({ isMainPanelExpanded }: { isMainPanelExpanded: boolean }) => {
    return (
        <aside
            className={twMerge(
                `fixed top-12 left-0
                hidden lg:flex flex-col gap-1 max-h-[10rem] w-auto lg:w-[30rem] mx-2 my-4
                bg-backdrop-blur rounded-lg shadow-xl
                animate-appear-bottom animation-delay-[500ms] opacity-0 transition-all
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
