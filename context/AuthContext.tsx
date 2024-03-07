import { useRouter, useSegments } from "expo-router";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

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
    // Simulate fetching user data (e.g., from local storage or an API)
    const user = { email: 'user@example.com' }; // This should be your actual authentication logic
    setCurrentUser(user);
    console.log('CurrentUser in AuthProvider:', user);
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

  return (
    <AuthContext.Provider value={{ authToken, updateAuthToken, removeAuthToken, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);