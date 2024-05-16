//------------------------------------------------------------------------------

import { Icon } from "@chakra-ui/react";
import { RiArrowLeftSLine, RiArrowRightSLine, RiComputerLine } from "react-icons/ri";

//------------------------------------------------------------------------------
import { Logo } from "@/components/common/Logo";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MobileToDesktopIllustration = () => (
    <div className="relative">
        <Icon
            as={RiArrowRightSLine}
            boxSize={16}
            color="accent.200"
            style={{
                stroke: "var(--color-bg-ground)",
                strokeWidth: "1.5px",
            }}
            className="animate-appear-right animation-delay-[1s] opacity-0"
        />
        <Icon
            as={RiComputerLine}
            boxSize={32}
            color="accent.500"
            style={{
                stroke: "var(--color-bg-ground)",
                strokeWidth: "1.7px",
            }}
        />
        <Icon
            as={RiArrowLeftSLine}
            boxSize={16}
            color="accent.200"
            style={{
                stroke: "var(--color-bg-ground)",
                strokeWidth: "1.5px",
            }}
            className="animate-appear-left animation-delay-[1s] opacity-0"
        />

        <Logo className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 mt-px" id={5} />
    </div>
);
