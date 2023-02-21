import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

const Carousel = () => {
  const [pexels, setPexels] = useState([]);
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    const getVideos = async () => {
      const res = await axios.get("https://api.pexels.com/videos/popular");
      setPexels(res.data.videos);
    };
    getVideos();
  }, []);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? pexels.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === pexels.length - 1 ? 0 : curr + 1));

  return (
    <div className="overflow-hidden relative bg-red-900">
      {pexels.map((img, index) => (
        <div
          className="flex transition-transform ease-out duration-500 h-full"
          key={img.id}
          style={{ display: index === curr ? "block" : "none" }}
        >
          <img src={img.image} alt="img" className="w-full h-[350px]" />
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={prev} className="text-white">
          <MdOutlineKeyboardArrowLeft size={50} />
        </button>
        <button onClick={next}>
          <MdKeyboardArrowRight size={50} className="text-white" />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {pexels.map((_, i) => (
            <div
              className={`transition-all w-3 h-3 bg-white rounded-full ${
                curr === i ? "p-4" : "bg-opacity-50"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
