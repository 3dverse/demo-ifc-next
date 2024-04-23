import { Button, Popover, PopoverBody, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { memo } from "react";
import { RiQrCodeFill } from "react-icons/ri";
import QRCode from "react-qr-code";

function buildQRCodeUrl(sessionId: string) {
    const baseUrl = window.location.href;
    const queryParam = `sessionId=${sessionId}`;
    const urlWithQueryParam = `${baseUrl}?${queryParam}`;
    return urlWithQueryParam;
}

export const ShareQRCode = memo(({ sessionId }: { sessionId: string }) => {
    if (!sessionId) {
        return null;
    }
    return (
        <div className="hidden md:block absolute top-4 right-4">
            <Popover gutter={4}>
                <PopoverTrigger>
                    <Button size="sm" variant="primary" rounded="full" leftIcon={<RiQrCodeFill />}>
                        Invite
                    </Button>
                </PopoverTrigger>
                <PopoverContent w="min">
                    <PopoverBody p="4">
                        <QRCode value={buildQRCodeUrl(sessionId)} className="h-[10rem] w-[10rem]" />
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </div>
    );
});

ShareQRCode.displayName = "ShareQRCode";
