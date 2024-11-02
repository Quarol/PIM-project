import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Chat = {
    id: string;
    name: string;
    lastMessage: string;
};

const chats: Chat[] = [
    { id: '1', name: 'Chat 1', lastMessage: 'Hello! How are you?' },
    { id: '2', name: 'Chat 2', lastMessage: 'Are we meeting tomorrow?' },
];

export default function ChatList() {
    const router = useRouter();

    const handleChatPress = (chatId: string) => {
        router.push(`/(nottabs)/chat?id=${chatId}&backLink=/tabs/chats`);
    };

    const renderItem = ({ item }: { item: Chat }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => handleChatPress(item.id)}
        >
            <View>
                <Text style={styles.chatTitle}>{item.name}</Text>
                <Text style={styles.chatMessage}>{item.lastMessage}</Text>
            </View>
            <Ionicons name="person-circle-outline" size={36} color="#888" />
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={chats}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        gap: 15,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    chatTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    chatMessage: {
        fontSize: 14,
        color: '#666',
    },
});
