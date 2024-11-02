import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import COLORS from '@/constants/Colors';
import FONTS from '@/constants/Fonts';

export default function RegisterView() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Logika rejestracji, np. walidacja, wysyłanie danych do API
        console.log('Rejestracja:', { email, username, password });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Zarejestruj się</Text>
            <TextInput
                style={styles.input}
                placeholder="Adres e-mail"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Nazwa użytkownika"
                placeholderTextColor={COLORS.textSecondary}
                autoCapitalize="none"
                onChangeText={setUsername}
                value={username}
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
                style={styles.registerButton}
                onPress={handleRegister}
            >
                <Text style={styles.registerButtonText}>Zarejestruj się</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.loginLink}
                onPress={() => router.push('/auth/login')}
            >
                <Text style={styles.loginLinkText}>
                    Masz już konto? Zaloguj się
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
        width: '100%',
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        fontSize: 16,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    registerButton: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    registerButtonText: {
        color: COLORS.white,
        fontSize: FONTS.button.fontSize,
        fontWeight: FONTS.button.fontWeight,
    },
    loginLink: {
        marginTop: 20,
    },
    loginLinkText: {
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
