//------------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { Accordion, Text } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import PRODUCT_LIST from "data/json/products.json";

//------------------------------------------------------------------------------
import { MainPanelHeader } from "@/components/layout/MainPanelHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { ProductsListAccordionItem } from "./ProductsListAccordionItem";

//------------------------------------------------------------------------------
import { Product } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const ProductsList = () => {
    //------------------------------------------------------------------------------
    const [productList, setProductList] = useState<Product[]>(PRODUCT_LIST);
    const [searchString, setSearch] = useState("");

    //------------------------------------------------------------------------------
    useEffect(() => {
        const sortKey = "storeySpace";
        let newProductList = PRODUCT_LIST;

        // Search
        newProductList = newProductList.filter((p) => p.name.toLowerCase().includes(searchString.toLowerCase()));

        setProductList(newProductList);
    }, [searchString]);

    //------------------------------------------------------------------------------
    return (
        <article className="overflow-y-scroll h-full">
            <div className="flex-1 pb-4 md:pb-12">
                <MainPanelHeader title="Products" className="!px-2 py-1">
                    <SearchInput setSearch={setSearch} />
                    {productList.length < PRODUCT_LIST.length && (
                        <Text fontSize="2xs" color="content.secondary">
                            {productList.length}
                            <span className="px-px">/</span>
                            {PRODUCT_LIST.length}
                        </Text>
                    )}
                </MainPanelHeader>

                <div className="md:mx-2">
                    {productList.length > 0 ? (
                        <Accordion allowMultiple>
                            {productList.map((product, index) => (
                                <ProductsListAccordionItem
                                    key={index}
                                    product={product}
                                    productCount={productList.length}
                                    index={index}
                                    searchString={searchString}
                                />
                            ))}
                        </Accordion>
                    ) : (
                        <div className="animate-appear-top [--animation-appear-offset:10px]">
                            <p className="text-xs text-tertiary text-center p-8">No results</p>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};
