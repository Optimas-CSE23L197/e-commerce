import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import axios from 'axios';
import useGet from '../../hooks/useGet';
import TopBar from '../../components/TopBar';
import { useCart } from '../../context/CartContext';

function Home() {
    const { handleAddToCart } = useCart()

    const { data, error, loading } = useGet("/products")

    const products = data?.products || []

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* top */}
            <TopBar totalProduct={products.length} />

            {/* bottom */}
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <ProductCard key={index}
                            id={item.id}
                            image={item.thumbnail}
                            title={item.title}
                            price={item.price}
                            description={item.description}
                            discountPercentage={item.discountPercentage}
                            rating={item.rating}
                            stock={item.stock}
                            brand={item.brand}
                            addProduct={() => handleAddToCart(item)}
                        />
                    ))
                ) : (
                    <span>No Products found</span>
                )}
            </div>
        </div >
    )
}

export default Home