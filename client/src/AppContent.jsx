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
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));

const ProductList = lazy(() => import("./pages/Products/List"));
const ProductDetails = lazy(() => import("./pages/Products/View"));

const unprotectedRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "*", element: <NotFound /> },
];

const protectedRoutes = [
  { path: "/", element: <ProductList /> },
  { path: "/product/details/:id", element: <ProductDetails /> },
  { path: "/cart", element: <Cart /> },
  { path: "/wishlist", element: <Wishlist /> }
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
