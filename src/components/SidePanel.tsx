import { useState, memo } from "react";

import ifcInfo from "../../public/data/json/ifcInfo.json";
import ifcTypes from "../../public/data/json/ifctype2guids.json";

import { guid2euid } from "../utils/idsConverter";

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Icon } from "@chakra-ui/react";
import { EyeIcon } from "./EyeIcon";

import { goToRoom, getEntityFromGuid} from "../3dverse/helpers.js";

export const SidePanel = memo(() => {
    const ifcData = ifcInfo as object;
    const ifctypes = ifcTypes as object;

    const storeyKey = "IfcBuildingStorey" as keyof typeof ifctypes;
    const storeys = ifctypes[storeyKey];

    const [visibleStoreys, setVisibleStoreys]: any = useState(new Array(storeys.length).fill(true));

    const handleElementClick = async (index: any, storeyGuid: string, event: any) => {
        event.stopPropagation();

        const storeyEntity = getEntityFromGuid(storeyGuid);

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
                        <Accordion defaultIndex={[1]} allowMultiple>
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
                                            const spaces = [];
                                            const storeySpaces = ifcData[storey].props.spaces;

                                            if (storeySpaces.length) {
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
