import { ActiveNavItemId } from "@/core/type";
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { RiFlashlightLine, RiHeartFill, RiStackLine } from "react-icons/ri";

const MAIN_NAV = [
    {
        id: "storeys",
        label: "Storeys",
        icon: RiStackLine,
    },
    {
        id: "energy",
        label: "Energy",
        icon: RiFlashlightLine,
    },
];

export const MobileMainNav = ({
    activeNavItemId,
    setActiveNavItemId,
}: {
    activeNavItemId: ActiveNavItemId;
    setActiveNavItemId: (id: ActiveNavItemId) => void;
}) => {
    return (
        <nav className="fixed bottom-0 flex lg:hidden justify-center w-screen bg-ground divide-x border-t border-secondary z-[100]">
            {MAIN_NAV.map((navItem) => (
                <Button
                    key={navItem.id}
                    variant="ghost"
                    flexDirection="column"
                    gap="1"
                    fontWeight={400}
                    size="lg"
                    flex="1"
                    rounded="none"
                    color="content.secondary"
                    isActive={activeNavItemId === navItem.id}
                    onClick={() => setActiveNavItemId(navItem.id)}
                    _active={{
                        color: "accent.500",
                    }}
                >
                    <Box as={navItem.icon} />
                    <span className="text-xs text-color-secondary">{navItem.label}</span>
                </Button>
            ))}
        </nav>
    );
};
