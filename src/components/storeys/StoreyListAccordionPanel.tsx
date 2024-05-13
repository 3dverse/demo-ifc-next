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
export const StoreyListAccordionPanel = ({ ifcData, storeyGuid }: { ifcData: IfcData; storeyGuid: string }) => {
    //------------------------------------------------------------------------------
    const handleClick = (storeySpace: string) => {
        const guid = ifcData[storeySpace].props["GlobalId"];
        travelToEntity(guid2euid(guid));
    };

    //------------------------------------------------------------------------------
    const storeySpaces = ifcData[storeyGuid].props.spaces as string[];
    //------------------------------------------------------------------------------
    // UI
    return (
        <AccordionPanel p="0">
            <ul className="w-full pt-1 pb-2">
                {storeySpaces.map((storeySpaceGuid: string, i: number) => (
                    <li
                        key={ifcData[storeySpaceGuid].props.GlobalId}
                        className="group cursor-pointer hover:bg-underground transition-colors duration-300"
                        onClick={() => handleClick(storeySpaceGuid)}
                    >
                        <SpaceName ifcAttributes={ifcData[storeySpaceGuid]} />
                    </li>
                ))}
            </ul>
        </AccordionPanel>
    );
};
