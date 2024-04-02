import dynamic from "next/dynamic";
import { ChakraProvider } from "@chakra-ui/react";

export const Main = dynamic(() => import("@/components/Main").then((mod) => mod.Main), {
    loading: () => (
        <div className="h-screen w-screen flex items-center justify-center text-sm text-[white]">Loading...</div>
    ),
    ssr: false,
});

export default function Home() {
    return (
        <main className="min-h-screen bg-color-underground-dark">
            <ChakraProvider>
                <Main />
            </ChakraProvider>
        </main>
    );
}
