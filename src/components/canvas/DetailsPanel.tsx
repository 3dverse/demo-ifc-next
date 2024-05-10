//------------------------------------------------------------------------------
import { Button } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { Product } from "@/types/ifc";
import { ProductDetails } from "@/components/products/ProductDetails";
import { IfcPropertyPanel } from "../IfcProperty/IfcPropertyPanel";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const DetailsPanel = ({
    selectedProduct,
    selectedPropertyEUID,
    onClose,
}: {
    selectedProduct: Product | null;
    selectedPropertyEUID: string | null;
    onClose: () => void;
}) => {
    //------------------------------------------------------------------------------

    if (!selectedProduct && !selectedPropertyEUID) {
        return <></>;
    }

    //------------------------------------------------------------------------------
    return (
        <aside className="panel-card lg:card animate-appear-top absolute lg:left-auto lg:bottom-0 lg:right-3 lg:max-h-[46vh] flex flex-col">
            <Button
                variant="ghost"
                size="xs"
                color="content.secondary"
                px="1"
                pos="absolute"
                top="2"
                right="2"
                onClick={onClose}
            >
                Close
            </Button>

            {selectedProduct && <ProductDetails product={selectedProduct} />}
            {selectedPropertyEUID && <IfcPropertyPanel guid={selectedPropertyEUID} />}
        </aside>
    );
};
//------------------------------------------------------------------------------
DetailsPanel.displayName = "DetailsPanel";
