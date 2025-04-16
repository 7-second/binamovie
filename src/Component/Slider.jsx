import React, { useState, useEffect } from 'react';
import GlobalApi from '../Services/GlobalApi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Slider() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [slideDirection, setSlideDirection] = useState(null);
  const image_url = 'https://image.tmdb.org/t/p/original/';

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await GlobalApi.getTrendingMovies();
        setTrendingMovies(data?.results || []);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    let timer;
    if (isAutoSliding && trendingMovies.length > 0) {
      timer = setInterval(() => {
        triggerSlide('left');
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isAutoSliding, trendingMovies.length]);

  const triggerSlide = (direction) => {
    setSlideDirection(direction);
    setTimeout(() => {
      setIndex((prev) =>
        direction === 'left'
          ? (prev + 1) % trendingMovies.length
          : (prev - 1 + trendingMovies.length) % trendingMovies.length
      );
      setSlideDirection(null);
    }, 500);
  };

  const goToPreviousSlide = () => {
    setIsAutoSliding(false);
    triggerSlide('right');
    setTimeout(() => setIsAutoSliding(true), 10000);
  };

  const goToNextSlide = () => {
    setIsAutoSliding(false);
    triggerSlide('left');
    setTimeout(() => setIsAutoSliding(true), 10000);
  };

  if (!trendingMovies.length) {
    return (
      <div className="w-full h-[300px] md:h-[500px] bg-gray-900 flex justify-center items-center text-white">
        Loading Slider...
      </div>
    );
  }

  const currentMovie = trendingMovies[index];
  const imageUrl = currentMovie?.backdrop_path
    ? image_url + currentMovie.backdrop_path
    : '';

  return (
    <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden">
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 ${
          slideDirection === 'left'
            ? '-translate-x-full'
            : slideDirection === 'right'
            ? 'translate-x-full'
            : 'translate-x-0'
        }`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

      {/* Movie Info */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white max-w-[80%]">
        <h2 className="text-xl md:text-4xl font-bold mb-2">
          {currentMovie?.title || currentMovie?.name}
        </h2>
        <p className="text-sm md:text-base text-gray-200 line-clamp-3">
          {currentMovie?.overview}
        </p>
      </div>

      {/* Arrows - Always visible now */}
      <button
        onClick={goToPreviousSlide}
        aria-label="Previous Slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 text-white p-3 md:p-4 rounded-full transition-all shadow-lg"
      >
        <FaChevronLeft size={28} />
      </button>

      <button
        onClick={goToNextSlide}
        aria-label="Next Slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 text-white p-3 md:p-4 rounded-full transition-all shadow-lg"
      >
        <FaChevronRight size={28} />
      </button>
    </div>
  );
}

export default Slider;
