import ifcInfo from "../../public/data/json/ifcInfo.json";

export const PropertiesPanel = ({ guid }: { guid: string }) => {
    const ifcData = ifcInfo as object;
    const entitiyProperties = ifcData[guid];
    return (
        <>
            <aside className="card ifc-properties">
                {entitiyProperties?.props?.Name && (
                    <>
                        <header className="card-header">
                            <h1>
                                {entitiyProperties.props.type}: {entitiyProperties.props.Name}
                            </h1>
                        </header>
                        <div className="card-body props-body">
                            <div>
                                <div className="pset">
                                    <h4 className="pset-title text-lg font-bold dark:text-white">Attributes</h4>
                                    <ul className="pset-list">
                                        {Object.entries(entitiyProperties.props).map(
                                            ([propertyName, propertyValue]: any) =>
                                                String(propertyValue)[0] != "#" && (
                                                    <li>
                                                        <p>
                                                            {propertyName}: {String(propertyValue)}
                                                        </p>
                                                    </li>
                                                ),
                                        )}
                                    </ul>
                                </div>

                                {Object.keys(entitiyProperties.psets).map((psetName: any) => (
                                    <div className="pset">
                                        <h4 className="pset-title text-lg font-bold dark:text-white">{psetName}</h4>
                                        {Object.entries(entitiyProperties.psets[psetName]).map(
                                            ([propertyName, propertyValue]: any) =>
                                                String(propertyValue)[0] != "#" && (
                                                    <p>
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
