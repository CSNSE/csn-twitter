import { useRouter, useSegments } from "expo-router";
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from "@/lib/api/config";

const AuthContext = createContext({});

export const AuthContextProvider = ({children}: PropsWithChildren) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingError, setLoadingError] = useState(null);
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const isAuthGroup = segments[0] === '(auth)';
        if (!authToken && !isAuthGroup) {
            router.replace('/signin');
        } 
        if (authToken && isAuthGroup) {
            router.replace('/');
        }
    }, [segments, authToken]);

    useEffect(() => {
        const loadAuthToken = async () => {
            const token = await SecureStore.getItemAsync('authToken');
            setAuthToken(token);
        };

        loadAuthToken();
    }, []);

    useEffect(() => {
        if (!authToken) return;

        const fetchUserData = async () => {
            try {
                const response = await fetch(`${API_URL}/user/me`, {
                    headers: { 'Authorization': `Bearer ${authToken}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setCurrentUser(data);
                    setLoadingError(null);
                } else {
                    throw new Error(data.message || "Unable to fetch user data");
                }
            } catch (error) {
                setLoadingError(error.message);
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [authToken]);

    const updateAuthToken = async (newToken: string) => {
        await SecureStore.setItemAsync('authToken', newToken);
        setAuthToken(newToken);
    };

    const removeAuthToken = async () => {
        await SecureStore.deleteItemAsync('authToken');
        setAuthToken(null);
        setCurrentUser(null);
        setLoadingError("Logged out");
    };

    return (
        <AuthContext.Provider value={{ authToken, currentUser, updateAuthToken, removeAuthToken, loadingError }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);