import dynamic from "next/dynamic";
import { ChakraProvider } from "@chakra-ui/react";

export const Main = dynamic(() => import("@/layouts/MainLayout").then((mod) => mod.MainLayout), {
    loading: () => (
        <div className="h-screen w-screen flex items-center justify-center text-sm text-[white]">Loading...</div>
    ),
    ssr: false,
});

export default function Home() {
    return (
        <main className="min-h-screen bg-underground-dark">
            <ChakraProvider>
                <Main />
            </ChakraProvider>
        </main>
    );
}
