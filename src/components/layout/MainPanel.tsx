//------------------------------------------------------------------------------
import { memo } from "react";
import { IconButton, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { RiExpandRightLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
import { MainPanelTop } from "@/components/layout/MainPanelTop";
import { MobileMainNav } from "@/components/layout/MobileMainNav";
import { StoreyList } from "@/components/storeys/StoreyList";
import { ProductsList } from "@/components/products/ProductsList";
import { Logo } from "@/components/common/Logo";
import { MainPanelTabList } from "./MainPanelTabList";
import { Product } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MainPanel = memo(
    ({
        isExpanded,
        onExpand,
        onCollapse,
        setselectedPropertyGUID,
        setSelectedProduct,
    }: {
        isExpanded: boolean;
        onExpand: () => void;
        onCollapse: () => void;
        setselectedPropertyGUID: (state: string) => void;
        setSelectedProduct: (state: Product) => void;
    }) => {
        //------------------------------------------------------------------------------
        const isCollapsed = !isExpanded;

        //------------------------------------------------------------------------------
        // Temporary hide mobile navigation in order to avoid complexity.
        const IS_MOBILE_NAV_VISIBLE = false;

        //------------------------------------------------------------------------------
        // UI
        return (
            <>
                <aside
                    className={twMerge(
                        `
                            main-panel
                            hidden lg:block
                            absolute
                            top-0 left-0 w-screen w-[var(--main-panel-width)] h-[100dvh] 
                            rounded-none
                            bg-backdrop-blur transition-all
                        `,
                        isCollapsed ? "lg:w-16" : "",
                    )}
                >
                    {isCollapsed && <CollapsedMainPanel onExpand={onExpand} />}

                    <div
                        className={twMerge(
                            "flex flex-col h-[inherit] shadow-[23px_0_24px_-24px_#00000030]",
                            isCollapsed ? "animate-disappear-left" : "animate-appear-right",
                        )}
                    >
                        <MainPanelTop onCollapse={onCollapse} />
                        <Tabs
                            size="sm"
                            pos="relative"
                            variant="unstyled"
                            defaultIndex={1}
                            display="flex"
                            flexDir="column"
                            flexGrow="1"
                        >
                            <MainPanelTabList />
                            <TabPanels display="flex" flexGrow="1">
                                <TabPanel flexGrow="1" p={0}>
                                    <StoreyList />
                                </TabPanel>
                                <TabPanel flexGrow="1" p={0}>
                                    <ProductsList
                                        setSelectedProduct={setSelectedProduct}
                                        setselectedPropertyGUID={setselectedPropertyGUID}
                                    />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                </aside>
                {IS_MOBILE_NAV_VISIBLE && <MobileMainNav />}
            </>
        );
    },
);

//------------------------------------------------------------------------------
MainPanel.displayName = "MainPanel";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
const CollapsedMainPanel = ({ onExpand }: { onExpand: () => void }) => (
    <div className="absolute top-2 left-2 flex flex-col items-center animate-appear-left z-10">
        <Logo className="w-12 mt-3" id={2} />
        <IconButton
            aria-label="Expand side panel"
            size="sm"
            variant="ghost"
            color="content.tertiary"
            rounded="full"
            icon={<RiExpandRightLine />}
            rotate={90}
            _hover={{
                color: "content.primary",
                bgColor: "transparent",
            }}
            onClick={onExpand}
        />
    </div>
);
