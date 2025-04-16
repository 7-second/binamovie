// src/constant/GenreList.jsx
import React from 'react';

const GenreList = ({ onGenreClick }) => {
    const genres = [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
        { id: 16, name: 'Animation' },
        { id: 35, name: 'Comedy' },
        { id: 80, name: 'Crime' },
        { id: 99, name: 'Documentary' },
        { id: 18, name: 'Drama' },
        { id: 10751, name: 'Family' },
        { id: 14, name: 'Fantasy' },
        { id: 36, name: 'History' },
        { id: 27, name: 'Horror' },
        { id: 10402, name: 'Music' },
        { id: 9648, name: 'Mystery' },
        { id: 10749, name: 'Romance' },
        { id: 878, name: 'Science Fiction' },
        { id: 10770, name: 'TV Movie' },
        { id: 53, name: 'Thriller' },
        { id: 10752, name: 'War' },
        { id: 37, name: 'Western' },
        { id: 10759, name: 'Action & Adventure' },
        { id: 10762, name: 'Kids' },
        { id: 10763, name: 'News' },
        { id: 10764, name: 'Reality' },
        { id: 10765, name: 'Sci-Fi & Fantasy' },
        { id: 10766, name: 'Soap' },
        { id: 10767, name: 'Talk' },
        { id: 10768, name: 'War & Politics' },
    ];

    return (
        <>
            {genres.map(genre => (
                <button
                    key={genre.id}
                    onClick={() => onGenreClick(genre)}
                    className="block py-0.5 px-2 hover:bg-gray-700 cursor-pointer text-white text-sm text-center"
                    style={{ minWidth: '70px' }}
                >
                    {genre.name}
                </button>
            ))}
        </>
    );
};

export default GenreList;