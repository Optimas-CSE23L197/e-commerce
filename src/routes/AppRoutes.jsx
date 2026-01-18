import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../page/common/Home'
import Cart from '../page/common/Cart'
import Checkout from '../page/common/Checkout'
import ProductDetails from '../page/common/ProductDetails'

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/product/:id' element={<ProductDetails />} />
        </Routes>
    )
}

export default AppRoutes