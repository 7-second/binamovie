import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Slider from './Component/Slider';
import Production from './Component/Production';
import GenreMovieList from './Component/GenreMovieList';
import SearchResults from './Component/SearchResult';
import ItemDetails from './pages/ItemDetails';
import MoviePage from './pages/MoviePage'; // Import the MoviePage component
import TvShowPage from './pages/TvShowPage'; // Import the TvShowPage component

function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-screen bg-black/60">
        <Header />
        <Slider />
        <Routes>
          <Route path="/" element={<Production />} />
          <Route path="/genre/:genreId/page/:page?" element={<GenreMovieList />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/:mediaType/:id" element={<ItemDetails />} />
          <Route path="/movie/popular/page/:page?" element={<MoviePage />} /> {/* Add route for movies */}
          <Route path="/tv/popular/page/:page?" element={<TvShowPage />} />  {/* Add route for tv shows */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;