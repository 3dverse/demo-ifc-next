import { METADATA } from "@/lib/content/metadata";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/tailwind/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>
                    {METADATA.title} - {METADATA.description}
                </title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}
