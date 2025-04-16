// Slider.jsx
import React, { useEffect, useRef, useState } from 'react';
import GlobalApi from '../Services/GlobalApi';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
const image_url = "https://image.tmdb.org/t/p/original/";

function Slider() {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const elementReference = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
  
    getTrendingMoviesData();
  }, []);

  const getTrendingMoviesData = async () => {
    
    const data = await GlobalApi.getTrendingMovies();

    if (data && data.results) {
      setTrendingMovies(data.results);
    } else {
      console.error("Slider: Failed to fetch trending movies or data is invalid.");
      setTrendingMovies([]);
    }
    console.log("Slider: getTrendingMoviesData finished");
  };

  const nextSlide = () => {
    if (elementReference.current && trendingMovies?.length > 0 && currentIndex < trendingMovies.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      const nextElement = elementReference.current.children[currentIndex + 1];
      if (nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  };

  const prevSlide = () => {
    if (elementReference.current && trendingMovies?.length > 0 && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      const prevElement = elementReference.current.children[currentIndex - 1];
      if (prevElement) {
        prevElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  };

  return (
    <div className="relative w-full ">
      <HiChevronLeft
        onClick={prevSlide}
        size={30}
        className={`z-10 bg-white rounded-full opacity-40 cursor-pointer text-black absolute top-[100px] left-4 transform -translate-y-1/2 ${
          currentIndex === 0 ? 'invisible' : ''
        }`}
      />
      <div
        ref={elementReference}
        className="flex gap-0 w-full h-[50vh] md:h-[70vh] overflow-x-scroll scrollbar-hide scroll-smooth" // Full width, responsive height
      >
        {trendingMovies === null ? (
          <div>Loading trending movies...</div>
        ) : trendingMovies?.length > 0 ? (
          trendingMovies.map((movie, index) => {
            const imageUrl = image_url + movie.backdrop_path;
            console.log("Slider: Generated Image URL:", imageUrl);
            return (
              <div key={index} className="w-full h-full flex-shrink-0 overflow-hidden">
                <img
                  src={imageUrl}
                  alt={movie.title || movie.name}
                  className='w-full h-[200px] mt-4 md:h-[350px] lg:h-[400px] px-2 md:px-4 object-center rounded-lg cursor-pointer transition-all duration-200 ease-in-out'
                />
              </div>
            );
          })
        ) : (
          <div>Failed to load trending movies.</div>
        )}
      </div>
      <HiChevronRight
        onClick={nextSlide}
        size={30}
        className={`z-10 bg-white rounded-full opacity-40 cursor-pointer text-black absolute top-[100px] right-4 transform -translate-y-1/2 ${
          trendingMovies && currentIndex === trendingMovies.length - 1 ? 'invisible' : ''
        }`}
      />
    </div>
  );
}

export default Slider;