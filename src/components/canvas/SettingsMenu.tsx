//------------------------------------------------------------------------------
import { useState, memo } from "react";
import {
    ButtonGroup,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Switch,
} from "@chakra-ui/react";
import { RiPlaneFill, RiSettings3Line } from "react-icons/ri";

//------------------------------------------------------------------------------
import { Tooltip } from "@/components/common/Tooltip";
import { ArrowsToDotLightIcon } from "@/components/common/icons";
import { IconStriked } from "@/components/common/IconStriked";
import { MoveSpeedBar } from "@/components/settings/MoveSpeedBar";

//------------------------------------------------------------------------------
import { handleReset, handleEdgeSwitchChange, handleCameraSwitchChange } from "@/lib/3dverse/helpers";
import { BasePoint } from "@/types/ifc";

//------------------------------------------------------------------------------
const DEFAULT_MOVE_SPEED = SDK3DVerse.engineAPI.cameraAPI.controllerSettings.speed;

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const SettingsMenu = memo(({ basePoint }: { basePoint: BasePoint }) => {
    //------------------------------------------------------------------------------
    const [switchCameraState, setSwitchCameraState] = useState(true);
    const [switchEdgeState, setSwitchEdgeState] = useState(true);
    const [moveSpeed, setMoveSpeed] = useState<number>(DEFAULT_MOVE_SPEED);
    const [showMoveSpeedBar, setShowMoveSpeedbar] = useState<boolean>(false);

    //------------------------------------------------------------------------------
    const settingsActions = [
        {
            label: "Reset position",
            onClick: () => handleReset(basePoint),
            icon: <ArrowsToDotLightIcon className="w-4" />,
        },
        {
            label: "Toggle fly camera",
            onClick: () => handleCameraSwitchChange(switchCameraState, setSwitchCameraState),
            icon: switchCameraState ? (
                <Icon as={RiPlaneFill} />
            ) : (
                <IconStriked>
                    <Icon as={RiPlaneFill} />
                </IconStriked>
            ),
        },
    ];

    //------------------------------------------------------------------------------
    const handleMoveSpeed = (speed: number) => {
        setMoveSpeed(speed);
        SDK3DVerse.engineAPI.cameraAPI.updateControllerSettings({ speed });
    };

    //------------------------------------------------------------------------------
    return (
        <div>
            <ButtonGroup
                orientation="vertical"
                as="nav"
                isAttached
                variant="outline-island"
                size={{ base: "md", lg: "sm" }}
                shadow={["lg", null, "xl"]}
                rounded="md"
                className={showMoveSpeedBar ? "animate-disappear-left pointer-events-none" : "animate-appear-left"}
            >
                {settingsActions.map(({ label, onClick, icon }) => (
                    <Tooltip key={label} label={label} size="sm" placement="right">
                        <IconButton aria-label={label} onClick={onClick} icon={icon} border="none" />
                    </Tooltip>
                ))}
                <Menu closeOnSelect={false} gutter={3} placement="end-start">
                    <Tooltip label="Settings" size="sm" placement="right">
                        <MenuButton
                            as={IconButton}
                            border="none"
                            aria-label="Toggle Settings menu"
                            roundedTop="none"
                            icon={<Icon as={RiSettings3Line} boxSize={4} />}
                        />
                    </Tooltip>
                    <MenuList p="0" w="48" minW="auto">
                        <MenuItem onClick={() => handleEdgeSwitchChange(switchEdgeState, setSwitchEdgeState)}>
                            <span className="flex justify-between items-center flex-grow gap-4 text-xs">
                                Outline edges
                                <Switch
                                    size="sm"
                                    id="edges"
                                    isChecked={switchEdgeState}
                                    className="pointer-events-none"
                                />
                            </span>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => setShowMoveSpeedbar(true)}>
                            <span className="flex justify-between items-center flex-grow gap-4 text-xs">
                                Move speed
                                <span className="text-2xs text-secondary">{moveSpeed} km/h</span>
                            </span>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </ButtonGroup>
            {showMoveSpeedBar && (
                <MoveSpeedBar
                    speed={moveSpeed}
                    handleMoveSpeed={handleMoveSpeed}
                    setShowMoveSpeedbar={setShowMoveSpeedbar}
                />
            )}
        </div>
    );
});

//------------------------------------------------------------------------------
SettingsMenu.displayName = "SettingsMenu";
