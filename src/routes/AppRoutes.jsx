import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../page/common/Home'
import Cart from '../page/common/Cart'
import Checkout from '../page/common/Checkout'
import ProductDetails from '../page/common/ProductDetails'
import Categories from '../_layout/Categories'
import LoginUI from '../auth/Login'
import AdminDashboardUI from '../_layout/Dashboard'
import ProtectedRoutes from './ProtectedRoutes'
import RoleBasedRoute from './RoleBasedRoutes'

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/categories/:categoryName' element={<Categories />} />
            <Route path='/login' element={<LoginUI />} />

            {/* protected routes */}
            <Route
                path='/dashboard'
                element={
                    <ProtectedRoutes>
                        <RoleBasedRoute allow={["admin"]}>
                            <AdminDashboardUI />
                        </RoleBasedRoute>
                    // </ProtectedRoutes>
                }
            />
        </Routes>
    )
}

export default AppRoutes