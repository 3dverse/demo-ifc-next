//------------------------------------------------------------------------------
import { AccordionPanel, Button } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { focusOnEntity } from "@/lib/3dverse/helpers";
import { Product } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const ProductsListAccordionPanel = ({ product }: { product: Product }) => {
    //------------------------------------------------------------------------------
    const handleClick = async (guid: string) => {
        focusOnEntity(guid);
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
