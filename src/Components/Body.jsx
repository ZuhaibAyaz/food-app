import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import useOnlineStatus from '../utils/useOnlineStatus';
import TopResChain from './TopResChain';
import TopCategory from './TopCategory';
import Shimmer from './Shimmer';
import { useCoordinates } from '../utils/CoordinatesContext';
import FilterButton from './FilterButton';
import { useSelector } from 'react-redux';

function Body() {
  const { coordinates } = useCoordinates();
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [newList, setNewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onYourMind, setOnYourMind] = useState([]);
  const [headTitle, setHeadTitle] = useState(' Restaurants with online food delivery');

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      fetchData(coordinates.lat, coordinates.lng);
    }
  }, [coordinates]);

  const fetchData = async (lat, lng) => {
    try {
      const data = await fetch(
        `https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );
       
      const json = await data.json();

      let mainData = json?.data?.cards.find(
        (data) => data?.card?.card?.id == "restaurant_grid_listing"
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      let secondaryData = json?.data?.cards.find(
        (data) => data?.card?.card?.id == "top_brands_for_you"
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      let categories = json?.data?.cards.find(
        (data) => data?.card?.card?.id == "whats_on_your_mind"
      )?.card?.card?.gridElements?.infoWithStyle?.info || [];
      
      setOnYourMind( categories ); // Ensure we are setting an array

      setListOfRestaurants(secondaryData.length > 0 ? secondaryData : mainData);
      setNewList(secondaryData.length > 0 ? secondaryData : mainData);

      console.log(json);

      setHeadTitle(json?.data?.cards[2]?.card?.card?.title);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return <h1>Looks like you are offline, Check your Internet Connection.</h1>;
  }

  const filterVal = useSelector((state) => state.filterSlice.filterVal);

  // Helper function to extract numerical value from costForTwo string
  const getPriceValue = (priceString) => {
    // Extract number using regular expression and convert to integer
    const priceMatch = priceString.match(/\d+/);
    return priceMatch ? parseInt(priceMatch[0], 10) : 0;
  };

  // Filter restaurants based on selected filter type
  const filteredData = filterVal 
    ? newList.filter((restaurant) => {
        if (filterVal.type === 'rating') {
          return restaurant.info.avgRating >= filterVal.value;
        } else if (filterVal.type === 'price') {
          const price = getPriceValue(restaurant.info.costForTwo);
          if (filterVal.value === '300-600') {
            return price >= 300 && price <= 600;
          } else if (filterVal.value === 'less-300') {
            return price < 300;
          }
        }
        return true;
      })
    : newList;

  if (loading) return <Shimmer />;

  return (
    <div className=' w-full md:min-w-[460px] xl:max-w-[1010px] mx-auto overflow-x-hidden'>

{onYourMind.length ? (
  <>
    <TopCategory />
    <div className='border-b-2'></div>
    <TopResChain />
    <div className='border-b-2'></div>
  </>
) : ""}

      

      {/* Restaurants Grid Section */}
      <div className='py-8 '>
        <h1 className='text-[22.5px] font-bold leading-[28px] tracking-[-0.4px] pl-4 '>
          {headTitle}
        </h1>

        <div className='pt-4 pl-2 md:pl-4'>
          <FilterButton />
        </div>

        <div className=' mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 justify-items-center'>
          {filteredData.length > 0 ? (
            filteredData.map((restaurant) => (
              <Link
                className="hover:scale-95 transform ease-in-out"
                key={restaurant.info.id}
                to={"restaurant/" + restaurant.info.id}
              >
                <Card resData={restaurant} />
              </Link>
            ))
          ) : (
            <p>No restaurants found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Body;
