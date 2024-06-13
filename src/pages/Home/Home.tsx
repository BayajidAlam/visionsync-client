import { IoEyeOutline } from "react-icons/io5";
import { LuMessageSquare } from "react-icons/lu";
import thumbnail from "../../assets/IMG_0198.jpg";

const Home = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="px-5 my-5 mx-auto">
          <div className="grid grid-cols-5 -m-4">
            <div className="p-4">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={thumbnail}
                  alt="blog"
                />
                <div>
                  
                </div>
                <div className="p-2">
                  <div className="flex items-center flex-wrap ">
                    <p>1 day ago</p>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 ">
                      <IoEyeOutline className="mr-1 text-lg" />
                      1.2K views
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <LuMessageSquare className="mr-1 text-lg" />6
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
