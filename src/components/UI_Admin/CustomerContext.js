import React, { createContext, useContext, useState } from 'react';

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const [customerCount, setCustomerCount] = useState(0);
    const [ownerCount, setOwnerCount] = useState(0);

    return (
        <CustomerContext.Provider value={{ customerCount, setCustomerCount, ownerCount, setOwnerCount }}>
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomer = () => {
    return useContext(CustomerContext);
};
