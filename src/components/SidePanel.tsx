import { useState, memo } from "react";

import ifcInfo from "../../data/json/ifcInfo.json";
import ifcTypes from "../../data/json/ifctype2guids.json";

import { guid2euid } from "@/lib/id-converter";

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, IconButton } from "@chakra-ui/react";
import { EyeIcon } from "./icons/EyeIcon";
import { CaretRightSharpSolidIcon } from "@/components/icons/CaretRightSharpSolidIcon";
import { SpaceName } from "@/components/SpaceName";

import { goToRoom, getEntityFromGuid, toToggle, getSurface } from "../lib/3dverse/helpers";
import { IfcData, IfcType, Attribute } from "@/types/ifc";
import { Logo } from "./Logo";

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

    const toggleStoreysVisibility = async (event: any) => {
        event.stopPropagation();
        const rootEntities = await SDK3DVerse.engineAPI.getRootEntities();
        if (visibleStoreys.some((element: boolean) => element === true)) {
            for (const rootEntity of rootEntities) {
                if (toToggle(rootEntity.components)) {
                    await rootEntity.setVisibility(false);
                }
            }
            setVisibleStoreys(Array(visibleStoreys.length).fill(false));
        } else {
            for (const rootEntity of rootEntities) {
                if (toToggle(rootEntity.components)) {
                    await rootEntity.setVisibility(true);
                }
            }
            setVisibleStoreys(Array(visibleStoreys.length).fill(true));
        }
    };

    return (
        <>
            <aside className="side-panel bg-color-underground">
                <header className="px-2 py-2">
                    <div className="flex flex-row gap-3">
                        <Logo className="-mt-px" />
                        <div>
                            <h1 className="text-lg font-semibold">IFC Demo App</h1>
                            <p className="text-xs font-light text-gray-600">
                                Example of a{" "}
                                <a
                                    className="text-color-secondary hover:underline"
                                    target="_blank"
                                    href="https://3dverse.com/"
                                >
                                    3dverse web app
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </header>
                <div className="side-panel-body flex-1 pb-12">
                    <div className="flex flex-row items-center justify-between pb-2 pl-4 pr-3">
                        <h2 className="text-xs text-gray-500 uppercase tracking-wide">Storeys</h2>
                        <IconButton
                            aria-label="Show/hide storey"
                            variant="ghost"
                            size="xs"
                            icon={<EyeIcon isVisible={visibleStoreys.some((element: boolean) => element === true)} />}
                            onClick={toggleStoreysVisibility}
                            _hover={{
                                bgColor: "var(--color-bg-ground)",
                            }}
                        />
                    </div>

                    <Accordion
                        defaultIndex={[1]}
                        allowMultiple
                        className="mx-2 border divide-y rounded-lg overflow-hidden"
                    >
                        {storeys.map((storey: string, index: number) => (
                            <div key={ifcData[storey].props.GlobalId}>
                                <AccordionItem className="bg-color-ground p-0" border="none">
                                    <AccordionButton
                                        pr="1"
                                        pl="2"
                                        py="1"
                                        textTransform="none"
                                        alignItems="center"
                                        className="w-full gap-2"
                                        border="none"
                                        _hover={{
                                            bgColor: "var(--color-bg-underground)",
                                        }}
                                        _focus={{
                                            bgColor: "var(--color-bg-underground)",
                                        }}
                                        _expanded={{
                                            bgColor: "var(--color-bg-underground)",
                                        }}
                                    >
                                        <AccordionIcon
                                            as={CaretRightSharpSolidIcon}
                                            width="3"
                                            height="3"
                                            opacity={0.2}
                                        />

                                        <h2 className="flex-1 text-left font-medium">{ifcData[storey].props.Name}</h2>
                                        <IconButton
                                            aria-label="Show/hide storey"
                                            variant="ghost"
                                            size="xs"
                                            icon={<EyeIcon isVisible={visibleStoreys[index]} />}
                                            onClick={(event) => {
                                                handleElementClick(index, ifcData[storey].props.GlobalId, event);
                                            }}
                                            _hover={{
                                                bgColor: "var(--color-bg-ground)",
                                            }}
                                        />
                                    </AccordionButton>
                                    <AccordionPanel p="0">
                                        <ul className="w-full pt-1 pb-2">
                                            {(() => {
                                                const spaces = [];
                                                const storeySpaces = ifcData[storey].props.spaces as string[];

                                                if (storeySpaces.length) {
                                                    for (let i = 0; i < storeySpaces.length; i++) {
                                                        spaces.push(
                                                            <li
                                                                className="group cursor-pointer hover:bg-color-underground transition-colors duration-300"
                                                                key={ifcData[storeySpaces[i]].props.GlobalId}
                                                                onClick={() => {
                                                                    const guid =
                                                                        ifcData[storeySpaces[i]].props["GlobalId"];
                                                                    goToRoom(guid2euid(guid));
                                                                }}
                                                            >
                                                                <SpaceName ifcAttributes={ifcData[storeySpaces[i]]} />
                                                            </li>,
                                                        );
                                                    }
                                                } else {
                                                    spaces.push(
                                                        <li
                                                            className="px-4 text-sm text-gray-500"
                                                            key={ifcData[storey].props.GlobalId}
                                                        >
                                                            No IfcSpace at this storey.
                                                        </li>,
                                                    );
                                                }

                                                return spaces;
                                            })()}
                                        </ul>
                                    </AccordionPanel>
                                </AccordionItem>
                            </div>
                        ))}
                    </Accordion>
                </div>
            </aside>
        </>
    );
});

SidePanel.displayName = "SidePanel";
