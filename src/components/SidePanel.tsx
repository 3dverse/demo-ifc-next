import { useState, memo } from "react";

import ifcInfo from "../../public/data/json/ifcInfo.json";
import ifcTypes from "../../public/data/json/ifctype2guids.json";

import { guid2euid } from "../utils/idsConverter";

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Icon } from "@chakra-ui/react";
import { EyeIcon } from "./EyeIcon";

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

export const SidePanel = memo(() => {
    console.log("render panel")
    const ifcData = ifcInfo as object;
    const ifctypes = ifcTypes as object;

    const storeyKey = "IfcBuildingStorey" as keyof typeof ifctypes;
    const storeys = ifctypes[storeyKey];

    const [visibleStoreys, setVisibleStoreys]: any = useState(new Array(storeys.length).fill(true));

    const handleElementClick = async (index: any, storeyGuid: string, event: any) => {
        event.stopPropagation();

        const storeyEntity = (await SDK3DVerse.engineAPI.findEntitiesByEUID(guid2euid(storeyGuid)))[0];

        if (!visibleStoreys[index]) {
            setVisibleStoreys((a: Array<boolean>) => {
                const newArray = [...a];
                newArray[index] = true;
                return newArray;
            });

            storeyEntity.setVisibility(true);
        } else {
            setVisibleStoreys((a: Array<boolean>) => {
                const newArray = [...a];
                newArray[index] = false;
                return newArray;
            });
            storeyEntity.setVisibility(false);
        }
    };

    return (
        <>
            <aside className="side-panel">
                <header className="side-panel-header">
                    <h1>Demo app IFC</h1>
                </header>
                <div className="side-panel-body">
                    <h2>Storeys</h2>

                    {storeys.map((storey: any, index: any) => (
                        <Accordion defaultIndex={[0]} allowMultiple>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <AccordionIcon />
                                        <Box as="span" flex="1" textAlign="left">
                                            {ifcData[storey].props.Name}
                                        </Box>
                                        <div
                                            onClick={(event) =>
                                                handleElementClick(index, ifcData[storey].props.GlobalId, event)
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
                                            const items = ifcData[storey].props.spaces;
                                            for (let i = 0; i < items.length; i++) {
                                                itemList.push(
                                                    <li
                                                        key={ifcData[items[i]].props.GlobalId}
                                                        onClick={(e: any) =>
                                                            goToRoom(guid2euid(ifcData[items[i]].props.GlobalId))
                                                        }
                                                    >
                                                        {ifcData[items[i]].props.Name}
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
});
