//------------------------------------------------------------------------------
import { Product } from "@/types/ifc";
import { AccordionPanel, Button } from "@chakra-ui/react";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const ProductsListAccordionPanel = ({ product }: { product: Product }) => {
    const goToIfc = (guid: string) => {
        console.log("goToIfc", guid);
    };

    return (
        <AccordionPanel p="0">
            <div className="flex flex-col">
                {product.ifc_instances_guids.map((ifcName) => (
                    <Button
                        key={ifcName}
                        variant="ghost"
                        size="sm"
                        justifyContent="start"
                        pl={7}
                        onClick={() => goToIfc("1234")}
                    >
                        {ifcName}
                    </Button>
                ))}
            </div>
        </AccordionPanel>
    );
};
