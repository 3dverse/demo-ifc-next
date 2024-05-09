//------------------------------------------------------------------------------
import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Box, ButtonGroup, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
    RiDeleteBin3Line,
    RiErrorWarningLine,
    RiFlashlightLine,
    RiLayoutMasonryLine,
    RiRecycleLine,
    RiWindyLine,
} from "react-icons/ri";

//------------------------------------------------------------------------------
import { MainActionLegend } from "./MainActionLegend";

//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
import { toggleFilter } from "@/lib/3dverse/helpers";
//------------------------------------------------------------------------------
export type MainAction = {
    name: string;
    icon: IconType;
    onClick: () => void;
    isHidden?: boolean;
    hasLegendPanel: boolean;
};

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
    const [activeActionIndex, setActiveActionIndex] = useState<number | undefined>();

    //------------------------------------------------------------------------------
    const ACTIONS = [
        {
            name: "Waste Type",
            icon: RiDeleteBin3Line,
            onClick: () => {
                if (activeActionIndex == 0) {
                    toggleFilter("W", false);
                } else {
                    toggleFilter("R", false);
                    toggleFilter("W", true);
                }
            },
            hasLegendPanel: true,
        },
        {
            name: "Reusability",
            icon: RiRecycleLine,
            onClick: () => {
                if (activeActionIndex == 1) {
                    toggleFilter("R", false);
                } else {
                    toggleFilter("W", false);
                    toggleFilter("R", true);
                }
            },
            hasLegendPanel: true,
        },
        {
            name: "Asbestos",
            icon: RiErrorWarningLine,
            onClick: () => console.log("Asbestos"),
            isHidden: true,
            hasLegendPanel: false,
        },
        {
            name: "Zone map",
            icon: RiLayoutMasonryLine,
            onClick: () => console.log("Zone map"),
            isHidden: true,
            hasLegendPanel: false,
        },
        {
            name: "Energy consumption",
            icon: RiFlashlightLine,
            onClick: () => setEnergyVisibility(true),
            isHidden: true,
            hasLegendPanel: false,
        },
        {
            name: "Air quality",
            icon: RiWindyLine,
            onClick: () => console.log("Air quality"),
            isHidden: true,
            hasLegendPanel: false,
        },
    ] as MainAction[];

    //------------------------------------------------------------------------------
    const toggleAction = (index: number) => {
        setActiveActionIndex(activeActionIndex === index ? undefined : index);
    };

    //------------------------------------------------------------------------------
    // UI
    return (
        <div
            className={twMerge(
                `absolute top-2 lg:top-4 left-0 lg:left-[var(--main-panel-width)] 
                flex flex-col md:flex-row items-start justify-between gap-2 
                max-w-[500px] ml-2 
                animate-appear-right animation-delay-[250ms] opacity-0 transition-all`,
                !isMainPanelExpanded ? "lg:left-16" : "",
            )}
        >
            <Flex flexDir="column" alignItems="start">
                <ButtonGroup isAttached variant="outline-island" size="sm" shadow={["lg", null, "xl"]} rounded="xl">
                    {ACTIONS.filter((a) => !a.isHidden).map(({ name, icon, onClick }, index: number) => (
                        <Tooltip key={name} label={name} size="sm" placement="top" gutter={0}>
                            <IconButton
                                rounded="xl"
                                aria-label={name}
                                size="lg"
                                icon={<Box as={icon} fontSize="xl" />}
                                isActive={index === activeActionIndex}
                                color="content.secondary"
                                _active={{
                                    color: "white",
                                    bgColor: "accent.500",
                                }}
                                border="none"
                                onClick={() => {
                                    toggleAction(index);
                                    onClick();
                                }}
                            />
                        </Tooltip>
                    ))}
                </ButtonGroup>
                {typeof activeActionIndex === "number" && ACTIONS[activeActionIndex].hasLegendPanel && (
                    <MainActionLegend
                        activeAction={activeActionIndex !== undefined ? ACTIONS[activeActionIndex] : undefined}
                    />
                )}
            </Flex>
        </div>
    );
};
