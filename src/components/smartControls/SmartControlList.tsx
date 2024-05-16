//------------------------------------------------------------------------------
import { useState } from "react";
import { Button, Icon, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { RiArrowRightSFill, RiLightbulbFill, RiPlayFill } from "react-icons/ri";

//------------------------------------------------------------------------------
import { SmartControlLight2 } from "./SmartControlLight2";
import { SmartControlDoor } from "./SmartControlDoor";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const SmartControlList = () => {
    //------------------------------------------------------------------------------
    const items = [{ label: "Lights" }, { label: "Doors" }];

    //------------------------------------------------------------------------------
    const [activeItemIndex, setActiveItemIndex] = useState(0);

    //------------------------------------------------------------------------------
    // UI
    return (
        <article>
            <Tabs index={activeItemIndex} orientation="vertical" display="flex" minH={28}>
                <TabList gap={0} border="none" borderRight="1px" borderColor="border.primary">
                    {items.map((item, index: number) => (
                        <Tab
                            key={index}
                            as={Button}
                            onClick={() => setActiveItemIndex(index)}
                            isActive={index === activeItemIndex}
                            variant={index === activeItemIndex ? "accent" : "ghost"}
                            size="sm"
                            fontSize="xs"
                            justifyContent="space-between"
                            rounded="none"
                            border="none"
                            color={index === activeItemIndex ? "white!" : "content.secondary"}
                            bg={index === activeItemIndex ? "linear-gradient(45deg, #6537ec, #906afc)" : undefined}
                            pl={4}
                            pr={2}
                            minW={40}
                            rightIcon={
                                <Icon
                                    as={RiArrowRightSFill}
                                    boxSize={4}
                                    color="currentcolor"
                                    opacity={index === activeItemIndex ? 0.9 : 0.2}
                                />
                            }
                        >
                            {item.label}
                        </Tab>
                    ))}
                    <div className="flex items-end flex-1 px-3 py-2">
                        <p className="text-3xs leading-tight text-secondary opacity-90">
                            Connect any device
                            <br /> with 3dverse.
                        </p>
                    </div>
                </TabList>
                <TabPanels>
                    <TabPanel px={4} py={2} className="animate-appear-top [--animation-appear-offset:4px]">
                        <h1 className="text-2xs mb-2 opacity-90 uppercase tracking-wide">Connected lights</h1>
                        <SmartControlLight2 />
                    </TabPanel>
                    <TabPanel px={4} py={2} className="animate-appear-top [--animation-appear-offset:4px]">
                        <h1 className="text-2xs mb-2 opacity-90 uppercase tracking-wide">Animate Doors</h1>
                        <SmartControlDoor />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </article>
    );
};

//------------------------------------------------------------------------------
SmartControlList.displayName = "SmartControlList";
