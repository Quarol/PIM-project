import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatList from '@/components/chats/ChatList';

export default function ChatsScreen() {
    return (
        <View style={styles.container}>
            <ChatList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});
