import { useState, memo } from "react";
import { ButtonGroup, IconButton, Menu, MenuButton, MenuItem, MenuList, Switch, Tooltip } from "@chakra-ui/react";
import { handleReset, handleEdgeSwitchChange, handleCameraSwitchChange } from "@/lib/3dverse/helpers";
import {
    ArrowsToDotLightIcon,
    EllipsisLightIcon,
    PlaneUpLightIcon,
    PlaneUpSlashLightIcon,
} from "@/components/common/icons";
import { BasePoint } from "@/types/ifc";

export const Settings = memo(({ basePoint }: { basePoint: BasePoint }) => {
    const [switchCameraState, setSwitchCameraState] = useState(true);
    const [switchEdgeState, setSwitchEdgeState] = useState(true);

    const settings_actions = [
        {
            label: "Reset position",
            onClick: () => handleReset(basePoint),
            icon: <ArrowsToDotLightIcon className="w-4" />,
        },
        {
            label: "Toggle fly camera",
            onClick: () => handleCameraSwitchChange(switchCameraState, setSwitchCameraState),
            icon: switchCameraState ? <PlaneUpLightIcon className="w-4" /> : <PlaneUpSlashLightIcon className="w-4" />,
        },
    ];

    return (
        <ButtonGroup as="nav" isAttached variant="outline-island" size="sm" shadow="xl">
            {settings_actions.map(({ label, onClick, icon }) => (
                <Tooltip key={label} label={label} size="sm">
                    <IconButton aria-label={label} onClick={onClick} icon={icon} />
                </Tooltip>
            ))}
            <Menu closeOnSelect={false} gutter={3}>
                <Tooltip label="Open render settings" size="sm">
                    <MenuButton
                        as={IconButton}
                        aria-label="Toggle Settings menu"
                        variant="outline-island"
                        roundedStart="none"
                        icon={<EllipsisLightIcon className="w-4" />}
                    />
                </Tooltip>
                <MenuList p="0" w="40" minW="auto">
                    <MenuItem onClick={() => handleEdgeSwitchChange(switchEdgeState, setSwitchEdgeState)}>
                        <span className="flex justify-between items-center flex-grow gap-4 text-xs">
                            Outline edges
                            <Switch size="sm" id="edges" isChecked={switchEdgeState} />
                        </span>
                    </MenuItem>
                </MenuList>
            </Menu>
        </ButtonGroup>
    );
});

Settings.displayName = "Settings";
