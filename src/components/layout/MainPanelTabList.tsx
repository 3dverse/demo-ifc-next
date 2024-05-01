//------------------------------------------------------------------------------
import { Tab, TabIndicator, TabList } from "@chakra-ui/react";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MainPanelTabList = () => {
    //------------------------------------------------------------------------------
    const TAB_ITEMS = ["Storeys", "Produits"];

    //------------------------------------------------------------------------------
    return (
        <>
            <TabList px={4} gap={4} borderBottom="1px" borderColor="border.primary">
                {TAB_ITEMS.map((item) => (
                    <Tab
                        key={item}
                        px={0}
                        pt={3}
                        _selected={{
                            color: "accent.500",
                        }}
                    >
                        {item}
                    </Tab>
                ))}
            </TabList>
            <TabIndicator mt="-1.5px" height="2px" bg="accent.500" borderRadius="1px" />
        </>
    );
};
