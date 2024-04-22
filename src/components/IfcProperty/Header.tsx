import { Button } from "@chakra-ui/react";
import { Property } from "@/types/ifc";

export const Header = ({ entitiyProperties, onClose }: { entitiyProperties: Property; onClose: () => void }) => {
    return (
        <header className="card-header card-wrapper py-3">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <p className="card-title">Selection</p>
                    <Button variant="ghost" size="xs" color="content.secondary" px="1" onClick={onClose}>
                        Close
                    </Button>
                </div>
                <h1 className="text-xl font-semibold">{entitiyProperties.props.type}</h1>
                <p className="text-xs text-tertiary">{entitiyProperties.props.Name}</p>
            </div>
        </header>
    );
};

Header.displayName = "Header";
