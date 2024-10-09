import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CDN_URL } from '../utils/constants';
import { addItem, removeItem } from '../utils/cartSlice';
import { FaPlus, FaMinus } from "react-icons/fa";

function ItemCards({ items }) {
  const dispatch = useDispatch();

  // Initialize state for item counts
  const [itemCounts, setItemCounts] = useState({});

  // Load item counts from localStorage when the component mounts
  useEffect(() => {
    const storedItemCounts = JSON.parse(localStorage.getItem('cartItemCounts')) || {};
    setItemCounts(storedItemCounts);
  }, []);

  // Function to update localStorage and state when items are added or removed
  const updateItemCounts = (itemId, count) => {
    const updatedCounts = {
      ...itemCounts,
      [itemId]: count,
    };
    setItemCounts(updatedCounts);
    localStorage.setItem('cartItemCounts', JSON.stringify(updatedCounts));
  };

  const handleAddItem = (item) => {
    const currentCount = itemCounts[item.card.info.id] || 0;
    const newCount = currentCount + 1;
    updateItemCounts(item.card.info.id, newCount);
    dispatch(addItem(item)); // Add item to cart using Redux
  };

  const handleDecrement = (item) => {
    const currentCount = itemCounts[item.card.info.id] || 0;
    if (currentCount > 0) {
      const newCount = currentCount - 1;
      updateItemCounts(item.card.info.id, newCount);
      dispatch(removeItem(item)); // Remove item from cart using Redux
    }
  };

  return (
    <div className="">
      {items.map((item) => (
        <div key={item.card.info.id} className="text-left py-4 pb-10 border-b-2 border-neutral-200 flex justify-between">
          <div className="px-4 mt-2">
            <div className="text-lg font-bold">{item.card.info.name}</div>
            <div className="mb-2">
              <span className="font-normal text-[14px] leading-[19px] tracking-[-0.3px]">
                ₹{item.card.info.price / 100 || item.card.info.defaultPrice / 100}
              </span>
            </div>
            <div className='w-[160px] xl:w-[555px]'>
              <p className="font-light text-[16px] leading-[19px] tracking-[-0.3px] truncate">
                {item.card.info.description}
              </p>
            </div>
          </div>

          <div className="relative flex-shrink-0">
            <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 mb-2">
              {itemCounts[item.card.info.id] ? (
                <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                  <button
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-l-lg"
                    onClick={() => handleDecrement(item)}
                  >
                    <FaMinus color="green" size={12} />
                  </button>
                  <span className="w-12 h-8 flex items-center justify-center font-extrabold text-green-700">
                    {itemCounts[item.card.info.id]}
                  </span>
                  <button
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-r-lg"
                    onClick={() => handleAddItem(item)}
                  >
                    <FaPlus color="green" size={12} />
                  </button>
                </div>
              ) : (
                <button
                  className="shadow-lg text-green-700 flex  w-[100px] h-[30px] md:w-[120px] md:h-[38px] text-center justify-center font-extrabold text-base items-center rounded-lg border bg-white"
                  onClick={() => handleAddItem(item)}
                >
                  ADD
                </button>
              )}
            </div>
            <img
              src={CDN_URL + item.card.info.imageId}
              className="w-[115px] h-[105px] lg:w-[156px] lg:h-[144px] object-cover rounded-lg"
              alt={item.card.info.name}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemCards;
