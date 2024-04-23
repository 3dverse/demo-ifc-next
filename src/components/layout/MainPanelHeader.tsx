import { ReactNode } from "react";

export const MainPanelHeader = ({ title, children }: { title: string; children?: ReactNode }) => {
    return (
        <header className="flex flex-row items-center justify-between py-2 pl-4 pr-8 md:pr-2 border-b md:border-b-0 border-tertiary">
            <h2 className="text-xs text-secondary uppercase tracking-wide">{title}</h2>
            {children}
        </header>
    );
};

MainPanelHeader.displayName = "MainPanelHeader";
