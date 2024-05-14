//------------------------------------------------------------------------------
import { Box, Icon, IconButton } from "@chakra-ui/react";
import { RiArrowLeftSLine, RiTriangleFill } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";

//------------------------------------------------------------------------------
const SPEEDS = [...Array(19).keys()].map((i) => (i > 8 ? (i - 8) * 10 : i + 1));

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const MoveSpeedBar = ({
    speed,
    handleMoveSpeed,
    setShowMoveSpeedbar,
}: {
    speed: number;
    handleMoveSpeed: (speed: number) => void;
    setShowMoveSpeedbar: (show: boolean) => void;
}) => {
    //------------------------------------------------------------------------------
    const handleSlideChange = (event: any) => {
        handleMoveSpeed(SPEEDS[event.activeIndex]);
    };

    //--------------------------------------------------------------------------
    const index = SPEEDS.findIndex((v) => v >= speed);

    //--------------------------------------------------------------------------
    return (
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-max">
            <IconButton
                onClick={() => setShowMoveSpeedbar(false)}
                aria-label="Close speed bar"
                variant="primaryLight"
                size="xs"
                className="relative ml-3 mb-16"
                rounded="full"
                icon={<Icon as={RiArrowLeftSLine} boxSize={5} />}
                zIndex={10}
            />
            <div className="relative flex items-center gap-4 pl-3">
                <div
                    className="absolute top-1/2 left-0 -translate-y-1/2 w-[400%] h-[300%] -z-10 pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(at 0% 50%, rgba(31, 46, 56, 0.8) 0%, transparent 70%)",
                    }}
                />
                <div className="flex items-center gap-1 text-[white]">
                    <p className="rotate-180 text-2xs uppercase tracking-widest" style={{ writingMode: "vertical-rl" }}>
                        Move Speed
                    </p>
                    <Icon as={RiTriangleFill} boxSize={2} className="rotate-90 top-1/2 -right-3 opacity-90" />
                </div>
                <Box
                    className="absolute left-0"
                    sx={{
                        ".swiper-slide": {
                            opacity: 0.7,
                            transition: "opacity .15s",
                        },
                        ".swiper-slide.swiper-slide-prev": {
                            opacity: 0.9,
                        },
                        ".swiper-slide.swiper-slide-next": {
                            opacity: 0.9,
                        },
                        ".swiper-slide.swiper-slide-active": {
                            opacity: 1,
                        },
                    }}
                >
                    <Swiper
                        onSlideChange={handleSlideChange}
                        loop={false}
                        direction="vertical"
                        speed={speed}
                        initialSlide={index}
                        grabCursor={true}
                        mousewheel={true}
                        slidesPerView={11}
                        freeMode={true}
                        centeredSlides={true}
                        style={{
                            height: "20rem",
                            width: "6rem",
                            maskImage: "linear-gradient(to bottom, transparent, black, black, transparent)",
                        }}
                    >
                        {SPEEDS.map((v) => (
                            <SwiperSlide
                                className="border-t border-[#ffffff40] text-[white] text-end text-sm px-2 py-px"
                                key={v}
                            >
                                {v}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </div>
        </div>
    );
};
