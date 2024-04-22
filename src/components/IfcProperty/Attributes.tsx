import ifcInfo from "../../../data/json/ifcInfo.json";
import { IfcData } from "@/types/ifc";

export const Attributes = ({ guid }: { guid: string }) => {
    const ifcData = ifcInfo as IfcData;
    const entitiyProperties = ifcData[guid];

    return (
        <article>
            <div className="pset">
                <div className="card-wrapper pset-header">
                    <h4 className="pset-title">Attributes</h4>
                </div>
                <ul className="pset-list">
                    {Object.entries(entitiyProperties.props).map(
                        ([propertyName, propertyValue]: any) =>
                            String(propertyValue)[0] != "#" && (
                                <li key={propertyName} className="pset-list-item card-wrapper">
                                    <p className="pset-label" title={propertyName}>
                                        {propertyName}
                                    </p>
                                    <p className="pset-value">{String(propertyValue)}</p>
                                </li>
                            ),
                    )}
                </ul>
            </div>

            {Object.keys(entitiyProperties.psets).map((psetName: any) => (
                <div key={psetName} className="pset">
                    <div className="card-wrapper pset-header">
                        <h4 className="pset-title">{psetName}</h4>
                    </div>
                    <div className="pset-list">
                        {Object.entries(entitiyProperties.psets[psetName]).map(
                            ([propertyName, propertyValue]: any) =>
                                String(propertyValue)[0] != "#" && (
                                    <li key={`${psetName}-${propertyName}`} className="pset-list-item card-wrapper">
                                        <p className="pset-label" title={propertyName}>
                                            {propertyName}
                                        </p>
                                        <p className="pset-value">{String(propertyValue)}</p>
                                    </li>
                                ),
                        )}
                    </div>
                </div>
            ))}
        </article>
    );
};

Attributes.displayName = "Attributes";
