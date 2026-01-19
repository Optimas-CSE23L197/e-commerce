import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import useGet from '../../hooks/useGet';
import TopBar from '../../components/TopBar';
import { useCart } from '../../context/CartContext';
import Pagination from '../../components/Pagination';

function Home() {

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 30;
    const skip = (currentPage - 1) * itemsPerPage;
    // ?sortBy=title&order=asc

    // const sortOrder = 

    const { handleAddToCart } = useCart()

    const { data, error, loading } = useGet(`/products?limit=${itemsPerPage}&skip=${skip}`)

    const products = data?.products || []
    const totalProducts = data?.total || 0;

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col">
            {/* top */}
            <TopBar totalProduct={totalProducts} />

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

            <Pagination
                itemsPerPage={itemsPerPage}
                productsData={data}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div >
    )
}

export default Home