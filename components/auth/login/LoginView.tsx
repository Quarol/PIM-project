import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import COLORS from '@/constants/Colors';
import FONTS from '@/constants/Fonts';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

export default function LoginView() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            router.replace('/(tabs)/chats');
        } catch (error: any) {
            Alert.alert('Błąd logowania', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Zaloguj się</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Hasło"
                placeholderTextColor={COLORS.textSecondary}
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />
            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.loginButtonText}>
                    {loading ? 'Logowanie...' : 'Zaloguj się'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.registerLink}
                onPress={() => router.push('/auth/register')}
            >
                <Text style={styles.registerLinkText}>
                    Nie masz konta? Zarejestruj się
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.homeLink}
                onPress={() => router.push('/')}
            >
                <Text style={styles.homeLinkText}>
                    Przejdź do strony głównej
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: FONTS.title.fontSize,
        fontWeight: FONTS.title.fontWeight,
        color: COLORS.textPrimary,
        marginBottom: 40,
    },
    input: {
        width: '90%',
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        fontSize: 16,
    },
    loginButton: {
        width: '90%',
        height: 50,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginButtonText: {
        color: COLORS.white,
        fontSize: FONTS.button.fontSize,
        fontWeight: FONTS.button.fontWeight,
    },
    registerLink: {
        marginTop: 20,
    },
    registerLinkText: {
        color: COLORS.primary,
        fontSize: FONTS.body.fontSize,
        textDecorationLine: 'underline',
    },
    homeLink: {
        marginTop: 10,
    },
    homeLinkText: {
        color: COLORS.textSecondary,
        fontSize: FONTS.body.fontSize,
    },
});
