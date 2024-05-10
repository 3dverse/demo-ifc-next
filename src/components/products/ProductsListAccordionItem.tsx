//------------------------------------------------------------------------------
import { AccordionItem, AccordionButton, AccordionIcon } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { CaretRightSharpSolidIcon } from "@/components/common/icons";
import { WasteTypeLabel } from "@/components/waste/WasteTypeLabel";
import { ProductsListAccordionPanel } from "./ProductsListAccordionPanel";

//------------------------------------------------------------------------------
import { Product } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const ProductsListAccordionItem = ({
    product,
    productCount,
    index,
    searchString,
}: {
    product: Product;
    productCount: number;
    index: number;
    searchString: string;
}) => {
    //------------------------------------------------------------------------------
    const highlightSearchString = (value: string) => {
        if (!value || value === "") {
            return value;
        }
        const regEx = new RegExp(searchString, "ig");
        const formattedValue = value.replace(regEx, "<mark>$&</mark>");
        return <span dangerouslySetInnerHTML={{ __html: formattedValue }} />;
    };

    //------------------------------------------------------------------------------
    // UI
    return (
        <AccordionItem key={index} border="none" transition="opacity .25s">
            {({ isExpanded }) => (
                <div
                    className={`
                        my-px bg-ground border transitions-all 
                        ${index === 0 ? "md:rounded-t-md" : ""}
                        ${index === productCount - 1 ? "md:rounded-b-md" : ""}
                        ${isExpanded ? "rounded-md overflow-hidden border-accent" : "border-transparent"}
                    `}
                >
                    <div className="relative">
                        <AccordionButton
                            px="2"
                            py="1"
                            textTransform="none"
                            alignItems="start"
                            className="group w-full gap-2"
                            border="none"
                            _hover={{
                                bgColor: "none",
                            }}
                            _focus={{
                                bgColor: "var(--color-bg-underground)",
                            }}
                            _expanded={{
                                bgColor: "var(--color-bg-underground)",
                            }}
                            _disabled={{
                                opacity: 1,
                                bgColor: "hsl(var(--color-bg-underground-hsl), .5)",
                            }}
                        >
                            <AccordionIcon
                                as={CaretRightSharpSolidIcon}
                                width={3}
                                height={3}
                                mt="5px"
                                opacity={isExpanded ? "1 !important" : 0.5}
                                transform={isExpanded ? "rotate(90deg)" : undefined}
                                className="fill-accent group-hover:opacity-[.8] transition-opacity"
                            />

                            <h2 className="flex-1 text-left text-sm [text-wrap:balance] font-medium">
                                {highlightSearchString(product.name)}
                            </h2>
                            <span className="block mt-[3px]">
                                <WasteTypeLabel wasteType={product.waste_type} />
                                {false && product.reuse_rate && (
                                    <p className="text-2xs text-secondary">{product.reuse_rate}%</p>
                                )}
                            </span>
                        </AccordionButton>
                    </div>
                    <ProductsListAccordionPanel product={product} />
                </div>
            )}
        </AccordionItem>
    );
};
