import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import ChatView from '@/components/chat/ChatView';

export default function ChatScreen() {
    const { id } = useLocalSearchParams();

    return <ChatView id={id as string} />;
}
