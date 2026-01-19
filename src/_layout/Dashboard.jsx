import React, { useState } from "react";
import useGet from "../hooks/useGet";
import Pagination from "../components/Pagination";

export default function AdminDashboardUI() {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const skip = (currentPage - 1) * itemsPerPage;

    const {
        data: productsData,
        error: productsError,
        loading: productsLoading,
    } = useGet(`/products?limit=${itemsPerPage}&skip=${skip}`);

    const products = productsData?.products || [];
    const totalProducts = productsData?.total || 0;

    // stock stats (only current page data)
    const outOfStock = products.filter((item) => item.stock <= 0);
    const lowStock = products.filter((item) => item.stock < 10);

    if (productsLoading) return <p className="text-center py-10">Loading...</p>;
    if (productsError)
        return <p className="text-center py-10 text-red-500">{productsError}</p>;

    return (
        <div className="min-h-screen bg-white">
            {/* Top Navbar */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">
                            Admin Dashboard
                        </h1>
                        <p className="text-sm text-gray-500">
                            Manage products and inventory
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
                            <span className="text-gray-400 text-sm">🔍</span>
                            <input
                                placeholder="Search products..."
                                className="outline-none text-sm w-48"
                            />
                        </div>

                        <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition">
                            + Add Product
                        </button>
                    </div>
                </div>
            </div>

            {/* Main */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="border border-gray-200 rounded-2xl p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Total Products</p>
                        <h2 className="text-3xl font-semibold text-gray-900 mt-2">
                            {totalProducts}
                        </h2>
                        <p className="text-xs text-gray-500 mt-2">All listed items</p>
                    </div>

                    <div className="border border-gray-200 rounded-2xl p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Active Products</p>
                        <h2 className="text-3xl font-semibold text-gray-900 mt-2">
                            {totalProducts}
                        </h2>
                        <p className="text-xs text-gray-500 mt-2">Visible to customers</p>
                    </div>

                    <div className="border border-gray-200 rounded-2xl p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Low Stock</p>
                        <h2 className="text-3xl font-semibold text-gray-900 mt-2">
                            {lowStock.length}
                        </h2>
                        <p className="text-xs text-gray-500 mt-2">Needs restocking</p>
                    </div>

                    <div className="border border-gray-200 rounded-2xl p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Out of Stock</p>
                        <h2 className="text-3xl font-semibold text-gray-900 mt-2">
                            {outOfStock.length}
                        </h2>
                        <p className="text-xs text-gray-500 mt-2">Unavailable items</p>
                    </div>
                </div>

                {/* Table Section */}
                <div className="mt-8 border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    {/* Table Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b border-gray-200 bg-white">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                All Products
                            </h3>
                            <p className="text-sm text-gray-500">
                                View and manage your products
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none">
                                <option>Filter: All</option>
                                <option>Active</option>
                                <option>Low Stock</option>
                                <option>Out of Stock</option>
                            </select>

                            <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none">
                                <option>Sort: Newest</option>
                                <option>Oldest</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600">
                                <tr>
                                    <th className="text-left font-medium px-5 py-3">Product</th>
                                    <th className="text-left font-medium px-5 py-3">Category</th>
                                    <th className="text-left font-medium px-5 py-3">Price</th>
                                    <th className="text-left font-medium px-5 py-3">Stock</th>
                                    <th className="text-left font-medium px-5 py-3">Rating</th>
                                    <th className="text-left font-medium px-5 py-3">Brand</th>
                                    <th className="text-right font-medium px-5 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {products.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50 transition">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                                                    <img
                                                        src={p.thumbnail}
                                                        alt={p.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>

                                                <div>
                                                    <p className="font-medium text-gray-900">{p.title}</p>
                                                    <p className="text-xs text-gray-500">ID: #{p.id}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-gray-700 capitalize">
                                            {p.category}
                                        </td>
                                        <td className="px-5 py-4 text-gray-700">${p.price}</td>
                                        <td className="px-5 py-4 text-gray-700">{p.stock}</td>
                                        <td className="px-5 py-4 text-gray-700">{p.rating} ⭐</td>
                                        <td className="px-5 py-4 text-gray-700">{p.brand || "—"}</td>

                                        <td className="px-5 py-4 text-right">
                                            <button className="h-9 w-9 rounded-xl border border-gray-200 hover:bg-gray-100 transition">
                                                ⋮
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Component */}
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        productsData={productsData}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
}
