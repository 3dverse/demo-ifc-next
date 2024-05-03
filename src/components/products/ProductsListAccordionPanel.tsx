//------------------------------------------------------------------------------
import { AccordionPanel, Button } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { travelToEntity } from "@/lib/3dverse/helpers";
import { guid2euid } from "@/lib/id-converter";
import { Product } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const ProductsListAccordionPanel = ({ product }: { product: Product }) => {
    //------------------------------------------------------------------------------
    const handleClick = (guid: string) => {
        travelToEntity(guid2euid(guid));
    };

    //------------------------------------------------------------------------------
    // UI
    return (
        <AccordionPanel p="0">
            <div className="flex flex-col">
                {product.ifc_instances_guids.map((ifcEntityUUID: string) => (
                    <Button
                        key={ifcEntityUUID}
                        variant="ghost"
                        size="sm"
                        justifyContent="start"
                        pl={7}
                        onClick={() => handleClick(ifcEntityUUID)}
                    >
                        {ifcEntityUUID}
                    </Button>
                ))}
            </div>
        </AccordionPanel>
    );
};
