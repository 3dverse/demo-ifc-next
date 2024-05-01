//------------------------------------------------------------------------------
import { Product } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const ProductDetails = ({ product }: { product: Product }) => {
    return (
        <div>
            <div className="w-full py-2 px-4 text-xs text-pretty">{product.instructions}</div>
        </div>
    );
};
