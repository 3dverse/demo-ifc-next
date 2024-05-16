//------------------------------------------------------------------------------
import { ReactNode } from "react";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MainActionPanel = ({ children }: { children: ReactNode }) => {
    return (
        <div
            className={`
                absolute top-20 left-0
                hidden lg:flex flex-col gap-1 max-h-[10rem] w-auto lg:w-[30rem] mt-2
                bg-backdrop-blur rounded-lg shadow-xl z-10
                animate-appear-bottom [--animation-appear-offset:-8px] transition-all
                overflow-hidden
            `}
        >
            {children}
        </div>
    );
};
