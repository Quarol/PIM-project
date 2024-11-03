import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
} from 'firebase/auth';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

type AuthContextType = {
    user: User | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                setIsLoggedIn(true);
            }
        };

        checkUser();

        const unsubscribe = onAuthStateChanged(
            FIREBASE_AUTH,
            (firebaseUser) => {
                if (firebaseUser) {
                    setUser(firebaseUser);
                    setIsLoggedIn(true);
                    AsyncStorage.setItem('user', JSON.stringify(firebaseUser));
                } else {
                    setUser(null);
                    setIsLoggedIn(false);
                    AsyncStorage.removeItem('user');
                }
            },
        );

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password,
            );
            setUser(userCredential.user);
            setIsLoggedIn(true);
            await AsyncStorage.setItem(
                'user',
                JSON.stringify(userCredential.user),
            );
        } catch (error: any) {
            Alert.alert('Błąd logowania', error.message);
        }
    };

    const logout = async () => {
        try {
            await signOut(FIREBASE_AUTH);
            setUser(null);
            setIsLoggedIn(false);
            await AsyncStorage.removeItem('user');
        } catch (error: any) {
            Alert.alert('Błąd wylogowania', error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
