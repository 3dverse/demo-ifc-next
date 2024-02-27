"use client";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export const EyeIcon = ({ visible }: { visible: any }) => {
    return <>{visible ? <FaRegEye /> : <FaRegEyeSlash />}</>;
};
