import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import whishlist from "./slices/whishlistSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        whishlist: whishlist,
    },
});

export default store;
