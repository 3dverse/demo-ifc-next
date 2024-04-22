import { useState, Dispatch, SetStateAction } from "react";
import { Button, Spinner } from "@chakra-ui/react";
import { RiFlashlightFill } from "react-icons/ri";
import { toggleEnergyView } from "@/lib/3dverse/helpers";

export const EnergyConsumptionButton = ({
    energyVisible,
    setEnergyVisibility,
}: {
    energyVisible: boolean;
    setEnergyVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
    const [isEnergyVizProcessing, setIsEnergyVizProcessing] = useState(false);

    async function energyViewModifier(previousEnergyVisible: boolean) {
        const newEnergyVisible = !previousEnergyVisible;
        await toggleEnergyView(newEnergyVisible);
        setEnergyVisibility(newEnergyVisible);
        return newEnergyVisible;
    }

    const handleClick = async (previousEnergyVisible: boolean, previousIsEnergyVizProcessing: boolean) => {
        setIsEnergyVizProcessing(!previousIsEnergyVizProcessing);
        await energyViewModifier(previousEnergyVisible);
        setIsEnergyVizProcessing(previousIsEnergyVizProcessing);
    };

    return (
        <Button
            variant="primary"
            size="sm"
            leftIcon={<RiFlashlightFill />}
            isLoading={isEnergyVizProcessing}
            spinner={<Spinner color="white" thickness="1px" size="xs" mr="1" />}
            className="tracking-wide"
            onClick={() => {
                handleClick(energyVisible, isEnergyVizProcessing);
            }}
        >
            {energyVisible ? "Hide" : "Visualize"} Energy Consumption
        </Button>
    );
};

EnergyConsumptionButton.displayName = "EnergyViewButton";
