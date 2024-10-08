import { createSlice } from '@reduxjs/toolkit';

const updateLocalStorage = (items) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
  const itemCounts = items.reduce((counts, item) => {
    counts[item.card.info.id] = (counts[item.card.info.id] || 0) + 1;
    return counts;
  }, {});
  localStorage.setItem('cartItemCounts', JSON.stringify(itemCounts));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      updateLocalStorage(state.items); // Sync with localStorage
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex(item => item.card.info.id === action.payload.card.info.id);
      if (index !== -1) {
        state.items.splice(index, 1);
        updateLocalStorage(state.items); // Sync with localStorage
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems'); // Clear localStorage
      localStorage.removeItem('cartItemCounts');
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, clearCart } = cartSlice.actions;
