import React, { useState } from 'react';
import logo from "../assets/logo/logo.png";
import { HiDotsVertical, HiHome, HiPlus, HiStar } from 'react-icons/hi';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import HeaderItem from './HeaderItem'; // Corrected import name

function Header() {
  const menu = [
    {
      name: "Home",
      icon: HiHome,
    },
    {
      name: "search",
      icon: HiMagnifyingGlass,
    },
    {
      name: "watch list",
      icon: HiPlus,
    },
    {
      name: "original",
      icon: HiStar,
    },
    {
      name: "original",
      icon: HiStar,
    },
    {
        name: "original",
        icon: HiStar,
      },
  ];


  const[togle,setTogle]=useState(false)
  return (
    <>
    {/* larg screen */}
      <div className="hidden absolute z-20 bg-black/30 md:flex gap-3 items-center w-full h-[50px] justify-between  ">
        {/* Header Logo */}
        <div className="">
          <img
            className='w-[80px] h-[50px] object-contain cursor-pointer '
            src={logo} alt="" />
            <span className='text-blue-500 absolute top-8 px-4 text-sm'>𝓔𝓷𝓳𝓸𝔂</span>
        </div>

        <div className="gap-5 items-center flex px-6"> 
          {menu.map((item, index) => (
            <HeaderItem key={index} name={item.name} Icon={item.icon} />
          ))}
        </div>
      </div>

      {/* small screen */}
      <div className="w-full absolute z-20 bg-black/30 md:hidden  flex gap-10 items-center">
        <div className="">
          <img
            className='w-[80px] h-[50px] object-contain cursor-pointer '
            src={logo} alt="" />
            <span className='text-blue-500 absolute top-6 px-3 text-[9px]'>𝓔𝓷𝓳𝓸𝔂</span>

        </div>

        <div className="flex gap-6 items-center  w-full" onClick={()=>setTogle(!togle)}> 
          {menu.map((item, index) =>index<4 && (
            <HeaderItem key={index} name={""} Icon={item.icon} />
          ))}
          <div className="md:hidden">
            <HeaderItem  name={""} Icon={HiDotsVertical }  />
           {togle ? 
           <div className="absolute mt-2 bg-gray-400 rounded-lg px-4 mr-[10px] text-black pb-4" >
        {menu.map((item, index) =>index>3&& (
            <HeaderItem key={index} name={item.name} Icon={item.icon} /> 
          ))}


        </div>
        : null}
           </div>
        </div>
    
      </div>
    </>
  );
}

export default Header;