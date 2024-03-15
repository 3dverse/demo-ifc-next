import { Property } from "@/types/ifc";
import { getSurface } from "@/lib/3dverse/helpers";

export const SpaceName = ({ ifcAttributes }: { ifcAttributes: Property }) => {
    return (
        <div className="p-2 flex flex-row justify-between gap-2 p-1 ">
            <div className="font-normal">
                {ifcAttributes.props.LongName ? `${ifcAttributes.props.LongName}` : `${ifcAttributes.props.Name}`}
            </div>

            <div className="w-36 flex flex-row justify-between gap-2 font-light text-gray-500">
                <div>{ifcAttributes.props.Name}</div>
                <div>
                    {ifcAttributes.psets.PSet_Revit_Dimensions &&
                        `${getSurface(ifcAttributes.psets.PSet_Revit_Dimensions.Area)} m²`}
                </div>
            </div>
        </div>
    );
};
