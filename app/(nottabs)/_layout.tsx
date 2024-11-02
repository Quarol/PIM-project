import React from 'react';
import { Stack } from 'expo-router';

export default function NotTabsLayout() {
    return (
        <Stack>
            <Stack.Screen name="chat/index" />
            <Stack.Screen name="friend/index" />
        </Stack>
    );
}
