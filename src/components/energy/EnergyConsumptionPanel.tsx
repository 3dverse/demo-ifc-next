import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { EnergyConsumptionList } from "./EnergyConsumptionList";

export const EnergyConsumptionPanel = memo(({ isMainPanelExpanded }: { isMainPanelExpanded: boolean }) => {
    return (
        <aside
            className={twMerge(
                `fixed bottom-14 lg:bottom-5 left-0
                flex flex-col gap-1 max-h-[10rem] w-auto lg:w-[30rem] m-3
                bg-backdrop-blur rounded-lg shadow-xl
                animate-appear-top animation-delay-[500ms] opacity-0 transition-all
            `,
                isMainPanelExpanded ? "lg:left-[var(--main-panel-width)]" : "lg:left-16",
            )}
        >
            <header className="w-full flex flex-row justify-between items-center gap-4 px-4 pt-2">
                <h1>Energy Consumption</h1>
                <p className="flex items-center justify-center gap-1 font-semibold text-xs rounded-full bg-negative-100 text-negative px-2">
                    <small>&#9650;</small> 3 Alerts
                </p>
            </header>
            <EnergyConsumptionList />
        </aside>
    );
});

EnergyConsumptionPanel.displayName = "EnergyConsumptionPanel";
