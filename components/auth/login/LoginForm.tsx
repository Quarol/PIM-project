import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';
import COLORS from '@/constants/Colors';
import FONTS from '@/constants/Fonts';

type LoginFormProps = {
    onSubmit: (email: string, password: string) => Promise<void>;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLoginPress = async () => {
        setLoading(true);
        await onSubmit(email, password);
        setLoading(false);
    };

    return (
        <View style={styles.container}>
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
                onPress={handleLoginPress}
                disabled={loading}
            >
                <Text style={styles.loginButtonText}>
                    {loading ? 'Logowanie...' : 'Zaloguj się'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
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
});
