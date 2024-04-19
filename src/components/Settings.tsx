import { useState, memo } from "react";
import { Button, ButtonGroup, Menu, MenuButton, MenuItem, MenuList, Switch, Tooltip } from "@chakra-ui/react";
import { handleReset, handleEdgeSwitchChange, handleCameraSwitchChange, getInitialPoint } from "@/lib/3dverse/helpers";
import { BasePoint } from "@/types/ifc";
import {
    ArrowsToDotLightIcon,
    EllipsisLightIcon,
    PlaneUpLightIcon,
    PlaneUpSlashLightIcon,
} from "@/components/common/icons";

export const Settings = memo(({ basePoint }: { basePoint: BasePoint }) => {
    const [switchCameraState, setSwitchCameraState] = useState(true);
    const [switchEdgeState, setSwitchEdgeState] = useState(true);

    return (
        <ButtonGroup as="nav" isAttached variant="outline" size="sm">
            <Tooltip label="Reset position">
                <Button className="button button-icon-only button-island" onClick={() => handleReset(basePoint)}>
                    <ArrowsToDotLightIcon />
                </Button>
            </Tooltip>
            <Tooltip label="Toggle fly camera">
                <Button
                    className="button button-icon-only button-island"
                    onClick={() => handleCameraSwitchChange(switchCameraState, setSwitchCameraState)}
                >
                    {switchCameraState ? (
                        <PlaneUpLightIcon className="w-4" />
                    ) : (
                        <PlaneUpSlashLightIcon className="w-4" />
                    )}
                </Button>
            </Tooltip>
            <Menu closeOnSelect={false}>
                <MenuButton>
                    <Button roundedStart="none" className="button button-icon-only button-island">
                        <EllipsisLightIcon />
                    </Button>
                </MenuButton>
                <MenuList p="0" w="32" minW="auto">
                    <MenuItem onClick={() => handleEdgeSwitchChange(switchEdgeState, setSwitchEdgeState)}>
                        <span className="flex justify-between items-center flex-grow gap-4 text-sm">
                            Edges
                            <Switch size="sm" id="edges" isChecked={switchEdgeState} />
                        </span>
                    </MenuItem>
                </MenuList>
            </Menu>
        </ButtonGroup>
    );
});

Settings.displayName = "Settings";
