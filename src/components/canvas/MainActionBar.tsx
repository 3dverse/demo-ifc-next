//------------------------------------------------------------------------------
import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
import { Box, ButtonGroup, IconButton, Tooltip } from "@chakra-ui/react";
import {
    RiDeleteBin3Line,
    RiErrorWarningLine,
    RiFlashlightLine,
    RiLayoutMasonryLine,
    RiRecycleLine,
    RiWindyLine,
} from "react-icons/ri";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MainActionBar = ({
    isMainPanelExpanded,
    setEnergyVisibility,
}: {
    isMainPanelExpanded: boolean;
    setEnergyVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
    //------------------------------------------------------------------------------
    const [activeAction, setActiveAction] = useState<number | null>(null);

    //------------------------------------------------------------------------------
    const ACTIONS = [
        {
            name: "Waste Type",
            icon: RiDeleteBin3Line,
            onClick: () => console.log("Waste Type"),
        },
        {
            name: "Reuse rate",
            icon: RiRecycleLine,
            onClick: () => console.log("Reuse rate"),
        },
        {
            name: "Asbestos",
            icon: RiErrorWarningLine,
            onClick: () => console.log("Asbestos"),
            isHidden: true,
        },
        {
            name: "Zone map",
            icon: RiLayoutMasonryLine,
            onClick: () => console.log("Zone map"),
            isHidden: true,
        },
        {
            name: "Energy consumption",
            icon: RiFlashlightLine,
            onClick: () => setEnergyVisibility(true),
            isHidden: true,
        },
        {
            name: "Air quality",
            icon: RiWindyLine,
            onClick: () => console.log("Air quality"),
            isHidden: true,
        },
    ];
    //------------------------------------------------------------------------------
    // UI
    return (
        <div
            className={twMerge(
                `absolute top-4 left-0 lg:left-[var(--main-panel-width)] 
                flex flex-col md:flex-row items-start justify-between gap-2 
                max-w-[500px] ml-2 
                animate-appear-right animation-delay-[250ms] opacity-0 transition-all`,
                !isMainPanelExpanded ? "lg:left-16" : "",
            )}
        >
            <ButtonGroup isAttached variant="outline-island" size="sm" shadow={["lg", null, "xl"]} rounded="md">
                {ACTIONS.filter((a) => !a.isHidden).map(({ name, icon, onClick }, index: number) => (
                    <Tooltip key={name} label={name} size="md">
                        <IconButton
                            rounded="xl"
                            aria-label={name}
                            size="lg"
                            icon={<Box as={icon} fontSize="xl" />}
                            isActive={index === activeAction}
                            color="content.secondary"
                            _active={{
                                color: "white",
                                bgColor: "accent.500",
                            }}
                            border="none"
                            onClick={() => {
                                setActiveAction(index);
                                onClick();
                            }}
                        />
                    </Tooltip>
                ))}
            </ButtonGroup>
        </div>
    );
};
