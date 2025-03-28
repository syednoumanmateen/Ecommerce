import React, { useEffect, useState } from 'react'
import { useShop } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useShop()
    const [visible, setVisible] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname.includes("collection") && showSearch) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location, showSearch])

    return (
        <>
            {visible && <div className='border-t bg-gray-50 text-center'>
                <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                    <input className='flex-1 outline-none bg-inherit text-sm' value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='search' />
                    <img src={assets.search_icon} className='w-4' alt="" />
                </div>
                <img onClick={() => setShowSearch(false)} src={assets.cross_icon} className='inline w-3 cursor-pointer' alt="" />
            </div>}
            {!visible && <div className='opacity-0'></div>}
        </>
    )
}

export default SearchBar
