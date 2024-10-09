import React from 'react'
import Card from './Card'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";
import Shimmer2 from './Shimmer2';
import { useCoordinates } from '../utils/CoordinatesContext'; // Import useCoordinates



function TopResChain() {
  const [topRes, setTopRes] = useState([]);
  const [resIndex, setResIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [headerTitle, setHeaderTitle] = useState('Top Restaurants'); // Default title
  const { coordinates } = useCoordinates();
  const maxItems = 4;

  // Fetch data when the component mounts
  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${coordinates.lat}&lng=${coordinates.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
          );
          const json = await response.json();
          
          setHeaderTitle(json?.data?.cards[1]?.card?.card?.header?.title || 'Top Restaurants');
          setTopRes(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [coordinates]);

  const forward = () => {
    if (resIndex + maxItems < topRes.length) {
      setResIndex(resIndex + 1);
    }
  };

  const backward = () => {
    if (resIndex > 0) {
      setResIndex(resIndex - 1);
    }
  };

  // Defensive check: Ensure topRes is an array
  const visibleRes = Array.isArray(topRes) ? topRes.slice(resIndex, resIndex + maxItems) : [];

  if (loading) return <Shimmer2 />;

  return (
    <div className='py-10 '>
      <div className='flex justify-between items-center'>
        <div>
        <h1 className='text-[22.5px] font-bold leading-[28px] tracking-[-0.4px] pl-4'>
          {headerTitle}
        </h1>
        </div>
        <div>
          <button className='p-2 m-2' onClick={backward}>
            <FaCircleArrowLeft size={20} color='#454545' />
          </button>
          <button className='p-2 m-2' onClick={forward}>
            <FaCircleArrowRight size={20} color='#454545' />
          </button>
        </div>
      </div>

      <div className='flex  overflow-hidden scroll-smooth'>
        {visibleRes.map((cat) => (
          <Link className="" key={cat.info.id} to={"restaurant/" + cat.info.id}>
            <Card resData={cat} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopResChain;