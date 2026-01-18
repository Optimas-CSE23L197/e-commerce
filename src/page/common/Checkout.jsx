import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useCheckout } from "../../context/CheckoutContext";

function Checkout() {

    const { totalPrice, deliveryCharge, tax, finalPrice } = useCart();
    const { address, handleAddressChange, paymentMethod, setPaymentMethod, handleOrder } = useCheckout()

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
                <p className="text-sm text-gray-500">Complete your order details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left: Address + Payment */}
                <div className="md:col-span-2 space-y-6">
                    {/* Shipping Address */}
                    <div className="bg-white border rounded-2xl p-5 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Shipping Address
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="fullName"
                                value={address.fullName}
                                onChange={handleAddressChange}
                                placeholder="Full Name"
                                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                value={address.phoneNumber}
                                onChange={handleAddressChange}
                                placeholder="Phone Number"
                                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="city"
                                value={address.city}
                                onChange={handleAddressChange}
                                placeholder="City"
                                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="postalCode"
                                value={address.postalCode}
                                onChange={handleAddressChange}
                                placeholder="Postal Code"
                                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="state"
                                value={address.state}
                                onChange={handleAddressChange}
                                placeholder="State"
                                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="country"
                                value={address.country}
                                onChange={handleAddressChange}
                                placeholder="Country"
                                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                placeholder="Full Address"
                                name="fullAddress"
                                value={address.fullAddress}
                                onChange={handleAddressChange}
                                rows="3"
                                className="md:col-span-2 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white border rounded-2xl p-5 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Payment Method
                        </h2>

                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-gray-50">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === "cod"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="accent-blue-600"
                                />
                                <span className="text-sm font-medium text-gray-800">
                                    Cash on Delivery
                                </span>
                            </label>

                            <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-gray-50">
                                <input type="radio"
                                    name="payment"
                                    value="card"
                                    checked={paymentMethod === "card"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="accent-blue-600"
                                />
                                <span className="text-sm font-medium text-gray-800">
                                    Credit / Debit Card
                                </span>
                            </label>

                            <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-gray-50">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="upi"
                                    checked={paymentMethod === "upi"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="accent-blue-600"
                                />
                                <span className="text-sm font-medium text-gray-800">
                                    UPI / Wallet
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right: Order Summary */}
                <div className="bg-white border rounded-2xl p-5 shadow-sm h-fit">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Order Summary
                    </h2>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                            <span>Delivery</span>
                            <span>${deliveryCharge.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                            <span>Tax (5%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>

                        <hr className="my-3" />

                        <div className="flex justify-between font-semibold text-gray-900">
                            <span>Total</span>
                            <span>${finalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <button onClick={handleOrder} className="w-full mt-5 px-4 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition">
                        Place Order
                    </button>

                    <p className="text-xs text-gray-500 mt-4">
                        By placing your order, you agree to our Terms & Conditions.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
