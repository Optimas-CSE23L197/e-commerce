import React from "react";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Toast } from "../../utils/toast.js";

function Cart() {
    const { cart, totalPrice, deliveryCharge, tax, finalPrice, handleRemoveFromCart, increaseQty, decreseQty } = useCart();
    const { isLoggedIn } = useAuth()

    const navigate = useNavigate()

    const gotoCheckoutPage = () => {
        if (cart.length <= 0) {
            Toast.error("Cart is empty")
            return
        }

        if (isLoggedIn) navigate("/checkout");
        else navigate("/login")
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
                    <p className="text-sm text-gray-500">
                        Items: {cart.length}
                    </p>
                </div>

                <Link
                    to="/"
                    className="text-sm font-medium text-blue-600 hover:underline"
                >
                    Continue Shopping →
                </Link>
            </div>

            {/* Main */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left: Cart Items */}
                <div className="md:col-span-2 bg-white border rounded-xl p-4">
                    {cart.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                                >
                                    {/* Image */}
                                    <div className="h-20 w-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <h2 className="text-sm font-semibold text-gray-900">
                                            {item.title}
                                        </h2>
                                        <p className="text-xs text-gray-500">{item.brand}</p>

                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-sm font-semibold text-blue-600">
                                                ${item.price}
                                            </p>

                                            <p className="text-sm text-gray-700">
                                                QTY: <span className="font-semibold">{item.qty}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2">
                                        <button onClick={() => decreseQty(item.id)} className="px-3 py-1 text-sm rounded-lg border hover:bg-gray-100">
                                            -
                                        </button>
                                        <button onClick={() => increaseQty(item.id)} className="px-3 py-1 text-sm rounded-lg border hover:bg-gray-100">
                                            +
                                        </button>
                                        <button
                                            className="px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
                                            onClick={() => handleRemoveFromCart(item)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-600">Your cart is empty.</p>
                            <Link
                                to="/"
                                className="inline-block mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Shop Now
                            </Link>
                        </div>
                    )}
                </div>

                {/* Right: Summary */}
                <div className="bg-white border rounded-xl p-4 h-fit">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Order Summary
                    </h2>

                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>${deliveryCharge.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                            <span>Tax (5%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>

                        <hr className="my-2" />

                        <div className="flex justify-between font-semibold text-gray-900">
                            <span>Total</span>
                            <span>${finalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <button onClick={gotoCheckoutPage} className="w-full mt-5 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 cursor-pointer">
                        Checkout
                    </button>

                    {/* Coupon */}
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            Apply Coupon
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter code"
                                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm hover:bg-black">
                                Apply
                            </button>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-4">
                        Secure checkout • Fast delivery
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Cart;
