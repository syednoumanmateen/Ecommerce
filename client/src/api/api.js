import api from "../utils/axios";

// 🔓 Unauthenticated
export const registerUser = (data) => api.post("/user/register", data);
export const loginUser = (data) => api.post("/user/login", data);
export const forgotPassword = (data) => api.post("/user/forgot-password", data);
export const resetPassword = (data) => api.post("/user/reset-password", data);
export const verifyToken = (token) => api.post("/user/verify", { token });

// 🔐 Authenticated
export const getUserProfile = () => api.get("/user/profile", { auth: true });
export const updateUserProfile = (data) => api.put("/user/profile", data, { auth: true });

export const addProduct = (data) => api.post("/product", data, { auth: true });
export const getProducts = (data) => api.get("/product", { ...data, auth: true });
export const getProductById = (id) => api.get(`/product/${id}`, { auth: true });
export const updateProduct = (id, data) => api.put(`/product/${id}`, data, { auth: true });
export const deleteProduct = (id) => api.delete(`/product/${id}`, { auth: true });

export const addCategory = (data) => api.post("/category", data, { auth: true });
export const getCategories = () => api.get("/category", { auth: true });
export const getCategoryById = (id) => api.get(`/category/${id}`, { auth: true });
export const updateCategory = (id, data) => api.put(`/category/${id}`, data, { auth: true });
export const deleteCategory = (id) => api.delete(`/category/${id}`, { auth: true });

export const addShopRoom = (data) => api.post("/shop-room", data, { auth: true });
export const getShopRooms = () => api.get("/shop-room", { auth: true });
export const getShopRoomById = (id) => api.get(`/shop-room/${id}`, { auth: true });
export const updateShopRoom = (id, data) => api.put(`/shop-room/${id}`, data, { auth: true });
export const deleteShopRoom = (id) => api.delete(`/shop-room/${id}`, { auth: true });

export const addBrand = (data) => api.post("/brand", data, { auth: true });
export const getBrands = () => api.get("/brand", { auth: true });
export const getBrandById = (id) => api.get(`/brand/${id}`, { auth: true });
export const updateBrand = (id, data) => api.put(`/brand/${id}`, data, { auth: true });
export const deleteBrand = (id) => api.delete(`/brand/${id}`, { auth: true });

export const addPatternType = (data) => api.post("/pattern-type", data, { auth: true });
export const getPatternTypes = () => api.get("/pattern-type", { auth: true });
export const getPatternTypeById = (id) => api.get(`/pattern-type/${id}`, { auth: true });
export const updatePatternType = (id, data) => api.put(`/pattern-type/${id}`, data, { auth: true });
export const deletePatternType = (id) => api.delete(`/pattern-type/${id}`, { auth: true });

export const addCart = (data) => api.post("/cart", data, { auth: true });
export const getCart = (userId, params) => api.get(`/cart/${userId}`, { params, auth: true });
export const updateCart = (userId, items) => api.put(`/cart/${userId}`, items, { auth: true });
export const deleteCart = (userId) => api.delete(`/cart/${userId}`, { auth: true });

export const getWishlist = (userId) => api.get(`/whishlist/${userId}`, { auth: true });
export const addToWishlist = (data) => api.post("/whishlist", data, { auth: true });
export const removeFromWishlist = (data) => api.delete("/whishlist", { data, auth: true });
export const clearWishlist = (userId) => api.delete(`/whishlist/${userId}`, { auth: true });
