import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalLoader from "./components/loading/GlobalLoader";
import Loader from "./components/loading/Loader";

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

const BrandList = lazy(() => import("./pages/Brand"));
const CategoryList = lazy(() => import("./pages/Category"));
const ProductList = lazy(() => import("./pages/Products/List"));
const ProductDetails = lazy(() => import("./pages/Products/View"));
const PatternTypeList = lazy(() => import("./pages/PatternType"));
const RoomByList = lazy(() => import("./pages/Room"));

const unprotectedRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "*", element: <NotFound /> },
];

const protectedRoutes = [
  { path: "/", element: <Home /> },
  { path: "/brands", element: <BrandList /> },
  { path: "/categories", element: <CategoryList /> },
  { path: "/products", element: <ProductList /> },
  { path: "/product/details/:id", element: <ProductDetails /> },
  { path: "/patterns", element: <PatternTypeList /> },
  { path: "/rooms", element: <RoomByList /> },
  { path: "/cart", element: <Cart /> },
  { path: "/wishlist", element: <Wishlist /> },
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
