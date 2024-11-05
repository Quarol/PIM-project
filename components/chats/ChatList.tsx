import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    getOrCreateChat,
    subscribeToChats,
    deleteChat,
} from '../../backend/ChatService';
import { useAuth } from '@/components/auth/AuthProvider';
import COLORS from '@/constants/Colors';
import NewChatModal from './NewChatModal';
import SearchBar from '@/components/chat/SearchBar';

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
    const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (user && user.email) {
            const unsubscribe = subscribeToChats(user.email, (loadedChats) => {
                setChats(loadedChats);
                setFilteredChats(loadedChats);
            });
            return unsubscribe;
        }
    }, [user]);

    const handleDeleteChat = async (chatId: string) => {
        Alert.alert(
            'Potwierdzenie usunięcia',
            'Czy na pewno chcesz usunąć ten czat?',
            [
                { text: 'Anuluj', style: 'cancel' },
                {
                    text: 'Usuń',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteChat(chatId);
                    },
                },
            ],
        );
    };

    const renderItem = ({ item }: { item: Chat }) => {
        const otherUserEmail =
            item.users.find((email) => email !== user?.email) || 'Użytkownik';
        return (
            <View style={styles.chatItem}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                    }}
                    onPress={() =>
                        router.push(
                            `/(nottabs)/chat?id=${item.id}&backLink=/tabs/chats`,
                        )
                    }
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
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteChat(item.id)}
                >
                    <Ionicons
                        name="remove-circle-outline"
                        size={24}
                        color="red"
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <SearchBar searchText={searchText} onSearch={setSearchText} />
            <FlatList
                data={filteredChats.sort(
                    (a, b) =>
                        b.lastMessageTimestamp?.seconds -
                        a.lastMessageTimestamp?.seconds,
                )}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setIsModalVisible(true)}
            >
                <MaterialIcons name="add" size={28} color="white" />
            </TouchableOpacity>

            <NewChatModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onCreateChat={async (email) => {
                    const chatId = await getOrCreateChat(user?.email, email);
                    if (chatId) router.push(`/(nottabs)/chat?id=${chatId}`);
                }}
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
        paddingBottom: 20,
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
    deleteButton: {
        padding: 5,
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
