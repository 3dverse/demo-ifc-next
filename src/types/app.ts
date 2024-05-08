//------------------------------------------------------------------------------
import { MainNavActiveItemId } from "@/core/type";
import { IconType } from "react-icons";

//------------------------------------------------------------------------------
export type MainNavItem = {
    id: MainNavActiveItemId;
    label: string;
    icon: IconType;
    iconActive: IconType;
};
