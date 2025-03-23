import React, { useEffect, useState } from 'react'
import { useShop } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useShop()
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        let productsData = [...products]
        productsData = productsData.filter(item => category === item.category)
        productsData = productsData.filter(item => subCategory === item.subCategory)

        setRelatedProducts(productsData.slice(0, 5))
    }, [products,category,subCategory])

    return (
        <div className="my-10">
        <div className="text-center py-8 text-3xl">
            <Title text1={'RELATED'} text2={'PRODUCTS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Hi text
            </p>
        </div>

        {/* Rendering Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                relatedProducts.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))
            }
        </div>
    </div>
    )
}

export default RelatedProducts
