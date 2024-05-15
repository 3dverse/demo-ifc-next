//------------------------------------------------------------------------------
import { ReactNode } from "react";

//------------------------------------------------------------------------------
export const IconStriked = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <span className="absolute left-1/2 top-1/4 -rotate-45 block w-px h-1/2 bg-current shadow-[-1px_-1px_white] z-1" />
            {children}
        </>
    );
};
