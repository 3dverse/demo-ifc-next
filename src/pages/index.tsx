import dynamic from "next/dynamic";
import Logo from "public/logo/logo.svg";
import { LoaderProgressBarUndefined } from "@/components/common/LoaderProgressBarUndefined";
import { METADATA } from "@/lib/content/metadata";

export const Main = dynamic(() => import("@/layouts/MainLayout").then((mod) => mod.MainLayout), {
    loading: () => (
        <div className="glow-effect absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center text-sm text-primary-light">
            <Logo className="w-24" />
            <h1 className="mb-3 font-medium text-lg opacity-80">{METADATA.title}</h1>
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
