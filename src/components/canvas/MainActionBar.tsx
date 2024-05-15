//------------------------------------------------------------------------------
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
import { EnergyConsumptionButton } from "@/components/energy/EnergyConsumptionButton";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MainActionBar = ({
    isMainPanelExpanded,
    energyVisible,
    setEnergyVisibility,
}: {
    isMainPanelExpanded: boolean;
    energyVisible: any;
    setEnergyVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <div
            className={twMerge(
                `absolute top-2 lg:top-4 left-0 lg:left-[var(--main-panel-width)]
                flex flex-col md:flex-row items-start justify-between gap-2 
                max-w-[500px] ml-2
                animate-appear-left animation-delay-[250ms] opacity-0 transition-all`,
                !isMainPanelExpanded ? "lg:left-16" : "",
            )}
        >
            <EnergyConsumptionButton energyVisible={energyVisible} setEnergyVisibility={setEnergyVisibility} />
        </div>
    );
};
