import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import disney from "../assets/hero images/disney-2.svg";
import marvel from "../assets/hero images/marvel-logo.svg";
import nationalgeo from "../assets/hero images/nat.svg";
import starwar from "../assets/hero images/starwars.svg";

import pixarvideo from "../assets/hero video/pixar.mp4";
import marvelvideo from "../assets/hero video/marvel.mp4";
import natgeovideo from "../assets/hero video/natgeo.mp4";
import starvideo from "../assets/hero video/starwar.mp4";

import GlobalApi from '../Services/GlobalApi';

function Production() {
    const navigate = useNavigate();
    const productionList = [
        { id: 1, image: disney, video: pixarvideo },
        { id: 2, image: marvel, video: marvelvideo },
        { id: 3, image: nationalgeo, video: natgeovideo },
        { id: 4, image: starwar, video: starvideo },
    ];

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const data = await GlobalApi.getTrendingMovies();
                setTrendingMovies(data.results || []);
            } catch (err) {
                console.error("Failed to fetch trending:", err);
                setError("Could not load trending content.");
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    const goToDetail = (id, mediaType) => {
        navigate(`/${mediaType}/${id}`);
    };

    return (
        <div className="relative w-full min-h-screen bg-black text-white">
            {/* Logo Carousel */}
            <div className="flex gap-3 sm:gap-6 px-4 sm:px-12 md:px-20 mt-8 sm:mt-20 justify-between items-center">
                {productionList.map((item, index) => (
                    <div
                        key={index}
                        className="relative w-full max-w-[100px] sm:max-w-[140px] md:max-w-[180px] lg:max-w-[220px]
                            aspect-[3/2] border-[3px] border-gray-700 rounded-xl overflow-hidden cursor-pointer group 
                            hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        <img
                            src={item.image}
                            alt="Brand logo"
                            className="absolute w-full h-full object-contain z-10 transition-opacity duration-300 group-hover:opacity-0"
                        />
                        <video
                            src={item.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                    </div>
                ))}
            </div>

            {/* Trending Section */}
            <div className="mt-10 px-4 sm:px-12 md:px-20">
                <h2 className="text-xl sm:text-2xl font-semibold mb-6">Trending Movies & Shows</h2>
                {loading ? (
                    <p className="text-gray-400">Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                        {trendingMovies.map((movie) => (
                            <div
                                key={movie.id}
                                className="cursor-pointer group rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
                                onClick={() => goToDetail(movie.id, movie.media_type)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
                                    alt={movie.title || movie.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="bg-black/60 p-2">
                                    <h3 className="text-sm truncate">{movie.title || movie.name}</h3>
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
