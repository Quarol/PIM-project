import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getOrCreateChat, subscribeToChats } from '../../backend/ChatService';
import { useAuth } from '@/components/auth/AuthProvider';
import COLORS from '@/constants/Colors';
import NewChatModal from './NewChatModal';

type Chat = {
    id: string;
    users: string[];
    lastMessage: string;
    lastMessageTimestamp: any;
};

export default function ChatList() {
    const router = useRouter();
    const { user } = useAuth();
    const [chats, setChats] = useState<Chat[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (user && user.email) {
            const unsubscribe = subscribeToChats(user.email, (loadedChats) => {
                setChats(loadedChats);
            });
            return unsubscribe;
        }
    }, [user]);

    const handleChatPress = (chatId: string) => {
        router.push(`/(nottabs)/chat?id=${chatId}&backLink=/tabs/chats`);
    };

    const handleCreateChat = async (email: string) => {
        if (!email || !user || !user.email) return;

        const chatId = await getOrCreateChat(user.email, email);
        setIsModalVisible(false);
        router.push(`/(nottabs)/chat?id=${chatId}&backLink=/tabs/chats`);
    };

    const renderItem = ({ item }: { item: Chat }) => {
        const otherUserEmail =
            item.users.find((email) => email !== user?.email) || 'Użytkownik';
        return (
            <TouchableOpacity
                style={styles.chatItem}
                onPress={() => handleChatPress(item.id)}
            >
                <Ionicons
                    name="person-circle"
                    size={40}
                    color="#6C63FF"
                    style={styles.icon}
                />
                <View style={styles.chatInfo}>
                    <Text style={styles.chatTitle}>{otherUserEmail}</Text>
                    <Text style={styles.chatMessage}>
                        {item.lastMessage || 'Brak wiadomości'}
                    </Text>
                </View>
                <View style={styles.timestampContainer}>
                    {item.lastMessageTimestamp && (
                        <Text style={styles.timestamp}>
                            {new Date(
                                item.lastMessageTimestamp.toDate(),
                            ).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {chats.length === 0 ? (
                <Text style={styles.noChatsText}>Brak czatów</Text>
            ) : (
                <FlatList
                    data={chats.sort(
                        (a, b) =>
                            b.lastMessageTimestamp?.seconds -
                            a.lastMessageTimestamp?.seconds,
                    )}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                />
            )}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setIsModalVisible(true)}
            >
                <MaterialIcons name="add" size={28} color="white" />
            </TouchableOpacity>

            <NewChatModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onCreateChat={handleCreateChat}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    list: {
        gap: 15,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    icon: {
        marginRight: 10,
    },
    chatInfo: {
        flex: 1,
    },
    chatTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    chatMessage: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    timestampContainer: {
        alignItems: 'flex-end',
    },
    timestamp: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 5,
    },
    noChatsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: COLORS.textSecondary,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#007AFF',
        borderRadius: 30,
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    },
});
