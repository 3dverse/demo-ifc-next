//------------------------------------------------------------------------------
export const Logo = ({ className, id }: { className?: string; id: number }) => {
    return (
        <svg viewBox="0 0 51 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <g filter={`url(#filter0_${id})`}>
                <path
                    d="M11 24.7a.6.6 0 0 1 .1-1.1l14-6.3h.5L40 22.6c.5.2.6.9.1 1.1l-14.5 7.9H25l-14-7Z"
                    fill={`url(#paint0_linear_${id})`}
                    fillOpacity="0.3"
                />
            </g>
            <g filter={`url(#filter1_${id})`}>
                <path
                    d="M9.4 17.7a.6.6 0 0 1 0-1l15.7-7.1c.1-.1.3-.1.4 0l16.2 6c.5.2.6 1 .1 1.2l-16.2 8.8H25L9.4 17.7Z"
                    fill={`url(#paint1_linear_${id})`}
                    fillOpacity="0.3"
                />
            </g>
            <g filter={`url(#filter2_${id})`}>
                <path
                    d="M9.4 13.1a.6.6 0 0 1 0-1.1l15.7-7c.1-.1.3-.1.4 0l16.2 6c.5.2.6.9.1 1.1L25.6 21H25L9.4 13.2Z"
                    fill={`url(#paint2_linear_${id})`}
                    fillOpacity="0.4"
                />
            </g>
            <g filter={`url(#filter3_${id})`}>
                <path
                    d="M9.4 8.5a.6.6 0 0 1 0-1.1L25.1.3h.4l16.2 6c.5.3.6 1 .1 1.2l-16.2 8.8H25L9.4 8.5Z"
                    fill={`url(#paint3_linear_${id})`}
                    fillOpacity="0.6"
                />
            </g>
            <defs>
                <linearGradient
                    id={`paint0_linear_${id}`}
                    x1="26.5998"
                    y1="14.1268"
                    x2="27.2226"
                    y2="35.0206"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#8E47E8" />
                    <stop offset="1" stopColor="#2C63F0" />
                </linearGradient>
                <linearGradient
                    id={`paint1_linear_${id}`}
                    x1="26.7056"
                    y1="6.10926"
                    x2="27.3951"
                    y2="29.2394"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#8E47E8" />
                    <stop offset="1" stopColor="#2C63F0" />
                </linearGradient>
                <linearGradient
                    id={`paint2_linear_${id}`}
                    x1="26.7056"
                    y1="1.47559"
                    x2="27.3951"
                    y2="24.6057"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#8E47E8" />
                    <stop offset="1" stopColor="#2C63F0" />
                </linearGradient>
                <linearGradient
                    id={`paint3_linear_${id}`}
                    x1="26.7056"
                    y1="-3.15808"
                    x2="27.3951"
                    y2="19.972"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#8E47E8" />
                    <stop offset="1" stopColor="#2C63F0" />
                </linearGradient>
                <filter
                    id={`filter0_${id}`}
                    x=".7"
                    y="7.2"
                    width="49.7043"
                    height="34.5751"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur" />
                </filter>
                <filter
                    id={`filter1_${id}`}
                    x="6.1"
                    y="6.5"
                    width="39.0624"
                    height="22.1489"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5" />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur" result="shape" />
                </filter>
                <filter
                    id={`filter2_${id}`}
                    x="6.1"
                    y="1.9"
                    width="39.0624"
                    height="22.1489"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5" />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur" result="shape" />
                </filter>
                <filter
                    id={`filter3_${id}`}
                    x="6.1"
                    y="-2.8"
                    width="39.0624"
                    height="22.1489"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5" />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};
