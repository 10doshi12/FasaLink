import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from './Layout';

const ProtectedRoute = () => {
    // Get both the token and the new loading state from our context
    const { token, loading } = useAuth();

    // 1. While the AuthProvider is verifying the token, show a loading message.
    if (loading) {
        return <div>Loading authentication...</div>;
    }

    // 2. After loading is finished, check if a token exists.
    //    If not, redirect to the login page.
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // 3. If loading is finished and a token exists, show the page.
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default ProtectedRoute;