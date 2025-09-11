import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import activeItemSlice from "./slices/activeItemSlice";

const store = configureStore({
    reducer: {
        product: productSlice,
        activeItem: activeItemSlice,
    },
});

export default store;
