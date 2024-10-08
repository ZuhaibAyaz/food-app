import React from 'react'
import { CDN_URL } from '../utils/constants';
import { MdStars } from "react-icons/md";


function RestaurantSearch(props) {

const {restaurant} = props

 const {
  avgRatingString,
  costForTwoMessage,
  name,
  sla,
  cuisines,
  cloudinaryImageId
 } = restaurant?.card?.card?.info || {};



  return (
    <div className=' w-[335px]  md:w-[360px]  xl:w-[400px] h-[150px]  flex items-center gap-4 shadow-lg'>
     
   
      <div className='w-[105px] pl-[16px]'>
        <img src={CDN_URL + cloudinaryImageId}  className='w-[88px] h-[96px] rounded-md '/>
      </div>
      <div>
     
    <h3 className='font-semibold text-[16px] leading-[18px] text-[#3E4152]'>{name}</h3>
    <div className='flex gap-2 py-1'>
      <div className='flex gap-1 items-center'>
    <MdStars color='696B79' size={15} />
    <p className='font-medium text-[12px] leading-[16px] text-[#696B79]' >{avgRatingString}</p>
    </div>
    <p className='font-medium text-[12px] leading-[16px] text-[#696B79] '>{sla?.slaString}</p>
    <p className='font-medium text-[12px] leading-[16px] text-[#696B79]'>{costForTwoMessage}</p>
    </div>
    <div className='w-[200px]'>
    <p className='font-light text-[13px] leading-[16px] text-[#93959F] truncate'>{cuisines.join(", ")}</p>
    </div>
    </div>
    </div>

   
  )
}

export default RestaurantSearch
