//------------------------------------------------------------------------------
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

//------------------------------------------------------------------------------
import { METADATA } from "@/lib/content/metadata";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <meta name="description" content={METADATA.seo_description} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={METADATA.url} />
                <meta property="og:title" content={METADATA.seo_title} />
                <meta property="og:description" content={METADATA.seo_description} />
                <meta property="og:image" content={METADATA.image} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content={METADATA.url} />
                <meta property="twitter:url" content={METADATA.url} />
                <meta name="twitter:title" content={METADATA.seo_title} />
                <meta name="twitter:description" content={METADATA.seo_description} />
                <meta name="twitter:image" content={METADATA.image} />

                <meta name="application-name" content="3dverse" />
                <link rel="icon" type="image/svg+xml" href="/socials/favicon.svg" />
                <link rel="icon" href="/demo-ifc-next/socials/favicon.svg" />
                <meta name="theme-color" content={METADATA.themeColor} />

                <link rel="manifest" href="/demo-ifc-next/socials/manifest.json" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-title" content="3dverse" />
                <meta name="msapplication-TileColor" content={METADATA.themeColor} />
                <meta name="msapplication-config" content="/demo-ifc-next/socials/browserconfig.xml" />
            </Head>

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
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
