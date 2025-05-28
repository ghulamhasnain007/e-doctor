import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router, useSegments, useRootNavigationState } from 'expo-router';
import { Platform } from 'react-native';

// Mock storage for web (SecureStore doesn't work on web)
const mockStorage = new Map<string, string>();

async function saveToStorage(key: string, value: string) {
  if (Platform.OS === 'web') {
    mockStorage.set(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

async function getFromStorage(key: string) {
  if (Platform.OS === 'web') {
    return mockStorage.get(key) || null;
  }
  return await SecureStore.getItemAsync(key);
}

async function removeFromStorage(key: string) {
  if (Platform.OS === 'web') {
    mockStorage.delete(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

// Define user types
type UserType = 'patient' | 'doctor' | null;

interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
}

interface AuthContextType {
  user: User | null;
  userType: UserType;
  isLoading: boolean;
  signedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  // Check if the user is authenticated
  const checkAuth = async () => {
    try {
      // In a real app, you'd verify the token with your backend
      const userJSON = await getFromStorage('user');
      
      if (userJSON) {
        const userData = JSON.parse(userJSON);
        setUser(userData);
        setUserType(userData.userType);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle navigation based on auth state
  useEffect(() => {
    if (!navigationState?.key || isLoading) return;
    
    const inAuthGroup = segments[0] === '(auth)';
    
    if (!user && !inAuthGroup) {
      // Redirect to auth if not signed in
      router.replace('/welcome');
    } else if (user && inAuthGroup) {
      // Redirect to app if signed in
      router.replace('/');
    }
  }, [user, segments, navigationState?.key, isLoading]);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, you'd call your API for authentication
      // Mock response for demo
      const mockUser = {
        id: '123',
        name: email.split('@')[0],
        email,
        userType: email.includes('doctor') ? 'doctor' : 'patient',
      };
      
      // Save user data and token
      await saveToStorage('user', JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      setUserType(mockUser.userType as UserType);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      // In a real app, you'd call your API for registration
      const { userType } = userData;
      
      // Mock user creation
      const mockUser = {
        id: Math.random().toString(36).substring(2, 9),
        name: userData.name,
        email: userData.email,
        userType,
      };
      
      // Save user data
      await saveToStorage('user', JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      setUserType(userType);
      
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      await removeFromStorage('user');
      setUser(null);
      setUserType(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        isLoading,
        signedIn: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}