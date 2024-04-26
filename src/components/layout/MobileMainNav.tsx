//------------------------------------------------------------------------------
import { useState } from "react";
import { Box, Button, IconButton } from "@chakra-ui/react";
import {
    RiExpandRightLine,
    RiFlashlightFill,
    RiFlashlightLine,
    RiHomeFill,
    RiHomeLine,
    RiInformationFill,
    RiInformationLine,
    RiListCheck2,
    RiStackFill,
    RiStackLine,
} from "react-icons/ri";
import { IconType } from "react-icons";

//------------------------------------------------------------------------------
import { StoreyList } from "@/components/storeys/StoreyList";
import { EnergyConsumptionList } from "@/components/energy/EnergyConsumptionList";
import { AboutPanel } from "@/components/about/AboutPanel";
import { MainNavActiveItemId } from "@/core/type";

//------------------------------------------------------------------------------
export const MAIN_NAV_3D_ID = "3d";
export const MAIN_NAV_STOREYS_ID = "storeys";
export const MAIN_NAV_ENERGY_ID = "energy";
export const MAIN_NAV_ABOUT_ID = "about";

//------------------------------------------------------------------------------
const MOBILE_MAIN_NAV = [
    {
        id: MAIN_NAV_3D_ID,
        label: "3D",
        icon: RiHomeLine,
        iconActive: RiHomeFill,
    },
    {
        id: MAIN_NAV_STOREYS_ID,
        label: "Storeys",
        icon: RiStackLine,
        iconActive: RiStackFill,
    },
    {
        id: MAIN_NAV_ENERGY_ID,
        label: "Energy",
        icon: RiFlashlightLine,
        iconActive: RiFlashlightFill,
    },
    {
        id: MAIN_NAV_ABOUT_ID,
        label: "About",
        icon: RiInformationLine,
        iconActive: RiInformationFill,
    },
] as {
    id: MainNavActiveItemId;
    label: string;
    icon: IconType;
    iconActive: IconType;
}[];

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MobileMainNav = () => {
    //------------------------------------------------------------------------------
    const DEFAULT_ITEM_ID = MAIN_NAV_3D_ID;
    const [mainNavActiveItemId, setMainNavActiveItemId] = useState<MainNavActiveItemId>(DEFAULT_ITEM_ID);

    //------------------------------------------------------------------------------
    const handleChangeActiveId = (navItemId: MainNavActiveItemId) => {
        setMainNavActiveItemId(navItemId);
    };

    //------------------------------------------------------------------------------
    const handleClose = () => {
        setMainNavActiveItemId(MAIN_NAV_3D_ID);
    };

    //------------------------------------------------------------------------------
    return (
        <div className="md:hidden">
            {mainNavActiveItemId !== MAIN_NAV_3D_ID && (
                <div className="fixed bottom-12 left-0 w-screen h-full max-h-[50vh] rounded-t-xl bg-backdrop-blur shadow-[0_-10px_40px_0px_#00000020] animate-appear-top">
                    <div className="fixed top-0 right-0 rotate-90">
                        <IconButton
                            aria-label="Collapse panel"
                            variant="ghost"
                            rounded="full"
                            icon={<RiExpandRightLine />}
                            onClick={handleClose}
                        />
                    </div>
                    {mainNavActiveItemId === MAIN_NAV_STOREYS_ID && <StoreyList />}
                    {mainNavActiveItemId === MAIN_NAV_ENERGY_ID && <EnergyConsumptionList />}
                    {mainNavActiveItemId === MAIN_NAV_ABOUT_ID && <AboutPanel />}
                </div>
            )}
            <nav className="bg-backdrop-blur fixed bottom-0 flex lg:hidden justify-center w-screen bg-ground divide-x border-t border-secondary z-[100]">
                {MOBILE_MAIN_NAV.map((navItem) => (
                    <Button
                        key={navItem.id}
                        variant="ghost"
                        flexDirection="column"
                        gap="1px"
                        fontWeight={400}
                        size="lg"
                        flex="1"
                        rounded="none"
                        color="content.secondary"
                        className={mainNavActiveItemId === navItem.id ? "glow-effect before:bg-[white]" : undefined}
                        isActive={mainNavActiveItemId === navItem.id}
                        onClick={() => handleChangeActiveId(navItem.id)}
                        _hover={{
                            color: "accent.500",
                            bgColor: "transparent",
                        }}
                        _active={{
                            color: "accent.500",
                            bgColor: "transparent",
                        }}
                    >
                        <Box as={mainNavActiveItemId === navItem.id ? navItem.iconActive : navItem.icon} />
                        <span className="text-2xs text-color-secondary">{navItem.label}</span>
                    </Button>
                ))}
            </nav>
        </div>
    );
};
