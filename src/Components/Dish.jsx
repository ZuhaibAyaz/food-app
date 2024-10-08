import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { CDN_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';

function Dish(props) {
  const dispatch = useDispatch();
  
  // Add dish to cart
  const handleAddItem = (dish) => {
    // Normalizing the dishData to match the structure expected by the cart slice
    const normalizedDish = {
      card: {
        info: {
          id: dish.id,  // Ensure this matches the expected ID field
          name: dish.name,
          price: dish.price,
          imageId: dish.imageId,
          // Add any other fields that the cart slice expects
        }
      }
    };
  
    dispatch(addItem(normalizedDish));
  };

  const { dishData } = props;

  const {
    name,
    price,
    imageId
  } = dishData?.card?.card?.info || {};

  const {
    avgRatingString,
    sla,
  } = dishData?.card?.card?.restaurant?.info || {};

  return (
    <div className=' xl:w-[410px]  h-[225px] md:h-[270px] shadow-lg rounded-3xl bg-white'>
      <div className='m-5'>
        <div className='flex justify-between items-center pt-[22px]'>
          <div>
            <p className='font-semibold text-[13px] leading-[18px] text-[#686B78]'>
              By {dishData?.card?.card?.restaurant?.info?.name}
            </p>

            <div className='flex gap-2 py-1'>
              <p className='font-light text-[12px] text-[#7E808C]'>{avgRatingString}</p>
              <p className='font-light text-[12px] text-[#7E808C]'>{sla?.slaString}</p>
            </div>
          </div>
          <div>
            <FaArrowRight />
          </div>
        </div>

        <div className='text-[#7E808C] w-full bg-gray-400 h-[1px] my-1'></div>

        <div className='flex justify-between py-2 gap-4'>
          <div className='pt-2 '>
            <p className='font-bold text-[15px] md:text-[17px] text-gray-800 max-w-[135px]'>{name}</p>
            <p className='font-medium text-[15px] text-[#020508] pt-1'>₹ {price / 100}</p>
          </div>

          <div className='relative flex-shrink-0'>
            <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 mb-2">
              <button
                className="shadow-lg text-green-700 w-[120px] h-[38px] font-extrabold text-base rounded-lg border bg-white"
                onClick={() => handleAddItem(dishData?.card?.card?.info)} // Passing dish info here
              >
                ADD
              </button>
            </div>

            <img
              src={CDN_URL + imageId}
              className="  w-[125px] h-[110px] md:w-[156px] md:h-[144px] object-cover rounded-lg shadow-md"
              alt="Dish Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dish;
