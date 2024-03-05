import { Attribute, Property } from "@/types/ifc";

export const SpaceName = ({ ifcAttributes }: { ifcAttributes: Property }) => {
    return (
        <div className="flex flex-row justify-between gap-2">
            <div>{ifcAttributes.props.LongName ? `${ifcAttributes.props.LongName} ` : ifcAttributes.props.Name}</div>

            <div className="text-xs align-text-bottom flex flex-colum items-center font-thin ">
                {ifcAttributes.props.Name}
            </div>
        </div>
    );
};
