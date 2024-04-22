import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from "@/lib/api/config";

const AuthContext = createContext({});

export const AuthContextProvider = ({children}: PropsWithChildren) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingError, setLoadingError] = useState(null);

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

    const updateUsername = async (newUsername: string) => {
        if (!currentUser || !authToken) {
            setLoadingError("Not authenticated");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/user/updateUsername`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: currentUser.id, newUsername }),
            });
            const data = await response.json();
            if (response.ok) {
                setCurrentUser({ ...currentUser, username: newUsername });
                setLoadingError(null);
            } else {
                throw new Error(data.message || "Failed to update username");
            }
        } catch (error) {
            setLoadingError(error.message);
            console.error("Error updating username:", error);
        }
    };

    const removeAuthToken = async () => {
        await SecureStore.deleteItemAsync('authToken');
        setAuthToken(null);
        setCurrentUser(null);
        setLoadingError("Logged out");
    };

    return (
        <AuthContext.Provider value={{ authToken, currentUser, updateAuthToken, removeAuthToken, updateUsername, loadingError }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);
