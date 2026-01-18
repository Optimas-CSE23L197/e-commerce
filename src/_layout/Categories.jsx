import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import useGet from "../hooks/useGet";
import TopBar from "../components/TopBar";

function Categories() {
    const { categoryName } = useParams();
    const { handleAddToCart } = useCart();


    const { data, loading, error } = useGet(`/products/category/${encodeURIComponent(categoryName)}`);

    const results = data?.products || [];


    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <TopBar totalProduct={results.length} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {results.length > 0 ? (
                    results.map((item) => (
                        <ProductCard
                            key={item.id}
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
                    <p>No product found</p>
                )}
            </div>
        </div>
    );
}

export default Categories;
