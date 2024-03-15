import dynamic from "next/dynamic";
import { ChakraProvider } from "@chakra-ui/react";

export const Main = dynamic(() => import("@/components/Main").then((mod) => mod.Main), {
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
