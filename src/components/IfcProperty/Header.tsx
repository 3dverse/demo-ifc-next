//------------------------------------------------------------------------------
import { Button } from "@chakra-ui/react";
import { Property } from "@/types/ifc";

//------------------------------------------------------------------------------
export const Header = ({
    uppertitle,
    entitiyProperties,
    onClose,
}: {
    uppertitle?: string;
    entitiyProperties: Property;
    onClose?: () => void;
}) => {
    return (
        <header className="card-header card-wrapper py-3 shadow-[0_-10px_25px_-5px_rgb(0_0_0_/_0.1)] border-t borer-primary rounded-t-xl">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                    {uppertitle && <p className="card-title">{uppertitle}</p>}
                    {onClose && (
                        <Button variant="ghost" size="xs" color="content.secondary" px="1" onClick={onClose}>
                            Close
                        </Button>
                    )}
                </div>
                <h1 className="text-xl font-semibold">{entitiyProperties.props.type}</h1>
                <p className="text-xs text-tertiary">{entitiyProperties.props.Name}</p>
            </div>
        </header>
    );
};

//------------------------------------------------------------------------------
Header.displayName = "Header";
