import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState(null);
    // Initialize loading to true ONLY if a token exists to be verified.
    const [loading, setLoading] = useState(!!token); 

    useEffect(() => {
        const verifyToken = async () => {
            // If there's no token, we don't need to do anything.
            // The loading state was already set to false initially.
            if (!token) {
                return;
            }

            // If a token exists, we MUST verify it with the backend.
            try {
                const response = await fetch('http://localhost:8000/auth/users/me/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    // Token is invalid, log out.
                    logout();
                }
            } catch (error) {
                // Network error, treat as logged out.
                logout();
            } finally {
                // No matter the outcome, we are done loading.
                setLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    const login = async (username, password) => {
        const response = await fetch('http://localhost:8000/auth/token/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            throw new Error('Login failed!');
        }
        const data = await response.json();
        localStorage.setItem('authToken', data.auth_token);
        setToken(data.auth_token); // This will trigger the useEffect to verify the new token
        setLoading(true); // Start loading while we verify the new user
    };
    
    const register = async (username, password, email, user_type) => {
         const response = await fetch('http://localhost:8000/auth/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email, user_type }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }
        await login(username, password);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
    };

    const authValue = { token, user, loading, login, register, logout };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};