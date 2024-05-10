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
    selectedPropertyGUID,
    onClose,
}: {
    selectedProduct: Product | null;
    selectedPropertyGUID: string | null;
    onClose: () => void;
}) => {
    //------------------------------------------------------------------------------

    if (!selectedProduct && !selectedPropertyGUID) {
        return <></>;
    }

    //------------------------------------------------------------------------------
    return (
        <aside
            className={`
                panel-card lg:card animate-appear-top
                absolute lg:left-auto lg:bottom-0 lg:right-3
                lg:max-h-[80vh]
                flex flex-col
            `}
        >
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
            {selectedPropertyGUID && (
                <IfcPropertyPanel uppertitle={selectedProduct ? "IFC" : "Selection"} guid={selectedPropertyGUID} />
            )}
        </aside>
    );
};
//------------------------------------------------------------------------------
DetailsPanel.displayName = "DetailsPanel";
