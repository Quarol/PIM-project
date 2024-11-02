import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';

export default function AuthStack() {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/auth/login');
        }
    }, [isLoggedIn]);

    return (
        <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}
