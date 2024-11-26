import React, { createContext, useContext, useState } from 'react';
const CustomerContext = createContext();
export const CustomerProvider = ({ children }) => {
    const [customerCount, setCustomerCount] = useState(0);
    const [ownerCount, setOwnerCount] = useState(0);
    const [rentalRequestCount, setRentalRequestCount] = useState(0);
    const [postRequestCount, setPostRequestCount] = useState(0);
    return (
        <CustomerContext.Provider value={{ customerCount, setCustomerCount, ownerCount, setOwnerCount, rentalRequestCount, setRentalRequestCount, postRequestCount, setPostRequestCount }}>
            {children}
        </CustomerContext.Provider>
    );
};
export const useCustomer = () => {
    return useContext(CustomerContext);
};