"use client";

import React from "react";
import { useStateContext } from "./StateContext";

export const PropertiesPanel = () => {
    const { state } = useStateContext();

    return (
        <>
            <aside className="card ifc-properties">
                {state.props?.Name && (
                    <>
                        <header className="card-header">
                            <h1>
                                {state["props"]["type"]}: {state["props"]["Name"]}
                            </h1>
                        </header>
                        <div className="card-body props-body">
                            <div>
                                <div className="pset">
                                    <h4 className="pset-title">Attributes</h4>
                                    <ul className="pset-list">
                                        {Object.entries(state["props"]).map(([k, v]: any) => (
                                            <li>
                                                <p>
                                                    {k}: {v}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {Object.keys(state["psets"]).map((e: any) => (
                                    <div className="pset">
                                        <h4 className="pset-title">{e}</h4>
                                        {Object.entries(state["psets"][e]).map(([k, v]: any) => (
                                            <p>
                                                {k}: {String(v)}
                                            </p>
                                        ))}
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
