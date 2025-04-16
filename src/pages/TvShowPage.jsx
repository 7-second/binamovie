// src/pages/TvShowPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlobalApi from '../Services/GlobalApi.jsx'; // Adjust the path if needed
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config'; // Ensure config.js is in src/

function TvShowPage() {
    const { page: pageParam } = useParams();
    const navigate = useNavigate();
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const page = parseInt(pageParam) || 1; // Get page from params, default to 1

    useEffect(() => {
        const fetchPopularTvShows = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await GlobalApi.getPopularTvShows(page); // Fetch with the current page
                if (data && data.results) {
                    setTvShows(data.results);
                    // console.log("Fetched TV Show Data:", data); // For debugging pagination info
                } else {
                    setError('Failed to fetch popular TV shows.');
                }
            } catch (err) {
                setError('An error occurred while fetching popular TV shows.');
                console.error('Error fetching popular TV shows:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPopularTvShows();
    }, [page]); // Re-fetch when the page number changes

    const handleNextPage = () => {
        navigate(`/tv/popular/page/${page + 1}`);
    };

    const handlePreviousPage = () => {
        navigate(`/tv/popular/page/${page - 1}`);
    };

    if (loading) {
        return <div className="py-8 text-white text-center">Loading TV Shows...</div>;
    }

    if (error) {
        return <div className="py-8 text-red-500 text-center">Error: {error}</div>;
    }

    return (
        <div className="py-8 bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4">
                <h2 className="text-white text-2xl font-bold mb-4">Popular TV Shows - Page {page}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {tvShows.map(show => (
                        <div key={show.id} className="bg-gray-800 rounded-md shadow-md overflow-hidden">
                            <a href={`/tv/${show.id}`}>
                                {show.poster_path ? (
                                    <img
                                        src={`${IMAGE_BASE_URL}${POSTER_SIZE}${show.poster_path}`}
                                        alt={show.name}
                                        className="w-full h-auto object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400">
                                        No Poster
                                    </div>
                                )}
                                <div className="p-3">
                                    <h3 className="text-white font-semibold text-sm truncate">{show.name}</h3>
                                    <p className="text-gray-400 text-xs mt-1">First Air Date: {show.first_air_date}</p>
                                </div>
                            </a>
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

export default TvShowPage;