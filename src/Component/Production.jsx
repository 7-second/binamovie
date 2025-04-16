import React, { useState, useEffect } from 'react';
import disney from "../assets/hero images/disney-2.svg"; // Ensure these are optimized
import marvel from "../assets/hero images/marvel-logo.svg";
import nationalgeo from "../assets/hero images/nat.svg";
import starwar from "../assets/hero images/starwars.svg";

// video
import pixarvideo from "../assets/hero video/pixar.mp4"; // Ensure these are optimized
import marvelvideo from "../assets/hero video/marvel.mp4";
import natgeovideo from "../assets/hero video/natgeo.mp4";
import starvideo from "../assets/hero video/starwar.mp4";

// Loading animation component (you can customize this)
const LoadingAnimation = () => (
  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg z-20">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
  </div>
);

function Production() {
  const productionList = [
    { id: 1, image: disney, video: pixarvideo },
    { id: 2, image: marvel, video: marvelvideo },
    { id: 3, image: nationalgeo, video: natgeovideo },
    { id: 4, image: starwar, video: starvideo },
  ];

  const [loadingStates, setLoadingStates] = useState(productionList.map(() => false));
  const [videoLoaded, setVideoLoaded] = useState(productionList.map(() => false));

  const handleMouseEnter = (index) => {
    const newLoadingStates = [...loadingStates];
    newLoadingStates[index] = true;
    setLoadingStates(newLoadingStates);
  };

  const handleVideoLoaded = (index) => {
    const newVideoLoaded = [...videoLoaded];
    newVideoLoaded[index] = true;
    setVideoLoaded(newVideoLoaded);
    const newLoadingStates = [...loadingStates];
    newLoadingStates[index] = false;
    setLoadingStates(newLoadingStates);
  };

  return (
    <div className="w-full absolute top-[210px] md:top-[250px] lg:top-[420px] flex items-center justify-around md:justify-between gap-2 md:gap-5 px-2 md:px-10 lg:px-10 h-[80px] md:h-[120px] lg:h-[130px]">
      {productionList.map((item, index) => (
        <div
          key={index}
          className="relative w-fit flex-1 border-[3px] border-gray-600 rounded-lg h-[60%] md:h-[80%] lg:h-[90%] overflow-hidden shadow-md cursor-pointer group hover:scale-110 transition-all duration-300 ease-in-out"
          onMouseEnter={() => handleMouseEnter(index)}
        >
          {!videoLoaded[index] && loadingStates[index] && (
            <LoadingAnimation />
          )}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
            <img
              src={item.image}
              alt={`Production Logo ${index + 1}`}
              className="max-w-[60%] max-h-[60%] object-contain"
            />
          </div>
          <video
            src={item.video}
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
            onLoadedData={() => handleVideoLoaded(index)}
          ></video>
        </div>
      ))}
    </div>
  );
}

export default Production;