import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Loader from "./components/loading/Loader";
import GlobalLoader from "./components/loading/GlobalLoader";

const UnProtected = lazy(() => import("./components/Layout/UnProtected"));
const Protected = lazy(() => import("./components/Layout/Protected"));

const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword"));

const NotFound = lazy(() => import("./pages/NotFound"));
const Home = lazy(() => import("./pages/Dashboard"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Profile = lazy(() => import("./pages/Profile"));

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

const unprotectedRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "*", element: <NotFound /> },
];

const protectedRoutes = [
  { path: "/", element: <Home /> },
  { path: "/brand/add", element: <BrandAdd /> },
  { path: "/brands", element: <BrandList /> },
  { path: "/category/add", element: <CategoryAdd /> },
  { path: "/categories", element: <CategoryList /> },
  { path: "/product/add", element: <ProductAdd /> },
  { path: "/products", element: <ProductList /> },
  { path: "/product/details/:id", element: <ProductDetails /> },
  { path: "/pattern/add", element: <PatternTypeAdd /> },
  { path: "/patterns", element: <PatternTypeList /> },
  { path: "/room/add", element: <RoomByAdd /> },
  { path: "/rooms", element: <RoomByList /> },
  { path: "/cart", element: <Cart /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/profile", element: <Profile /> },
];

const AppContent = () => {
  return (
    <>
      <GlobalLoader />
      <Suspense fallback={<Loader />}>
        <Routes>
          
          <Route element={<UnProtected />}>
            {unprotectedRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>

          
          <Route element={<Protected />}>
            {protectedRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default AppContent;
