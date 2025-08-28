import api from "../utils/axios";

// Users
export const registerUser = (data) => api.post("/user/register", data);
export const loginUser = (data) => api.post("/user/login", data);
export const getUserProfile = () => api.get("/user/profile");
export const updateUserProfile = (data) => api.put("/user/profile", data);

export const forgotPassword = (data) => api.post("/user/forgot-password", data);
export const resetPassword = (data) => api.post("/user/reset-password", data);

// Products
export const addProduct = (data) => api.post("/product", data);
export const getProducts = (params) => api.get("/product", { params });
export const getProductById = (id) => api.get(`/product/${id}`);
export const updateProduct = (id, data) => api.put(`/product/${id}`, data);
export const deleteProduct = (id) => api.delete(`/product/${id}`);

// Categories
export const addCategory = (data) => api.post("/category", data);
export const getCategories = () => api.get("/category");
export const getCategoryById = (id) => api.get(`/category/${id}`);
export const updateCategory = (id, data) => api.put(`/category/${id}`, data);
export const deleteCategory = (id) => api.delete(`/category/${id}`);

// Shop By Room
export const addShopRoom = (data) => api.post("/shopRoom", data);
export const getShopRooms = () => api.get("/shopRoom");
export const getShopRoomById = (id) => api.get(`/shopRoom/${id}`);
export const updateShopRoom = (id, data) => api.put(`/shopRoom/${id}`, data);
export const deleteShopRoom = (id) => api.delete(`/shopRoom/${id}`);

// Brand
export const addBrand = (data) => api.post("/brand", data);
export const getBrands = () => api.get("/brand");
export const getBrandById = (id) => api.get(`/brand/${id}`);
export const updateBrand = (id, data) => api.put(`/brand/${id}`, data);
export const deleteBrand = (id) => api.delete(`/brand/${id}`);

// Pattern Type
export const addPatternType = (data) => api.post("/pattern-type", data);
export const getPatternTypes = () => api.get("/pattern-type");
export const getPatternTypeById = (id) => api.get(`/pattern-type/${id}`);
export const updatePatternType = (id, data) => api.put(`/pattern-type/${id}`, data);
export const deletePatternType = (id) => api.delete(`/pattern-type/${id}`);

// Cart
export const addCart = (data) => api.post("/cart", data);
export const getCart = (userId, params) => api.get(`/cart/${userId}`, { params });
export const updateCart = (userId, items) => api.put(`/cart/${userId}`, { items });
export const deleteCart = (userId) => api.delete(`/cart/${userId}`);

// Wishlist
export const getWishlist = (userId) => api.get(`/whishlist/${userId}`);
export const addToWishlist = (data) => api.post("/whishlist", data);
export const removeFromWishlist = (data) => api.delete("/whishlist", { data });
export const clearWishlist = (userId) => api.delete(`/whishlist/${userId}`);