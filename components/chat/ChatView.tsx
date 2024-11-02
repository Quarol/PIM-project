import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  COLORS  from '@/constants/Colors';
import FONTS from '@/constants/Fonts';

type ChatViewProps = {
    id: string | undefined;
};

export default function ChatView({ id }: ChatViewProps) {
    return (
        <View style={styles.container}>
            <Text style={[styles.title, FONTS.title]}>Chat {id}</Text>
            <Text style={[styles.message, FONTS.body]}>
                CHAT SCREEN, Chat {id}.
            </Text>
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
    title: {
        marginBottom: 10,
        color: COLORS.textPrimary,
    },
    message: {
        textAlign: 'center',
        color: COLORS.textSecondary,
    },
});
