//------------------------------------------------------------------------------
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MainPanelBody = ({ className, children }: { className?: string; children?: ReactNode }) => {
    //------------------------------------------------------------------------------
    return (
        <div className={twMerge("overflow-y-scroll h-[calc(100vh-140px)] pb-4 md:pb-12 md:px-2", className)}>
            {children}
        </div>
    );
};

//------------------------------------------------------------------------------
MainPanelBody.displayName = "MainPanelBody";
