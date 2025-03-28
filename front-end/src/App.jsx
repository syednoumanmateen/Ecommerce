import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const Collection = lazy(() => import('./pages/Collection'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Product = lazy(() => import('./pages/Product'))
const Cart = lazy(() => import('./pages/Cart'))
const Login = lazy(() => import('./pages/Login'))
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'))
const Orders = lazy(() => import('./pages/Orders'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Navbar = lazy(() => import('./components/Navbar'))
const SearchBar = lazy(() => import('./components/SearchBar'))
const Footer = lazy(() => import('./components/Footer'))

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[pvw]">
      <Navbar />
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
