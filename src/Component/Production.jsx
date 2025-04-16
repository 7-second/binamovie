import React, { useState, useEffect } from 'react';
import GlobalApi from '../Services/GlobalApi'; // Adjust path if needed

function Production() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await GlobalApi.getTrendingMovies();
        setTrendingMovies(data?.results || []);
      } catch (err) {
        console.error('Error fetching trending movies:', err);
        setError('Failed to fetch trending movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return <div className="bg-black min-h-screen py-8 text-white flex justify-center items-center">Loading trending movies...</div>;
  }

  if (error) {
    return <div className="bg-black min-h-screen py-8 text-white flex justify-center items-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-black min-h-screen py-8 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Trending Movies and TV Shows</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {trendingMovies.map((item) => (
            <div key={item.id} className="rounded-md overflow-hidden shadow-md">
              {item.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full block object-cover aspect-[2/3]"
                />
              )}
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{item.title || item.name}</h3>
                {/* You can add more info here */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Production;