import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from '../Services/GlobalApi'; // Adjust path if needed

function ItemDetails() {
  const { mediaType, id } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await GlobalApi.getItemDetails(mediaType, id);
        setItemDetails(data);
      } catch (err) {
        console.error(`Error fetching details for ${mediaType} with ID ${id}:`, err);
        setError('Failed to fetch details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [mediaType, id]);

  if (loading) {
    return <div className="bg-black min-h-screen py-8 text-white flex justify-center items-center">Loading details...</div>;
  }

  if (error) {
    return <div className="bg-black min-h-screen py-8 text-white flex justify-center items-center text-red-500">{error}</div>;
  }

  if (!itemDetails) {
    return <div className="bg-black min-h-screen py-8 text-white flex justify-center items-center">No details found.</div>;
  }

  return (
    <div className="bg-black min-h-screen py-8 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">{itemDetails.title || itemDetails.name}</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {itemDetails.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${itemDetails.poster_path}`}
              alt={itemDetails.title || itemDetails.name}
              className="rounded-md shadow-md w-full md:w-1/3"
            />
          )}
          <div className="flex-1">
            <p className="mb-4">{itemDetails.overview}</p>
            {itemDetails.release_date && <p>Release Date: {itemDetails.release_date}</p>}
            {itemDetails.first_air_date && <p>First Air Date: {itemDetails.first_air_date}</p>}
            {itemDetails.vote_average && <p>Rating: {itemDetails.vote_average}/10</p>}
            {/* Add more details as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;