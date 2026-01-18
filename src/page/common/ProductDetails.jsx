import React, { useEffect, useState } from "react";
import { Star, Truck, ShieldCheck, RotateCcw, Package } from "lucide-react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function ProductDetails() {
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams()

    // fetch product by id
    const fetchProductById = async () => {
        try {
            setIsLoading(true);
            const url = `https://dummyjson.com/products/${id}`
            const response = await axios.get(url);
            setProduct(response.data);
        } catch (error) {
            console.error("Error", error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProductById()
    }, [id])

    if (!product) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-10">
                <p className="text-gray-500">Loading product...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-4">
                Home / <span className="capitalize">{product.category}</span> /{" "}
                <span className="text-gray-900 font-medium">{product.title}</span>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* LEFT: Images */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-[320px] sm:h-[420px] object-cover"
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-3 overflow-x-auto pb-1">
                        {product.images?.map((img, index) => (
                            <button
                                key={index}
                                className="min-w-[72px] h-[72px] rounded-xl border bg-white overflow-hidden hover:ring-2 hover:ring-blue-500 transition"
                            >
                                <img
                                    src={img}
                                    alt={`${product.title}-${index}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Info */}
                <div className="space-y-5">
                    {/* Title + Brand */}
                    <div>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
                            {product.title}
                        </h1>
                    </div>

                    {/* Rating + Stock */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-1 rounded-xl text-sm font-medium">
                            <Star size={16} />
                            <span>{product.rating?.toFixed(1)}</span>
                        </div>

                        <span
                            className={`text-sm font-semibold px-3 py-1 rounded-xl ${product.stock > 0
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                                }`}
                        >
                            {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                        </span>
                    </div>

                    {/* Price Section */}
                    <div className="bg-white border rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <p className="text-3xl font-bold text-blue-600">
                                $
                                {(
                                    product.price -
                                    product.price * (product.discountPercentage / 100)
                                ).toFixed(2)}
                            </p>

                            <div className="flex flex-col">
                                <p className="text-sm text-gray-400 line-through">
                                    ${product.price}
                                </p>
                                <p className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-1 rounded-lg w-fit">
                                    -{product.discountPercentage}%
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                            SKU: <span className="text-gray-800 font-medium">{product.sku}</span>
                        </p>
                    </div>

                    {/* Description */}
                    <div className="bg-white border rounded-2xl p-4 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                            Description
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Tags */}
                    {product.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="w-full sm:w-auto flex-1 px-5 py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                            Add to Cart
                        </button>

                        <button className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-gray-200 bg-white font-semibold hover:bg-gray-50 transition">
                            ❤️ Wishlist
                        </button>
                    </div>

                    {/* Extra Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-3 bg-white border rounded-2xl p-4 shadow-sm">
                            <Truck className="text-gray-700" size={20} />
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Shipping</p>
                                <p className="text-xs text-gray-500">
                                    {product.shippingInformation}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-white border rounded-2xl p-4 shadow-sm">
                            <ShieldCheck className="text-gray-700" size={20} />
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Warranty</p>
                                <p className="text-xs text-gray-500">
                                    {product.warrantyInformation}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-white border rounded-2xl p-4 shadow-sm">
                            <RotateCcw className="text-gray-700" size={20} />
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Return Policy</p>
                                <p className="text-xs text-gray-500">{product.returnPolicy}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-white border rounded-2xl p-4 shadow-sm">
                            <Package className="text-gray-700" size={20} />
                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    Min Order Qty
                                </p>
                                <p className="text-xs text-gray-500">
                                    {product.minimumOrderQuantity}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dimensions */}
                    {product.dimensions && (
                        <div className="bg-white border rounded-2xl p-4 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">
                                Product Details
                            </h2>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-gray-500 text-xs">Weight</p>
                                    <p className="font-semibold text-gray-900">{product.weight}g</p>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-gray-500 text-xs">Width</p>
                                    <p className="font-semibold text-gray-900">
                                        {product.dimensions.width}
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-gray-500 text-xs">Height</p>
                                    <p className="font-semibold text-gray-900">
                                        {product.dimensions.height}
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-gray-500 text-xs">Depth</p>
                                    <p className="font-semibold text-gray-900">
                                        {product.dimensions.depth}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Customer Reviews
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.reviews?.length > 0 ? (
                        product.reviews.map((review, index) => (
                            <div
                                key={index}
                                className="bg-white border rounded-2xl p-5 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold text-gray-900">
                                        {review.reviewerName}
                                    </p>

                                    <span className="text-sm font-medium bg-yellow-50 text-yellow-800 px-2 py-1 rounded-lg">
                                        ⭐ {review.rating}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 mt-2">{review.comment}</p>

                                <p className="text-xs text-gray-400 mt-3">
                                    {new Date(review.date).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
