import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    wishlistItems: []
};

const activeItemSlice = createSlice({
    name: "activeItem",
    initialState,
    reducers: {
        addCartItems: (state, action) => {
            const items = action.payload; 
            const newItems = items.filter(id => !state.cartItems.includes(id));
            state.cartItems.push(...newItems);
        },
        addCartItem: (state, action) => {
            const id = action.payload;
            if (!state.cartItems.includes(id)) {
                state.cartItems.push(id);
            }
        },
        clearCartItems: (state) => {
            state.cartItems = [];
        },
        removeCartItem: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(i => i !== id);
        },
        addWishlistItems: (state, action) => {
            const items = action.payload; 
            const newItems = items.filter(id => !state.wishlistItems.includes(id));
            state.wishlistItems.push(...newItems);
        },
        addWishlistItem: (state, action) => {
            const id = action.payload;
            if (!state.wishlistItems.includes(id)) {
                state.wishlistItems.push(id);
            }
        },
        clearWishlistItems: (state) => {
            state.wishlistItems = [];
        },
        removeWishlistItem: (state, action) => {
            const id = action.payload;
            state.wishlistItems = state.wishlistItems.filter(i => i !== id);
        }
    }
});

export const {
    addCartItems,
    addCartItem,
    clearCartItems,
    removeCartItem,
    addWishlistItems,
    addWishlistItem,
    clearWishlistItems,
    removeWishlistItem
} = activeItemSlice.actions;

export default activeItemSlice.reducer;
