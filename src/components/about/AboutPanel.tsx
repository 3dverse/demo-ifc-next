//------------------------------------------------------------------------------
import { METADATA } from "@/lib/content/metadata";
import { Logo } from "@/components/common/Logo";

//------------------------------------------------------------------------------
export const AboutPanel = () => {
    return (
        <article className="flex flex-col items-center justify-center h-full">
            <div className="glow-effect before:w-[50%] text-center">
                <Logo className="w-20 aspect-square mx-auto" id={1} />
                <h1 className="text-xl font-semibold">{METADATA.title}</h1>
                <p className="mt-1 text-sm text-tertiary">{METADATA.description_with_link}</p>
            </div>
        </article>
    );
};

//------------------------------------------------------------------------------
AboutPanel.displayName = "AboutPanel";
