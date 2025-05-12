import { classNames } from "@/utils/other";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
const FormAlert = ({ error, success, message }) => {
  return (
    <div
      className={classNames(
        "w-full flex items-center space-x-3 p-3 border rounded-md text-[15px] mt-1 mb-2 ",
        error && "bg-[#fdeded] border-[#fad9d9] text-[#6e3433]",
        success && " bg-[#edf7ed] border-[#d3f5d3] text-[#476949] "
      )}
      style={!error && !success ? { display: "none" } : {}}>
      {error && (
        <MdOutlineErrorOutline className="text-[#d74343] text-[25px]" />
      )}

      {success && <FiCheckCircle className="text-[#408844] text-[25px]" />}

      <div className="flex-1">
        <p className="leading-tight">{message}</p>
      </div>
    </div>
  );
};

export default FormAlert;
