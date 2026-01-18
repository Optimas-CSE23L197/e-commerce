import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { Toast } from "../utils/toast.js";

const CheckoutContext = createContext()

export default function CheckoutProvider({ children }) {

    const { cart } = useCart()

    const [address, setAddress] = useState({
        fullName: "",
        phoneNumber: "",
        city: "",
        postalCode: "",
        state: "",
        country: "",
        fullAddress: ""
    })
    const [paymentMethod, setPaymentMethod] = useState("cod")
    const [isOrdered, setIsOrdered] = useState(false)
    const [orderId, setOrderId] = useState("");

    const navigate = useNavigate();

    // handle address change
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // generate orderId
    const generateOrderId = () => {
        const prefix = "ORD";
        const timePart = Date.now(); // unique by time (milliseconds)
        const randomPart = Math.floor(1000 + Math.random() * 9000);
        return `${prefix}-${timePart}-${randomPart}`;
    };

    const handleOrder = () => {

        if (cart.length <= 0) {
            Toast.error("Cart is empty")
            return;
        }

        if (!address.fullName || !address.phoneNumber || !address.fullAddress) {
            setIsOrdered(false);
            setOrderId("");
            Toast.error("add your address for delivery");
            return;
        }

        const id = generateOrderId();
        setOrderId(id);
        setIsOrdered(true)
        Toast.success("Order Successful")
    }



    const value = {
        address,
        handleAddressChange,
        paymentMethod,
        setPaymentMethod,
        generateOrderId,
        isOrdered,
        orderId,
        handleOrder
    }

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    )

}

export const useCheckout = () => useContext(CheckoutContext)