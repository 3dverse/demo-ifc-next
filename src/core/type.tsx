import {
    MAIN_NAV_3D_ID,
    MAIN_NAV_STOREYS_ID,
    MAIN_NAV_ENERGY_ID,
    MAIN_NAV_ABOUT_ID,
} from "@/components/layout/MobileMainNav";

export type MainNavActiveItemId =
    | typeof MAIN_NAV_3D_ID
    | typeof MAIN_NAV_STOREYS_ID
    | typeof MAIN_NAV_ENERGY_ID
    | typeof MAIN_NAV_ABOUT_ID;
