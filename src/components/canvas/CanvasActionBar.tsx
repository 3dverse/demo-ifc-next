import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import { Settings } from "@/components/canvas/Settings";
import { EnergyConsumptionButton } from "@/components/energy/EnergyConsumptionButton";

export const CanvasActionBar = ({
    isSidePanelExpanded,
    basePoint,
    energyVisible,
    setEnergyVisibility,
}: {
    isSidePanelExpanded: boolean;
    basePoint: any;
    energyVisible: any;
    setEnergyVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <div
            className={twMerge(
                `absolute top-4 left-0 xl:left-[var(--side-panel-width)] 
                flex flex-col lg:flex-row items-start justify-between gap-3 
                max-w-[500px] ml-3 
                animate-appear-left animation-delay-[250ms] opacity-0 transition-all`,
                !isSidePanelExpanded ? "xl:left-16" : "",
            )}
        >
            <Settings basePoint={basePoint} />
            <EnergyConsumptionButton energyVisible={energyVisible} setEnergyVisibility={setEnergyVisibility} />
        </div>
    );
};
