import Video from "@/components/Home/Video/Video";
import RecommendedVideo from "@/components/shared/RecommendedVideo/RecommendedVideo";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SingleVideoPage = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("../../../public/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="w-full flex justify-between items-start gap-2 p-4">
      <div
        className="w-[70%] bg-yellow-800 flex justify-center items-center"
        style={{ boxShadow: "0 0 8px 8px rgba(0, 255, 0, 0.7)" }}
      >
        <iframe
          className=""
          width="100%"
          height="720"
          src="https://www.youtube.com/embed/aTHBJwVgu3I?si=IgRGTrODlhT7zmtT"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
      <div className="w-[30%]  flex justify-center items-center px-4">
        <div className="grid grid-cols-1 -m-4">
          {data?.map((content: any) => (
            <Link to={`/video/${content._id}`}>
              <RecommendedVideo content={content} key={content?._id} />

            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleVideoPage;
