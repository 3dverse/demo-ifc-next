//------------------------------------------------------------------------------
import { memo } from "react";
import { IconButton, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { RiExpandRightLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
import { MainPanelTop } from "@/components/layout/MainPanelTop";
import { MobileMainNav } from "@/components/layout/MobileMainNav";
import { StoreyList } from "@/components/storeys/StoreyList";
import { Logo } from "@/components/common/Logo";
import { ProductsList } from "@/components/products/ProductsList";
import { MainPanelTabList } from "@/components/layout/MainPanelTabList";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MainPanel = memo(
    ({ isExpanded, onExpand, onCollapse }: { isExpanded: boolean; onExpand: () => void; onCollapse: () => void }) => {
        const isCollapsed = !isExpanded;

        //------------------------------------------------------------------------------
        return (
            <>
                <aside
                    className={twMerge(
                        `
                            main-panel
                            hidden md:block
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
                        <StoreyList />
                    </div>
                </aside>

                <MobileMainNav />
            </>
        );
    },
);

MainPanel.displayName = "MainPanel";

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
