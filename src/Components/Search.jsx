import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import Dish from './Dish';
import RestaurantSearch from './RestaurantSearch';
import { useCoordinates } from '../utils/CoordinatesContext';

function Search() {
  const [searchText, setSearchText] = useState("");
  const [dishes, setDishes] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const filterOptions = ["Restaurant", "Dishes"];
  const [activeBtn, setActiveBtn] = useState("Dishes");
  const { coordinates } = useCoordinates();


  function handleFilterBtn(filterName) {
    setActiveBtn(activeBtn === filterName ? "" : filterName);
  }

  async function fetchDishes(lat, lng) {
    let data = await fetch(`https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchText}&trackingId=undefined&submitAction=ENTER&queryUniqueId=15bfd2fb-973d-f6d2-63a5-a8bb76376913`);

    let res = await data.json();

    setDishes((res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(
      (data) => data?.card?.card?.info
    ));
  }

  async function fetchRestaurantData(lat, lng) {
    let data = await fetch(`https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchText}&trackingId=undefined&submitAction=ENTER&queryUniqueId=15bfd2fb-973d-f6d2-63a5-a8bb76376913&selectedPLTab=RESTAURANT`);

    let res = await data.json();
    
    setRestaurantData(res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT.cards);
  }


  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      if (searchText === "") {
        return;
      }
      fetchDishes(coordinates.lat, coordinates.lng);
      fetchRestaurantData(coordinates.lat, coordinates.lng);
    }
  }, [coordinates, searchText]);


  return (
    <div className='min-h-[80vh] max-w-[85%] xl:max-w-[65%] mx-auto pt-10 mt-4'>
      <div className='flex h-[48px] px-[16px] py-[12px] border'>
        <input
          type='text'
          placeholder='Search for restaurants and food'
          className='w-[830px] outline-none'
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button>
          <IoSearch color='gray' className='size-6' />
        </button>
      </div>

      <div className='py-4'>
        {filterOptions.map((filterName, i) => (
          <button
            key={i}
            onClick={() => handleFilterBtn(filterName)}
            className={`w-[105px] h-[36px] border rounded-[18px] text-[13px] leading-[17px] font-semibold px-[13px] ${
              activeBtn === filterName ? 'bg-[#3E4152] text-white' : 'bg-white text-black'
            }`}
          >
            <p>{filterName}</p>
          </button>
        ))}
      </div>

      <div className='grid grid-cols-1 w-[100%] py-4 xl:grid-cols-2 justify-items-center'>
        {
          activeBtn === "Dishes" ? (
            dishes.map((dish) => (
              <div className='mx-auto py-4' key={dish.card.card.info.id}>
                <Dish dishData={dish} />
              </div>
            ))
          ) : (
            restaurantData.map((resData) => (
              <div className='mx-auto py-4' key={resData.card.card.info.id}>
                <RestaurantSearch restaurant={resData} />
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}

export default Search;
