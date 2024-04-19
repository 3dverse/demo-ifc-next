import { useState } from "react";

import ifcInfo from "../../data/json/ifcInfo.json";
import ifcTypes from "../../data/json/ifctype2guids.json";

import { guid2euid } from "@/lib/id-converter";
import { goToRoom, getEntityFromGuid, toToggle, getSurface } from "@/lib/3dverse/helpers";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    IconButton,
    Button,
} from "@chakra-ui/react";
import { CaretRightSharpSolidIcon, EyeIcon } from "@/components/common/icons";
import { SpaceName } from "@/components/SpaceName";

import { IfcData, IfcType, Attribute } from "@/types/ifc";

export const SidePanelStoreyList = () => {
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
            setVisibleStoreys(Array(visibleStoreys.length).fill(false));
            for (const rootEntity of rootEntities) {
                if (toToggle(rootEntity.components)) {
                    await rootEntity.setVisibility(false);
                }
            }
        } else {
            setVisibleStoreys(Array(visibleStoreys.length).fill(true));
            for (const rootEntity of rootEntities) {
                if (toToggle(rootEntity.components)) {
                    await rootEntity.setVisibility(true);
                }
            }
        }
    };

    const areSomeVisible = visibleStoreys.some((element: boolean) => element === true);

    return (
        <div className="flex-1 pb-12 h-[inherit]">
            <div className="flex flex-row items-center justify-between py-2 pl-4 pr-2">
                <h2 className="text-xs text-gray-500 uppercase tracking-wide">Storeys</h2>
                <Button
                    variant="ghost"
                    size="xs"
                    color="content.tertiary"
                    fontWeight={400}
                    onClick={toggleStoreysVisibility}
                >
                    {areSomeVisible ? "Hide" : "Show"} all
                </Button>
            </div>

            <div className="mx-2 overflow-y-scroll">
                <Accordion defaultIndex={[1]} allowMultiple>
                    {storeys.map((storey: string, index: number) => {
                        const spaces = ifcData[storey].props?.spaces;
                        const hasStoreySpaces = typeof spaces === "object" && spaces!.length > 0;

                        return (
                            <AccordionItem
                                key={ifcData[storey].props.GlobalId}
                                border="none"
                                isDisabled={!hasStoreySpaces}
                            >
                                {({ isExpanded }) => (
                                    <div
                                        className={`my-px bg-ground border transitions-all 
                                ${index === 0 ? "rounded-t-md" : ""}
                                ${index === storeys.length - 1 ? "rounded-b-md" : ""}
                                ${isExpanded ? "rounded-md overflow-hidden border-accent" : "border-transparent"}`}
                                    >
                                        <AccordionButton
                                            pr="1"
                                            pl="2"
                                            py="0"
                                            textTransform="none"
                                            alignItems="center"
                                            className="group w-full gap-2"
                                            border="none"
                                            _hover={{
                                                bgColor: "none",
                                            }}
                                            _focus={{
                                                bgColor: "var(--color-bg-underground)",
                                            }}
                                            _expanded={{
                                                bgColor: "var(--color-bg-underground)",
                                            }}
                                            _disabled={{
                                                opacity: 1,
                                                bgColor: "hsla(var(--color-bg-underground-hsl), .5)",
                                            }}
                                        >
                                            <AccordionIcon
                                                as={CaretRightSharpSolidIcon}
                                                width="3"
                                                height="3"
                                                opacity={
                                                    hasStoreySpaces
                                                        ? isExpanded
                                                            ? "1 !important"
                                                            : 0.2
                                                        : "0 !important"
                                                }
                                                className="fill-accent group-hover:opacity-[.4] transition-opacity"
                                            />

                                            <h2
                                                className={`flex-1 text-left font-medium ${
                                                    hasStoreySpaces ? "" : "text-gray-500"
                                                }`}
                                            >
                                                {ifcData[storey].props.Name}
                                                {!hasStoreySpaces && (
                                                    <span className="px-3 text-xs text-gray-400">No IfcSpace</span>
                                                )}
                                            </h2>

                                            <IconButton
                                                aria-label="Show/hide storey"
                                                variant="ghost"
                                                size="sm"
                                                icon={
                                                    <EyeIcon className="w-[14px]" isVisible={visibleStoreys[index]} />
                                                }
                                                onClick={(event) => {
                                                    handleElementClick(index, ifcData[storey].props.GlobalId, event);
                                                }}
                                                className="hover:opacity-100 transition-all"
                                                opacity={visibleStoreys[index] ? 0.8 : 0.5}
                                                _hover={{
                                                    bgColor: "transparent",
                                                }}
                                            />
                                        </AccordionButton>
                                        <AccordionPanel p="0">
                                            <ul className="w-full pt-1 pb-2">
                                                {(() => {
                                                    const storeySpaces = ifcData[storey].props.spaces as string[];

                                                    if (storeySpaces.length) {
                                                        const spaces = [];
                                                        for (let i = 0; i < storeySpaces.length; i++) {
                                                            spaces.push(
                                                                <li
                                                                    className="group cursor-pointer hover:bg-underground transition-colors duration-300"
                                                                    key={ifcData[storeySpaces[i]].props.GlobalId}
                                                                    onClick={() => {
                                                                        const guid =
                                                                            ifcData[storeySpaces[i]].props["GlobalId"];
                                                                        goToRoom(guid2euid(guid));
                                                                    }}
                                                                >
                                                                    <SpaceName
                                                                        ifcAttributes={ifcData[storeySpaces[i]]}
                                                                    />
                                                                </li>,
                                                            );
                                                        }
                                                        return spaces;
                                                    }
                                                })()}
                                            </ul>
                                        </AccordionPanel>
                                    </div>
                                )}
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>
        </div>
    );
};
