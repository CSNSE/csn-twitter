import { useRouter, useSegments } from "expo-router";
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from "@/lib/api/config";

const AuthContext = createContext({});

export const AuthContextProvider = ({children}: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isAuthGroup = segments[0] == '(auth)';

    if (!authToken && !isAuthGroup) {
      router.replace('/signin');
    } 
    if (authToken && isAuthGroup) {
      router.replace('/');
    }
  }, [segments, authToken]);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = await SecureStore.getItemAsync('authToken');
      if (authToken) {
        try {
          const response = await fetch(`${API_URL}/user/me`, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            setCurrentUser(userData); // Assuming userData contains the email and any other needed info
          } else {
            console.error("Failed to fetch user data: ", response.statusText);
            // Handle failure (e.g., clearing auth token and redirecting to login)
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
          // Handle errors, such as network issues
        }
      }
    };
    fetchData();
  }, []);
  

  useEffect(() => {
    const loadAuthToken = async () => {
      const res = await SecureStore.getItemAsync('authToken');
      if (res) {
        setAuthToken(res);
    }
    }
    loadAuthToken();
  }, [])

  const updateAuthToken = async (newToken: string) => {
    await SecureStore.setItemAsync('authToken', newToken);
    setAuthToken(newToken);
  };

  const removeAuthToken = async () => {
    await SecureStore.deleteItemAsync('authToken');
    setAuthToken(null);
  };

  // Simplify the fetching logic
useEffect(() => {
  const fetchCurrentUser = async () => {
    const authToken = await SecureStore.getItemAsync('authToken');
    if (!authToken) return;
    console.log(`Fetching user data with token: ${authToken}`); // Debug log

    try {
      const response = await fetch(`${API_URL}/user/me`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      console.log('Response received:', response); // Log the raw response

      if (!response.ok) throw new Error('Failed to fetch user data.');

      const userData = await response.json();
      console.log(`Received user data: `, userData); // Debug log
      setCurrentUser(userData);
    } catch (error) {
      console.error(`Error fetching user data: `, error); // Log any errors
    }
  };

  fetchCurrentUser();
}, [authToken]); // Depend on authToken to refetch when it changes

  return (
    <AuthContext.Provider value={{ authToken, updateAuthToken, removeAuthToken, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);