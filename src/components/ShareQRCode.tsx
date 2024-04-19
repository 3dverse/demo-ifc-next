import { Button, Popover, PopoverBody, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { memo } from "react";
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
        <div className="absolute top-4 right-4">
            <Popover gutter={4}>
                <PopoverTrigger>
                    <button className="button button-primary animate-appear-right animation-delay-[250ms] opacity-0 rounded-full">
                        Invite
                    </button>
                </PopoverTrigger>
                <PopoverContent w="min" className="shadow-2xl">
                    <PopoverBody p="4">
                        <QRCode value={buildQRCodeUrl(sessionId)} className="h-[10rem] w-[10rem]" />
                    </PopoverBody>
                </PopoverContent>
            </Popover>
            <aside
                className="hidden
                absolute top-3 right-6
                flex flex-col gap-1 
                bg-ground rounded-lg shadow-xl
                animate-appear-top animation-delay-[500ms] opacity-0
            "
            ></aside>
        </div>
    );
});

ShareQRCode.displayName = "ShareQRCode";
