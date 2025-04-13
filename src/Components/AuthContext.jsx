import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        // In a real app, you would call your backend API here
        // For demo purposes, we'll just store the user
        const demoUser = {
            email,
            name: email.split('@')[0] // Just for display purposes
        };
        setUser(demoUser);
        localStorage.setItem('user', JSON.stringify(demoUser));
        return true;
    };

    const signup = (email, password, name) => {
        // In a real app, you would call your backend API here
        // For demo purposes, we'll just store the user
        const demoUser = {
            email,
            name
        };
        setUser(demoUser);
        localStorage.setItem('user', JSON.stringify(demoUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Check if user is logged in on initial load
    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};