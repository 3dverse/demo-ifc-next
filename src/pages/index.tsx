import { LoaderProgressBarUndefined } from "@/components/common/LoaderProgressBarUndefined";
import { Logo } from "@/components/common/Logo";
import { METADATA } from "@/lib/content/metadata";
import dynamic from "next/dynamic";

export const Main = dynamic(() => import("@/layouts/MainLayout").then((mod) => mod.MainLayout), {
    loading: () => (
        <div className="h-screen w-screen flex flex-col items-center justify-center text-sm text-primary-light">
            <Logo />
            <h1 className="mb-2 font-medium text-lg opacity-80">{METADATA.title}</h1>
            <LoaderProgressBarUndefined />
        </div>
    ),
    ssr: false,
});

export default function Home() {
    return (
        <main className="min-h-screen bg-underground-dark">
            <Main />
        </main>
    );
}
