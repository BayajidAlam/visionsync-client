import RecommendedVideo from "@/components/shared/RecommendedVideo/RecommendedVideo";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleVideoPage = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetch("../../../public/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    if (data.length) {
      const selectedVideo = data.find((v) => v._id === id);
      setVideo(selectedVideo);
    }
  }, [data, id]);

  return (
    <div className="w-full flex justify-between items-start gap-2 p-4">
      <div className="w-[70%] flex flex-col justify-center items-start">
        <iframe
          style={{ boxShadow: "0 0 8px 8px rgba(0, 255, 0, 0.7)" }}
          className=""
          width="100%"
          height="720"
          src={video?.url}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <h1 className="text-xl font-bold my-3">{video?.title}</h1>
        <div className="flex justify-center items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover object-center mt-2"
            src={video?.channel?.profilePicture}
            alt="blog"
          />
          <div className="flex justify-center items-center gap-3">
            <div>
              {" "}
              <h1 className="font-bold text-lg">{video?.channel?.name}</h1>
              <p className="text-gray-400">
                {video?.channel?.subscribedCount}k subscribers
              </p>
            </div>

            <button
              className="bg-black px-4 py-1.5
             text-white rounded-full font-bold"
            >
              Subscribe
            </button>
          </div>
        </div>

        <div className="bg-neutral-300 w-full mt-3 rounded-md p-3">
          <h1>
            {video?.viewCount}views, Uploaded at {video?.uploadAt}
          </h1>

          <p>
            "কিছু অভিমান ভালোবাসার কথাই বলে, কিছু জিজ্ঞাসা উত্তর পেরিয়ে আসলে
            চায় নিবিড় চোখে চেয়ে থাকা, কিছু না দেখার অর্থ হয় আজন্ম দুটো চোখে
            আশ্রয় নেওয়া, কিছু ভালো না বাসার অর্থ হয় আজীবন অব্যক্ত ভালোবাসায়
            জড়িয়ে রাখা,এমনই কিছু অভিমানের গান 'অলির কথা শুনে' নিয়ে হাজির
            হলাম" This is a bengali cover of an evergreen romantic song "Oliro
            Kotha Shune"...which gained notable popularity in westbengal and all
            over india... This video is a tribute to all those love stories of
            that generation where a couple used to make their love alive without
            any social media...where they had faith on their love without seeing
            each other oftenly...where they used to love their partners
            selflessly without expecting anything in return...this video is a
            tribute to that generation where love was not depend on any
            condition or demand Kindly watch the full video,and give a feedback
            to me❤❤❤ Hope you like it Don't forget to like share comment and
            subscribe with bell icon... Original song credits : Song: Oliro
            Kotha Shune Singer: Hemanta Mukherjee Lyrics: Gouriprasanna Majumdar
            Composition: Hemanta Mukherjee Record label: Saregama india ltd.
            Cover song credits: Singer: Debolinaa Nandy Ft. Debolinaa Nandy,
            Sayak Chackraborty, Prity Biswas Music Rearrangement: Atishay Jain
            Guitar: Jakiruddin Khan Mix & Master: Tarun Das Recording studio:
            studio violina Story & concept: Debolinaa Nandy D.O.P: Aniket
            Mukherjee & Animesh Mondal Edit & cc,Directed by: Papan Debolinaa's
            costume: Rudra Saha Sayak's costume: Avijit Das Makeup & Hair: Sandy
            Das ***All Rights to Music Label Co. & No Copyright infringement
            intended.
          </p>
        </div>
      </div>
      <div className="w-[30%]  flex justify-center items-center px-4">
        <div className="grid grid-cols-1 -m-4 pt-1">
          {data?.slice(0, 5).map((content: any) => (
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
