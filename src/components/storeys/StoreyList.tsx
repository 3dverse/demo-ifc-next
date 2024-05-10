//------------------------------------------------------------------------------
import { useState } from "react";
import { Accordion, Button } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import IFC_DATA from "../../../public/data/json/ifcData.json";
import ifcTypes from "../../../public/data/json/ifctype2guids.json";
import { getEntityFromGuid, toToggle } from "@/lib/3dverse/helpers";

//------------------------------------------------------------------------------
import { MainPanelHeader } from "@/components/layout/MainPanelHeader";
import { StoreyListAccordionItem } from "./StoreyListAccordionItem";

//------------------------------------------------------------------------------
import { IfcData, IfcType } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const StoreyList = () => {
    //------------------------------------------------------------------------------
    const ifcData = IFC_DATA as IfcData;
    const ifctypes = ifcTypes as IfcType;

    const storeyKey = "IfcBuildingStorey";
    const storeys = ifctypes[storeyKey];

    const [visibleStoreys, setVisibleStoreys]: any = useState(new Array(storeys.length).fill(true));

    //------------------------------------------------------------------------------
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

                storeyEntity?.setVisibility(true);
            } else {
                setVisibleStoreys((a: Array<boolean>) => {
                    const newArray = [...a];
                    newArray[index] = false;
                    return newArray;
                });
                storeyEntity?.setVisibility(false);
            }
        }
    };

    //------------------------------------------------------------------------------
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

    //------------------------------------------------------------------------------
    const areSomeVisible = visibleStoreys.some((element: boolean) => element === true);

    //------------------------------------------------------------------------------
    return (
        <article className="overflow-y-scroll h-full">
            <div className="flex-1 pb-4 md:pb-12">
                <MainPanelHeader title="Storeys">
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
                </MainPanelHeader>

                <div className="md:mx-2">
                    <Accordion allowMultiple>
                        {storeys.map((storey: string, index: number) => {
                            const spaces = ifcData[storey].props?.spaces;
                            const hasStoreySpaces = typeof spaces === "object" && spaces!.length > 0;
                            const isStoreyVisible = visibleStoreys[index];

                            return (
                                <StoreyListAccordionItem
                                    key={index}
                                    index={index}
                                    ifcData={ifcData}
                                    storey={storey}
                                    storeyCount={storeys.length}
                                    hasStoreySpaces={hasStoreySpaces}
                                    isStoreyVisible={isStoreyVisible}
                                    handleStoreyVisibility={handleStoreyVisibility}
                                />
                            );
                        })}
                    </Accordion>
                </div>
            </div>
        </article>
    );
};
