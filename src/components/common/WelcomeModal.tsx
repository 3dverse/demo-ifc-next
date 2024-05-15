//------------------------------------------------------------------------------
import { useEffect } from "react";
import {
    Button,
    Icon,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import { RiArrowLeftSLine, RiArrowRightSLine, RiComputerLine } from "react-icons/ri";

//------------------------------------------------------------------------------
import { Logo } from "@/components/common/Logo";

//------------------------------------------------------------------------------
import { defaultModalProps } from "@/styles/chakra/components/Modal";
import { breakpoints } from "@/styles/theme/breakpoints";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const WelcomeModal = () => {
    //------------------------------------------------------------------------------
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSmallerThanLG] = useMediaQuery(`(max-width: ${breakpoints.lg})`);

    //------------------------------------------------------------------------------
    useEffect(() => {
        isSmallerThanLG ? onOpen() : onClose();
    }, [isSmallerThanLG, onOpen, onClose]);

    //------------------------------------------------------------------------------
    const IS_FEATURE_READY = false;

    //------------------------------------------------------------------------------
    return (
        <Modal isOpen={isOpen} onClose={onClose} {...defaultModalProps} isCentered>
            <ModalOverlay />
            <ModalContent textAlign="center" className="text-balance">
                <ModalBody px={0} pb={0}>
                    <MobileToDesktopIllustration />
                    <h2 className="mt-4 mb-8 text-xl font-medium">
                        <span className="text-accent">Continue on your desktop</span>
                        <br /> to get the full experience.
                    </h2>
                </ModalBody>

                <ModalFooter justifyContent={{ base: "center", md: "start" }} gap={3}>
                    {IS_FEATURE_READY && <Button>Send this app to your desktop</Button>}
                    <Button variant="accent" className="w-full" onClick={onClose}>
                        Understood
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

//------------------------------------------------------------------------------
const MobileToDesktopIllustration = () => (
    <div className="relative">
        <Icon
            as={RiArrowRightSLine}
            boxSize={16}
            color="accent.200"
            style={{
                stroke: "var(--color-bg-ground)",
                strokeWidth: "1.5px",
            }}
            className="animate-appear-right animation-delay-[1s] opacity-0"
        />
        <Icon
            as={RiComputerLine}
            boxSize={32}
            color="accent.500"
            style={{
                stroke: "var(--color-bg-ground)",
                strokeWidth: "1.7px",
            }}
        />
        <Icon
            as={RiArrowLeftSLine}
            boxSize={16}
            color="accent.200"
            style={{
                stroke: "var(--color-bg-ground)",
                strokeWidth: "1.5px",
            }}
            className="animate-appear-left animation-delay-[1s] opacity-0"
        />

        <Logo className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 mt-px" id={5} />
    </div>
);
