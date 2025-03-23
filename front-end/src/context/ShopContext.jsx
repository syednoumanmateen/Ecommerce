import { createContext, useContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)

    return <ShopContext.Provider value={{ products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch }}>{children}</ShopContext.Provider>;
}

export default ShopContextProvider;

export const useShop = () => useContext(ShopContext); 