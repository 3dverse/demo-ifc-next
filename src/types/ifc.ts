export type Pset = Record<string, string | number | boolean>;
export type Attribute = string | number | null | Array<string | number> | boolean;

export type Property = {
    props: Record<string, Attribute> & { Name: string | null; GlobalId: string };
    psets: Record<string, Pset>;
};
export type IfcData = Record<string, Property>;

export type IfcType = Record<string, string[]>;

export type EnergyData = Record<string, number>;

export type ChartInput = { data: number[]; labels: string[]; colors: string[] };

export type CanvasEvent = React.MouseEvent<HTMLElement>;

export type BasePoint = { position: number[]; orientation: number[] };

export type Product = {
    name: string;
    waste_type: string;
    reuse_rate: number | string;
    room_names?: string[];
    ifc_space_guids: string[];
    ifc_instances_guids: string[];
    instructions: string;
    images?: string | string[];
};

export type WasteType = "DD" | "DEA" | "DEEE" | "DI" | "DNIND" | "VOID";

export type Waste = {
    type: WasteType;
};
