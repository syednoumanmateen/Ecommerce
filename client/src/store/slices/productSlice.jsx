import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: {
        category: null,
        brand: null,
        minPrice: null,
        maxPrice: null,
        patternType: null,
        shopRoom: null,
        rating: null
    },
    search: "",
    pagination: { page: 1, perPage: 10 },
    view: "list",
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.pagination.page = 1;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
            state.pagination.page = 1;
        },
        setPagination: (state, action) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
        setView: (state, action) => {
            state.view = action.payload;
        },
        clearFilter: (state) => {
            state.filters = { ...initialState.filters };
            state.search = initialState.search;
            state.pagination = { ...initialState.pagination };
            state.view = initialState.view;
        }
    },
});

export const { setFilters, setSearch, setPagination, clearFilter, setView } = productSlice.actions;

export default productSlice.reducer;
