import dynamic from "next/dynamic";
import { ChakraProvider } from "@chakra-ui/react";
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
           
            <main className="min-h-screen">
                <ChakraProvider>
                    <Main />
                </ChakraProvider>
            </main>
        </>
    );
}
