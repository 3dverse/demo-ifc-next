//------------------------------------------------------------------------------
import {
    Box,
    Button,
    Flex,
    Icon,
    IconButton,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { RiCloseLine, RiQuestionLine } from "react-icons/ri";

//------------------------------------------------------------------------------
import HelpCursorSelectElement from "../../../public/images/help/help-cursor-click.svg";
import HelpCursorFly from "../../../public/images/help/help-cursor-fly.svg";
import HelpCursorRotate from "../../../public/images/help/help-cursor-rotate.svg";
import HelpCursorZoom from "../../../public/images/help/help-cursor-zoom.svg";
import HelpKeyboardWASD from "../../../public/images/help/help-keyboard-wasd.svg";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const NavigationHelpPanel = () => {
    //------------------------------------------------------------------------------
    const HELP_ITEMS = [
        {
            label: "IFC Properties",
            instruction: "Left click",
            image: HelpCursorSelectElement,
        },
        {
            label: "Move",
            image: HelpKeyboardWASD,
            imageHeight: 12,
            instruction: <>or directional arrows</>,
        },
        {
            label: "Fly",
            instruction: (
                <>
                    Left click
                    <br /> and move
                </>
            ),
            image: HelpCursorFly,
        },
        {
            label: "Rotate",
            instruction: (
                <>
                    Right click
                    <br /> and move
                </>
            ),
            image: HelpCursorRotate,
        },
        {
            label: "Zoom",
            instruction: "Mouse wheel",
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
            <Popover isOpen={isOpen} closeOnBlur={false} placement="end-start" gutter={-32} autoFocus={false}>
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
                    px={5}
                    pt={3}
                    pb={3}
                    color="content.primaryLight"
                    bgColor="transparent"
                    border="1px"
                    borderColor="#ffffff60"
                    rounded="xl"
                >
                    <div
                        className="absolute -left-[9px] -bottom-[9px] w-[200%] h-[300%] -z-10 rounded-xl pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(at 25% 100%, rgba(31,46,56, .6) 0%, transparent 40%)",
                        }}
                    />
                    <Button
                        onClick={onClose}
                        variant="ghost"
                        size="xs"
                        color="#ffffffDD"
                        rightIcon={<Icon as={RiCloseLine} boxSize={4} />}
                        iconSpacing={1}
                        pos="absolute"
                        top={-1}
                        pr={0}
                        _hover={{
                            color: "#ffffff",
                            bgColor: "transparent",
                        }}
                        right={0}
                        transform="translateY(-100%)"
                    >
                        Hide navigation help
                    </Button>
                    <Flex gap={3}>
                        {HELP_ITEMS.map(({ label, instruction, image, imageHeight }) => (
                            <Flex key={label} flexDir="column" alignItems="center" gap={2} w="8rem">
                                <Flex justifyContent="center" alignItems="center" h={14}>
                                    <Box as={image} w={16} h={imageHeight ?? 10} />
                                </Flex>
                                <Box className="text-center text-balance">
                                    <Text fontSize="sm" fontWeight={500} pb="1px" className="tracking-wide">
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
