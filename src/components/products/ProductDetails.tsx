//------------------------------------------------------------------------------
import { WasteTypeLabel } from "@/components/waste/WasteTypeLabel";

//------------------------------------------------------------------------------
import { Product } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const ProductDetails = ({ product }: { product: Product }) => {
    return (
        <>
            <header className="card-header card-wrapper py-3">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                        <p className="card-title">Product</p>
                    </div>
                    <h1 className="py-1 text-lg font-semibold">{product.name}</h1>
                </div>
            </header>
            <div className="card-body pb-4">
                {false && (
                    <article className="pset w-full py-2 px-4 text-pretty">
                        {product.waste_type && <WasteTypeLabel wasteType={product.waste_type} />}
                        {product.reuse_rate && <p className="text-2xs text-secondary">{product.reuse_rate}%</p>}
                    </article>
                )}
                {typeof product.images === "object" && product.images.length > 0 && (
                    <article className="flex align-center justify-center p-4 bg-underground">
                        {product.images.map((imageUrl: string, i: number) => {
                            return (
                                <img
                                    key={i}
                                    src={`/data/${imageUrl}`}
                                    alt=""
                                    className="block w-32 aspect-square bg-ground"
                                />
                            );
                        })}
                    </article>
                )}

                {product.instructions && (
                    <article className="pset w-full py-4 px-4">
                        <h1 className="pb-px text-2xs text-secondary uppercase">Instructions</h1>
                        <p className="text-xs whitespace-pre [text-wrap:wrap]">{product.instructions}</p>
                    </article>
                )}
            </div>
        </>
    );
};
