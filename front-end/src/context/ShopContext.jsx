import { createContext, useContext, useEffect, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})

    const addToCart = (itemId, size) => {
        let cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        setCartItems(cartData)
    }

    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])

    return <ShopContext.Provider value={{ products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, addToCart }}>{children}</ShopContext.Provider>;
}

export default ShopContextProvider;

export const useShop = () => useContext(ShopContext); 