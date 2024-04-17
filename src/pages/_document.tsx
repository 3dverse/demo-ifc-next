import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html lang="en">
            <Head />

            <body>
                <Script src="https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js" strategy="beforeInteractive" />
                <Script
                    src="https://cdn.3dverse.com/legacy/sdk/stable/SDK3DVerse_ClientDisplay_Ext.js"
                    strategy="beforeInteractive"
                />
                <Script
                    src="https://cdn.3dverse.com/legacy/sdk/stable/SDK3DVerse_ViewportDomOverlay_Ext.js"
                    strategy="beforeInteractive"
                />
                <Script
                    src="https://cdn.3dverse.com/legacy/sdk/stable/SDK3DVerse_LabelDisplay_Ext.js"
                    strategy="beforeInteractive"
                />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
