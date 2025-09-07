const ProductInfo = ({ product,onClick }) => {
    const { images = [], category, brand, name, price } = product || {};
    return (
        <div className="space-y-1 p-4 flex-1">
            <div className="flex justify-between text-sm text-gray-500">
                <p className="truncate">{category?.name || category}</p>
                <p className="truncate">{brand?.name || brand}</p>
            </div>
            <h3
                className="text-lg font-semibold text-gray-800 truncate"
                onClick={onClick}
            >
                {name}
            </h3>
            <p className="text-green-600 font-medium text-lg">${price}</p>
        </div>
    )
};


export default ProductInfo
