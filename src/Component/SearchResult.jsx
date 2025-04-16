import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GlobalApi from '../Services/GlobalApi'; // Adjust path if needed

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await GlobalApi.searchMovies(query);
        console.log("Search Results Data:", data);
        if (data && data.results) {
          setSearchResults(data.results);
        } else {
          setError('No search results found.');
        }
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results.');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) return <div className="bg-black min-h-screen py-8 text-white flex justify-center items-center">Loading search results...</div>;
  if (error) return <div className="bg-black min-h-screen py-8 text-white flex justify-center items-center text-red-500">Error: {error}</div>;
  if (!searchResults) return <div className="bg-black min-h-screen py-8 text-white flex justify-center items-center">No search results.</div>;

  return (
    <div className="bg-black min-h-screen py-8 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {searchResults.map((item) => (
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
        ) : (
          <p>No results found for "{query}".</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;