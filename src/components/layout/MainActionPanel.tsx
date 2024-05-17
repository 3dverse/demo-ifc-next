//------------------------------------------------------------------------------
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MainActionPanel = ({ className, children }: { className?: string; children: ReactNode }) => {
    return (
        <div
            className={twMerge(
                `
                absolute top-20 left-0
                flex flex-col gap-1 max-h-[10rem] w-auto lg:w-[30rem] mt-2
                bg-backdrop-blur rounded-lg shadow-xl z-10
                animate-appear-bottom [--animation-appear-offset:-8px] transition-all
                overflow-hidden
            `,
                className,
            )}
        >
            {children}
        </div>
    );
};
