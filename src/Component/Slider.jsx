import React, { useState, useEffect } from 'react';
import GlobalApi from '../Services/GlobalApi'; // Adjust path if needed
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import arrow icons

function Slider() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [index, setIndex] = useState(0);
    const image_url = "https://image.tmdb.org/t/p/original/";
    const [isAutoSliding, setIsAutoSliding] = useState(true);
    const [slideDirection, setSlideDirection] = useState(null); // To trigger CSS animation

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const data = await GlobalApi.getTrendingMovies();
                setTrendingMovies(data?.results || []);
            } catch (error) {
                console.error("Error fetching trending movies for slider:", error);
            }
        };

        fetchTrending();
    }, []);

    useEffect(() => {
        let timer;
        if (isAutoSliding && trendingMovies.length > 0) {
            timer = setInterval(() => {
                setSlideDirection('left'); // Indicate auto-sliding direction
                setTimeout(() => {
                    setIndex((prevIndex) => (prevIndex + 1) % trendingMovies.length);
                    setSlideDirection(null); // Reset animation trigger
                }, 500); // Match CSS transition duration
            }, 5000); // Change slide every 5 seconds
        }
        return () => clearInterval(timer); // Cleanup on unmount
    }, [isAutoSliding, trendingMovies.length]);

    const goToPreviousSlide = () => {
        setIsAutoSliding(false);
        setSlideDirection('right');
        setTimeout(() => {
            setIndex((prevIndex) => (prevIndex - 1 + trendingMovies.length) % trendingMovies.length);
            setSlideDirection(null);
        }, 500); // Match CSS transition duration
        setTimeout(() => setIsAutoSliding(true), 10000); // Resume after inactivity
    };

    const goToNextSlide = () => {
        setIsAutoSliding(false);
        setSlideDirection('left');
        setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % trendingMovies.length);
            setSlideDirection(null);
        }, 500); // Match CSS transition duration
        setTimeout(() => setIsAutoSliding(true), 10000); // Resume after inactivity
    };

    if (!trendingMovies || trendingMovies.length === 0) {
        return <div className="w-full h-[300px] md:h-[500px] bg-gray-900 flex justify-center items-center text-white">Loading Slider...</div>;
    }

    const currentMovie = trendingMovies[index];
    const imageUrl = currentMovie?.backdrop_path ? image_url + currentMovie.backdrop_path : null;

    return (
        <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden flex items-center justify-between">
            {/* Left Arrow Button */}
            <button
                onClick={goToPreviousSlide}
                className="absolute left-2 md:left-5  top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 z-40 cursor-pointer"
            >
                <FaChevronLeft size={24} />
            </button>

            <div className="relative w-full h-full overflow-hidden">
                <div
                    className={`absolute inset-0 bg-black/60 transition-transform duration-500 ${
                        slideDirection === 'left' ? '-translate-x-full' : slideDirection === 'right' ? 'translate-x-full' : 'translate-x-0'
                    }`}
                    style={{
                        backgroundImage: `url('${imageUrl}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    onTransitionEnd={() => setSlideDirection(null)} // Reset after animation
                >
                    <img
                        src={imageUrl}
                        alt={currentMovie?.title || currentMovie?.name}
                        className="w-full h-full object-cover absolute opacity-0 transition-opacity duration-500 hover:scale-105"
                        onLoad={(e) => {
                            e.target.classList.remove('opacity-0');
                        }}
                    />
                </div>
            </div>

            <div className="absolute inset-y-0 left-5 bg-black/60 flex flex-col justify-center text-white p-4 sm:p-8 z-20">
                <h2 className="text-2xl md:text-4xl font-bold text-left mb-2 sm:mb-4">
                    {currentMovie?.title || currentMovie?.name}
                </h2>
                <p className="text-sm md:text-lg text-left w-full sm:w-4/5 line-clamp-2 md:line-clamp-3">
                    {currentMovie?.overview}
                </p>
                {/* You can add a "Watch Now" button here */}
            </div>

            {/* Right Arrow Button */}
            <button
                onClick={goToNextSlide}
                className="absolute right-2 md:right-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 z-10 cursor-pointer"
            >
                <FaChevronRight size={24} />
            </button>
        </div>
    );
}

export default Slider;