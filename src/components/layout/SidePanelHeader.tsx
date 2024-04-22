import { Logo } from "@/components/common/Logo";
import { METADATA } from "@/lib/content/metadata";
import { IconButton } from "@chakra-ui/react";
import { RiExpandLeftLine } from "react-icons/ri";

export const SidePanelHeader = ({ onCollapse }: { onCollapse: () => void }) => (
    <header className="hidden xl:flex xl:justify-between items-center n px-2 py-2 border-b border-primary">
        <div className="flex flex-row gap-3">
            <Logo className="-mt-px" />
            <div>
                <h1 className="text-lg font-semibold">{METADATA.title}</h1>
                <p className="text-xs text-tertiary">
                    Example of a{" "}
                    <a className="link" target="_blank" href="https://3dverse.com/">
                        3dverse web app
                    </a>
                    .
                </p>
            </div>
        </div>
        <div>
            <IconButton
                aria-label="Collapse side panel"
                size="sm"
                variant="ghost"
                color="content.tertiary"
                rounded="full"
                icon={<RiExpandLeftLine />}
                onClick={onCollapse}
            />
        </div>
    </header>
);
