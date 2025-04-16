

function HeaderItem({ name, Icon }) {
  return (
    <>
      <div className=" text-white flex items-center gap-1 text-[18px] font-semibold cursor-pointer hover:text-[#f9f9f9]  transition-all duration-200 ease-in-out">
        {Icon && <Icon />} 
        <h2 className=" md:flex   transition-all duration-200 ease-in-out hover:underline underline-offset-8">{name}</h2>
      </div>
    </>
  );
}

export default HeaderItem;
