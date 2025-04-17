import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo from "../assets/logo/logo.png";
import { HiHome, HiPlus } from 'react-icons/hi';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import HeaderItem from './HeaderItem';
import { FaTv } from 'react-icons/fa';
import { RiMovie2Fill } from 'react-icons/ri';
import GenreList from '../constant/GenreList';
import { BsCollectionPlay } from 'react-icons/bs';
import GlobalApi from '../Services/GlobalApi'; // Import your API service

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchInputRef = useRef(null);
    const genreDropdownRef = useRef(null);
    const searchSuggestionsRef = useRef(null); // Ref for the suggestions container

    const [showSearchInput, setShowSearchInput] = useState(false);
    const [showGenreDropdown, setShowGenreDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    const defaultMenu = [
        { name: "Home", icon: HiHome, path: "/" },
        { name: "search", icon: HiMagnifyingGlass, onClick: () => setShowSearchInput(true) },
        { name: "genre", icon: BsCollectionPlay, onClick: () => setShowGenreDropdown(!showGenreDropdown) },
        { name: "Movie", icon: RiMovie2Fill, path: "/movie/popular/page/1" },
        { name: "Tv-Show", icon: FaTv, path: "/tv/popular/page/1" },
        { name: "watch list", icon: HiPlus, path: "/watchlist" },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (genreDropdownRef.current && !genreDropdownRef.current.contains(event.target)) {
                setShowGenreDropdown(false);
            }
            if (showSearchInput && searchInputRef.current && !searchInputRef.current.contains(event.target) &&
                event.target !== defaultMenu.find(item => item.name === 'search')?.icon &&
                !event.target.closest('form') &&
                (!searchSuggestionsRef.current || !searchSuggestionsRef.current.contains(event.target))) {
                setShowSearchInput(false);
                setSearchTerm('');
                setSearchSuggestions([]);
                setIsSearchInputFocused(false);
                setLoading(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSearchInput]);

    // Debounced function to fetch search suggestions from the API
    const debouncedFetchSuggestions = useRef(debounce(async (query) => {
        if (query.trim()) {
            setLoading(true);
            const data = await GlobalApi.searchMovies(query);
            setLoading(false);
            if (data && data.results) {
                // Filter out non-movie and non-tv results if needed
                setSearchSuggestions(data.results);
            } else {
                setSearchSuggestions([]);
            }
        } else {
            setSearchSuggestions([]);
            setLoading(false);
        }
    }, 300)).current;

    useEffect(() => {
        if (showSearchInput && isSearchInputFocused) {
            debouncedFetchSuggestions(searchTerm);
        } else {
            setSearchSuggestions([]);
            setLoading(false);
        }
    }, [searchTerm, showSearchInput, isSearchInputFocused, debouncedFetchSuggestions]);

    const handleNavigation = (path) => {
        if (path) {
            navigate(path);
            setShowSearchInput(false);
            setShowGenreDropdown(false);
            setSearchTerm('');
            setSelectedGenre(null);
            setSearchSuggestions([]);
            setIsSearchInputFocused(false);
            setLoading(false);
        }
    };

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
        navigate(`/genre/${genre.id}/page/1`);
        setShowGenreDropdown(false);
    };

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchInputFocus = () => {
        setIsSearchInputFocused(true);
    };

    const handleSearchInputBlur = () => {
        // Keep suggestions visible if clicked
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${searchTerm}`);
            setShowSearchInput(false);
            setSearchTerm('');
            setShowGenreDropdown(false);
            setSelectedGenre(null);
            setSearchSuggestions([]);
            setIsSearchInputFocused(false);
            setLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.title || suggestion.name);
        navigate(`/search?query=${suggestion.title || suggestion.name}`);
        setShowSearchInput(false);
        setSearchSuggestions([]);
        setIsSearchInputFocused(false);
        setLoading(false);
    };

    return (
        <>
            {/* Desktop Header */}
            <div className="hidden md:flex fixed top-0 left-0 right-0 z-50 items-center justify-between h-[60px] px-6 bg-black/40 backdrop-blur-md shadow-md">
                <div onClick={() => handleNavigation("/")} className="flex items-center gap-2 cursor-pointer">
                    <img className="w-[80px] h-auto object-contain" src={logo} alt="Logo" />
                    <span className="text-cyan-400 font-semibold text-sm tracking-wide">EnjOy</span>
                </div>

                <div className="flex items-center gap-6">
                    {defaultMenu.map((item, index) => (
                        <div key={index} className="relative group">
                            {item.name === 'genre' ? (
                                <div onClick={item.onClick} className="cursor-pointer hover:scale-110 transition-transform duration-200">
                                    <HeaderItem Icon={item.icon} />
                                    {showGenreDropdown && (
                                        <div ref={genreDropdownRef} className="absolute top-full left-0 mt-2 bg-gray-900/90 backdrop-blur-lg text-white shadow-2xl z-50 w-[800px] h-[300px] px-6 py-6 rounded-xl animate-fadeIn">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                                <GenreList onGenreClick={handleGenreClick} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : item.name === 'search' ? (
                                <div onClick={item.onClick} className="cursor-pointer relative">
                                    <HeaderItem Icon={item.icon} />
                                    {showSearchInput && (
                                        <div className="absolute top-full left-0 mt-2 bg-gray-900/90 backdrop-blur-lg text-white shadow-2xl z-50 p-4 w-64 rounded-xl animate-fadeIn">
                                            <form onSubmit={handleSearchSubmit} className="relative">
                                                <div className="flex items-center">
                                                    <input
                                                        ref={searchInputRef}
                                                        type="text"
                                                        placeholder="Search..."
                                                        className="bg-gray-800 text-white p-2 rounded-l-md w-full focus:outline-none text-sm"
                                                        value={searchTerm}
                                                        onChange={handleSearchInputChange}
                                                        onFocus={handleSearchInputFocus}
                                                        onBlur={handleSearchInputBlur}
                                                    />
                                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-r-md text-sm">
                                                        Go
                                                    </button>
                                                    <button type="button" onClick={() => setShowSearchInput(false)} className="ml-2 text-gray-400 hover:text-white">
                                                        <HiXMark className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                {searchSuggestions.length > 0 && isSearchInputFocused && (
                                                    <ul ref={searchSuggestionsRef} className="absolute left-0 right-0 bg-gray-800 text-white rounded-md shadow-md mt-1 z-10 max-h-48 overflow-y-auto">
                                                        {searchSuggestions
                                                            .filter(suggestion => (suggestion.title || suggestion.name)?.toLowerCase().includes(searchTerm.toLowerCase()))
                                                            .map((suggestion, index) => (
                                                                <li
                                                                    key={index}
                                                                    className="px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm"
                                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                                >
                                                                    {suggestion.title || suggestion.name}
                                                                </li>
                                                            ))}
                                                    </ul>
                                                )}
                                                {loading && searchTerm.length > 0 && (
                                                    <div className="absolute left-0 right-0 top-full mt-1 bg-gray-800 text-white rounded-md p-2 text-sm text-center">
                                                        Loading suggestions...
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to={item.path} className="cursor-pointer hover:scale-110 transition-transform duration-200">
                                    <HeaderItem Icon={item.icon} />
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md shadow-md px-4 py-2">
                <div className="flex items-center justify-between">
                    <div onClick={() => handleNavigation("/")} className="cursor-pointer flex items-center gap-1">
                        <img className="w-[60px] h-auto object-contain" src={logo} alt="Logo" />
                        <span className="text-cyan-400 text-xs font-semibold">EnjOy</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {defaultMenu.map((item, index) => (
                            <div key={index} className="relative group">
                                {item.name === 'genre' ? (
                                    <div onClick={item.onClick} className="cursor-pointer">
                                        <HeaderItem Icon={item.icon} />
                                        {showGenreDropdown && (
                                            <div ref={genreDropdownRef} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-gray-900/90 backdrop-blur-lg text-white shadow-2xl z-50 w-72 py-6 px-4 rounded-xl animate-fadeIn">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <GenreList onGenreClick={handleGenreClick} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : item.name === 'search' ? (
                                    <div onClick={item.onClick} className="cursor-pointer relative">
                                        <HeaderItem Icon={item.icon} />
                                        {showSearchInput && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-gray-900/90 backdrop-blur-lg text-white shadow-2xl z-50 p-4 w-72 rounded-xl animate-fadeIn">
                                                <form onSubmit={handleSearchSubmit} className="relative">
                                                    <div className="flex items-center">
                                                        <input
                                                            ref={searchInputRef}
                                                            type="text"
                                                            placeholder="Search..."
                                                            className="bg-gray-800 text-white p-2 rounded-l-md w-full focus:outline-none text-sm"
                                                            value={searchTerm}
                                                            onChange={handleSearchInputChange}
                                                            onFocus={handleSearchInputFocus}
                                                            onBlur={handleSearchInputBlur}
                                                        />
                                                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-r-md text-sm">
                                                            Go
                                                        </button>
                                                        <button type="button" onClick={() => setShowSearchInput(false)} className="ml-2 text-gray-400 hover:text-white">
                                                            <HiXMark className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                    {searchSuggestions.length > 0 && isSearchInputFocused && (
                                                        <ul ref={searchSuggestionsRef} className="absolute left-0 right-0 bg-gray-800 text-white rounded-md shadow-md mt-1 z-10 max-h-48 overflow-y-auto">
                                                            {searchSuggestions
                                                                .filter(suggestion => (suggestion.title || suggestion.name)?.toLowerCase().includes(searchTerm.toLowerCase()))
                                                                .map((suggestion, index) => (
                                                                    <li
                                                                        key={index}
                                                                        className="px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm"
                                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                                    >
                                                                        {suggestion.title || suggestion.name}
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    )}
                                                    {loading && searchTerm.length > 0 && (
                                                        <div className="absolute left-0 right-0 top-full mt-1 bg-gray-800 text-white rounded-md p-2 text-sm text-center">
                                                            Loading suggestions...
                                                        </div>
                                                    )}
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link to={item.path} className="cursor-pointer">
                                        <HeaderItem Icon={item.icon} />
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

// Debounce function
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

export default Header;