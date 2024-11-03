import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import COLORS from '@/constants/Colors';
import FONTS from '@/constants/Fonts';
import RegisterForm from './RegisterForm';

export default function RegisterView() {
    const router = useRouter();

    const handleRegisterSuccess = () => {
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Zarejestruj się</Text>
            <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
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
});
