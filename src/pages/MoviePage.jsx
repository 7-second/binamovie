import React, { useState, useEffect } from 'react';
import GlobalApi from '../Services/GlobalApi.jsx'; // Make sure this path is correct
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config'; // Adjust the path if needed
import { useNavigate, useParams } from 'react-router-dom';

function MovieListPage() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { page: pageParam } = useParams();
    const navigate = useNavigate();
    const page = parseInt(pageParam) || 1;

    useEffect(() => {
        const fetchPopular = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await GlobalApi.getPopularMovies(page);
                if (data && data.results) {
                    setPopularMovies(data.results);
                    // console.log("Fetched Movie Data:", data); // For debugging pagination info
                } else {
                    setError('Failed to fetch popular movies.');
                }
            } catch (err) {
                setError('An error occurred while fetching popular movies.');
                console.error('Error fetching popular movies:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPopular();
    }, [page]);

    const handleNextPage = () => {
        navigate(`/movie/popular/page/${page + 1}`);
    };

    const handlePreviousPage = () => {
        navigate(`/movie/popular/page/${page - 1}`);
    };

    if (loading) {
        return <p className="text-white text-center py-8">Loading popular movies...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center py-8">{error}</p>;
    }

    return (
        <div className="py-8 bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4">
                <h1 className="text-white text-2xl font-bold mb-4">Popular Movies - Page {page}</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {popularMovies.map(movie => (
                        <div key={movie.id} className="bg-gray-800 rounded-md shadow-md overflow-hidden">
                            {movie.poster_path ? (
                                <img
                                    src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-auto object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400">
                                    No Poster
                                </div>
                            )}
                            <div className="p-3">
                                <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
                                {movie.release_date && (
                                    <p className="text-gray-400 text-xs mt-1">Release: {movie.release_date}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8 text-white">
                    <button
                        onClick={handlePreviousPage}
                        disabled={page <= 1}
                        className={`bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2 ${page <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Previous
                    </button>
                    <span className="mx-2">Page {page}</span>
                    <button
                        onClick={handleNextPage}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MovieListPage;