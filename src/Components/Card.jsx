import React from 'react'
import { MdStars } from "react-icons/md";

import {CDN_URL} from '../utils/constants'

const Card = (props) => {
    const {resData} =props;
    

    const{
      name,
      cuisines,
      avgRating,
      aggregatedDiscountInfoV3,
    }= resData?.info || {};
    

  
    return (
      <div className="m-2 p-2  max-w-[278px]  ">
        <div className="relative">
         
          <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-b from-transparent to-stone-900"></div>
            <div className="absolute bottom-0 left-0 flex gap-1 p-2 z-20">
              <h2 className="text-white font-[800] text-[18px] font-sans leading-[18px] tracking-[-0.5px]">
                {aggregatedDiscountInfoV3?.header}
              </h2>
              <h2 className="text-white font-[800] text-[18px] font-sans leading-[18px] tracking-[-0.5px]">
                {aggregatedDiscountInfoV3?.subHeader}
              </h2>
            </div>
          </div>
    
          
          <img
            src={CDN_URL + resData.info.cloudinaryImageId}
            alt="food"
            className="rounded-2xl  h-[147px] w-[220px] object-cover"
          />
        </div>
    
        
        <div className="p-2">
          <div className=' w-[200px]'>
          <h3 className="font-[700] text-[16px] md:text-[17px] font-sans leading-6 tracking-[-0.3px] truncate ">
            {name}
          </h3>
          </div>
    
          <div className="flex gap-2">
            <div className='flex gap-1 items-center'>
            <MdStars color='green' size={18} /> 
            <h4 className="font-[500] text-[14px] md:text-[15px] leading-[19px] tracking-[-0.3px]">
            {avgRating} 
            </h4>
            </div>
            <h4 className="font-[500] text-[15px] leading-[19px] tracking-[-0.3px]">
              {resData.info.sla.deliveryTime} minutes
            </h4>
          </div>
          
          <div className='w-[200px]'>
          <h4 className="font-[300] text-[16px] leading-[19px] tracking-[-0.3px] truncate">
            {cuisines.join(", ")}
          </h4>
          </div>
        </div>
      </div>
    );
  };
  



  

export default Card