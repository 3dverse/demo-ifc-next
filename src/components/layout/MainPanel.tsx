//------------------------------------------------------------------------------
import { memo } from "react";
import { IconButton } from "@chakra-ui/react";
import { RiExpandRightLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
import { MainPanelTop } from "@/components/layout/MainPanelTop";
import { MobileMainNav } from "@/components/layout/MobileMainNav";
import { StoreyList } from "@/components/storeys/StoreyList";
import { Logo } from "@/components/common/Logo";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MainPanel = memo(
    ({ isExpanded, onExpand, onCollapse }: { isExpanded: boolean; onExpand: () => void; onCollapse: () => void }) => {
        //------------------------------------------------------------------------------
        const isCollapsed = !isExpanded;

        //------------------------------------------------------------------------------
        // Temporary hide mobile navigation in order to avoid complexity.
        const IS_MOBILE_NAV_VISIBLE = false;

        //------------------------------------------------------------------------------
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
                            isCollapsed ? "animate-disappear-right" : "animate-appear-left",
                        )}
                    >
                        <MainPanelTop onCollapse={onCollapse} />
                        <StoreyList />
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
