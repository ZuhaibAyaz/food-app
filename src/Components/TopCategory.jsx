import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopCarousel from './TopCarousel';
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";
import { useCoordinates } from '../utils/CoordinatesContext';
import Shimmer2 from './Shimmer2';

function TopCategory() {
  const [onYourMind, setOnYourMind] = useState([]); // Ensure this is always an array
  const [loading, setLoading] = useState(true);
  const { coordinates } = useCoordinates();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6); // default for xl and above

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      fetchData(coordinates.lat, coordinates.lng);
    }
  }, [coordinates]);

  const fetchData = async (lat, lng) => {
    try {
      const data = await fetch(
        `${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );
      const json = await data.json();      
      const categories = json?.data?.cards?.[0]?.card?.card?.gridElements?.infoWithStyle?.info || [];
      
      setOnYourMind(Array.isArray(categories) ? categories : []); // Ensure we are setting an array
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setOnYourMind([]); // Default to empty array if there's an error
    }
    setLoading(false);
  };

  // Update itemsPerPage based on screen size
  const updateItemsPerPage = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1280) {
      setItemsPerPage(6); // xl and above screens
    } else if (screenWidth >= 800) {
      setItemsPerPage(5); // lg screens
    } else {
      setItemsPerPage(3); // sm, md screens
    }
  };

  useEffect(() => {
    // Initial check
    updateItemsPerPage();

    // Update when window resizes
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  // Move forward in the carousel
  const nextSlide = () => {
    if (onYourMind.length > currentIndex + itemsPerPage) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  // Move backward in the carousel
  const prevSlide = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  // Get the visible items for the carousel (only slice if onYourMind is an array)
  const visibleItems = Array.isArray(onYourMind) ? onYourMind.slice(currentIndex, currentIndex + itemsPerPage) : [];
 
  if (loading) return <Shimmer2 />;
 
  return (
    <div className='py-10'>
      {/* Carousel Section */}
      <div className='flex justify-between items-center'>
        <h1 className='text-[22.5px] font-bold leading-[28px] tracking-[-0.4px] pl-4'>What's on your mind?</h1>
        <div>
          <button 
            onClick={prevSlide} 
            className='p-2 m-2' 
            disabled={currentIndex === 0}
          >
            <FaCircleArrowLeft size={20} color='#454545' />
          </button>
          <button 
            onClick={nextSlide} 
            className='p-2 m-2' 
            disabled={currentIndex + itemsPerPage >= onYourMind.length}
          >
            <FaCircleArrowRight size={20} color='#454545' />
          </button>
        </div>
      </div>

      {/* Carousel Items */}
      <div className='flex space-x-4 overflow-x-hidden'>
        {visibleItems.map((cat) => (
          <Link className="w-[150px] h-[185px]" key={cat.id}>
            <TopCarousel category={cat} />        
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopCategory;
