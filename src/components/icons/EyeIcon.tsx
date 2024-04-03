export const EyeIcon = ({ isVisible }: { isVisible?: boolean }) => {
    return <>{isVisible ? <Eye /> : <EyeSlash />}</>;
};

const Eye = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className={className} width={14}>
        <path d="M117.2 136C160.3 96 217.6 64 288 64s127.7 32 170.8 72c43.1 40 71.9 88 85.2 120c-13.3 32-42.1 80-85.2 120c-43.1 40-100.4 72-170.8 72s-127.7-32-170.8-72C74.1 336 45.3 288 32 256c13.3-32 42.1-80 85.2-120zM288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM192 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
    </svg>
);

const EyeSlash = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className={className} width={14}>
        <path d="M40.4 18L27.8 8.1 8.1 33.4l12.6 9.8L599.8 494.3l12.6 9.8 19.7-25.2L619.5 469 40.4 18zM608 256C578 181.3 478.4 32 320 32c-50.2 0-94.5 15-132.5 37.8l27.1 21.4C245.9 74.4 281.1 64 320 64c68.4 0 125.4 32.1 170 75c39.8 38.3 67.9 83.7 83.2 117c-10.5 22.8-27 51.4-49.3 79.4L549 355.3c28.4-35.8 48.2-72.4 59-99.3zM91 156.7C62.6 192.5 42.8 229.1 32 256c30 74.7 129.6 224 288 224c50.2 0 94.5-15 132.5-37.8l-27.1-21.4C394.1 437.6 358.9 448 320 448c-68.4 0-125.4-32.1-170-75c-39.8-38.3-67.9-83.7-83.2-117c10.5-22.8 27-51.4 49.3-79.4L91 156.7zM320 384c16.7 0 32.7-3.2 47.4-9.1l-30.9-24.4c-5.4 .9-10.9 1.4-16.5 1.4c-51 0-92.8-39.8-95.8-90.1l-30.9-24.4c-.9 6-1.3 12.2-1.3 18.5c0 70.7 57.3 128 128 128zM448 256c0-70.7-57.3-128-128-128c-16.7 0-32.7 3.2-47.4 9.1l30.9 24.4c5.4-.9 10.9-1.4 16.5-1.4c51 0 92.8 39.8 95.8 90.1l30.9 24.4c.9-6 1.3-12.2 1.3-18.5z" />
    </svg>
);
