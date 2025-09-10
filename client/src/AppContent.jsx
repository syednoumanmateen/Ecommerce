import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Loader from "./components/loading/Loader";
import GlobalLoader from "./components/loading/GlobalLoader";

// Layouts
const UnProtected = lazy(() => import("./components/Layout/UnProtected"));
const Protected = lazy(() => import("./components/Layout/Protected"));

// Pages
const Home = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

const BrandAdd = lazy(() => import("./pages/Brand/Add"));
const BrandList = lazy(() => import("./pages/Brand/List"));

const CategoryAdd = lazy(() => import("./pages/Categories/Add"));
const CategoryList = lazy(() => import("./pages/Categories/List"));

const ProductAdd = lazy(() => import("./pages/Products/Add"));
const ProductList = lazy(() => import("./pages/Products/List"));
const ProductDetails = lazy(() => import("./pages/Products/View"));

const PatternTypeAdd = lazy(() => import("./pages/PatternType/Add"));
const PatternTypeList = lazy(() => import("./pages/PatternType/List"));

const RoomByAdd = lazy(() => import("./pages/RoomBy/Add"));
const RoomByList = lazy(() => import("./pages/RoomBy/List"));

const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Profile = lazy(() => import("./pages/Profile"));

const AppContent = () => {

    return (
        <>
            <GlobalLoader />
            <Suspense fallback={<Loader />}>
                <Routes>
                    {/* Unprotected Routes */}
                    <Route element={<UnProtected />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>

                    {/* Protected Routes */}
                    <Route element={<Protected />}>
                        <Route path="/" element={<Home />} />

                        {/* Brand */}
                        <Route path="/brand/add" element={<BrandAdd />} />
                        <Route path="/brands" element={<BrandList />} />

                        {/* Category */}
                        <Route path="/category/add" element={<CategoryAdd />} />
                        <Route path="/categories" element={<CategoryList />} />

                        {/* Product */}
                        <Route path="/product/add" element={<ProductAdd />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/product/details/:id" element={<ProductDetails />} />

                        {/* Pattern Type */}
                        <Route path="/pattern/add" element={<PatternTypeAdd />} />
                        <Route path="/patterns" element={<PatternTypeList />} />

                        {/* Room By */}
                        <Route path="/room/add" element={<RoomByAdd />} />
                        <Route path="/rooms" element={<RoomByList />} />

                        {/* Cart */}
                        <Route path="/cart" element={<Cart />} />

                        {/* Wishlist */}
                        <Route path="/wishlist" element={<Wishlist />} />

                        {/* Profile */}
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
            </Suspense>
        </>
    );
};

export default AppContent;
