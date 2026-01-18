import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({
    id,
    image,
    title,
    price,
    description,
    discountPercentage,
    rating,
    stock,
    brand,
    addProduct
}) {

    const { cart } = useCart()

    const navigate = useNavigate()

    const gotToCart = () => {
        navigate("/cart");
    }


    const isInCart = cart.some(item => item.id === id)

    const finalPrice =
        discountPercentage && discountPercentage > 0
            ? (price - price * (discountPercentage / 100)).toFixed(2)
            : price;

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
            {/* Product Image */}
            <div className="w-full h-full bg-gray-100 object-contain">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                {/* Brand */}
                {brand && (
                    <p className="text-sm text-gray-500 mb-1">{brand}</p>
                )}

                {/* Title */}
                <Link to={`/product/${id}`}>
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {title}
                    </h2>
                </Link>

                {/* Rating + Stock */}
                <div className="flex items-center justify-between mt-2">
                    {rating && (
                        <span className="text-sm font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg">
                            ⭐ {rating.toFixed(1)}
                        </span>
                    )}

                    {stock !== undefined && (
                        <span
                            className={`text-xs font-semibold px-2 py-1 rounded-lg ${stock > 0
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
                        </span>
                    )}
                </div>

                {/* Description */}
                {description && (
                    <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                        {description}
                    </p>
                )}

                {/* Bottom */}
                <div className="mt-auto pt-4">
                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <p className="text-xl font-bold text-blue-600">${finalPrice}</p>

                        {discountPercentage && discountPercentage > 0 && (
                            <>
                                <p className="text-sm text-gray-400 line-through">
                                    ${price}
                                </p>
                                <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-1 rounded-lg">
                                    -{discountPercentage}%
                                </span>
                            </>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 mt-4">
                        {isInCart ? (
                            <button
                                className={`w-full px-4 py-2 rounded-xl font-medium transition ${stock === 0
                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                                onClick={gotToCart}
                            >
                                Go to Cart
                            </button>
                        ) : (
                            <button
                                className={`w-full px-4 py-2 rounded-xl font-medium transition ${stock === 0
                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                                disabled={stock === 0}
                                onClick={addProduct}
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ProductCard;
