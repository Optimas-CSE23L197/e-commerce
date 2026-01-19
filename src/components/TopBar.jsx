import React, { useState, useEffect } from 'react'
import { ChevronDown, ShoppingCart } from 'lucide-react'
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useGet from '../hooks/useGet';

function TopBar({ totalProduct }) {

    // dropdown
    const [isCateopen, setIsCateOpen] = useState(false);
    const [input, setInput] = useState("")
    const [query, setQuery] = useState("")
    const [cache, setCache] = useState({})
    const [results, setResults] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)
    const [sortOrder, setSortOrder] = useState("desc")
    // login context
    const { isLoggedIn, handleLogin, handleLogout } = useAuth()
    // product cart
    const { cart } = useCart()

    const handleCategoriesDropdownOpen = () => {
        setIsCateOpen((prev) => !prev);
    };

    const handleSortDropDown = () => {
        setIsSortOpen(prev => !prev);
    }

    console.log("is login", isLoggedIn);


    // fetch all categories
    const {
        data: categoriesData
    } = useGet("/products/categories")
    const categoriesList = categoriesData || []

    // handle search using debouncing

    useEffect(() => {
        const timer = setTimeout(() => {
            setQuery(input.trim());
        }, 300)
        return () => clearTimeout(timer);
    }, [input]);

    const {
        data: searchData,
        refetch: searchNow
    } = useGet(query ? `/products/search?q=${query}` : null, false)

    useEffect(() => {
        if (!query || query.length < 2) {
            setResults([])
            return
        }

        if (cache[query]) {
            setResults(cache[query])
            return
        }

        searchNow()
    }, [query]);

    useEffect(() => {
        if (!query) return;
        if (!searchData?.products) return;

        setResults(searchData.products);

        setCache((prev) => ({
            ...prev,
            [query]: searchData.products
        }))
    }, [searchData])

    // sort by title


    return (
        <div className="bg-white border-b">
            <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">All Products</h1>
                            <span className="text-gray-500 text-sm">Total: {totalProduct}</span>
                        </div>

                        {/* Filters */}
                        <div className="flex items-center gap-3">
                            {/* categories */}
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
                                            {categoriesList.length > 0 ? (
                                                categoriesList.map((item, index) => (
                                                    <li key={index}>
                                                        <Link
                                                            to={`/categories/${item.slug}`}
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

                            {/* sort product */}
                            {/* <div className='relative'>
                                <button
                                    onClick={() => handleSortDropDown()}
                                    className='flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700'>
                                    Sort <ChevronDown size={18} />
                                </button>
                                {isSortOpen && (
                                    <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                                        <ul className="max-h-60 overflow-y-auto">
                                            <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium cursor-pointer">By Title</li>
                                            <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium cursor-pointer">By Price</li>
                                        </ul>
                                    </div>
                                )}
                            </div> */}
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
                                onBlur={() => setIsVisible(false)}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />

                            {isVisible && (
                                <div className="absolute left-0 top-full mt-2 w-full z-50 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden">
                                    <div className="max-h-[280px] overflow-y-auto">
                                        {results.length > 0 ? (
                                            results.map((item) => (
                                                <Link onMouseDown={(e) => e.preventDefault()} to={`/product/${item.id}`}>
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
                                onClick={() => handleLogin("admin")}
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
    )
}

export default TopBar