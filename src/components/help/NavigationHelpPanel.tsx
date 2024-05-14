//------------------------------------------------------------------------------
import { Box, Flex, IconButton, Popover, PopoverContent, PopoverTrigger, Text, useDisclosure } from "@chakra-ui/react";
import { RiCloseLine, RiQuestionLine } from "react-icons/ri";

//------------------------------------------------------------------------------
import HelpCursorSelectElement from "../../../public/images/help/help-cursor-select-element.svg";
import HelpCursorMove from "../../../public/images/help/help-cursor-move.svg";
import HelpCursorZoom from "../../../public/images/help/help-cursor-zoom.svg";
import HelpKeyboardZQSD from "../../../public/images/help/help-keyboard-zqsd.svg";
import HelpKeyboardArrow from "../../../public/images/help/help-keyboard-arrows.svg";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const NavigationHelpPanel = () => {
    //------------------------------------------------------------------------------
    const HELP_ITEMS = [
        {
            label: "See IFC Properties",
            instruction: "Left click",
            image: HelpCursorSelectElement,
        },
        {
            label: "Rotate camera",
            instruction: "Left click and move",
            image: HelpCursorMove,
        },
        {
            label: "Zoom",
            instruction: "Right click and move",
            image: HelpCursorZoom,
        },
    ];

    //--------------------------------------------------------------------------
    // Hooks
    const { isOpen, onClose, onToggle } = useDisclosure({ defaultIsOpen: true });

    //----------------------------------------------------------------------
    // UI
    return (
        <div className="hidden lg:block">
            <Popover isOpen={isOpen} closeOnBlur={false} placement="end-start" gutter={-32}>
                <PopoverTrigger>
                    <IconButton
                        visibility={isOpen ? "hidden" : "visible"}
                        aria-label="Toggle navigation help"
                        variant="ghost"
                        size="sm"
                        rounded="full"
                        display={["none", null, "flex"]}
                        icon={<RiQuestionLine fontSize="1.4rem" />}
                        onClick={onToggle}
                        border="1px"
                        borderColor="whiteAlpha.400"
                        bgColor="blackAlpha.200"
                        color="white"
                        _hover={{
                            bgColor: "blackAlpha.400",
                        }}
                        _active={{
                            color: "content.primaryDark",
                            borderColor: "whiteAlpha.800",
                            bgColor: "whiteAlpha.700",
                        }}
                        isActive={isOpen}
                        transition="all .15s cubic-bezier(0.4, 0, 0.2, 1)"
                        className={isOpen ? "backdrop-blur-2xl" : "backdrop-blur-sm"}
                    />
                </PopoverTrigger>

                <PopoverContent
                    pos="relative"
                    w="auto"
                    px={7}
                    pt={3}
                    pb={5}
                    color="content.primaryLight"
                    bgColor="transparent"
                    border="1px"
                    borderColor="white"
                    rounded="xl"
                >
                    <div
                        className="absolute -left-[9px] -bottom-[9px] w-[200%] h-[300%] -z-10 rounded-xl pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(at 25% 100%, rgba(31,46,56, .6) 0%, transparent 40%)",
                        }}
                    />
                    <Box pos="absolute" right="2px" top="2px">
                        <IconButton
                            aria-label="Close panel"
                            onClick={onClose}
                            size="sm"
                            color="content.primaryLight"
                            bgColor="#ffffff30"
                            rounded="5px"
                            icon={<RiCloseLine fontSize="1.4rem" />}
                            _hover={{
                                color: "content.primaryLight",
                                bgColor: "#ffffff30",
                            }}
                        />
                    </Box>
                    <Flex>
                        <Flex flexDir="column" gap={2}>
                            <Flex justifyContent="center" alignItems="center" gap={4} h={14}>
                                <Box as={HelpKeyboardZQSD} w={16} h={12} color="accent.700" />
                                <Box fontSize="3xs">OR</Box>
                                <Box as={HelpKeyboardArrow} w={16} h={12} color="accent.700" />
                            </Flex>
                            <Box textAlign="center" className="text-balance">
                                <Text fontSize="sm" fontWeight={500} pb="1px">
                                    Move
                                </Text>
                            </Box>
                        </Flex>
                        {HELP_ITEMS.map(({ label, instruction, image }) => (
                            <Flex key={label} flexDir="column" alignItems="center" gap={2} minW={44}>
                                <Flex justifyContent="center" alignItems="center" flexGrow={1} h={14}>
                                    <Box as={image} w={14} h={9} color="accent.700" />
                                </Flex>
                                <Box className="text-center text-balance">
                                    <Text fontSize="sm" fontWeight={500} pb="1px">
                                        {label}
                                    </Text>
                                    <Text fontSize="2xs" fontWeight={500} opacity={0.8} textTransform="uppercase">
                                        {instruction}
                                    </Text>
                                </Box>
                            </Flex>
                        ))}
                    </Flex>
                </PopoverContent>
            </Popover>
        </div>
    );
};
