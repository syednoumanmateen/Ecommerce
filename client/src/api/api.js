import api from "../utils/axios";

export const registerUser = (data) => api.post("/user/register", data);
export const loginUser = (data) => api.post("/user/login", data);
export const forgotPassword = (data) => api.post("/user/forgot-password", data);
export const resetPassword = (data) => api.post("/user/reset-password", data);
export const verifyToken = (token) => api.post("/user/verify", { token });

export const getProducts = (data) => api.get("/product", { ...data, auth: true });
export const getProductById = (_id) => api.get(`/product/${_id}`, { auth: true });

export const addCart = (data) => api.post("/cart", data, { auth: true });
export const getCart = (userId) => api.get(`/cart/${userId}`, { auth: true });
export const updateCart = (userId, items) => api.put(`/cart/${userId}`, items, { auth: true });
export const removeFromCart = (data) => api.delete('/cart', { data, auth: true });
export const clearCart = (userId) => api.delete(`/cart/${userId}`, { auth: true });

export const getWishlist = (userId) => api.get(`/wishlist/${userId}`, { auth: true });
export const addWishlist = (data) => api.post('/wishlist', data, { auth: true });
export const removeFromWishlist = (data) => api.delete('/wishlist', { data, auth: true });
export const clearWishlist = (userId) => api.delete(`/wishlist/${userId}`, { auth: true });
