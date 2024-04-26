//------------------------------------------------------------------------------
import { useState, Dispatch, SetStateAction } from "react";
import { Button, Spinner } from "@chakra-ui/react";
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
            variant="primary"
            size="sm"
            fontSize="xs"
            leftIcon={<RiFlashlightFill />}
            isLoading={isEnergyVizProcessing}
            spinner={<Spinner color="white" thickness="1px" size="xs" mr="1" />}
            className="tracking-wide"
            display={["none", null, null, null, "block"]}
            onClick={handleClick}
        >
            {energyVisible ? "Hide" : "Visualize"} Energy Consumption
        </Button>
    );
};

EnergyConsumptionButton.displayName = "EnergyConsumptionButton";
