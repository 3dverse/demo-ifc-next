import { useState, memo } from "react";

import ifcInfo from "../../data/json/ifcInfo.json";
import ifcTypes from "../../data/json/ifctype2guids.json";

import { guid2euid } from "@/lib/id-converter";

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, IconButton } from "@chakra-ui/react";
import { EyeIcon } from "./icons";
import { CaretRightSharpSolidIcon } from "@/components/icons";
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
        <aside className="side-panel bg-blur">
            <header className="px-2 py-2 border-b border-primary">
                <div className="flex flex-row gap-3">
                    <Logo className="-mt-px" />
                    <div>
                        <h1 className="text-lg font-semibold">IFC Demo App</h1>
                        <p className="text-xs font-light text-gray-600">
                            Example of a{" "}
                            <a className="text-secondary hover:underline" target="_blank" href="https://3dverse.com/">
                                3dverse web app
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </header>
            <div className="side-panel-body flex-1 pb-12 animate-appear-left">
                <div className="flex flex-row items-center justify-between py-2 pl-4 pr-3">
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

                <Accordion defaultIndex={[1]} allowMultiple className="mx-2">
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
                                            ${
                                                isExpanded
                                                    ? "rounded-md overflow-hidden border-accent"
                                                    : "border-transparent"
                                            }`}
                                    >
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
                                            {hasStoreySpaces && (
                                                <IconButton
                                                    aria-label="Show/hide storey"
                                                    variant="ghost"
                                                    size="xs"
                                                    icon={<EyeIcon isVisible={visibleStoreys[index]} />}
                                                    onClick={(event) => {
                                                        handleElementClick(
                                                            index,
                                                            ifcData[storey].props.GlobalId,
                                                            event,
                                                        );
                                                    }}
                                                    className="text-[red] opacity-80 transition-all"
                                                    opacity={visibleStoreys[index] ? 1 : undefined}
                                                    _hover={{
                                                        opacity: "1",
                                                        bgColor: "var(--color-bg-underground)",
                                                    }}
                                                />
                                            )}
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
        </aside>
    );
});

SidePanel.displayName = "SidePanel";
