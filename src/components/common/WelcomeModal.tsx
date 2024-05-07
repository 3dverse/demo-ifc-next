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
import { BREAKPOINTS } from "@/styles/theme/breakpoints";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const WelcomeModal = () => {
    //------------------------------------------------------------------------------
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSmallerThanLG] = useMediaQuery(`(max-width: ${BREAKPOINTS.lg})`);

    //------------------------------------------------------------------------------
    useEffect(() => {
        isSmallerThanLG ? onOpen() : onClose();
    }, [isSmallerThanLG, onOpen, onClose]);

    //------------------------------------------------------------------------------
    const IS_FEATURE_READY = false;

    //------------------------------------------------------------------------------
    return (
        <Modal isOpen={isOpen} onClose={onClose} {...defaultModalProps}>
            <ModalOverlay />
            <ModalContent px={[8, 12]} py={[16, 8]} textAlign="center" className="text-balance">
                <ModalBody p={0}>
                    <MobileToDesktopIllustration />
                    <h2 className="py-4 mb-6 text-2xl font-medium">
                        <span className="text-accent">Continue on your desktop</span>
                        <br /> to get the full experience.
                    </h2>
                </ModalBody>

                <ModalFooter justifyContent={["center", "start"]} gap={3} px={0} py={0} mt={[0, null, 5]}>
                    {IS_FEATURE_READY && <Button>Send this app to your desktop</Button>}
                    <Button variant="primary" className="w-full" onClick={onClose}>
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
        />

        <Logo className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 mt-px" id={5} />
    </div>
);
