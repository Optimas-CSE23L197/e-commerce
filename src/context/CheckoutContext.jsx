import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext()

export default function CheckoutProvider({ children }) {

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
        if (!address.fullName || !address.phoneNumber || !address.fullAddress) {
            setIsOrdered(false);
            setOrderId("");
            return;
        }

        const id = generateOrderId();
        setOrderId(id);
        setIsOrdered(true)
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