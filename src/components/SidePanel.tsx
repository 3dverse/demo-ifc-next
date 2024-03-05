import { useState, memo } from "react";

import ifcInfo from "../../public/data/json/ifcInfo.json";
import ifcTypes from "../../public/data/json/ifctype2guids.json";

import { guid2euid } from "../utils/idsConverter";

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Icon } from "@chakra-ui/react";
import { EyeIcon } from "./EyeIcon";

import { goToRoom, getEntityFromGuid } from "../3dverse/helpers";
import { IfcData, IfcType } from "@/types/ifc";

export const SidePanel = memo(() => {
    const ifcData = ifcInfo as IfcData;
    const ifctypes = ifcTypes as IfcType;

    const storeyKey = "IfcBuildingStorey";
    const storeys = ifctypes[storeyKey];

    const [visibleStoreys, setVisibleStoreys]: any = useState(new Array(storeys.length).fill(true));

    const handleElementClick = async (index: any, storeyGuid: string | null, event: any) => {
        event.stopPropagation();

        if (storeyGuid) {
            const storeyEntity = await getEntityFromGuid(storeyGuid);

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

                    {storeys.map((storey: string, index: number) => (
                        <Accordion key={ifcData[storey].props.GlobalId} defaultIndex={[1]} allowMultiple>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <AccordionIcon />
                                        <Box as="span" flex="1" textAlign="left">
                                            {ifcData[storey].props.Name}
                                        </Box>
                                        <div
                                            onClick={(event) => {
                                                handleElementClick(index, ifcData[storey].props.GlobalId, event);
                                            }}
                                        >
                                            <EyeIcon visible={visibleStoreys[index]} />
                                        </div>
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <ul>
                                        {(() => {
                                            const spaces = [];
                                            const storeySpaces = ifcData[storey].props.spaces as string[];

                                            if (storeySpaces) {
                                                for (let i = 0; i < storeySpaces.length; i++) {
                                                    spaces.push(
                                                        <li
                                                            className="cursor-pointer"
                                                            key={ifcData[storeySpaces[i]].props.GlobalId}
                                                            onClick={(e: any) =>
                                                                goToRoom(
                                                                    guid2euid(ifcData[storeySpaces[i]].props.GlobalId),
                                                                )
                                                            }
                                                        >
                                                            {ifcData[storeySpaces[i]].props.LongName !== null
                                                                ? ifcData[storeySpaces[i]].props.LongName
                                                                : ifcData[storeySpaces[i]].props.Name}
                                                        </li>,
                                                    );
                                                }
                                            } else {
                                                spaces.push(<li>{"No IfcSpace at this storey"}</li>);
                                            }

                                            return spaces;
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

SidePanel.displayName = "SidePanel";
