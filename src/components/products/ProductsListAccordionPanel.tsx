//------------------------------------------------------------------------------
import { AccordionPanel, Button } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { focusOnEntity } from "@/lib/3dverse/helpers";
import { Product } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const ProductsListAccordionPanel = ({
    product,
    setSelectedProduct,
    setselectedPropertyGUID,
}: {
    product: Product;
    setSelectedProduct: (state: Product) => void;
    setselectedPropertyGUID: (state: string) => void;
}) => {
    //------------------------------------------------------------------------------
    const handleClick = async (guid: string) => {
        focusOnEntity(guid);
        setSelectedProduct(product);
        product.ifc_instances_guids[0] && setselectedPropertyGUID(product.ifc_instances_guids[0]);
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
