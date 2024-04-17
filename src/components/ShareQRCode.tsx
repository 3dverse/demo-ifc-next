import { memo } from "react";
import QRCode from "react-qr-code";

function buildQRCodeUrl(sessionId: string) {
    const baseUrl = window.location.href;
    const queryParam = `sessionId=${sessionId}`;
    const urlWithQueryParam = `${baseUrl}?${queryParam}`;
    return urlWithQueryParam;
}

export const ShareQRCode = memo(({ sessionId }: { sessionId: string }) => {
    return (
        sessionId && (
            <aside
                className="
                invisible
                absolute top-3 right-6
                flex flex-col gap-1 
                bg-ground rounded-lg shadow-xl
                animation-appear-top animation-delay-[500ms] opacity-0
            "
            >
                <QRCode value={buildQRCodeUrl(sessionId)} className="h-[10rem] w-[10rem]" />
            </aside>
        )
    );
});

ShareQRCode.displayName = "ShareQRCode";
