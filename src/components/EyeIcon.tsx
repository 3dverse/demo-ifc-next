import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export const EyeIcon = ({ visible }: { visible: any }) => {
    return <>{visible ? <FaRegEye className="text-gray-500" /> : <FaRegEyeSlash className="text-gray-500" />}</>;
};
