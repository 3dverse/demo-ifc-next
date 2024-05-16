//------------------------------------------------------------------------------
import { useEffect, useState } from "react";
import {
    FormControl,
    FormLabel,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
} from "@chakra-ui/react";

//------------------------------------------------------------------------------
import { getSpotlightEntity, rgbToHex, updateColor, updateLightIntensity } from "@/lib/3dverse/helpers";
import { Entity } from "@/types/3dverse";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const SmartControlLight = () => {
    //--------------------------------------------------------------------------
    const [spotLightEntity, setSpotLightEntity] = useState<Entity | undefined>(undefined);
    const [intensity, setIntensity] = useState(0);
    const INTENSITY_MAX = 100;
    const [color, setColor] = useState([0, 0, 0]);

    //--------------------------------------------------------------------------
    // Effects
    useEffect(() => {
        const update = async () => {
            const _spotLightEntity = await getSpotlightEntity();
            setSpotLightEntity(_spotLightEntity);
            setIntensity(_spotLightEntity.components.point_light.intensity);
            setColor(_spotLightEntity.components.point_light.color);
        };
        update();
    }, []);

    //--------------------------------------------------------------------------
    return (
        <div className="flex gap-3 w-full pb-2">
            <FormControl className="flex-1">
                <FormLabel mb={1} fontSize="2xs" color="content.secondary">
                    Color
                </FormLabel>
                <div
                    className={`
                        relative w-9 h-9 rounded-xl overflow-hidden cursor-pointer
                        before:absolute before:w-full before:h-full before:[border:2px_solid_#ffffff50] before:rounded-inherit before:pointer-events-none
                    `}
                >
                    <input
                        value={rgbToHex(color)}
                        onChange={async (e) => await updateColor(e.target.value, spotLightEntity, setColor)}
                        type="color"
                        id="color"
                        name="color"
                        className="h-[calc(100%+10px)] aspect-square -m-[5px] cursor-pointer"
                    />
                </div>
            </FormControl>
            <FormControl className="">
                <FormLabel mb={1} fontSize="2xs" color="content.secondary">
                    Intensity
                </FormLabel>
                <Slider
                    value={intensity}
                    onChange={async (value: number) => await updateLightIntensity(value, spotLightEntity, setIntensity)}
                    min={0}
                    max={INTENSITY_MAX}
                    h={4}
                    colorScheme="accent"
                >
                    <SliderMark value={0} mt={3} fontSize="3xs" opacity={0.8}>
                        0%
                    </SliderMark>
                    <SliderMark value={INTENSITY_MAX} mt={3} ml={-7} fontSize="3xs" opacity={0.8}>
                        100%
                    </SliderMark>
                    <SliderTrack h={4} rounded={8} bgColor="white">
                        <SliderFilledTrack opacity={0.7} />
                    </SliderTrack>
                    <SliderThumb h={4} w={4} />
                </Slider>
            </FormControl>
        </div>
    );
};

//------------------------------------------------------------------------------
SmartControlLight.displayName = "SmartControlLight";
