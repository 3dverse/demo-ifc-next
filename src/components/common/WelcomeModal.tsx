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
import { RiTeamLine } from "react-icons/ri";

//------------------------------------------------------------------------------
import { defaultModalProps } from "@/styles/chakra/components/Modal";
import { breakpoints } from "@/styles/theme/breakpoints";
import { enableFullScreen } from "@/lib/utils/helper";

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
        <Modal isOpen={isOpen} onClose={onClose} {...defaultModalProps} isCentered size="lg">
            <ModalOverlay />
            <ModalContent textAlign="center" className="text-balance">
                <ModalBody px={0} pb={0}>
                    <Icon
                        as={RiTeamLine}
                        boxSize={24}
                        color="accent.500"
                        style={{
                            stroke: "white",
                            strokeWidth: "1.2px",
                        }}
                    />
                    <h2 className="mt-4 mb-8 text-lg md:text-xl font-medium">
                        The mobile viewer is designed to enhance collaboration with desktop users.
                    </h2>
                </ModalBody>

                <ModalFooter justifyContent={{ base: "center", md: "start" }} gap={3}>
                    {IS_FEATURE_READY && <Button>Send this app to your desktop</Button>}
                    <Button
                        variant="accent"
                        className="w-full"
                        onClick={() => {
                            enableFullScreen();
                            onClose();
                        }}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
