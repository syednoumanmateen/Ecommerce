import { useEffect, useState } from 'react'
import { useShop } from '../context/ShopContext'
import { assets } from '../assets/assets'
import ProductItem from '../components/ProductItem'
import Title from '../components/Title'

const Collection = () => {
  const { products,search,showSearch } = useShop()
  const [showFilter, setShowFilter] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [sortBy, setSortBy] = useState('')

  const toggleCategory = (e) => {
    e.preventDefault()
    if (category.includes(e.target.value)) {
      setCategory(category.filter(item => item !== e.target.value))
    }
    else {
      setCategory([...category, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    e.preventDefault()
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory([...subCategory, e.target.value])
    }
  }

  const applyFilter = () => {
    let filtered = [...products]
    if (search && showSearch) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      filtered = filtered.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      filtered = filtered.filter(item => subCategory.includes(item.subCategory))
    }
    setFilteredProducts(filtered)
  }

  const sortProducts = () => {
    let sorted = [...filteredProducts]
    switch (sortBy) {
      case 'relevent':
        sorted = [...products]
        break
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price)
        break
      default:
        sorted = [...products]
        break
    }
    setFilteredProducts(sorted)
  }

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search])

  useEffect(() => {
    sortProducts()
  }, [sortBy])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(prev => !prev)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
        </p>
        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={`Men`} onChange={(e) => toggleCategory(e)} />Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={`Women`} onChange={(e) => toggleCategory(e)} />Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={`Kids`} onChange={(e) => toggleCategory(e)} />Kids
            </p>
          </div>
        </div>

        {/* sub-category filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>SUB-CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={`Topwear`} onChange={(e) => toggleSubCategory(e)} />Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={`Bottomwear`} onChange={(e) => toggleSubCategory(e)} />Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={`Winterwear`} onChange={(e) => toggleSubCategory(e)} />Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* RightSide */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select className='border-2 border-gray-300 text-sm px-2' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="relevent">Sort by:Relevent</option>
            <option value="low-high">Sort by:Low to High</option>
            <option value="high-low">Sort by:High to Low</option>
          </select>
        </div>

        {/* map products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {
            filteredProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
