//------------------------------------------------------------------------------
import { AccordionPanel } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { guid2euid } from "@/lib/id-converter";
import { goToRoom } from "@/lib/3dverse/helpers";

//------------------------------------------------------------------------------
import { SpaceName } from "@/components/storeys/SpaceName";
import { IfcData } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const StoreyListAccordionPanel = ({ ifcData, storey }: { ifcData: IfcData; storey: string }) => {
    return (
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
                                        const guid = ifcData[storeySpaces[i]].props["GlobalId"];
                                        goToRoom(guid2euid(guid));
                                    }}
                                >
                                    <SpaceName ifcAttributes={ifcData[storeySpaces[i]]} />
                                </li>,
                            );
                        }
                        return spaces;
                    }
                })()}
            </ul>
        </AccordionPanel>
    );
};
