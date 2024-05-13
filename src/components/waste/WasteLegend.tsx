//------------------------------------------------------------------------------
import { wasteTypes } from "./content";

//------------------------------------------------------------------------------
export const WasteLegend = () => {
    return (
        <ul className="flex flex-col gap-px text-xs">
            {wasteTypes.map((wasteType: any, index: number) => (
                <li key={index} className="flex items-center gap-2 cursor-default" title={wasteType.name}>
                    <div
                        className="w-3 aspect-square rounded-sm"
                        style={{
                            backgroundColor: wasteType.color,
                        }}
                    />
                    <p className="w-32">{wasteType.type}</p>
                </li>
            ))}
        </ul>
    );
};
