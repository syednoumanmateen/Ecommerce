import React from 'react'
import { useShop } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id,image, name,price}) => {

    const {currency}=useShop()

  return (
    <Link className='text-gray-700' to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img src={image[0]} className='hover:scale-110 transaction ease-in-out' alt="" />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
