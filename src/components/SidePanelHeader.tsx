import { Logo } from "@/components/common/Logo";
import { Button } from "@chakra-ui/react";

export const SidePanelHeader = ({ onCollapse }: { onCollapse: () => void }) => (
    <header className="hidden xl:flex xl:justify-between items-center n px-2 py-2 border-b border-primary">
        <div className="flex flex-row gap-3">
            <Logo className="-mt-px" />
            <div>
                <h1 className="text-lg font-semibold">IFC Demo App</h1>
                <p className="text-xs font-light text-gray-600">
                    Example of a{" "}
                    <a className="text-secondary hover:underline" target="_blank" href="https://3dverse.com/">
                        3dverse web app
                    </a>
                    .
                </p>
            </div>
        </div>
        <div>
            <Button size="sm" onClick={onCollapse}>{`<`}</Button>
        </div>
    </header>
);
