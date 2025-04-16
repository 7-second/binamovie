import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from "../assets/logo/logo.png";
import { HiHome, HiPlus } from 'react-icons/hi';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import HeaderItem from './HeaderItem';
import GlobalApi from '../Services/GlobalApi';
import { FaTv } from 'react-icons/fa';
import { RiMovie2Fill } from 'react-icons/ri';
import GenreList from '../constant/GenreList';
import { BsCollectionPlay } from 'react-icons/bs';

function Header() {
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    const genreDropdownRef = useRef(null);  // Create ref for genre dropdown
    const [menu, setMenu] = useState([
        { name: "Home", icon: HiHome, path: "/" },
        { name: "search", icon: HiMagnifyingGlass, onClick: () => setShowSearchInput(true) },
        { name: "genre", icon: BsCollectionPlay, onClick: () => setShowGenreDropdown(!showGenreDropdown) },
        { name: "Movie", icon: RiMovie2Fill, path: "/movie/popular/page/1" },
        { name: "Tv-Show", icon: FaTv, path: "/tv/popular/page/1" },
        { name: "watch list", icon: HiPlus, path: "/watchlist" },
    ]);
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [showGenreDropdown, setShowGenreDropdown] = useState(false);

    // Close genre dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (genreDropdownRef.current && !genreDropdownRef.current.contains(event.target)) {
                setShowGenreDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNavigation = (path) => {
        if (path) {
            navigate(path);
            setShowSearchInput(false);
            setShowGenreDropdown(false);
        }
    };

    return (
        <>
            {/* Desktop Header */}
            <div className="hidden z-20 bg-black/30 md:flex gap-3 items-center w-full h-[50px] justify-between">
                <div onClick={() => handleNavigation("/")} className="cursor-pointer">
                    <img className='w-[80px] h-[50px] object-contain' src={logo} alt="Logo" />
                    <span className='text-blue-500 absolute top-8 px-4 text-sm'>EnjOy</span>
                </div>

                <div className="gap-5 items-center flex px-6 relative w-full">
                    {menu.map((item, index) => (
                        <div key={index} className="relative">
                            {item.path ? (
                                <Link to={item.path} className="cursor-pointer">
                                    <HeaderItem name={item.name === 'search' && showSearchInput ? '' : item.name} Icon={item.icon} />
                                </Link>
                            ) : (
                                <div onClick={item.onClick} className="cursor-pointer relative">
                                    <HeaderItem name={item.name === 'search' && showSearchInput ? '' : item.name} Icon={item.icon} />
                                    {item.name === 'genre' && showGenreDropdown && (
                                        <div ref={genreDropdownRef} className="absolute top-full left-0 bg-gray-900 text-white shadow-2xl z-50 w-screen py-6 px-10">
                                            <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                                <GenreList onGenreClick={() => setShowGenreDropdown(false)} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Header */}
            <div className="w-full z-20 bg-black/30 md:hidden">
                <div className="flex items-center justify-between px-3 py-2">
                    <div onClick={() => handleNavigation("/")} className="cursor-pointer">
                        <img className='w-[80px] h-[50px] object-contain' src={logo} alt="Logo" />
                        <span className='text-blue-500 absolute top-6 px-3 text-[9px]'>EnjOy</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        {menu.map((item, index) => (
                            <div key={index} className="relative">
                                {item.path ? (
                                    <Link to={item.path} className="cursor-pointer">
                                        <HeaderItem name={item.name === 'search' && showSearchInput ? '' : ""} Icon={item.icon} />
                                    </Link>
                                ) : (
                                    <div onClick={item.onClick} className="cursor-pointer relative">
                                        <HeaderItem name={item.name === 'search' && showSearchInput ? '' : ""} Icon={item.icon} />
                                        {item.name === 'genre' && showGenreDropdown && (
                                            <div ref={genreDropdownRef} className="absolute top-full left-1/2 -translate-x-1/2 bg-gray-900 text-white shadow-2xl z-50 w-screen py-6 px-10">
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                    <GenreList onGenreClick={() => setShowGenreDropdown(false)} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
