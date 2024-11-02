import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import COLORS from '@/constants/Colors';
import FONTS from '@/constants/Fonts';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Projekt PIM</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/auth/login')}
            >
                <Text style={styles.buttonText}>Zaloguj się</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.registerButton]}
                onPress={() => router.push('/auth/register')}
            >
                <Text style={styles.buttonText}>Zarejestruj się</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondaryBackground,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        ...FONTS.title,
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        backgroundColor: COLORS.tintColor,
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 30,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    registerButton: {
        backgroundColor: COLORS.primary,
    },
    buttonText: {
        ...FONTS.button,
    },
});
