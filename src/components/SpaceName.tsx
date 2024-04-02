import { Property } from "@/types/ifc";
import { getSurface } from "@/lib/3dverse/helpers";

export const SpaceName = ({ ifcAttributes }: { ifcAttributes: Property }) => {
    return (
        <div className="flex flex-row items-center justify-between gap-2 pl-4 pr-2 py-1 text-gray-800">
            <div className="text-sm group-hover:text-color-primary transition-colors duration-300">
                {ifcAttributes.props.LongName ? `${ifcAttributes.props.LongName}` : `${ifcAttributes.props.Name}`}
            </div>

            <div className="flex flex-row justify-between gap-2 text-right text-xs font-light text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                <p className="w-16">{ifcAttributes.props.Name}</p>
                <p className="w-20">
                    {ifcAttributes.psets.PSet_Revit_Dimensions &&
                        `${getSurface(ifcAttributes.psets.PSet_Revit_Dimensions.Area)} m²`}
                    {ifcAttributes.psets.Dimensions && `${getSurface(ifcAttributes.psets.Dimensions.Area)} m²`}
                </p>
            </div>
        </div>
    );
};
