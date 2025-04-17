import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlobalApi from '../Services/GlobalApi';

function GenreMovieList() {
    const { genreId: routeGenreId, page: routePage } = useParams();
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [genreMovies, setGenreMovies] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState(null);
    const [selectedGenreName, setSelectedGenreName] = useState('');
    const [loadingGenres, setLoadingGenres] = useState(true);
    const [errorGenres, setErrorGenres] = useState(null);
    const [loadingMovies, setLoadingMovies] = useState(false);
    const [errorMovies, setErrorMovies] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchGenreList = async () => {
            setLoadingGenres(true);
            setErrorGenres(null);
            try {
                const data = await GlobalApi.getAllGenres();
                if (data) {
                    setGenres(data);
                } else {
                    setErrorGenres('Failed to fetch genres: No data received.');
                }
            } catch (err) {
                console.error('Error fetching genre list:', err);
                setErrorGenres('Failed to fetch genres.');
            } finally {
                setLoadingGenres(false);
            }
        };

        fetchGenreList();
    }, []);

    useEffect(() => {
        if (routeGenreId) {
            setSelectedGenreId(parseInt(routeGenreId));
            setCurrentPage(parseInt(routePage) || 1);
        }
    }, [routeGenreId, routePage]);

    useEffect(() => {
        const fetchMovies = async () => {
            if (selectedGenreId) {
                setLoadingMovies(true);
                setErrorMovies(null);
                try {
                    const data = await GlobalApi.getGenreID(selectedGenreId, currentPage); // Pass currentPage
                    console.log("GenreMovieList: Data from getGenreID:", data);
                    if (data && data.results) {
                        setGenreMovies(data.results);
                        setTotalPages(data.total_pages || 1);
                    } else {
                        setGenreMovies([]);
                        setTotalPages(1);
                        console.warn(`No movies found for genre ID: ${selectedGenreId} on page ${currentPage}`);
                    }
                } catch (err) {
                    console.error(`Error fetching movies for genre ID ${selectedGenreId} on page ${currentPage}:`, err);
                    setErrorMovies('Failed to fetch movies.');
                    setGenreMovies([]);
                    setTotalPages(1);
                } finally {
                    setLoadingMovies(false);
                }
            }
        };

        fetchMovies();
    }, [selectedGenreId, currentPage]);

    useEffect(() => {
        if (selectedGenreId) {
            const selectedGenre = genres.find(g => g.id === selectedGenreId);
            setSelectedGenreName(selectedGenre ? selectedGenre.name : '');
        } else {
            setSelectedGenreName('');
            setGenreMovies([]);
            setCurrentPage(1);
            setTotalPages(1);
        }
    }, [selectedGenreId, genres]);

    const handleGenreClick = (genre) => {
        navigate(`/genre/${genre.id}/page/1`);
    };

    const handlePrevPage = () => {
        if (currentPage > 1 && selectedGenreId) {
            navigate(`/genre/${selectedGenreId}/page/${currentPage - 1}`);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages && selectedGenreId) {
            navigate(`/genre/${selectedGenreId}/page/${currentPage + 1}`);
        }
    };

    const goToDetail = (id, mediaType) => {
        navigate(`/${mediaType}/${id}`); // Navigate to the detail page
    };

    return (
        <div className="bg-black min-h-screen py-8 text-white">
            <div className="container mx-auto px-4">
                <div className="overflow-x-scroll scrollbar-hide py-4">
                    <div className="flex flex-nowrap space-x-6">
                        {loadingGenres && <p className="text-gray-500">Loading genres...</p>}
                        {errorGenres && <p className="text-red-500">{errorGenres}</p>}
                        {genres.map((genre) => (
                            <button
                                key={genre.id}
                                className={`flex-shrink-0 px-6 py-2 rounded-md text-sm font-semibold ${
                                    selectedGenreId === genre.id ? 'bg-red-600' : 'bg-gray-800 hover:bg-gray-700'
                                } focus:outline-none focus:ring-2 focus:ring-red-500`}
                                onClick={() => handleGenreClick(genre)}
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedGenreId && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">{selectedGenreName}</h2>
                        {loadingMovies && <p className="text-gray-500">Loading movies...</p>}
                        {errorMovies && <p className="text-red-500">{errorMovies}</p>}
                        {!loadingMovies && !errorMovies && genreMovies.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {genreMovies.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="rounded-md overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
                                        onClick={() => goToDetail(movie.id, movie.media_type || 'movie')} // Added onClick handler
                                    >
                                        {movie.poster_path && (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title || movie.name}
                                                className="w-full block object-cover aspect-[2/3]"
                                            />
                                        )}
                                        <div className="p-2">
                                            <h3 className="text-sm font-semibold truncate">{movie.title || movie.name}</h3>
                                            {/* You can add more info here */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : !loadingMovies && !errorMovies ? (
                            <p className="text-gray-400">No movies found for this genre.</p>
                        ) : null}

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8 space-x-4">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-md ${
                                        currentPage === 1 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                                >
                                    Previous
                                </button>
                                <span className="text-white">{currentPage} / {totalPages}</span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-md ${
                                        currentPage === totalPages ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default GenreMovieList;