import { useState, memo } from "react";

import ifcInfo from "../../data/json/ifcInfo.json";
import ifcTypes from "../../data/json/ifctype2guids.json";

import { guid2euid } from "@/lib/id-converter";

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Icon } from "@chakra-ui/react";
import { EyeIcon } from "./EyeIcon";
import { SpaceName } from "@/components/SpaceName";

import { goToRoom, getEntityFromGuid, getSurface } from "../lib/3dverse/helpers";
import { IfcData, IfcType, Attribute } from "@/types/ifc";

export const SidePanel = memo(() => {
    const ifcData = ifcInfo as IfcData;
    const ifctypes = ifcTypes as IfcType;

    const storeyKey = "IfcBuildingStorey";
    const storeys = ifctypes[storeyKey];

    const [visibleStoreys, setVisibleStoreys]: any = useState(new Array(storeys.length).fill(true));

    const handleElementClick = async (index: any, storeyGuid: string | null, event: any) => {
        event.stopPropagation();

        if (storeyGuid) {
            const storeyEntity = await getEntityFromGuid(storeyGuid);

            if (!visibleStoreys[index]) {
                setVisibleStoreys((a: Array<boolean>) => {
                    const newArray = [...a];
                    newArray[index] = true;
                    return newArray;
                });

                storeyEntity.setVisibility(true);
            } else {
                setVisibleStoreys((a: Array<boolean>) => {
                    const newArray = [...a];
                    newArray[index] = false;
                    return newArray;
                });
                storeyEntity.setVisibility(false);
            }
        }
    };

    return (
        <>
            <aside className="side-panel bg-color-ground ">
                <header className="side-panel-header bg-color-underground">
                    <div className="flex flex-row gap-5">
                        <svg width="51" height="52" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_38_549)">
                                <path
                                    d="M11.0762 34.6791C10.6145 34.4469 10.6284 33.783 11.0995 33.5704L25.1034 27.2505C25.2517 27.1835 25.4206 27.1782 25.5728 27.2356L40.0447 32.6936C40.5366 32.8791 40.5833 33.5567 40.1214 33.808L25.6174 41.6965C25.4405 41.7927 25.2278 41.7961 25.0479 41.7057L11.0762 34.6791Z"
                                    fill="url(#paint0_linear_38_549)"
                                    fill-opacity="0.3"
                                />
                            </g>
                            <g filter="url(#filter1_b_38_549)">
                                <path
                                    d="M9.39717 27.729C8.93545 27.4968 8.9494 26.833 9.42047 26.6204L25.0737 19.5561C25.222 19.4891 25.3909 19.4838 25.5431 19.5412L41.7237 25.6436C42.2157 25.8292 42.2623 26.5068 41.8004 26.758L25.5877 35.5759C25.4108 35.6721 25.198 35.6755 25.0182 35.5851L9.39717 27.729Z"
                                    fill="url(#paint1_linear_38_549)"
                                    fill-opacity="0.3"
                                />
                            </g>
                            <g filter="url(#filter2_b_38_549)">
                                <path
                                    d="M9.39717 23.0954C8.93545 22.8632 8.9494 22.1993 9.42047 21.9867L25.0737 14.9224C25.222 14.8554 25.3909 14.8501 25.5431 14.9075L41.7237 21.01C42.2157 21.1955 42.2623 21.8731 41.8004 22.1243L25.5877 30.9422C25.4108 31.0384 25.198 31.0419 25.0182 30.9514L9.39717 23.0954Z"
                                    fill="url(#paint2_linear_38_549)"
                                    fill-opacity="0.4"
                                />
                            </g>
                            <g filter="url(#filter3_b_38_549)">
                                <path
                                    d="M9.39717 18.4617C8.93545 18.2295 8.9494 17.5656 9.42047 17.353L25.0737 10.2887C25.222 10.2218 25.3909 10.2164 25.5431 10.2739L41.7237 16.3763C42.2157 16.5618 42.2623 17.2394 41.8004 17.4906L25.5877 26.3086C25.4108 26.4048 25.198 26.4082 25.0182 26.3177L9.39717 18.4617Z"
                                    fill="url(#paint3_linear_38_549)"
                                    fill-opacity="0.6"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="filter0_f_38_549"
                                    x="0.737946"
                                    y="17.196"
                                    width="49.7043"
                                    height="34.5751"
                                    filterUnits="userSpaceOnUse"
                                    color-interpolation-filters="sRGB"
                                >
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_38_549" />
                                </filter>
                                <filter
                                    id="filter1_b_38_549"
                                    x="6.0589"
                                    y="16.5017"
                                    width="39.0623"
                                    height="22.1488"
                                    filterUnits="userSpaceOnUse"
                                    color-interpolation-filters="sRGB"
                                >
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5" />
                                    <feComposite
                                        in2="SourceAlpha"
                                        operator="in"
                                        result="effect1_backgroundBlur_38_549"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="effect1_backgroundBlur_38_549"
                                        result="shape"
                                    />
                                </filter>
                                <filter
                                    id="filter2_b_38_549"
                                    x="6.0589"
                                    y="11.868"
                                    width="39.0623"
                                    height="22.1488"
                                    filterUnits="userSpaceOnUse"
                                    color-interpolation-filters="sRGB"
                                >
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5" />
                                    <feComposite
                                        in2="SourceAlpha"
                                        operator="in"
                                        result="effect1_backgroundBlur_38_549"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="effect1_backgroundBlur_38_549"
                                        result="shape"
                                    />
                                </filter>
                                <filter
                                    id="filter3_b_38_549"
                                    x="6.0589"
                                    y="7.23438"
                                    width="39.0623"
                                    height="22.1488"
                                    filterUnits="userSpaceOnUse"
                                    color-interpolation-filters="sRGB"
                                >
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5" />
                                    <feComposite
                                        in2="SourceAlpha"
                                        operator="in"
                                        result="effect1_backgroundBlur_38_549"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="effect1_backgroundBlur_38_549"
                                        result="shape"
                                    />
                                </filter>
                                <linearGradient
                                    id="paint0_linear_38_549"
                                    x1="26.5999"
                                    y1="24.1268"
                                    x2="27.2227"
                                    y2="45.0206"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#8E47E8" />
                                    <stop offset="1" stop-color="#2C63F0" />
                                </linearGradient>
                                <linearGradient
                                    id="paint1_linear_38_549"
                                    x1="26.7056"
                                    y1="16.1093"
                                    x2="27.3951"
                                    y2="39.2394"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#8E47E8" />
                                    <stop offset="1" stop-color="#2C63F0" />
                                </linearGradient>
                                <linearGradient
                                    id="paint2_linear_38_549"
                                    x1="26.7056"
                                    y1="11.4756"
                                    x2="27.3951"
                                    y2="34.6057"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#8E47E8" />
                                    <stop offset="1" stop-color="#2C63F0" />
                                </linearGradient>
                                <linearGradient
                                    id="paint3_linear_38_549"
                                    x1="26.7056"
                                    y1="6.84192"
                                    x2="27.3951"
                                    y2="29.972"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#8E47E8" />
                                    <stop offset="1" stop-color="#2C63F0" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div>
                            <h1 className="font-semibold">IFC Demo App</h1>
                            <p className="font-light text-gray-500">
                                Example of a{" "}
                                <a
                                    className="text-color-secondary underline"
                                    target="_blank"
                                    href="https://3dverse.com/"
                                >
                                    3dverse web app.
                                </a>
                            </p>
                        </div>
                    </div>
                </header>
                <div className="side-panel-body">
                    <h2 className="text-color-secondary p-4">Storeys</h2>

                    {storeys.map((storey: string, index: number) => (
                        <Accordion key={ifcData[storey].props.GlobalId} defaultIndex={[1]} allowMultiple>
                            <AccordionItem className="bg-color-ground mx-2 border-x rounded-lg border-border-secondary p-0">
                                <h2 className="bg-color-underground font-semibold border-y rounded-lg border-border-secondary ">
                                    <AccordionButton className="w-full">
                                        <AccordionIcon />
                                        <Box as="span" flex="1" textAlign="left">
                                            {ifcData[storey].props.Name}
                                        </Box>
                                        <div
                                            onClick={(event) => {
                                                handleElementClick(index, ifcData[storey].props.GlobalId, event);
                                            }}
                                        >
                                            <EyeIcon visible={visibleStoreys[index]} />
                                        </div>
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel className="p-0" pb={4} p={0}>
                                    <ul className="w-full">
                                        {(() => {
                                            const spaces = [];
                                            const storeySpaces = ifcData[storey].props.spaces as string[];

                                            if (storeySpaces.length) {
                                                for (let i = 0; i < storeySpaces.length; i++) {
                                                    spaces.push(
                                                        <li
                                                            className="group cursor-pointer hover:bg-color-underground"
                                                            key={ifcData[storeySpaces[i]].props.GlobalId}
                                                            onClick={() => {
                                                                const guid = ifcData[storeySpaces[i]].props["GlobalId"];
                                                                goToRoom(guid2euid(guid));
                                                            }}
                                                        >
                                                            <SpaceName ifcAttributes={ifcData[storeySpaces[i]]} />
                                                        </li>,
                                                    );
                                                }
                                            } else {
                                                spaces.push(
                                                    <li className="p-2" key={ifcData[storey].props.GlobalId}>
                                                        {"No IfcSpace at this storey"}
                                                    </li>,
                                                );
                                            }

                                            return spaces;
                                        })()}
                                        <li></li>
                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            </aside>
        </>
    );
});

SidePanel.displayName = "SidePanel";
