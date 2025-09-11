import React from 'react';
import Button from '../UI/Button';

const ProductInfo = ({ product, onClick, onAddToCart, onAddToWishlist }) => {
    const { category, brand, name, price, rating } = product || {};

    return (
        <div className="space-y-2 p-4 flex-1">
            <h3
                className="text-lg cursor-pointer hover:underline"
                onClick={onClick}
            >
                {name}
            </h3>

            {rating !== undefined && (
                <div className="text-primary text font-sans">
                    {"★".repeat(Math.floor(rating))}{""}
                    {"☆".repeat(5 - Math.floor(rating))}
                    <span className="ml-1 text-gray-500">({rating.toFixed(1)})</span>
                </div>
            )}

            <p className="text-green-600 font-medium text">${price}</p>
            <div className="flex items-center text text-gray-500 space-x-2">
                <span className="truncate">
                    <strong className="font-medium text-gray-900">Category:</strong> {category?.name || category}
                </span>
                <span className="text-gray-900">|</span>
                <span className="truncate">
                    <strong className="font-medium text-gray-900">Brand:</strong> {brand?.name || brand}
                </span>
            </div>
        </div>
    );
};

export default ProductInfo;
