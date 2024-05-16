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
import { getSpotlightEntity, rgbToHex, SPOTLIGHT_UUID, travelToEntity, updateColor } from "@/lib/3dverse/helpers";
import { Entity } from "@/types/3dverse";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const SmartControlLight2 = () => {
    //--------------------------------------------------------------------------
    const [intensity, setIntensity] = useState(50);
    const [color, setColor] = useState([0, 0, 0]);

    //------------------------------------------------------------------------------
    const [spotLightEntity, setSpotLightEntity] = useState<Entity | undefined>(undefined);

    //------------------------------------------------------------------------------
    useEffect(() => {
        const update = async () => {
            const spotlightEntity = await getSpotlightEntity();
            setSpotLightEntity(spotlightEntity);
            // travelToEntity(SPOTLIGHT_UUID);
        };
        update();
    }, []);

    //--------------------------------------------------------------------------
    return (
        <div className="flex gap-3 w-full pb-2">
            <FormControl className="flex-1">
                <FormLabel mb={1} size="xs" color="content.secondary">
                    Color
                </FormLabel>
                <div
                    className={`
                        relative w-9 h-9 rounded-xl overflow-hidden cursor-pointer
                        before:absolute before:w-full before:h-full before:[border:2px_solid_#ffffff50] before:rounded-inherit before:pointer-events-none
                    `}
                >
                    <input
                        onChange={async (e) => {
                            await updateColor(e.target.value, spotLightEntity, setColor);
                        }}
                        type="color"
                        id="color"
                        name="color"
                        className="h-[calc(100%+10px)] aspect-square -m-[5px] cursor-pointer"
                        value={rgbToHex(color)}
                    />
                </div>
            </FormControl>
            <FormControl className="">
                <FormLabel mb={1} size="xs" color="content.secondary">
                    Intensity
                </FormLabel>
                <Slider
                    defaultValue={intensity}
                    min={0}
                    max={100}
                    h={4}
                    colorScheme="accent"
                    onChange={(v) => setIntensity(v)}
                >
                    <SliderMark value={0} mt={3} fontSize="3xs" opacity={0.8}>
                        0%
                    </SliderMark>
                    <SliderMark value={100} mt={3} ml={-7} fontSize="3xs" opacity={0.8}>
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
SmartControlLight2.displayName = "SmartControlLight2";
