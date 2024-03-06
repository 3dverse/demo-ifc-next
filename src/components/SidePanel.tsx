import { useState, memo } from "react";

import ifcInfo from "../../data/json/ifcInfo.json";
import ifcTypes from "../../data/json/ifctype2guids.json";

import { guid2euid } from "@/lib/id-converter";

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Icon } from "@chakra-ui/react";
import { EyeIcon } from "./EyeIcon";
import { SpaceName } from "@/components/SpaceName";

import { goToRoom, getEntityFromGuid } from "../lib/3dverse/helpers";
import { IfcData, IfcType, Attribute } from "@/types/ifc";

export const SidePanel = memo(() => {
    const ifcData = ifcInfo as IfcData;
    const ifctypes = ifcTypes as IfcType;

    const storeyKey = "IfcBuildingStorey";
    const storeys = ifctypes[storeyKey];

    const [visibleStoreys, setVisibleStoreys]: any = useState(new Array(storeys.length).fill(true));

    function getSurface(areaData: Attribute) {
        return typeof areaData === "number" ? areaData.toFixed(2) : "-";
    }

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

                                            if (storeySpaces.length) {
                                                for (let i = 0; i < storeySpaces.length; i++) {
                                                    spaces.push(
                                                        <li
                                                            className="group cursor-pointer hover:bg-gray-300"
                                                            key={ifcData[storeySpaces[i]].props.GlobalId}
                                                            onClick={() => {
                                                                const guid = ifcData[storeySpaces[i]].props["GlobalId"];
                                                                goToRoom(guid2euid(guid));
                                                            }}
                                                        >
                                                            <div className="flex flex-row justify-between">
                                                                <SpaceName ifcAttributes={ifcData[storeySpaces[i]]} />
                                                                {
                                                                    <small>
                                                                        {`${getSurface(
                                                                            ifcData[storeySpaces[i]].psets
                                                                                .PSet_Revit_Dimensions.Area,
                                                                        )} m²`}
                                                                    </small>
                                                                }
                                                            </div>
                                                        </li>,
                                                    );
                                                }
                                            } else {
                                                spaces.push(
                                                    <li key={ifcData[storey].props.GlobalId}>
                                                        {"No IfcSpace at this storey"}
                                                    </li>,
                                                );
                                            }

                                            return spaces;
                                        })()}
                                        <li></li>
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
