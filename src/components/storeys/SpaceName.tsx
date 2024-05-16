//------------------------------------------------------------------------------
import { getSurface } from "@/lib/3dverse/helpers";
import { Property } from "@/types/ifc";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const SpaceName = ({ ifcAttributes }: { ifcAttributes: Property }) => {
    //------------------------------------------------------------------------------
    const dimensions = ifcAttributes.psets.PSet_Revit_Dimensions || ifcAttributes.psets.Dimensions;

    //------------------------------------------------------------------------------
    return (
        <div className="flex flex-row items-center justify-between gap-2 pl-7 pr-3 py-1 text-secondary">
            <div className="text-sm group-hover:text-primary transition-colors duration-300">
                {ifcAttributes.props.LongName ? `${ifcAttributes.props.LongName}` : `${ifcAttributes.props.Name}`}
            </div>

            <div className="flex flex-row justify-between gap-2 text-right text-2xs font-medium text-secondary transition-colors duration-300">
                {dimensions && <p className="w-20">{getSurface(dimensions.Area)} m²</p>}
                <p className="w-16">{ifcAttributes.props.Name}</p>
            </div>
        </div>
    );
};
