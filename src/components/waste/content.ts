//------------------------------------------------------------------------------
import { WasteType } from "@/types/ifc";

//------------------------------------------------------------------------------
export const wasteTypes = [
    {
        type: "DD",
        name: "Déchets Dangereux",
        materialUUID: "51ffafdd-2c27-46de-9b77-a1117f58077b",
        color: "#EA4D34",
        weight: "7.83t",
    },
    {
        type: "DI",
        name: "Déchets Inertes",
        materialUUID: "b59f7680-08f9-46c9-bd29-025538ab0d85",
        color: "#58C1A1",
        weight: "330.77t",
    },
    {
        type: "DNIND",
        name: "Déchets Non Inertes Non Dangereux",
        materialUUID: "69c786eb-a3e4-4b2f-b202-1b4be5031ab2",
        color: "#F5BE4C",
        weight: "95.20t",
    },
    {
        type: "DEEE",
        name: "Déchets d'équipements électriques et électroniques",
        materialUUID: "af8e0732-621a-47ac-8176-87b877202e89",
        color: "#EF8651",
        weight: "5.24t",
    },
    {
        type: "DEA",
        name: "Déchets d'éléments d'ameublement ",
        materialUUID: "3072796e-f1b4-493f-8bf1-071642cf47b4",
        color: "#B43772",
        weight: "0.09t",
    },
] as {
    type: WasteType;
    name: string;
    materialUUID: string;
    color: string;
    weight: string;
}[];
