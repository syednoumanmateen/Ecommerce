import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    addWishlist(state, action) {
      const item = action.payload;
      const existingItem = state.items.find(i => i._id === item);
      if (existingItem) return
      state.items.push(item);
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    updateQuantity(state, action) {
      const { _id, quantity } = action.payload;
      const item = state.items.find(i => i._id === _id);
      if (item) item.quantity = quantity;
    },
    clearWishlist(state) {
      state.items = [];
    },
    setWishlist(state, action) {
      state.items = action.payload;
    },
  },
});

export const {
  setUserId,
  addWishlist,
  removeFromWishlist,
  updateQuantity,
  clearWishlist,
  setWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
