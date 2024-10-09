import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoHelpBuoyOutline, IoBagSharp, IoSearchOutline } from 'react-icons/io5';
import { BsCart } from 'react-icons/bs';
import { BiSolidOffer } from 'react-icons/bi';
import { FaRegUser, FaAngleDown } from 'react-icons/fa6';
import { useCoordinates } from '../utils/CoordinatesContext';
import SlidingMenu from './SlidingMenu';
import SignInSlide from './SignInSlide';
import { removeUserData } from '../utils/authSlice';

function Nav() {
  const dispatch = useDispatch();
  const { setCoordinates } = useCoordinates();
  const [btnName, setBtnName] = useState("Sign In");
  const [showMenu, setShowMenu] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [formatedAddress, setFormatedAddress] = useState([]);
  const cartItems = useSelector((store) => store.cart.items);

  const userData = useSelector((state) => state.authSlice.userData);

  useEffect(() => {
    if (userData) {
      setBtnName("Sign Out");
    } else {
      setBtnName("Sign In");
    }
  }, [userData]);

  const menuItems = [
    { icon: <IoBagSharp size={20} />, label: 'Swiggy Corporate', link: '/corporate' },
    { icon: <IoSearchOutline size={20} />, label: 'Search', link: '/search' },
    { icon: <BiSolidOffer size={20} />, label: 'Offers', link: '/offer' },
    { icon: <IoHelpBuoyOutline size={20} />, label: 'Help', link: '/help' },
    { icon: <BsCart size={20} />, label: `Cart (${cartItems.length})`, link: '/cart' },
  ];

  
  async function searchCity(val) {
    if (val === "") return;
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/misc/place-autocomplete?input=${val}&types=`);
    const data = await res.json();
    setSearchResult(data.data);
  }

  async function fetchLatAndLng(id) {
    if (id === "") return;
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/misc/address-recommend?place_id=${id}`);
    const data = await res.json();
    const lat = data.data[0].geometry.location.lat;
    const lng = data.data[0].geometry.location.lng;

    setFormatedAddress(data?.data[0]?.formatted_address);
    setCoordinates({ lat, lng });
  }

  const handleAuthButtonClick = () => {
    if (userData) {
      dispatch(removeUserData());
    } else {
      setShowSignIn(true);
    }
  };

  return (
    <div className='relative w-full  '>
      <div className='sticky top-0 bg-white z-50 flex justify-between shadow-md h-[80px] items-center px-4  py-2 w-full'>
        <div className='flex items-center gap-4 md:gap-10'>
          <Link to="/"><img src='./images/swiggylogo.png' alt='logo' className='w-[35px] h-[50px]' /></Link>
          
          {/* Always visible "Other" section */}
          <h2 
            className='text-[15px] font-medium flex items-center gap-1 cursor-pointer'
            onClick={() => setShowMenu(true)}
          >
            <div className='underline pr-2'>Other</div>
            <h3 className='font-[300] text-[14px] leading-[19px] tracking-[-0.3px] truncate max-w-[180px]'>{formatedAddress}</h3>
            <FaAngleDown />
          </h2>
        </div>

        {/* Menu for large screens */}
        {/* Menu for large screens, showing icons only on width < 1000px */}
<ul className='hidden lg:flex gap-14 text-sm'>
  {menuItems.map((item, index) => (
    <li key={index} className='flex items-center'>
      <Link to={item.link} className='text-[15px] flex items-center font-medium'>
        {item.icon}
        {/* Hide label on large screens below 1000px */}
        <span className='hidden xl:inline ml-2'>{item.label}</span>
      </Link>
    </li>
  ))}
  <li className='flex items-center'>
    <FaRegUser size={20} />
    {/* Hide Sign In/Sign Out label on large screens below 1000px */}
    <button className='text-[15px] font-medium hidden xl:inline ml-2' onClick={handleAuthButtonClick}>
      {btnName}
    </button>
  </li>
</ul>

{/* Display only icons and Sign In on small/medium screens */}
<ul className='flex md:hidden gap-4 text-sm'>
  {menuItems.map((item, index) => (
    <li key={index} className='flex items-center'>
      <Link to={item.link} className='text-[15px]'>
        {item.icon}
      </Link>
    </li>
  ))}
  <li className='flex items-center'>
    <button className='text-[15px] font-medium flex items-center gap-1' onClick={handleAuthButtonClick}>
      <FaRegUser size={20} />
    </button>
  </li>
</ul>

      </div>

      {/* Sliding Menu */}
      <SlidingMenu 
        showMenu={showMenu} 
        onClose={() => setShowMenu(false)}
        searchResult={searchResult}
        searchCity={searchCity}
        fetchLatAndLng={fetchLatAndLng}
      />

      {/* Sign In Slide */}
      <SignInSlide 
        showSignIn={showSignIn} 
        onClose={() => setShowSignIn(false)} 
      />

      {/* Overlay */}
      {showMenu && (
        <div 
          className='fixed inset-0 bg-black opacity-50 z-[45]' 
          onClick={() => setShowMenu(false)} 
        />
      )}
    </div>
  );
}

export default Nav;
