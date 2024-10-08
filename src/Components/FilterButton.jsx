import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../utils/filterSlice';

function FilterButton() {
  const dispatch = useDispatch();
  const [activeFilters, setActiveFilters] = useState({
    rating: false,
    price: null,
  });

  const handleRatingFilter = () => {
    const newRatingState = !activeFilters.rating;
    setActiveFilters((prev) => ({ ...prev, rating: newRatingState }));

    if (newRatingState) {
      dispatch(setFilterValue({ type: 'rating', value: 4.0 }));
    } else {
      dispatch(setFilterValue({ type: 'rating', value: null }));
    }
  };

  const handlePriceFilter = (range) => {
    const newPriceState = activeFilters.price === range ? null : range;
    setActiveFilters((prev) => ({ ...prev, price: newPriceState }));

    if (newPriceState) {
      dispatch(setFilterValue({ type: 'price', value: newPriceState }));
    } else {
      dispatch(setFilterValue({ type: 'price', value: null }));
    }
  };

  return (
    <div className='flex gap-2'>
      <button 
        className={`w-[105px] h-[36px] border rounded-[18px] text-[14px] leading-[18px] tracking-[-0.3px] font-normal px-[13px] ${
          activeFilters.rating ? 'bg-[#3E4152] text-white' : 'bg-white text-black'
        }`} 
        onClick={handleRatingFilter}
      >
        Rating 4.0+
      </button>

      <button 
        className={`w-[122px] h-[36px] border rounded-[18px] text-[14px] leading-[18px] tracking-[-0.3px] font-normal px-[13px] ${
          activeFilters.price === '300-600' ? 'bg-[#3E4152] text-white' : 'bg-white text-black'
        }`} 
        onClick={() => handlePriceFilter('300-600')}
      >
        Rs. 300-Rs. 600
      </button>

      <button 
        className={`w-[132px] h-[36px] border rounded-[18px] text-[14px] leading-[18px] tracking-[-0.3px] font-normal px-[13px] ${
          activeFilters.price === 'less-300' ? 'bg-[#3E4152] text-white' : 'bg-white text-black'
        }`} 
        onClick={() => handlePriceFilter('less-300')}
      >
        Less than Rs. 300
      </button>
    </div>
  );
}

export default FilterButton;
