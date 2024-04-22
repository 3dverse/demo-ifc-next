import { memo, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { RiExpandRightLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { MainPanelHeader } from "@/components/layout/MainPanelHeader";
import { StoreyList } from "@/components/storeys/StoreyList";
import { Logo } from "@/components/common/Logo";
import { MobileMainNav } from "./MobileMainNav";
import { ActiveNavItemId } from "@/core/type";

export const MainPanel = memo(
    ({ isExpanded, onExpand, onCollapse }: { isExpanded: boolean; onExpand: () => void; onCollapse: () => void }) => {
        const [activeNavItemId, setActiveNavItemId] = useState<ActiveNavItemId>(null);

        const isCollapsed = !isExpanded;

        const SHOW_NOT_READY_FEATURE = false;

        return (
            <>
                <aside
                    className={twMerge(
                        `
                            main-panel
                            fixed lg:absolute
                            lg:top-0 bottom-0 left-0 w-screen lg:w-[var(--main-panel-width)] h-full max-h-[50vh] lg:h-[100dvh] lg:max-h-none
                            rounded-xl lg:rounded-none
                            bg-backdrop-blur transition-all
                        `,
                        isCollapsed ? "lg:w-16" : "",
                    )}
                >
                    {isCollapsed && <CollapsedMainPanel onExpand={onExpand} />}

                    <div
                        className={twMerge(
                            "flex flex-col h-[inherit]",
                            isCollapsed ? "animate-disappear-left" : "animate-appear-right",
                        )}
                    >
                        <MainPanelHeader onCollapse={onCollapse} />
                        <div className="overflow-y-scroll h-full">
                            <StoreyList />
                        </div>
                    </div>
                </aside>
                {SHOW_NOT_READY_FEATURE && (
                    <MobileMainNav activeNavItemId={activeNavItemId} setActiveNavItemId={setActiveNavItemId} />
                )}
            </>
        );
    },
);

MainPanel.displayName = "MainPanel";

const CollapsedMainPanel = ({ onExpand }: { onExpand: () => void }) => (
    <div className="absolute top-2 left-2 flex flex-col items-center animate-appear-left z-10">
        <Logo className="-mt-px" />
        <IconButton
            aria-label="Expand side panel"
            size="sm"
            variant="ghost"
            color="content.tertiary"
            rounded="full"
            icon={<RiExpandRightLine />}
            rotate={90}
            onClick={onExpand}
        />
    </div>
);
