import React from "react";

export default function LoginUI() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
                {/* Heading */}
                <h1 className="text-2xl font-semibold text-gray-900">Login</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Welcome back! Please sign in to continue.
                </p>

                {/* Tabs (UI only) */}
                <div className="mt-6 flex gap-2 p-1 border border-gray-200 rounded-xl">
                    <button className="flex-1 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white">
                        Email
                    </button>
                    <button className="flex-1 py-2 rounded-lg text-sm font-medium text-gray-700">
                        Mobile
                    </button>
                </div>

                {/* Form UI */}
                <div className="mt-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900"
                        />
                    </div>

                    {/* Extra */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-600">
                            <input type="checkbox" className="h-4 w-4" />
                            Remember me
                        </label>
                        <button className="text-gray-900 font-medium">
                            Forgot password?
                        </button>
                    </div>

                    {/* Button */}
                    <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:opacity-90 transition">
                        Login
                    </button>

                    {/* Footer */}
                    <p className="text-sm text-gray-600 text-center mt-4">
                        Don’t have an account?{" "}
                        <span className="text-gray-900 font-medium cursor-pointer">
                            Sign up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
