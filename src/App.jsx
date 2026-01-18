import { ToastContainer } from 'react-toastify'
import AuthProvider from './context/AuthContext'
import CartProvider from './context/CartContext'
import CheckoutProvider from './context/CheckoutContext'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <CheckoutProvider>
            <AppRoutes />
            <ToastContainer />
          </CheckoutProvider>
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default App
