//------------------------------------------------------------------------------
import Image from "next/image";

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
                    <h1 className="text-lg font-semibold">{product.name}</h1>
                </div>
            </header>
            <div className="card-body pb-4">
                <article className="pset w-full">
                    <ul>
                        <li className="pset-list-item card-wrapper">
                            <p className="pset-label">Waste type</p>
                            <p className="pset-value">
                                {product.waste_type ? (
                                    <WasteTypeLabel wasteType={product.waste_type} className="flex-row" />
                                ) : (
                                    "Unknown"
                                )}
                            </p>
                        </li>
                        <li className="pset-list-item card-wrapper">
                            <p className="pset-label">Reuse rate</p>
                            <p className="pset-value">{product.reuse_rate ? `${product.reuse_rate} %` : "Unknown"}</p>
                        </li>
                    </ul>
                </article>
                {typeof product.images === "object" && product.images.length > 0 && (
                    <article className="flex flex-wrap align-center justify-center p-2 bg-underground">
                        {product.images.map((imageUrl: string, i: number) => {
                            return (
                                <Image
                                    key={i}
                                    src={`/demo-ifc-next/data/${imageUrl}`}
                                    alt=""
                                    width={128}
                                    height={128}
                                    className="block object-contain bg-ground p-px"
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
