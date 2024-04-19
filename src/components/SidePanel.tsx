import { memo, useEffect, useState } from "react";
import { Button, useMediaQuery } from "@chakra-ui/react";
import { twMerge } from "tailwind-merge";
import { SidePanelHeader } from "@/components/SidePanelHeader";
import { SidePanelStoreyList } from "@/components/SidePanelStoreyList";
import { Logo } from "@/components/common/Logo";

const BREAKPOINT_XL = "80em";

export const SidePanel = memo(
    ({
        isExpanded,
        onExpand,
        onCollapse,
        isUnderAnotherMobilepanel,
    }: {
        isExpanded: boolean;
        onExpand: () => void;
        onCollapse: () => void;
        isUnderAnotherMobilepanel: boolean;
    }) => {
        const [isUnderAnotherPanel, setIsUnderAnotherPanel] = useState(false);

        const [isSmallerThanXL] = useMediaQuery(`(max-width: ${BREAKPOINT_XL})`);
        useEffect(() => {
            if (isSmallerThanXL) {
                setIsUnderAnotherPanel(isUnderAnotherMobilepanel);
            }
        }, [isSmallerThanXL, isUnderAnotherMobilepanel]);

        const isCollapsed = !isExpanded;

        return (
            <aside
                className={twMerge(
                    `
                side-panel
                fixed xl:absolute
                xl:top-0 bottom-0 left-0 w-screen max-h-[50vh] xl:w-[var(--side-panel-width)] xl:h-[100dvh] xl:max-h-none
                rounded-xl xl:rounded-none
                bg-blur transition-all
            `,
                    isCollapsed ? "xl:w-16" : "",
                )}
                style={{
                    translate: isUnderAnotherPanel ? "0 10vh" : "0 0",
                    opacity: isUnderAnotherPanel ? ".2" : "1",
                }}
            >
                {isCollapsed && <CollapsedSidePanel onExpand={onExpand} />}

                <div
                    className={twMerge(
                        "flex flex-col h-[inherit]",
                        isCollapsed ? "animate-disappear-left" : "animate-appear-right",
                    )}
                >
                    <SidePanelHeader onCollapse={onCollapse} />
                    <SidePanelStoreyList />
                </div>
            </aside>
        );
    },
);

SidePanel.displayName = "SidePanel";

const CollapsedSidePanel = ({ onExpand }: { onExpand: () => void }) => (
    <div className="absolute top-2 left-2 flex flex-col items-center animate-appear-left z-10">
        <Logo className="-mt-px" />
        <Button onClick={onExpand} size="sm">{`>`}</Button>
    </div>
);
