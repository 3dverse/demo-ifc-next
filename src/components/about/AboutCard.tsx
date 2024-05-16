//------------------------------------------------------------------------------
import { Button, Card } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import Logo3dverse from "../../../public/socials/logo_3dverse.svg";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const AboutCard = () => {
    return (
        <aside className="md:hidden fixed bottom-0 left-0 p-4">
            <Button
                as="a"
                target="_blank"
                href="https://3dverse.com/"
                p={2}
                bgColor="#000000"
                border="none"
                rounded="full"
            >
                <Logo3dverse className="w-6 " />
            </Button>
        </aside>
    );
};

//------------------------------------------------------------------------------
AboutCard.displayName = "AboutCard";
