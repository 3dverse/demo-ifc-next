//------------------------------------------------------------------------------
import { reusabilityTypes } from "./content";

//------------------------------------------------------------------------------
export const ReusabilityLegend = () => {
    return (
        <ul className="flex flex-col gap-px text-xs">
            {reusabilityTypes.map((reusabilityType: any, index: number) => (
                <li key={index} className="flex items-center gap-2">
                    <div
                        className="w-3 aspect-square rounded-sm"
                        style={{
                            backgroundColor: reusabilityType.color,
                        }}
                    />
                    {reusabilityType.weight && (
                        <p className="w-16 text-right text-2xs text-secondary tabular-nums">
                            {reusabilityType.weight} %
                        </p>
                    )}
                    <p className="w-32">{reusabilityType.name}</p>
                </li>
            ))}
        </ul>
    );
};
