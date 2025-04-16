import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Slider from './Component/Slider';
import Production from './Component/Production';
import GenreMovieList from './Component/GenreMovieList';
import SearchResults from './Component/SearchResult';
import ItemDetails from './pages/ItemDetails';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;