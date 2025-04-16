import React, { useState, useEffect } from 'react';
import GlobalApi from '../Services/GlobalApi'; // Adjust path if needed

function Slider() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const image_url = "https://image.tmdb.org/t/p/original/";

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
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % trendingMovies.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, [trendingMovies.length]);

  if (!trendingMovies || trendingMovies.length === 0) {
    return <div className="w-full h-[300px] md:h-[500px]  bg-gray-900 flex justify-center items-center text-white">Loading Slider...</div>;
  }

  const currentMovie = trendingMovies[index];
  const imageUrl = currentMovie?.backdrop_path ? image_url + currentMovie.backdrop_path : null;

  return (
    <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={currentMovie?.title || currentMovie?.name}
          className="w-full h-full object-cover transition-opacity duration-500 hover:scale-150"
        />
      )}
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">{currentMovie?.title || currentMovie?.name}</h2>
        <p className="text-lg md:text-xl text-center w-4/5 md:w-2/3 line-clamp-2 md:line-clamp-3">{currentMovie?.overview}</p>
        {/* You can add a "Watch Now" button here */}
      </div>
      {/* Optional: Add navigation dots or arrows */}
    </div>
  );
}

export default Slider;