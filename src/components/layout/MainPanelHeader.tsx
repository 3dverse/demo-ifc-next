//------------------------------------------------------------------------------
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MainPanelHeader = ({
    title,
    className,
    children,
}: {
    title: string;
    className?: string;
    children?: ReactNode;
}) => {
    return (
        <header
            className={twMerge(
                "flex flex-row items-center justify-between py-2 pl-4 pr-8 md:pr-2 border-b md:border-b-0 border-tertiary",
                className,
            )}
        >
            <h2 className="text-2xs text-secondary uppercase tracking-wide">{title}</h2>
            {children}
        </header>
    );
};

//------------------------------------------------------------------------------
MainPanelHeader.displayName = "MainPanelHeader";
