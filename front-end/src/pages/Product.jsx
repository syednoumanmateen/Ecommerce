import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useShop()
  const [productData, setProductData] = useState({})
  const [image, setImage] = useState("")
  const [size, setSize] = useState("")

  const fetchProductData = async () => {
    products.map(item => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId])

  return (
    <>
      {productData && <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

          {/* produt images */}
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between  sm:justify-normal sm:w-[18.7%] w-full">
              {
                productData?.image?.map(i => (
                  <img onClick={() => setImage(i)} key={i} src={i} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                ))
              }
            </div>
            <div className="w-full w-[80%]">
              <img src={image} alt="" className="w-full h-auto" />
            </div>
          </div>

          {/* product info */}
          <div className="flex-1">
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_dull_icon} alt="" />
              <p className='pl-2'>{122}</p>
            </div>
            <p className="mt-5 text-3xl font-medium">
              {currency}{productData?.price}
            </p>
            <p className='mt-5 text-gray-500 w-4/5'>{productData?.description}</p>
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {productData?.sizes?.map(s => (
                  <button onClick={() => setSize(s)} key={s} className={`border py-2 px-4 bg-gray-100 ${s === size ? "border-orange-500" : ""}`}>{s}</button>
                ))}
              </div>
            </div>
            <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' onClick={() => addToCart(productData._id, size)}>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5' />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original Product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>

        {/* description and review */}
        <div className="mt-20">
          <div className="flex">
            <div className="border px-5 py-3 text-sm">Description</div>
            <div className="border px-5 py-3 text-sm">Reviews (122)</div>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>Hi description</p>
            <p>hi description feature</p>
          </div>
        </div>

        {/* display related products */}
        <RelatedProducts category={productData?.category} subCategory={productData.subCategory} />
      </div>}
      {!productData && <div className='opacity-0'></div>}
    </>
  )
}

export default Product
