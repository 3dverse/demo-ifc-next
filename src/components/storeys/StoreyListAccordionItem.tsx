//------------------------------------------------------------------------------
import { MouseEvent } from "react";
import { AccordionItem, AccordionButton, AccordionIcon, IconButton } from "@chakra-ui/react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

//------------------------------------------------------------------------------
import { CaretRightSharpSolidIcon } from "@/components/common/icons";
import { StoreyListAccordionPanel } from "./StoreyListAccordionPanel";

//------------------------------------------------------------------------------
import { IfcData } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const StoreyListAccordionItem = ({
    ifcData,
    storey,
    storeyCount,
    hasStoreySpaces,
    isStoreyVisible,
    index,
    handleStoreyVisibility,
}: {
    ifcData: IfcData;
    storey: string;
    storeyCount: number;
    hasStoreySpaces: boolean;
    isStoreyVisible: boolean;
    index: number;
    handleStoreyVisibility: (index: number, GlobalId: string, event: MouseEvent<HTMLButtonElement>) => void;
}) => {
    return (
        <AccordionItem
            key={ifcData[storey].props.GlobalId}
            border="none"
            isDisabled={!hasStoreySpaces}
            opacity={isStoreyVisible ? 1 : 0.6}
            transition="opacity .25s"
        >
            {({ isExpanded }) => (
                <div
                    className={`
                        my-px bg-ground border transitions-all 
                        ${index === 0 ? "md:rounded-t-md" : ""}
                        ${index === storeyCount - 1 ? "md:rounded-b-md" : ""}
                        ${isExpanded ? "rounded-md overflow-hidden border-accent" : "border-transparent"}
                    `}
                >
                    <div className="relative">
                        <AccordionButton
                            pr="1"
                            pl="2"
                            py="1"
                            textTransform="none"
                            alignItems="center"
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
                                width="3"
                                height="3"
                                opacity={hasStoreySpaces ? (isExpanded ? "1 !important" : 0.2) : "0 !important"}
                                className="fill-accent group-hover:opacity-[.4] transition-opacity"
                                _expanded={{
                                    transform: "rotate(180deg)",
                                }}
                            />

                            <h2 className={`flex-1 text-left font-medium ${hasStoreySpaces ? "" : "text-secondary"}`}>
                                {ifcData[storey].props.Name}
                                {!hasStoreySpaces && <span className="px-3 text-xs text-tertiary">No IfcSpace</span>}
                            </h2>
                        </AccordionButton>
                        <IconButton
                            aria-label="Show/hide storey"
                            variant="ghost"
                            size="sm"
                            icon={isStoreyVisible ? <RiEyeLine /> : <RiEyeOffLine />}
                            onClick={(event) => {
                                handleStoreyVisibility(index, ifcData[storey].props.GlobalId, event);
                            }}
                            pos="absolute"
                            top="0"
                            px={[4, 0]}
                            right="0"
                            className="hover:opacity-100 transition-all"
                            opacity={isStoreyVisible ? 0.8 : 0.5}
                            _hover={{
                                bgColor: "transparent",
                            }}
                            _focus={{
                                bgColor: "transparent",
                            }}
                        />
                    </div>

                    <StoreyListAccordionPanel ifcData={ifcData} storey={storey} />
                </div>
            )}
        </AccordionItem>
    );
};
