import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/whishlistSlice";
import productSlice from "./slices/productSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        whishlist: wishlistSlice,
        product:productSlice
    },
});

export default store;
