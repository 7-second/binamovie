import React, { useState, useEffect } from 'react';
import disney from "../assets/hero images/disney-2.svg";
import marvel from "../assets/hero images/marvel-logo.svg";
import nationalgeo from "../assets/hero images/nat.svg";
import starwar from "../assets/hero images/starwars.svg";
import GlobalApi from '../Services/GlobalApi';

// video
import pixarvideo from "../assets/hero video/pixar.mp4";
import marvelvideo from "../assets/hero video/marvel.mp4";
import natgeovideo from "../assets/hero video/natgeo.mp4";
import starvideo from "../assets/hero video/starwar.mp4";

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
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingLoading, setTrendingLoading] = useState(true);
    const [trendingError, setTrendingError] = useState(null);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const data = await GlobalApi.getTrendingMovies();
                if (data && data.results) {
                    setTrendingMovies(data.results);
                } else {
                    setTrendingError("Failed to fetch trending movies.");
                }
            } catch (err) {
                console.error("Error fetching trending movies:", err);
                setTrendingError("An error occurred while fetching trending movies.");
            } finally {
                setTrendingLoading(false);
            }
        };

        fetchTrending();
    }, []);

    const handleMouseEnter = (index) => {
        const newLoadingStates = [...loadingStates];
        newLoadingStates[index] = true;
        setLoadingStates(newLoadingStates);
    };

    return (
        <div className="relative bg-black/60">
            {/* Production Logos and Videos */}
            <div className="w-full absolute top-[-50px] sm:top-[50px]   md:mt-[-200px]
                            flex items-center justify-around sm:justify-between gap-2 sm:gap-5 
                            px-2 sm:px-6 md:px-12 lg:px-24 
                            h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px]">
                {productionList.map((item, index) => (
                    <div
                        key={index}
                        className="relative w-fit flex-1 border-[3px] border-gray-600 rounded-lg 
                                   h-[50%] sm:h-[60%] md:h-[70%] lg:h-[80%] xl:h-[90%] 
                                   overflow-hidden cursor-pointer group hover:scale-110 transition-all duration-300 ease-in-out shadow-xl"
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
                            <img
                                src={item.image}
                                alt={`Production Logo ${index + 1}`}
                                className="max-w-[50%] sm:max-w-[60%] md:max-w-[70%] max-h-[50%] sm:max-h-[60%] md:max-h-[70%] object-contain"
                            />
                        </div>
                        <video
                            src={item.video}
                            autoPlay
                            loop
                            muted
                            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                        ></video>
                    </div>
                ))}
            </div>

            {/* Trending Movies Section */}
            <div className=" px-4 mt-[20px] sm:mt-[100px] md:mt-[-100px] lg:mt-[100px] ">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white mt-[50px]">Trending Movies and Shows</h2>
                {trendingLoading ? (
                    <div className="text-white">Loading trending movies...</div>
                ) : trendingError ? (
                    <div className="text-red-500">Error: {trendingError}</div>
                ) : (
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6">
                        {trendingMovies.map((item) => (
                            <div key={item.id} className="w-[80px] sm:w-[120px] md:w-[150px] lg:w-[180px] rounded-md shadow-md overflow-hidden">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`}
                                    alt={item.title || item.name}
                                    className="w-full h-auto object-cover"
                                />
                                <div className="p-1 sm:p-2">
                                    <h3 className="text-xs sm:text-sm md:text-base font-medium text-white truncate">{item.title || item.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Production;