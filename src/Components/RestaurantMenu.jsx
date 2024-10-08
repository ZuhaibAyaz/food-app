import React from 'react'
import ShimmerItemCard from './ShimmerItemCard';
import { useParams } from 'react-router-dom';
import { useState } from "react";
import useMenu from '../utils/useMenu';
import RestaurantCategory from './RestaurantCategory';
import { MdStars } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { MdOutlineDirectionsBike } from "react-icons/md";





function RestaurantMenu() {
    const[showIndex, setShowIndex] = useState(0);


const {resId} = useParams();
const resInfo = useMenu(resId);  


console.log(resInfo);

if (resInfo === null) return <ShimmerItemCard/> ; 

const {name, cuisines, avgRating,costForTwoMessage, sla, feeDetails, totalRatingsString} = resInfo?.cards[2]?.card?.card?.info;




let categories = resInfo?.cards.find((data)=> data?.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter( 
    (data) => data.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");



return (
    <div className='p-5  w-[85%]  xl:w-7/12 mx-auto'>
        <h2 className='text-left font-bold  my-4 text-2xl '>{name}</h2>

        <div className='border xl:w-[768px] h-[180px] rounded-2xl'>
            <div className='p-4'>
        <div className='flex gap-2 items-center'>
          <MdStars color='green' size={20} />
          <h2 className='font-bold text-[15px] leading-[19px] tracking-[-0.3px]'> {avgRating} ({totalRatingsString})</h2>
          <h2 className='font-bold text-[15px] leading-[19px] tracking-[-0.3px]'> {costForTwoMessage}</h2>
          </div>
          <h3 className='font-bold text-[14px] leading-[17px] tracking-[-0.1px] text-orange-600 underline py-2'>{cuisines.join(", ")}</h3>
           
           <div className='flex items-center gap-2 py-2'>
           <GiPathDistance size={20} color='#FF5200' />
            <h3 className='font-bold text-[14px] leading-[18px] tracking-[-0.3px] lowercase'>{sla.slaString}</h3>
           </div>
           <div className='py-2'>
           <hr />
           <div className='flex items-center py-2 gap-2'>
           <MdOutlineDirectionsBike /> 
            <h3 className='font-semibold text-gray-700 text-[13px] leading-[18px] tracking-[-0.3px]' >{sla.lastMileTravelString} | ₹{feeDetails.amount/100} Delivery fee will apply </h3>
           </div>
           <hr />
           </div>
          
          </div>
        </div>

        {categories.map((category,index)=>(
            <RestaurantCategory  key={category?.card?.card?.title} data={category?.card?.card} 
            showItems={index === showIndex ? true : false} 
            setShowIndex={()=> {setShowIndex(index)}} />
        ))}
      
    </div>
);

}

export default RestaurantMenu