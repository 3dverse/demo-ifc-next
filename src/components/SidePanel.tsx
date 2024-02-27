"use client";

import ifcType2Guids from "../../public/data/json/ifctype2guids.json";
import ifcInfo from "../../public/data/json/ifcInfo.json";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Icon } from "@chakra-ui/react";
import { EyeIcon } from "./EyeIcon";

import { guid2euid, euid2guid } from "../utils/idsConverter";
import { useState } from "react";

async function goToRoom(roomUUID: any) {
    // Retrieve the IfcSpace entity to travel to from the scene graph.
    const spaceEntity = (await SDK3DVerse.engineAPI.findEntitiesByEUID(roomUUID))[0];
    const activeViewPort = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0];

    const aabbCenterGlobal = spaceEntity.getGlobalAABB().center;
    SDK3DVerse.engineAPI.cameraAPI.travel(
        activeViewPort,
        [aabbCenterGlobal[0] + 0.5, aabbCenterGlobal[1] + 0.5, aabbCenterGlobal[2] + 0.5],
        [0, 0, 0, 1],
        3,
    );
    // Update the orbit target.
    SDK3DVerse.updateControllerSetting({
        lookAtPoint: [aabbCenterGlobal[0] + 0.2, aabbCenterGlobal[1] + 0.2, aabbCenterGlobal[2] + 0.2],
    });
}

export const SidePanel = () => {
    const [ifcTypes, setIfcTypes]: any = useState(ifcType2Guids["IfcBuildingStorey"]);
    const [ifcProps, setIfcInfo]: any = useState(ifcInfo);
    const [visibleStoreys, setVisibleStoreys]: any = useState(new Array(ifcTypes.length).fill(true));

    const handleElementClick = async (index: any, storeyGuid: string, event: any) => {
        event.stopPropagation();

        const storeyEntity = (await SDK3DVerse.engineAPI.findEntitiesByEUID(guid2euid(storeyGuid)))[0];

        if (!visibleStoreys[index]) {
            setVisibleStoreys((a) => {
                const newArray = [...a];
                newArray[index] = true;
                return newArray;
            });

            storeyEntity.setVisibility(true);
        } else {
            setVisibleStoreys((a) => {
                const newArray = [...a];
                newArray[index] = false;
                return newArray;
            });
            storeyEntity.setVisibility(false);
        }
    };

    return (
        <>
            <aside
                className="absolute
                            left-0 top-0 border-r border-color-primary
                            h-[100dvh] w-1/5
                            flex flex-col overflow-hidden 
                            bg-color-underground
                            shadow-xl
                            "
                style={{ backdropFilter: "blur(20px) saturate(.7)" }}
            >
                <header className="p-4">
                    <h1 className="text-lg tracking-tighter">Demo app Parsons</h1>
                </header>
                <div className="overflow-y-auto">
                    <h2 className="px-3 py-2 text-sm font-normal tracking-wider uppercase text-gray-600">Storeys</h2>

                    {ifcTypes.map((storey: any, index: any) => (
                        <Accordion defaultIndex={[0]} allowMultiple>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <AccordionIcon />
                                        <Box as="span" flex="1" textAlign="left">
                                            {ifcProps[storey].props.Name}
                                        </Box>
                                        <div
                                            onClick={(event) =>
                                                handleElementClick(index, ifcProps[storey].props.GlobalId, event)
                                            }
                                        >
                                            <EyeIcon visible={visibleStoreys[index]} />
                                        </div>
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <ul>
                                        {(() => {
                                            const itemList = [];
                                            const items = ifcProps[storey].props.spaces;
                                            for (let i = 0; i < items.length; i++) {
                                                itemList.push(
                                                    <li
                                                        key={ifcProps[items[i]].props.GlobalId}
                                                        onClick={(e: any) =>
                                                            goToRoom(guid2euid(ifcProps[items[i]].props.GlobalId))
                                                        }
                                                    >
                                                        {ifcProps[items[i]].props.Name}
                                                    </li>,
                                                );
                                            }
                                            return itemList;
                                        })()}
                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            </aside>
        </>
    );
};
