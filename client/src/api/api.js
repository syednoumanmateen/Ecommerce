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
export const getProductById = (_id) => api.get(`/product/${_id}`, { auth: true });
export const updateProduct = (_id, data) => api.put(`/product/${_id}`, data, { auth: true });
export const deleteProduct = (_id) => api.delete(`/product/${_id}`, { auth: true });

export const addCategory = (data) => api.post("/category", data, { auth: true });
export const getCategories = () => api.get("/category", { auth: true });
export const getCategoryById = (_id) => api.get(`/category/${_id}`, { auth: true });
export const updateCategory = (_id, data) => api.put(`/category/${_id}`, data, { auth: true });
export const deleteCategory = (_id) => api.delete(`/category/${_id}`, { auth: true });

export const addShopRoom = (data) => api.post("/shop-room", data, { auth: true });
export const getShopRooms = () => api.get("/shop-room", { auth: true });
export const getShopRoomById = (_id) => api.get(`/shop-room/${_id}`, { auth: true });
export const updateShopRoom = (_id, data) => api.put(`/shop-room/${_id}`, data, { auth: true });
export const deleteShopRoom = (_id) => api.delete(`/shop-room/${_id}`, { auth: true });

export const addBrand = (data) => api.post("/brand", data, { auth: true });
export const getBrands = () => api.get("/brand", { auth: true });
export const getBrandById = (_id) => api.get(`/brand/${_id}`, { auth: true });
export const updateBrand = (_id, data) => api.put(`/brand/${_id}`, data, { auth: true });
export const deleteBrand = (_id) => api.delete(`/brand/${_id}`, { auth: true });

export const addPatternType = (data) => api.post("/pattern-type", data, { auth: true });
export const getPatternTypes = () => api.get("/pattern-type", { auth: true });
export const getPatternTypeById = (_id) => api.get(`/pattern-type/${_id}`, { auth: true });
export const updatePatternType = (_id, data) => api.put(`/pattern-type/${_id}`, data, { auth: true });
export const deletePatternType = (_id) => api.delete(`/pattern-type/${_id}`, { auth: true });

export const addCart = (data) => api.post("/cart", data, { auth: true });
export const getCart = (userId) => api.get(`/cart/${userId}`, { auth: true });
export const updateCart = (userId, items) => api.put(`/cart/${userId}`, items, { auth: true });
export const deleteCart = (userId) => api.delete(`/cart/${userId}`, { auth: true });

export const getWishlist = (userId) => api.get(`/wishlist/${userId}`, { auth: true });
export const addWishlist = (data) => api.post('/wishlist', data, { auth: true });
export const removeFromWishlist = (data) => api.delete('/wishlist', { data, auth: true });
export const clearWishlist = (userId) => api.delete(`/wishlist/${userId}`, { auth: true });
