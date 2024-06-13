import { IoHomeOutline } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { IoVideocamOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { MdHistory } from "react-icons/md";

type SideBarProps = {
  expandSideBar: boolean;
};

const SideBar = ({ expandSideBar }: SideBarProps) => {
  return (
    <div
      className={`fixed top-14 h-screen transition-width duration-200 ${
        expandSideBar ? "w-[180px]" : ""
      } border-r-2 ml-4`}
    >
      {expandSideBar ? (
        <>
          <div className="mx-1 space-y-2">
            <div
              className="hover:bg-slate-200
         p-1 m-1 rounded flex justify-start items-center gap-2"
            >
              <IoHomeOutline className="text-2xl" />
              <p className="text-md font-bold">Home</p>
            </div>
            <div
              className="hover:bg-slate-200
         p-1 m-1 rounded flex justify-start items-center gap-2"
            >
              <MdHistory className="text-2xl"/>
              <p className="text-md font-bold">History</p>
            </div>
            <div
              className="hover:bg-slate-200
         p-1 m-1 rounded flex justify-start items-center gap-2"
            >
              <IoVideocamOutline className="text-2xl" />
              <p className="text-md font-bold">My Videos</p>
            </div>
            <div
              className="hover:bg-slate-200
         p-1 m-1 rounded flex justify-start items-center gap-2"
            >
              <FiUpload className="text-2xl" />
              <p className="text-md font-bold">Upload Video</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mx-1 space-y-2">
            <div
              className="hover:bg-slate-200
             p-1 m-1 rounded"
            >
              <IoHomeOutline className="text-2xl" />
            </div>
            <div
              className="hover:bg-slate-200
             p-1 m-1 rounded"
            >
              <FaHistory className="text-2xl" />
            </div>
            <div
              className="hover:bg-slate-200
             p-1 m-1 rounded"
            >
              <IoVideocamOutline className="text-2xl" />
            </div>
            <div
              className="hover:bg-slate-200
             p-1 m-1 rounded"
            >
              <FiUpload className="text-2xl" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
