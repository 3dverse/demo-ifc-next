//------------------------------------------------------------------------------
import { twMerge } from "tailwind-merge";

//------------------------------------------------------------------------------
import { Settings } from "@/components/canvas/Settings";
import { InviteButton } from "@/components/canvas/InviteButton";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const SecondaryActionBar = ({ basePoint, sessionId }: { basePoint: any; sessionId: string }) => {
    return (
        <div
            className={twMerge(
                `absolute top-4 md:top-6 right-4 md:right-6
                flex flex-col md:flex-row items-start justify-between gap-3
                max-w-[500px] ml-2
                animate-appear-left animation-delay-[250ms] opacity-0 transition-all`,
            )}
        >
            <Settings basePoint={basePoint} />
            <InviteButton sessionId={sessionId} />
        </div>
    );
};
