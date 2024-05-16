//------------------------------------------------------------------------------
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { TabList, Tabs, Tab, Icon, TabPanels, TabPanel } from "@chakra-ui/react";
import { RiLeafLine, RiRouterLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
import { toggleEnergyView } from "@/lib/3dverse/helpers";
import { MainActionPanel } from "./MainActionPanel";
import { EnergyConsumptionList } from "../energy/EnergyConsumptionList";
import { SmartControlList } from "../smartControls/SmartControlList";

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
    //------------------------------------------------------------------------------
    const [tabIndex, setTabIndex] = useState<number>(-1);

    //------------------------------------------------------------------------------
    const TAB_ITEMS = [
        { label: "Energy consumption", icon: RiLeafLine },
        { label: "Smart controls", icon: RiRouterLine },
    ];

    //------------------------------------------------------------------------------
    const handleToggleEnergyView = useCallback(
        async (isToggle: boolean) => {
            await toggleEnergyView(isToggle);
            setEnergyVisibility(isToggle);
        },
        [setEnergyVisibility],
    );

    //------------------------------------------------------------------------------
    useEffect(() => {
        if (tabIndex === 0) {
            handleToggleEnergyView(true);
        } else if (energyVisible) {
            handleToggleEnergyView(false);
        }
    }, [energyVisible, handleToggleEnergyView, tabIndex]);

    //------------------------------------------------------------------------------
    return (
        <div
            className={twMerge(
                `absolute top-2 lg:top-4 left-0 lg:left-[var(--main-panel-width)]
                flex flex-col md:flex-row items-start justify-between gap-2 
                max-w-[500px] ml-2
                animate-appear-left animation-delay-[250ms] opacity-0 transition-all z-10`,
                !isMainPanelExpanded ? "lg:left-16" : "",
            )}
        >
            <Tabs variant="unstyled" index={tabIndex}>
                <TabList gap={1}>
                    {TAB_ITEMS.map(({ label, icon }, index: number) => (
                        <Tab
                            key={label}
                            onClick={() => {
                                console.log(index, tabIndex);
                                setTabIndex(index === tabIndex ? -1 : index);
                            }}
                            p={3}
                            pb="2!"
                            w={32}
                            aspectRatio="1 / .65"
                            bg="linear-gradient(45deg, var(--tab-bg-color-from), var(--tab-bg-color-to))"
                            fontWeight={500}
                            color="content.secondary"
                            flexDir="column"
                            alignItems="start"
                            justifyContent="space-between"
                            textAlign="left"
                            fontSize="xs"
                            lineHeight="1.1"
                            letterSpacing=".05em"
                            _selected={{
                                color: "white",
                                "--icon-opacity": ".9",
                                "--tab-bg-color-from": "#6537ec",
                                "--tab-bg-color-to": "#906afc",
                            }}
                            transitionProperty="all, --tab-bg-color-from, --tab-bg-color-to"
                            transitionDuration=".2s"
                            sx={{
                                "--icon-opacity": "0.5",
                            }}
                            rounded="xl"
                        >
                            <Icon as={icon} boxSize={5} opacity="var(--icon-opacity)" transition="opacity .25s" />
                            {label}
                        </Tab>
                    ))}
                </TabList>
                <style>
                    {`
                        @property --tab-bg-color-from {
                            syntax: "<color>";
                            initial-value: #ffffffAA;
                            inherits: false;
                        }
                        @property --tab-bg-color-to {
                            syntax: "<color>";
                            initial-value: #ffffffAA;
                            inherits: false;
                        }
                    `}
                </style>

                <TabPanels>
                    <TabPanel>
                        <MainActionPanel>
                            <EnergyConsumptionList />
                        </MainActionPanel>
                    </TabPanel>
                    <TabPanel>
                        <MainActionPanel>
                            <SmartControlList />
                        </MainActionPanel>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
};
