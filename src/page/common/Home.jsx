import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import axios from 'axios';
import { ChevronDown, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Home() {
    // product and loading
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([])

    // dropdown
    const [isCateopen, setIsCateOpen] = useState(false);



    // input
    const [input, setInput] = useState("")
    const [results, setResults] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [cache, setCache] = useState({})

    // product cart
    const { cart, handleAddToCart } = useCart()
    // login context
    const { isLoggedIn, handleLogin, handleLogout } = useAuth()

    // fetch all products
    const fetchProduct = async () => {
        try {
            setIsLoading(true);
            const url = "https://dummyjson.com/products";
            const response = await axios.get(url);
            setProducts(response.data.products);
        } catch (error) {
            console.error("error", error)
        } finally {
            setIsLoading(false);
        }
    }


    // handle search functionality using concepts of debouncing
    const handleSearchProducts = async () => {
        try {
            const query = input.trim();
            if (!query) {
                setResults([]);
                return;
            }

            if (cache[query]) {
                setResults(cache[query])
                return;
            }

            setIsLoading(true)
            const url = "https://dummyjson.com/products/search?q=" + query;
            const response = await axios.get(url);
            setResults(response.data.products)
            // save to cache
            setCache((prev) => ({ ...prev, [query]: response.data.products }))
        } catch (error) {
            console.error("Error", error);
        } finally {
            setIsLoading(false)
        }
    }

    // fetch all categories
    const fetchCategories = async () => {
        try {
            setIsLoading(true)
            const url = "https://dummyjson.com/products/categories";
            const response = await axios.get(url);
            setCategories(response.data)
        } catch (error) {
            console.error("Error", error);
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct();
        // fetchCategories();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearchProducts()
        }, 300)

        return () => clearTimeout(timer)
    }, [input]);

    const handleCategoriesDropdownOpen = () => {
        setIsCateOpen((prev) => !prev);

        if (categories.length === 0) {
            fetchCategories();
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* top */}
            <div className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Left */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">All Products</h1>
                                <span className="text-gray-500 text-sm">Total: {products.length}</span>
                            </div>

                            {/* Filters */}
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <button
                                        onClick={handleCategoriesDropdownOpen}
                                        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700"
                                    >
                                        Categories <ChevronDown size={18} />
                                    </button>

                                    {isCateopen && (
                                        <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                                            <ul className="max-h-60 overflow-y-auto">
                                                {categories.length > 0 ? (
                                                    categories.map((item) => (
                                                        <li key={item.slug}>
                                                            <Link
                                                                to={item.url}
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="px-4 py-2 text-sm text-gray-500">Loading...</li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            {/* Search */}
                            <div className="relative w-full md:w-[320px]">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onFocus={() => setIsVisible(true)}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                />

                                {isVisible && (
                                    <div className="absolute left-0 top-full mt-2 w-full z-50 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden">
                                        <div className="max-h-[280px] overflow-y-auto">
                                            {results.length > 0 ? (
                                                results.map((item) => (
                                                    <Link to={`/product/${item.id}`}>
                                                        <div
                                                            key={item.id}
                                                            className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 border-b last:border-b-0"
                                                        >
                                                            <p className="font-medium text-gray-900">{item.title}</p>
                                                            <p className="text-xs text-gray-500">
                                                                {item.brand} • ${item.price}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))
                                            ) : (
                                                <p className="px-4 py-3 text-sm text-gray-500">
                                                    No result found
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Login / Logout */}
                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-semibold text-gray-800"
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white"
                                >
                                    Login
                                </button>
                            )}

                            {/* Cart */}
                            <Link
                                to="/cart"
                                className="relative flex items-center justify-center h-10 w-10 rounded-xl border border-gray-200 hover:bg-gray-50"
                            >
                                <ShoppingCart size={22} className="text-gray-800" />

                                <span className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                                    {cart.length}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


            {/* bottom */}
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <ProductCard key={index}
                            id={item.id}
                            image={item.image}
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