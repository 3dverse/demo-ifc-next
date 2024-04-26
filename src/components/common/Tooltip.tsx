//------------------------------------------------------------------------------
import { ReactNode } from "react";
import { TooltipProps, Tooltip as ChakraTooltip } from "@chakra-ui/react";
import { useDevice } from "@/hooks/useDevice";

//------------------------------------------------------------------------------
export const Tooltip = ({ children, ...tooltipProps }: { children: ReactNode } & TooltipProps) => {
    //------------------------------------------------------------------------------
    const { isTouch } = useDevice();

    //------------------------------------------------------------------------------
    return (
        <ChakraTooltip isDisabled={isTouch} openDelay={500} closeOnClick size="sm" placement="top" {...tooltipProps}>
            {children}
        </ChakraTooltip>
    );
};
