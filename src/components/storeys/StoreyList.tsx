import { useState } from "react";

import ifcInfo from "../../../data/json/ifcInfo.json";
import ifcTypes from "../../../data/json/ifctype2guids.json";

import { guid2euid } from "@/lib/id-converter";
import { goToRoom, getEntityFromGuid, toToggle } from "@/lib/3dverse/helpers";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    IconButton,
    Button,
} from "@chakra-ui/react";
import { CaretRightSharpSolidIcon } from "@/components/common/icons";
import { SpaceName } from "@/components/storeys/SpaceName";

import { IfcData, IfcType } from "@/types/ifc";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export const StoreyList = () => {
    const ifcData = ifcInfo as IfcData;
    const ifctypes = ifcTypes as IfcType;

    const storeyKey = "IfcBuildingStorey";
    const storeys = ifctypes[storeyKey];

    const [visibleStoreys, setVisibleStoreys]: any = useState(new Array(storeys.length).fill(true));

    const handleStoreyVisibility = async (index: any, storeyGuid: string | null, event: any) => {
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
        <article className="overflow-y-scroll h-full">
            <div className="flex-1 pb-4 md:pb-12">
                <header className="flex flex-row items-center justify-between py-2 pl-4 mr-12 md:mr-2">
                    <h2 className="text-xs text-secondary uppercase tracking-wide">Storeys</h2>
                    <Button
                        variant="ghost"
                        fontSize="2xs"
                        size="2xs"
                        px="1"
                        color="content.secondary"
                        fontWeight={400}
                        onClick={toggleStoreysVisibility}
                    >
                        {areSomeVisible ? "Hide" : "Show"} all
                    </Button>
                </header>

                <div className="md:mx-2">
                    <Accordion defaultIndex={[0]} allowMultiple>
                        {storeys.map((storey: string, index: number) => {
                            const spaces = ifcData[storey].props?.spaces;
                            const hasStoreySpaces = typeof spaces === "object" && spaces!.length > 0;
                            const isStoreyVisible = visibleStoreys[index];

                            return (
                                <AccordionItem
                                    key={ifcData[storey].props.GlobalId}
                                    border="none"
                                    isDisabled={!hasStoreySpaces}
                                    opacity={isStoreyVisible ? 1 : 0.6}
                                    transition="opacity .25s"
                                >
                                    {({ isExpanded }) => (
                                        <div
                                            className={`
                                            my-px bg-ground border transitions-all 
                                            ${index === 0 ? "md:rounded-t-md" : ""}
                                            ${index === storeys.length - 1 ? "md:rounded-b-md" : ""}
                                            ${
                                                isExpanded
                                                    ? "rounded-md overflow-hidden border-accent"
                                                    : "border-transparent"
                                            }
                                        `}
                                        >
                                            <div className="relative">
                                                <AccordionButton
                                                    pr="1"
                                                    pl="2"
                                                    py="1"
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
                                                        bgColor: "hsl(var(--color-bg-underground-hsl), .5)",
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
                                                        _expanded={{
                                                            transform: "rotate(180deg)",
                                                        }}
                                                    />

                                                    <h2
                                                        className={`flex-1 text-left font-medium ${
                                                            hasStoreySpaces ? "" : "text-secondary"
                                                        }`}
                                                    >
                                                        {ifcData[storey].props.Name}
                                                        {!hasStoreySpaces && (
                                                            <span className="px-3 text-xs text-tertiary">
                                                                No IfcSpace
                                                            </span>
                                                        )}
                                                    </h2>
                                                </AccordionButton>
                                                <IconButton
                                                    aria-label="Show/hide storey"
                                                    variant="ghost"
                                                    size="sm"
                                                    icon={isStoreyVisible ? <RiEyeLine /> : <RiEyeOffLine />}
                                                    onClick={(event) => {
                                                        handleStoreyVisibility(
                                                            index,
                                                            ifcData[storey].props.GlobalId,
                                                            event,
                                                        );
                                                    }}
                                                    pos="absolute"
                                                    top="0"
                                                    px={[4, 0]}
                                                    right="0"
                                                    className="hover:opacity-100 transition-all"
                                                    opacity={isStoreyVisible ? 0.8 : 0.5}
                                                    _hover={{
                                                        bgColor: "transparent",
                                                    }}
                                                    _focus={{
                                                        bgColor: "transparent",
                                                    }}
                                                />
                                            </div>

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
                                                                                ifcData[storeySpaces[i]].props[
                                                                                    "GlobalId"
                                                                                ];
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
        </article>
    );
};
