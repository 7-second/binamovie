// src/constant/GenreList.jsx (This component now fetches genres)
import React, { useState, useEffect } from 'react';
import GlobalApi from '../Services/GlobalApi'; // Adjust path if needed

function GenreList({ onGenreClick }) {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenreList = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await GlobalApi.getAllGenres();
        if (data) {
          setGenres(data);
        } else {
          setError('Failed to fetch genres: No data received.');
        }
      } catch (err) {
        console.error('Error fetching genre list:', err);
        setError('Failed to fetch genres.');
      } finally {
        setLoading(false);
      }
    };

    fetchGenreList();
  }, []);

  if (loading) {
    return <p>Loading genres...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error loading genres: {error}</p>;
  }

  return (
    <>
      {genres.map((genreItem) => (
        <button
          key={genreItem.id}
          className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg m-2 cursor-pointer"
          onClick={() => onGenreClick(genreItem)}
        >
          <h2 className="text-white text-xl font-bold">{genreItem.name}</h2>
          <p className="text-gray-400">ID: {genreItem.id}</p>
        </button>
      ))}
    </>
  );
}

export default GenreList;