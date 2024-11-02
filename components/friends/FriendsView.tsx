import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import FONTS from '@/constants/Fonts';
import COLORS from '@/constants/Colors';

export default function FriendsView() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={[styles.title, FONTS.title]}>Friends</Text>
            <Text style={[styles.description, FONTS.body]}>
                This is the Friends screen, where you can see your friend list.
            </Text>
            <TouchableOpacity
                style={styles.friendButton}
                onPress={() => {
                    router.push('/(nottabs)/friend');
                }}
            >
                <Text style={styles.friendButtonText}>Go to Friend</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.background,
    },
    friendButton: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
    },
    friendButtonText: {
        ...FONTS.button,
    },
    title: {
        marginBottom: 10,
        color: COLORS.textPrimary,
    },
    description: {
        textAlign: 'center',
        color: COLORS.textSecondary,
    },
});
