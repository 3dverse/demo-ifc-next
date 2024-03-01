import dynamic from "next/dynamic";
import Script from "next/script";
import { ChakraProvider } from "@chakra-ui/react";
import { StateProvider } from "@/components/StateContext";
import { EnergyPanel } from "@/components/EnergyPanel";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { Settings } from "@/components/Settings";
import { Main } from "@/components/Main";
export const Canvas = dynamic(() => import("@/components/Canvas").then((mod) => mod.Canvas), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

export const SidePanel = dynamic(() => import("@/components/SidePanel").then((mod) => mod.SidePanel), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

export default function Home() {
    return (
        <>
            <Script src="https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js" />
            <main className="min-h-screen">
                <ChakraProvider>
                    <Main />
                </ChakraProvider>
            </main>
        </>
    );
}
