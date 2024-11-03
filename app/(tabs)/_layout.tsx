import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="chats/index"
                options={{
                    title: 'Moje Czaty',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="chatbubbles-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="friends/index"
                options={{
                    title: 'Znajomi',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="people-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
