//------------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { Button, Icon, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { RiArrowRightSFill } from "react-icons/ri";

//------------------------------------------------------------------------------
import { SmartControlLight } from "./SmartControlLight";
import { SmartControlDoor } from "./SmartControlDoor";

//------------------------------------------------------------------------------
import { LAMP_POS, DOOR_POS } from "@/lib/3dverse/helpers";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const SmartControlList = () => {
    //------------------------------------------------------------------------------
    const items = [{ label: "Lights" }, { label: "Doors" }];

    //------------------------------------------------------------------------------
    const [activeItemIndex, setActiveItemIndex] = useState(0);

    //------------------------------------------------------------------------------
    const onTabChange = (index: number) => {
        if (index === 0) {
            SDK3DVerse.engineAPI.cameraAPI.travel(LAMP_POS.position, LAMP_POS.orientation)
        } else if (index === 1) {
            SDK3DVerse.engineAPI.cameraAPI.travel(DOOR_POS.position, DOOR_POS.orientation)
        }
        setActiveItemIndex(index);
    };

    //------------------------------------------------------------------------------
    // UI
    return (
        <article>
            <Tabs orientation="vertical" display="flex" minH={28} onChange={onTabChange}>
                <TabList gap={0} border="none" borderRight="1px" borderColor="border.primary">
                    {items.map((item, index: number) => (
                        <Tab
                            key={index}
                            as={Button}
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
                            _hover={{
                                bgColor: "#ffffff60",
                            }}
                        >
                            {item.label}
                        </Tab>
                    ))}
                    <div className="flex items-end flex-1 px-3 py-2">
                        <p className="text-3xs leading-tight text-secondary opacity-90">
                            Connect to 3dverse
                            <br /> with any device.
                        </p>
                    </div>
                </TabList>
                <TabPanels minW={72}>
                    <TabPanel px={4} py={2} className="animate-appear-top [--animation-appear-offset:4px]">
                        <h1 className="text-2xs mb-2 opacity-90 uppercase tracking-wide">Connected lights</h1>
                        <SmartControlLight />
                    </TabPanel>
                    <TabPanel px={4} py={2} className="animate-appear-top [--animation-appear-offset:4px]">
                        <h1 className="text-2xs mb-2 opacity-90 uppercase tracking-wide">Animate Doors</h1>
                        <SmartControlDoor className="flex-col items-start gap-2" />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </article>
    );
};

//------------------------------------------------------------------------------
SmartControlList.displayName = "SmartControlList";
