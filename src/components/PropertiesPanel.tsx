import ifcInfo from "../../data/json/ifcInfo.json";
import { IfcData } from "@/types/ifc";
export const PropertiesPanel = ({ guid }: { guid: string }) => {
    const ifcData = ifcInfo as IfcData;

    const entitiyProperties = ifcData[guid];
    return (
        <>
            <aside className="card ifc-properties">
                {entitiyProperties?.props?.Name && (
                    <>
                        <header className="p-2">
                            <div className="flex flex-col">
                                <div className="flex flex-row justify-between text-xs">
                                    <p className="text-color-secondary">Selection</p>
                                    <div className="flex flex-row gap-1">
                                        <p>Unselect</p>
                                        <p>&times;</p>
                                    </div>
                                </div>
                                <h1 className="text-xl ">{entitiyProperties.props.type}</h1>
                                <p className="text-sm font-light">{entitiyProperties.props.Name}</p>
                            </div>
                        </header>
                        <div className="card-body props-body">
                            <div>
                                <div className="pset">
                                    <h4 className="pset-title text-lg font-bold dark:text-white">Attributes</h4>
                                    <ul className="pset-list">
                                        {Object.entries(entitiyProperties.props).map(
                                            ([propertyName, propertyValue]: any) =>
                                                String(propertyValue)[0] != "#" && (
                                                    <li key={propertyName}>
                                                        <p>
                                                            {propertyName}: {String(propertyValue)}
                                                        </p>
                                                    </li>
                                                ),
                                        )}
                                    </ul>
                                </div>

                                {Object.keys(entitiyProperties.psets).map((psetName: any) => (
                                    <div key={psetName} className="pset">
                                        <h4 className="pset-title text-lg font-bold dark:text-white">{psetName}</h4>
                                        {Object.entries(entitiyProperties.psets[psetName]).map(
                                            ([propertyName, propertyValue]: any) =>
                                                String(propertyValue)[0] != "#" && (
                                                    <p key={`${psetName}-${propertyName}`}>
                                                        {propertyName}: {String(propertyValue)}
                                                    </p>
                                                ),
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
};

PropertiesPanel.displayName = "PropertiesPanel";
