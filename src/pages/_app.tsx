//------------------------------------------------------------------------------
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource-variable/inter";

//------------------------------------------------------------------------------
import theme from "@/styles/theme/theme";
import "@/styles/tailwind/globals.css";

//------------------------------------------------------------------------------
import { METADATA } from "@/lib/content/metadata";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>
                    {METADATA.title} - {METADATA.description}
                </title>
            </Head>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </>
    );
}
