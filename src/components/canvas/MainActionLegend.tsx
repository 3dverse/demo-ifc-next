//------------------------------------------------------------------------------
import { Box } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { MainAction } from "@/components/canvas/MainActionBar";
import { WasteLegend } from "@/components/waste/WasteLegend";
import { ReusabilityLegend } from "@/components/reusability/ReusabilityLegend";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MainActionLegend = ({ activeAction }: { activeAction?: MainAction }) => {
    //------------------------------------------------------------------------------
    // UI
    if (!activeAction) {
        return <></>;
    }
    //------------------------------------------------------------------------------
    return (
        <Box
            as="aside"
            px={3}
            py={2}
            mt={1}
            bgColor="rgba(252, 250, 254, 0.8)"
            borderColor="border.secondary"
            rounded="lg"
            className="animate-appear-bottom"
        >
            <h1 className="mb-1 text-2xs font-semibold text-accent-500 uppercase tracking-wide">{activeAction.name}</h1>
            {activeAction.name === "Waste Type" && <WasteLegend />}
            {activeAction.name === "Reusability" && <ReusabilityLegend />}
        </Box>
    );
};
