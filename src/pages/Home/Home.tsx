import Video from "@/components/Home/Video/Video";

const Home = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="px-5 my-5 mx-auto">
          <div className="grid grid-cols-5 -m-4">
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
