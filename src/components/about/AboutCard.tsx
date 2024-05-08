//------------------------------------------------------------------------------
import { Card } from "@chakra-ui/react";

//------------------------------------------------------------------------------
import Logo3dverse from "../../../public/socials/logo_3dverse.svg";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const AboutCard = () => {
    return (
        <aside className="md:hidden fixed bottom-0 w-full p-4">
            <Card
                as="a"
                variant="glass"
                mx="auto"
                w="max-content"
                pl={4}
                pr={6}
                py={3}
                rounded="full"
                target="_blank"
                href="https://3dverse.com/"
                bgColor="#ffc700"
            >
                <div className="flex justify-center items-center gap-3">
                    <Logo3dverse className="w-6 brightness-0" />
                    <p className="text-center text-sm text-secondary font-medium">Application powered by 3dverse.</p>
                </div>
            </Card>
        </aside>
    );
};

//------------------------------------------------------------------------------
AboutCard.displayName = "AboutCard";
