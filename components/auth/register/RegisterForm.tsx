import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import COLORS from '@/constants/Colors';
import FONTS from '@/constants/Fonts';
import { useRouter } from 'expo-router';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

type RegisterFormProps = {
    onRegisterSuccess: () => void;
};

export default function RegisterForm({ onRegisterSuccess }: RegisterFormProps) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegisterPress = async () => {
        if (!email || !password) {
            Alert.alert('Błąd', 'Email i hasło są wymagane.');
            return;
        }

        setLoading(true);
        try {
            await createUserWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password,
            );
            Alert.alert('Sukces', 'Konto zostało utworzone.');
            onRegisterSuccess();
            router.replace('/auth/login');
        } catch (error: any) {
            Alert.alert('Błąd rejestracji', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
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
                placeholder="Hasło"
                placeholderTextColor={COLORS.textSecondary}
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />
            <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegisterPress}
                disabled={loading}
            >
                <Text style={styles.registerButtonText}>
                    {loading ? 'Rejestracja...' : 'Zarejestruj się'}
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
        alignItems: 'center',
        width: '100%',
    },
    input: {
        width: '90%',
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
        width: '90%',
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
    homeLink: {
        marginTop: 20,
    },
    homeLinkText: {
        color: COLORS.textSecondary,
        fontSize: FONTS.body.fontSize,
        textDecorationLine: 'underline',
    },
});
