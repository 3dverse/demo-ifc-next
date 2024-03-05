export type Pset = Record<string, string | number | boolean>;
export type Attribute = string | number | null | Array<string | number> | boolean;

export type Property = {
    props: Record<string, Attribute> & { Name: string | null, GlobalId: string };
    psets: Record<string, Pset>;
};
export type IfcData = Record<string, Property>;

export type IfcType = Record<string, string[]>;

export type EnergyData = Record<string, number>;

export type ChartInput = { data: number[]; labels: string[]; colors: string[] };

export type CanvasEvent =  React.MouseEvent<HTMLElement>
