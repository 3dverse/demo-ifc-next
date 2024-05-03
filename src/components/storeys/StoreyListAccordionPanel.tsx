//------------------------------------------------------------------------------
import { AccordionPanel } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { guid2euid } from "@/lib/id-converter";
import { travelToEntity } from "@/lib/3dverse/helpers";

//------------------------------------------------------------------------------
import { SpaceName } from "@/components/storeys/SpaceName";
import { IfcData } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const StoreyListAccordionPanel = ({ ifcData, storey }: { ifcData: IfcData; storey: string }) => {
    //------------------------------------------------------------------------------
    const handleClick = (storeySpace: string) => {
        const guid = ifcData[storeySpace].props["GlobalId"];
        travelToEntity(guid2euid(guid));
    };

    //------------------------------------------------------------------------------
    const storeySpaces = ifcData[storey].props.spaces as string[];
    //------------------------------------------------------------------------------
    // UI
    return (
        <AccordionPanel p="0">
            <ul className="w-full pt-1 pb-2">
                {storeySpaces.map((storey: string, i: number) => (
                    <li
                        key={ifcData[storey].props.GlobalId}
                        className="group cursor-pointer hover:bg-underground transition-colors duration-300"
                        onClick={() => handleClick(storey)}
                    >
                        <SpaceName ifcAttributes={ifcData[storey]} />
                    </li>
                ))}
            </ul>
        </AccordionPanel>
    );
};
