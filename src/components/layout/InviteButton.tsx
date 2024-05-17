//------------------------------------------------------------------------------
import { memo } from "react";
import { Button, Popover, PopoverBody, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { RiQrCodeFill, RiUserAddLine } from "react-icons/ri";
import QRCode from "react-qr-code";

//------------------------------------------------------------------------------
const buildQRCodeUrl = (sessionId: string) => {
    const baseUrl = window.location.href;
    const queryParam = `sessionId=${sessionId}`;
    const urlWithQueryParam = `${baseUrl}?${queryParam}`;
    return urlWithQueryParam;
};

//--------------------------------------------------------------------------
const shareLink = async () => {
    const url = window.location.href;

    if (navigator.share) {
        await navigator
            .share({
                title: document.title,
                text: document.title,
                url: url,
            })
            .catch((error) => {
                shareLinkPrompt(url);
                // console.log(`share failed: ${error}`);
            });
    } else {
        shareLinkPrompt(url);
    }
};

//--------------------------------------------------------------------------
const shareLinkPrompt = (url: string) => {
    const data = [new ClipboardItem({ "text/plain": new Blob([url], { type: "text/plain" }) })];
    navigator.clipboard.write(data);
    prompt("Copy and share this link to invite someone.", url);
};

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const InviteButton = memo(({ sessionId }: { sessionId: string }) => {
    //------------------------------------------------------------------------------
    return (
        <div className="absolute top-4 right-4 animate-appear-left">
            <div className="hidden lg:block">
                <Popover gutter={6}>
                    <PopoverTrigger>
                        <Button size="sm" variant="accent" rounded="full" leftIcon={<RiQrCodeFill />}>
                            Invite
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent w="min" mr={4}>
                        <PopoverBody p="4">
                            <QRCode value={buildQRCodeUrl(sessionId)} className="h-[10rem] w-[10rem]" />
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="block lg:hidden">
                <Button size="sm" variant="accent" rounded="full" leftIcon={<RiUserAddLine />} onClick={shareLink}>
                    Invite
                </Button>
            </div>
        </div>
    );
});

InviteButton.displayName = "InviteButton";
