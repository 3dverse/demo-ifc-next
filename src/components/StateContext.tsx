import React, { createContext, useContext, useState } from "react";
import ifcInfo from "../../public/data/json/ifcInfo.json";
import ifcTypes from "../../public/data/json/ifctype2guids.json";

// Define the context type
interface StateContextType {
    state: any;
    ifcData: object;
    ifcType2Guids: object;
    basePoint: any;
    setState: React.Dispatch<React.SetStateAction<object>>;
    setIfcData: React.Dispatch<React.SetStateAction<object>>;
    setIfcType2Guids: React.Dispatch<React.SetStateAction<object>>;
    setBasePoint: React.Dispatch<React.SetStateAction<object>>;
}

// Create the context
const StateContext = createContext<StateContextType | undefined>(undefined);

// Custom hook to access the context
export const useStateContext = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error("useStateContext must be used within a StateProvider");
    }
    return context;
};

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State initialization
    const [state, setState] = useState<any>({});
    const [ifcData, setIfcData] = useState<object>(ifcInfo);
    const [ifcType2Guids, setIfcType2Guids] = useState<object>(ifcTypes);
    const [basePoint, setBasePoint] = useState<any>([0, 0, 0]);
    return (
        <StateContext.Provider
            value={{ state, ifcData, ifcType2Guids, basePoint, setState, setIfcData, setIfcType2Guids, setBasePoint }}
        >
            {children}
        </StateContext.Provider>
    );
};
