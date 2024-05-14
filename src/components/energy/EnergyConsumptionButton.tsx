//------------------------------------------------------------------------------
import { useState, Dispatch, SetStateAction } from "react";
import { Button, Icon, Spinner } from "@chakra-ui/react";
import { RiFlashlightFill } from "react-icons/ri";
import { toggleEnergyView } from "@/lib/3dverse/helpers";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const EnergyConsumptionButton = ({
    energyVisible,
    setEnergyVisibility,
}: {
    energyVisible: boolean;
    setEnergyVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
    //------------------------------------------------------------------------------
    const [isEnergyVizProcessing, setIsEnergyVizProcessing] = useState(false);

    //------------------------------------------------------------------------------
    const handleToggleEnergyView = async () => {
        const newEnergyVisible = !energyVisible;
        await toggleEnergyView(newEnergyVisible);
        setEnergyVisibility(newEnergyVisible);
        return newEnergyVisible;
    };

    //------------------------------------------------------------------------------
    const handleClick = async () => {
        setIsEnergyVizProcessing(true);
        await handleToggleEnergyView();
        setIsEnergyVizProcessing(false);
    };

    //------------------------------------------------------------------------------
    return (
        <Button
            variant="accent"
            fontSize="sm"
            leftIcon={<Icon as={RiFlashlightFill} opacity={0.5} boxSize={5} />}
            pl={3}
            isLoading={isEnergyVizProcessing}
            spinner={<Spinner color="white" thickness="1px" size="xs" mr="1" />}
            className="tracking-wide"
            display={{ base: "none", xl: "flex" }}
            onClick={handleClick}
        >
            {energyVisible ? "Hide" : "Visualize"} Energy Consumption
        </Button>
    );
};

EnergyConsumptionButton.displayName = "EnergyConsumptionButton";
