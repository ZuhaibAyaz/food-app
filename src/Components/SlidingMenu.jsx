import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { GoLocation } from "react-icons/go";

function SlidingMenu({ showMenu, onClose, searchResult, searchCity, fetchLatAndLng }) {
  return (
    <div 
      className={`shadow-2xl fixed top-0 left-0 h-full w-[90%] md:w-[35%] bg-white transition-transform duration-500 ease-in-out z-[60] ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className='p-4'>
   
        <button 
          className='text-black font-bold text-lg' 
          onClick={onClose} 
        >
          <RxCross2 />
        </button>

        {/* Search Input */}
        <div className='pl-12'>
          <div className='w-full  py-5 mt-5'>       
            <input 
              type='text' 
              placeholder='Search for area, street name..'
              className='border focus:outline-none focus:shadow-lg w-full h-[50px] border-[#D4D5D9] pl-6 text-[16px]' 
              onChange={(e) => searchCity(e.target.value)}
            />
          </div> 

          {/* Search Results */}
          <div className='pl-5'>
            <ul>
              {searchResult.map((data) => (
                <div 
                  key={data.place_id} 
                  onClick={() => fetchLatAndLng(data.place_id)} 
                  className='cursor-pointer flex gap-5 w-[300px] mb-3'
                >
                  <div className='mt-[10px]'>
                    <GoLocation />
                  </div>
                  <div className='py-2'>
                    <li className='font-medium text-[15px] leading-[19px]'>
                      {data.structured_formatting.main_text}
                    </li>
                    <li className='text-[12px] leading-[17px] font-light text-[#93959f] pt-[5px]'>
                      {data.structured_formatting.secondary_text}
                    </li>
                    <p className='text-gray-400'>-----------------------------------------</p>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlidingMenu;
