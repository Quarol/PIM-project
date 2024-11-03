import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import COLORS from '@/constants/Colors';
import { subscribeToMessages, sendMessage } from '../../backend/ChatService';
import { useAuth } from '@/components/auth/AuthProvider';

type ChatViewProps = {
    id: string | undefined;
};

export default function ChatView({ id }: ChatViewProps) {
    const { user } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (!id) return;

        const unsubscribe = subscribeToMessages(id, (loadedMessages) => {
            setMessages(loadedMessages);
        });

        return unsubscribe;
    }, [id]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '' || !user || !user.email) return;

        await sendMessage(id!, newMessage, user.email);
        setNewMessage('');
    };

    const renderItem = ({ item }: { item: any }) => {
        const isCurrentUser = item.senderEmail === user?.email;
        return (
            <View
                style={[
                    styles.messageItem,
                    isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
                ]}
            >
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.timestamp}>
                    {item.timestamp
                        ? new Date(item.timestamp.toDate()).toLocaleTimeString()
                        : ''}
                </Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <FlatList
                data={messages.slice().reverse()}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.messagesList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Napisz wiadomość..."
                    placeholderTextColor={COLORS.textSecondary}
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleSendMessage}
                >
                    <Text style={styles.sendButtonText}>Wyślij</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    messagesList: {
        padding: 10,
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    messageItem: {
        maxWidth: '75%',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    currentUserMessage: {
        backgroundColor: COLORS.primary,
        alignSelf: 'flex-end',
        borderTopRightRadius: 0,
    },
    otherUserMessage: {
        backgroundColor: '#E0F7FA',
        alignSelf: 'flex-start',
        borderTopLeftRadius: 0,
    },
    messageText: {
        color: COLORS.textPrimary,
        fontSize: 16,
    },
    timestamp: {
        fontSize: 10,
        color: COLORS.textSecondary,
        textAlign: 'right',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: COLORS.white,
    },
    input: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        padding: 12,
        borderRadius: 25,
        fontSize: 16,
        marginRight: 10,
        color: COLORS.textPrimary,
    },
    sendButton: {
        backgroundColor: '#007aff',
        borderRadius: 25,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    sendButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
