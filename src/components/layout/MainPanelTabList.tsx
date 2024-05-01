//------------------------------------------------------------------------------
import { Tab, TabIndicator, TabList } from "@chakra-ui/react";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MainPanelTabList = () => {
    //------------------------------------------------------------------------------
    const TAB_ITEMS = ["Storeys", "Produits"];

    //------------------------------------------------------------------------------
    return (
        <div className="relative">
            <TabList px={4} gap={4} borderBottom="1px" borderColor="border.primary">
                {TAB_ITEMS.map((item) => (
                    <Tab
                        key={item}
                        px={0}
                        pt={3}
                        fontWeight={500}
                        color="content.secondary"
                        _selected={{
                            color: "accent.600",
                        }}
                    >
                        {item}
                    </Tab>
                ))}
            </TabList>
            <TabIndicator bottom={0} height="2px" bg="accent.500" borderRadius=".75px" />
        </div>
    );
};
