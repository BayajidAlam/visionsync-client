import { IoEyeOutline } from "react-icons/io5";
import { LuMessageSquare } from "react-icons/lu";
import thumbnail from "../../../assets/IMG_0198.jpg";

const Video = () => {
  return (
    <div className="p-4">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <div className="relative">
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src={thumbnail}
            alt="blog"
          />
          <p className="absolute bottom-2 right-2 text-white bg-black rounded-[10px] p-1 text-xs">10:00</p>
        </div>
        <div className="p-2 flex justify-between items-start gap-2">
          <img
            className="lg:h-8 md:h-8 w-8 rounded-full object-cover object-center mt-2"
            src={thumbnail}
            alt="blog"
          />
          <div>
            {" "}
            <h1 className="font-bold text-md w-full">
              Dekhechhi Rupshagore (দেখেছি রূপসাগরে) | Mahtim Shakib | Arindom |
              Ditipriya,Dibyojyoti | SVF Music
            </h1>
            <h1 className="text-md">Sunidhi Nayak</h1>
            <div>
              <div className="flex items-center flex-wrap ">
                <p>1 day ago</p>
                <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 ">
                  <IoEyeOutline className="mr-1" />
                  1.2K views
                </span>
                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                  <LuMessageSquare className="mr-1" />6
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
