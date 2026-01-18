import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

function Categories() {

    const { categoryName } = useParams();
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const { handleAddToCart } = useCart()

    const fetchDataByCategory = async () => {
        try {
            setIsLoading(true)
            const url = `https://dummyjson.com/products/category/${categoryName}`
            const response = await axios.get(url);
            setResults(response.data.products)
        } catch (error) {
            console.error("error", error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchDataByCategory();
    }, [])

    return (
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto px-4 py-6'>
            {results.length > 0 ? (
                results.map((item, index) => (
                    <ProductCard
                        key={index}
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
                <span>No product found</span>
            )}
        </div>
    )
}

export default Categories